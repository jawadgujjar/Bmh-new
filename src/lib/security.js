import { NextResponse } from "next/server";

/* ============================================================
   1. Safe error responses
   ------------------------------------------------------------
   Never send raw error.message / stack traces to the client.
   Log the real error on the server, return a generic message.
   ============================================================ */

/**
 * Build a safe JSON error response.
 *
 * @param {unknown} err      the caught error (logged server-side only)
 * @param {object}  options
 * @param {string}  options.context   short label for the server log
 * @param {number}  options.status    HTTP status (default 500)
 * @param {string}  options.message   client-facing message (default generic)
 * @param {"error"|"message"} options.key  response key some routes use "message"
 * @param {boolean} options.success   include { success:false } (default true)
 */
export function safeError(err, options = {}) {
  const {
    context = "API",
    status = 500,
    message = "Something went wrong. Please try again.",
    key = "error",
    success = true,
  } = options;

  // Server-side log only — this never reaches the browser.
  console.error(`[${context}]`, err?.message || err);

  const body = { [key]: message };
  if (success) body.success = false;

  return NextResponse.json(body, { status });
}

/* ============================================================
   2. HTML escaping (for e-mails built from user input)
   ============================================================ */
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ============================================================
   3. Basic field validators for public form submissions
   ============================================================ */
export function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.length <= 254;
}

/**
 * Trim + length-cap a string. Returns "" for non-strings.
 */
export function cleanString(value, maxLen = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

/**
 * Keep only the listed keys from an object (guards against mass-assignment).
 */
export function pick(obj, keys) {
  const out = {};
  if (!obj || typeof obj !== "object") return out;
  for (const k of keys) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
}

/* ============================================================
   4. In-memory rate limiter
   ------------------------------------------------------------
   Best-effort: protects a warm server instance from rapid
   abuse (spam, brute force). For multi-instance / serverless
   scale, back this with Redis (e.g. Upstash) later.
   ============================================================ */
const buckets = new Map();

/** Periodically drop stale buckets so the Map can't grow forever. */
function sweep(now) {
  for (const [key, entry] of buckets) {
    if (entry.reset < now) buckets.delete(key);
  }
}

/**
 * @param {Request} req
 * @param {object}  opts
 * @param {string}  opts.name       limiter name (namespaces the key)
 * @param {number}  opts.limit      max requests per window (default 5)
 * @param {number}  opts.windowMs   window length in ms (default 60_000)
 * @returns {{ ok: boolean, response?: NextResponse }}
 */
export function rateLimit(req, opts = {}) {
  const { name = "default", limit = 5, windowMs = 60_000 } = opts;

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `${name}:${ip}`;
    const now = Date.now();

    if (buckets.size > 5000) sweep(now);

    let entry = buckets.get(key);
    if (!entry || entry.reset < now) {
      entry = { count: 0, reset: now + windowMs };
      buckets.set(key, entry);
    }

    entry.count += 1;

    if (entry.count > limit) {
      const retry = Math.ceil((entry.reset - now) / 1000);
      return {
        ok: false,
        response: NextResponse.json(
          { success: false, error: "Too many requests. Please try again shortly." },
          { status: 429, headers: { "Retry-After": String(retry) } }
        ),
      };
    }

    return { ok: true };
  } catch {
    // Never let the limiter itself break a request.
    return { ok: true };
  }
}

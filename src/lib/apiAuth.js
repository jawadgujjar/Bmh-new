import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Reads the `token` cookie (set by /api/admin/login) and verifies it.
 * Returns the decoded payload ({ id, email, role }) or null if missing/invalid.
 */
export function getAuthUser(req) {
  try {
    const token = req?.cookies?.get?.("token")?.value;
    if (!token || !process.env.JWT_SECRET) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Guard for API route handlers.
 *
 *   const auth = requireAuth(req);              // any logged-in staff member
 *   const auth = requireAuth(req, ["admin"]);   // admin only
 *   if (!auth.ok) return auth.response;
 *   // auth.user is available here
 */
export function requireAuth(req, allowedRoles) {
  const user = getAuthUser(req);

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (
    Array.isArray(allowedRoles) &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, user };
}

/** Escape a user-supplied string so it is safe to use inside a RegExp. */
export function escapeRegex(str = "") {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

import { NextResponse } from "next/server";

// Server-side check for the Google reCAPTCHA v2 token sent by the browser.
// If RECAPTCHA_SECRET_KEY isn't configured the check is skipped, so the site
// keeps working until keys are added.
export async function verifyCaptcha(req, token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true };

  const fail = () => ({
    ok: false,
    response: NextResponse.json(
      { error: "Captcha verification failed. Please try again.", message: "Captcha verification failed. Please try again." },
      { status: 400 }
    ),
  });

  if (!token || typeof token !== "string") return fail();

  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "";

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (!data.success) {
      console.error("[captcha] rejected", data["error-codes"]);
      return fail();
    }
    return { ok: true };
  } catch (err) {
    console.error("[captcha] verify request failed", err?.message || err);
    return fail();
  }
}

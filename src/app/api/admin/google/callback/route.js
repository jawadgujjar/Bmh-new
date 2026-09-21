import { google } from "googleapis";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { saveConnectedAccount } from "@/lib/googleCalendar";

export async function GET(req) {
  const auth = requireAuth(req, ["admin"]);
  if (!auth.ok) return auth.response;

  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = req.cookies.get("google_oauth_state")?.value;

  const goTo = (status) =>
    NextResponse.redirect(new URL(`/admin?googleConnect=${status}`, req.nextUrl.origin));

  if (!code || !state || !storedState || state !== storedState) {
    return goTo("error");
  }

  const redirectUri = `${req.nextUrl.origin}/api/admin/google/callback`;
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return goTo("missing_refresh_token");
    }

    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();

    await saveConnectedAccount({
      refreshToken: tokens.refresh_token,
      email: profile.email,
      connectedBy: auth.user.email,
    });

    const res = goTo("success");
    res.cookies.delete("google_oauth_state");
    return res;
  } catch (err) {
    console.error("[google-callback]", err?.message || err);
    return goTo("error");
  }
}

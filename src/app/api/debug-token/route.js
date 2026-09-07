// app/api/debug-token/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { requireAuth } from "@/lib/apiAuth";

export async function GET(req) {
  const auth = requireAuth(req, ["admin"]);
  if (!auth.ok) return auth.response;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.accessToken) {
      return Response.json({ 
        sessionExists: false,
        error: "No session or access token" 
      }, { status: 401 });
    }

    // Token decode کر کے دیکھیں
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ 
      access_token: session.accessToken 
    });
    
    let tokenInfo;
    try {
      tokenInfo = await oauth2Client.getTokenInfo(session.accessToken);
    } catch (tokenError) {
      return Response.json({
        sessionExists: true,
        userEmail: session.user?.email,
        tokenError: tokenError.message,
        tokenValid: false,
        recommendation: "Token is invalid or expired. Please re-login."
      });
    }
    
    return Response.json({
      sessionExists: true,
      userEmail: session.user?.email,
      tokenScopes: tokenInfo.scopes || [],
      tokenExpiry: tokenInfo.expiry_date ? new Date(tokenInfo.expiry_date) : null,
      tokenValid: true,
      hasCalendarScope: tokenInfo.scopes?.includes('https://www.googleapis.com/auth/calendar'),
      hasCalendarEventsScope: tokenInfo.scopes?.includes('https://www.googleapis.com/auth/calendar.events'),
      hasEmailScope: tokenInfo.scopes?.includes('https://www.googleapis.com/auth/userinfo.email'),
      hasProfileScope: tokenInfo.scopes?.includes('https://www.googleapis.com/auth/userinfo.profile'),
      allScopes: tokenInfo.scopes
    });
    
  } catch (error) {
    console.error("[debug-token]", error?.message || error);
    return Response.json({ error: "Could not read token info" }, { status: 500 });
  }
}
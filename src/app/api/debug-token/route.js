// app/api/debug-token/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

export async function GET() {
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
    return Response.json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
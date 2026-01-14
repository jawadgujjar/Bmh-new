import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    console.log("=== CREATE MEET API CALLED ===");
    
    // 1. Get session
    const session = await getServerSession(authOptions);
    console.log("Session:", session ? "Exists" : "No session");
    
    if (!session || !session.accessToken) {
      console.log("Unauthorized - No session or token");
      return Response.json(
        { error: "Unauthorized - Please login again" },
        { status: 401 }
      );
    }

    // 2. Get request data
    const body = await req.json();
    console.log("Request body:", body);
    
    const { dateTime, timeZone = "Asia/Karachi" } = body;

    if (!dateTime) {
      console.log("DateTime missing");
      return Response.json({ error: "DateTime missing" }, { status: 400 });
    }

    // 3. Setup OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({
      access_token: session.accessToken
    });

    // 4. Create calendar instance
    const calendar = google.calendar({ 
      version: "v3", 
      auth: oauth2Client 
    });

    // 5. Prepare event times
    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 mins
    
    console.log("Start time:", startTime);
    console.log("End time:", endTime);

    // 6. Create event with Google Meet
    const event = {
      summary: "Free Consultation Meeting",
      description: "Discussion about your project requirements",
      start: {
        dateTime: startTime.toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: timeZone,
      },
      attendees: [
        { email: session.user.email },
        { email: "jawadgujjar573@gmail.com" } // Add your admin email
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    console.log("Creating event...");
    
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    console.log("Event created:", response.data);
    
    // 7. Send success response
    return Response.json({
      success: true,
      meetLink: response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    });

  } catch (error) {
    console.error("❌ CREATE MEET ERROR:", error.message);
    console.error("Error details:", error.response?.data || error);
    
    // Specific error messages
    let errorMessage = "Failed to create meeting";
    if (error.message.includes("invalid_grant")) {
      errorMessage = "Session expired. Please login again.";
    } else if (error.message.includes("insufficient permission")) {
      errorMessage = "Calendar permissions not granted. Please grant calendar access.";
    } else if (error.message.includes("access_token")) {
      errorMessage = "Authentication error. Please logout and login again.";
    }
    
    return Response.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
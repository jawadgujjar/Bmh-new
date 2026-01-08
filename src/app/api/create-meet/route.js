import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: session.accessToken
  });

  const calendar = google.calendar({ version: "v3", auth });

  await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: "Website Consultation",
      start: {
        dateTime: new Date().toISOString()
      },
      end: {
        dateTime: new Date(Date.now() + 30 * 60000).toISOString()
      },
      attendees: [
        { email: "admin@yourcompany.com" } // 🔴 apna admin email yahan daalo
      ],
      conferenceData: {
        createRequest: {
          requestId: "meet-" + Date.now(),
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          }
        }
      }
    }
  });

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200 }
  );
}

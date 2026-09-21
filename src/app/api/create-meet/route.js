import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/googleCalendar";
import { safeError, isEmail, cleanString, rateLimit } from "@/lib/security";

export async function POST(req) {
  const limited = rateLimit(req, { name: "create-meet", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    const body = await req.json();
    const name = cleanString(body.name, 120);
    const email = cleanString(body.email, 254);
    const { dateTime, timeZone = "Asia/Karachi" } = body;

    if (!name || !email || !dateTime) {
      return NextResponse.json(
        { error: "Name, email and a meeting time are required" },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const startTime = new Date(dateTime);
    if (Number.isNaN(startTime.getTime()) || startTime.getTime() < Date.now() - 5 * 60_000) {
      return NextResponse.json({ error: "Please pick a valid future time" }, { status: 400 });
    }
    const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 mins

    const calendar = await getCalendarClient();
    if (!calendar) {
      console.error("[create-meet] Google Calendar not connected by admin yet");
      return NextResponse.json(
        { error: "Meeting scheduling is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const event = {
      summary: `Brand Marketing Hub | Free Consultation - ${name}`,
      description: "Discussion about your project requirements",
      start: { dateTime: startTime.toISOString(), timeZone },
      end: { dateTime: endTime.toISOString(), timeZone },
      attendees: [
        { email, displayName: name, responseStatus: "accepted" },
        ...(process.env.EMAIL_TO ? [{ email: process.env.EMAIL_TO }] : []),
      ],
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    return NextResponse.json({
      success: true,
      meetLink: response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri,
      eventId: response.data.id,
      htmlLink: response.data.htmlLink,
    });
  } catch (error) {
    return safeError(error, {
      context: "create-meet",
      message: "Failed to create meeting. Please try again.",
    });
  }
}

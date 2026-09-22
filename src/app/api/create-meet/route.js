import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCalendarClient } from "@/lib/googleCalendar";
import { safeError, escapeHtml, isEmail, cleanString, rateLimit } from "@/lib/security";

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

    const meetLink = response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri;

    // Google doesn't email the calendar owner for events they organize
    // themselves, so send a direct notification separately.
    if (process.env.EMAIL_TO) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
          subject: `New Meeting Booked - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Consultation Booked</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td>${escapeHtml(name)}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${escapeHtml(email)}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td>${escapeHtml(startTime.toLocaleString("en-US", { timeZone }))} (${escapeHtml(timeZone)})</td></tr>
                ${meetLink ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Meet Link:</strong></td><td><a href="${escapeHtml(meetLink)}">${escapeHtml(meetLink)}</a></td></tr>` : ""}
              </table>
              <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent from BMH Brand Marketing Hub</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("[create-meet] admin notification mail failed", mailErr?.message || mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      meetLink,
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

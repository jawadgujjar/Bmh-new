import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCalendarClient } from "@/lib/googleCalendar";
import { safeError, escapeHtml, isEmail, cleanString, rateLimit } from "@/lib/security";
import { verifyCaptcha } from "@/lib/captcha";

export async function POST(req) {
  const limited = rateLimit(req, { name: "create-meet", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    const body = await req.json();

    const captcha = await verifyCaptcha(req, body.captchaToken);
    if (!captcha.ok) return captcha.response;

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
    if (startTime.getTime() > Date.now() + 90 * 24 * 60 * 60_000) {
      return NextResponse.json({ error: "Please pick a time within the next 90 days" }, { status: 400 });
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone });
    } catch {
      return NextResponse.json({ error: "Invalid time zone" }, { status: 400 });
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

    // Google's own invite shows up in Gmail as "Invitation from an unknown
    // sender", so we skip it and send our own branded confirmation below.
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "none",
    });

    const meetLink = response.data.hangoutLink || response.data.conferenceData?.entryPoints?.[0]?.uri;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    const from = `"Brand Marketing Hub" <${process.env.EMAIL_USER}>`;
    const timeLabel = `${startTime.toLocaleString("en-US", { timeZone, dateStyle: "full", timeStyle: "short" })} (${timeZone})`;

    try {
      await transporter.sendMail({
        from,
        to: email,
        subject: "Your Free Consultation is Confirmed - Brand Marketing Hub",
        html: userConfirmationHtml({ name, timeLabel, meetLink, startTime, endTime }),
        attachments: [
          {
            filename: "consultation.ics",
            content: buildIcs({ uid: response.data.id, startTime, endTime, meetLink }),
            contentType: "text/calendar; charset=utf-8",
          },
        ],
      });
    } catch (mailErr) {
      console.error("[create-meet] user confirmation mail failed", mailErr?.message || mailErr);
    }

    // Google doesn't email the calendar owner for events they organize
    // themselves, so send a direct notification separately.
    if (process.env.EMAIL_TO) {
      try {
        await transporter.sendMail({
          from,
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

const EVENT_TITLE = "Free Consultation - Brand Marketing Hub";

// 2026-09-30T15:22:00.000Z -> 20260930T152200Z (format used by .ics and Google Calendar links)
function toCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildIcs({ uid, startTime, endTime, meetLink }) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Brand Marketing Hub//Consultation//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@brandmarketinghub.com`,
    `DTSTAMP:${toCalendarDate(new Date())}`,
    `DTSTART:${toCalendarDate(startTime)}`,
    `DTEND:${toCalendarDate(endTime)}`,
    `SUMMARY:${EVENT_TITLE}`,
    `DESCRIPTION:Discussion about your project requirements.${meetLink ? `\\nJoin: ${meetLink}` : ""}`,
    ...(meetLink ? [`LOCATION:${meetLink}`, `URL:${meetLink}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function userConfirmationHtml({ name, timeLabel, meetLink, startTime, endTime }) {
  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(EVENT_TITLE)}` +
    `&dates=${toCalendarDate(startTime)}/${toCalendarDate(endTime)}` +
    `&details=${encodeURIComponent(meetLink ? `Join Google Meet: ${meetLink}` : "")}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee;">
      <div style="background: #111827; padding: 20px; text-align: center;">
        <h1 style="color: #f97316; margin: 0; font-size: 22px;">Brand Marketing Hub</h1>
      </div>
      <div style="padding: 24px;">
        <h2 style="margin-top: 0;">Your consultation is confirmed</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thank you for booking a free 30-minute consultation with Brand Marketing Hub. Here are your meeting details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>When:</strong></td><td style="border-bottom: 1px solid #eee;">${escapeHtml(timeLabel)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Duration:</strong></td><td style="border-bottom: 1px solid #eee;">30 minutes</td></tr>
          ${meetLink ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Where:</strong></td><td style="border-bottom: 1px solid #eee;">Google Meet</td></tr>` : ""}
        </table>
        ${meetLink ? `<p style="text-align: center; margin: 24px 0;"><a href="${escapeHtml(meetLink)}" style="background: #f97316; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold;">Join Google Meet</a></p>` : ""}
        <p style="text-align: center;"><a href="${escapeHtml(calendarUrl)}" style="color: #2563eb;">Add to Google Calendar</a> &middot; or open the attached <em>consultation.ics</em> file</p>
        <p>Looking forward to speaking with you.</p>
        <p>Best regards,<br/><strong>Brand Marketing Hub Team</strong></p>
      </div>
      <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #777;">
        &copy; Brand Marketing Hub &middot; brandmarketinghub.com
      </div>
    </div>
  `;
}

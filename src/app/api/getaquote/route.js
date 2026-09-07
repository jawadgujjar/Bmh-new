import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";
import nodemailer from "nodemailer";
import { requireAuth } from "@/lib/apiAuth";
import {
  safeError,
  escapeHtml,
  isEmail,
  cleanString,
  rateLimit,
} from "@/lib/security";

export async function POST(req) {
  const limited = rateLimit(req, { name: "getaquote", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    await dbConnect();
    const body = await req.json();

    const firstName = cleanString(body.firstName, 80);
    const lastName = cleanString(body.lastName, 80);
    const phoneNumber = cleanString(body.phoneNumber, 40);
    const emailAddress = cleanString(body.emailAddress, 254);
    const websiteUrl = cleanString(body.websiteUrl, 300);
    const projectDetails = cleanString(body.projectDetails, 5000);
    const sourcePage = cleanString(body.sourcePage, 300);
    let monthlyBudget = Number(body.monthlyBudget);
    if (!Number.isFinite(monthlyBudget) || monthlyBudget < 0) monthlyBudget = 0;

    if (!firstName || !lastName || !emailAddress || !projectDetails) {
      return NextResponse.json(
        { success: false, error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    if (!isEmail(emailAddress)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // 1. Database mein save karein
    const newQuote = await GetaQuote.create({
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      websiteUrl,
      monthlyBudget,
      projectDetails,
      sourcePage,
    });

    // 2. Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email Content (user input HTML-escaped)
    const safeSource = escapeHtml(sourcePage);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Quote Request from ${escapeHtml(firstName)} ${escapeHtml(lastName)}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Proposal Request</h2>

          <p><strong>Source Page:</strong> ${safeSource || "N/A"}</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Client Name:</strong></td><td>${escapeHtml(firstName)} ${escapeHtml(lastName)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${escapeHtml(emailAddress)}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td>${escapeHtml(phoneNumber) || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Website:</strong></td><td>${escapeHtml(websiteUrl) || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Monthly Budget:</strong></td><td style="color: #16a34a; font-weight: bold;">$${monthlyBudget}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 5px;">
            <p><strong>Project Details:</strong></p>
            <p>${escapeHtml(projectDetails)}</p>
          </div>

          <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent from BMH Brand Marketing Hub</p>
        </div>
      `,
    };

    // 4. Email bhejein
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("[getaquote] mail send failed", mailErr?.message || mailErr);
    }

    return NextResponse.json({ success: true, data: { id: newQuote._id } });
  } catch (error) {
    return safeError(error, { context: "getaquote.POST", status: 400 });
  }
}

export async function GET(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const quotes = await GetaQuote.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return safeError(error, { context: "getaquote.GET" });
  }
}

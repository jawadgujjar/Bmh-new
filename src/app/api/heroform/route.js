import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroForm from "@/models/heroform";
import nodemailer from "nodemailer";
import { requireAuth } from "@/lib/apiAuth";
import {
  safeError,
  escapeHtml,
  isEmail,
  cleanString,
  rateLimit,
} from "@/lib/security";

// POST - create new form submission
export async function POST(req) {
  const limited = rateLimit(req, { name: "heroform", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    await dbConnect();
    const body = await req.json();

    const fullName = cleanString(body.fullName, 120);
    const emailAddress = cleanString(body.emailAddress, 254);
    const websiteUrl = cleanString(body.websiteUrl, 300);

    if (!fullName || !emailAddress) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }
    if (!isEmail(emailAddress)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // 1. Database mein save karein (sirf whitelisted fields)
    const newForm = await HeroForm.create({ fullName, emailAddress, websiteUrl });

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email Design (user input HTML-escaped)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Fast Track Lead: ${escapeHtml(fullName)} (Hero Form)`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; background-color: #f0f9ff; border-radius: 12px; border: 1px solid #bae6fd;">
          <h2 style="color: #0369a1; margin-bottom: 20px; border-bottom: 2px solid #0369a1; padding-bottom: 10px;">
            Consultation Requested!
          </h2>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(emailAddress)}</p>
            <p style="margin: 10px 0;"><strong>Website:</strong> ${escapeHtml(websiteUrl) || "No website provided"}</p>
          </div>

          <p style="font-size: 12px; color: #64748b; margin-top: 25px; text-align: center;">
            This lead came from the <strong>Hero Section</strong> of Brand Marketing Hub.
          </p>
        </div>
      `,
    };

    // 4. Email bhejein
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("[heroform] mail send failed", mailErr?.message || mailErr);
      // Lead DB mein save ho chuki hai, isliye crash nahi karenge
    }

    return NextResponse.json({ success: true, data: { id: newForm._id } });
  } catch (error) {
    return safeError(error, { context: "heroform.POST", status: 400 });
  }
}

// GET remains the same
export async function GET(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const forms = await HeroForm.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    return safeError(error, { context: "heroform.GET" });
  }
}

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contactus";
import nodemailer from "nodemailer";
import { requireAuth } from "@/lib/apiAuth";
import {
  safeError,
  escapeHtml,
  isEmail,
  cleanString,
  rateLimit,
} from "@/lib/security";

/* ================= POST ================= */
export async function POST(req) {
  const limited = rateLimit(req, { name: "contact", limit: 5, windowMs: 60_000 });
  if (!limited.ok) return limited.response;

  try {
    await connectDB();

    const body = await req.json();
    const fullName = cleanString(body.fullName, 120);
    const email = cleanString(body.email, 254);
    const phone = cleanString(body.phone, 40);
    const message = cleanString(body.message, 5000);

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // 1. Database mein data save karein
    const contact = await Contact.create({ fullName, email, phone, message });

    // 2. Nodemailer Transporter banayein
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email ka design aur content (user input HTML-escaped)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Inquiry: ${escapeHtml(fullName)} is interested in BMH`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #1890ff;">Brand Marketing Hub - New Contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 10px;">${escapeHtml(message)}</p>
          <br />
          <p style="font-size: 11px; color: #999;">This email was generated from your website's contact form.</p>
        </div>
      `,
    };

    // 4. Email bhejein (agar email fail ho to bhi lead DB mein save hai)
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("[contactus] mail send failed", mailErr?.message || mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message saved and email sent!",
      data: { id: contact._id },
    });
  } catch (error) {
    return safeError(error, { context: "contactus.POST", key: "message" });
  }
}

/* ================= GET ALL ================= */
export async function GET(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return safeError(error, { context: "contactus.GET", key: "message" });
  }
}

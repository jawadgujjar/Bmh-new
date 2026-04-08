import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contactus";
import nodemailer from "nodemailer";

/* ================= POST ================= */
export async function POST(req) {
  try {
    await connectDB();

    const { fullName, email, phone, message } = await req.json();

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "All fields required" },
        { status: 400 }
      );
    }

    // 1. Database mein data save karein
    const contact = await Contact.create({
      fullName,
      email,
      phone,
      message,
    });

    // 2. Nodemailer Transporter banayein
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email ka design aur content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Inquiry: ${fullName} is interested in BMH`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #1890ff;">Brand Marketing Hub - New Contact</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 10px;">${message}</p>
          <br />
          <p style="font-size: 11px; color: #999;">This email was generated from your website's contact form.</p>
        </div>
      `,
    };

    // 4. Email bhejein
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Message saved and email sent!", 
      data: contact 
    });

  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}

/* ================= GET ALL (Baaki code waisa hi rahega) ================= */
export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
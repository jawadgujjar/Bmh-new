import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroForm from "@/models/heroform";
import nodemailer from "nodemailer";

// POST - create new form submission
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Database mein save karein
    const newForm = await HeroForm.create(body);

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email Design (Hero Lead Style)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `✨ Fast Track Lead: ${body.fullName} (Hero Form)`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; background-color: #f0f9ff; border-radius: 12px; border: 1px solid #bae6fd;">
          <h2 style="color: #0369a1; margin-bottom: 20px; border-bottom: 2px solid #0369a1; padding-bottom: 10px;">
            Consultation Requested!
          </h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${body.fullName}</p>
            <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${body.emailAddress}</p>
            <p style="margin: 10px 0;"><strong>🌐 Website:</strong> <a href="${body.websiteUrl}" style="color: #0ea5e9;">${body.websiteUrl || "No website provided"}</a></p>
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
    } catch (err) {
      console.error("Nodemailer Error (HeroForm):", err);
      // Lead DB mein save ho chuki hai, isliye crash nahi karenge
    }

    return NextResponse.json({
      success: true,
      data: newForm,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// GET remains the same
export async function GET() {
  try {
    await dbConnect();
    const forms = await HeroForm.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
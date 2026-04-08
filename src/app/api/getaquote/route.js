import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Database mein save karein
    const newQuote = await GetaQuote.create({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      emailAddress: body.emailAddress,
      websiteUrl: body.websiteUrl || "",
      monthlyBudget: body.monthlyBudget || 0,
      projectDetails: body.projectDetails,
      sourcePage: body.sourcePage || "", 
    });

    // 2. Nodemailer Transporter (Aapki .env file se details lega)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email Content Design
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, // Aapki apni email jahan notification chahiye
      subject: `🚀 New Quote Request from ${body.firstName} ${body.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Proposal Request</h2>
          
          <p><strong>Source Page:</strong> <a href="${body.sourcePage}">${body.sourcePage}</a></p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Client Name:</strong></td><td>${body.firstName} ${body.lastName}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td>${body.emailAddress}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td>${body.phoneNumber}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Website:</strong></td><td>${body.websiteUrl || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Monthly Budget:</strong></td><td style="color: #16a34a; font-weight: bold;">$${body.monthlyBudget}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 5px;">
            <p><strong>Project Details:</strong></p>
            <p>${body.projectDetails}</p>
          </div>

          <p style="font-size: 12px; color: #777; margin-top: 30px;">Sent from BMH Brand Marketing Hub</p>
        </div>
      `,
    };

    // 4. Email bhejein
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, data: newQuote });
  } catch (error) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// GET method remains the same...
export async function GET() {
  try {
    await dbConnect();
    const quotes = await GetaQuote.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contactus";

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

    const contact = await Contact.create({
      fullName,
      email,
      phone,
      message,
    });

    return NextResponse.json({ success: true, data: contact });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ================= GET ALL ================= */
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
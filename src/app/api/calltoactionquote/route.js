import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CallToActionQuote from "@/models/calltoactionquote";

// ✅ POST - Save new quote
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newQuote = await CallToActionQuote.create(body);

    return NextResponse.json({ success: true, data: newQuote }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// ✅ GET - Fetch all quotes
export async function GET() {
  try {
    await dbConnect();
    const quotes = await CallToActionQuote.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

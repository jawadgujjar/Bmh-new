import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";

// POST - create new proposal
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newQuote = await GetaQuote.create(body);

    return NextResponse.json({ success: true, data: newQuote });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// GET - get all proposals
export async function GET() {
  try {
    await dbConnect();
    const quotes = await GetaQuote.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

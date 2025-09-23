import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Keyword from "@/models/portfolio"; // tumhara model

// ✅ Get all portfolios
export async function GET() {
  try {
    await dbConnect();
    const data = await Keyword.find({});
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ Create new keyword + portfolio
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newKeyword = await Keyword.create(body);

    return NextResponse.json({ success: true, data: newKeyword });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

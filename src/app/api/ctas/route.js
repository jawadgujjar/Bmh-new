import dbConnect from "@/lib/mongodb";
import CTA from "@/models/cta"; // Use absolute path if possible
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("isActive");
    const search = searchParams.get("search");

    let query = {};
    if (isActive !== null) query.isActive = isActive === "true";
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const ctas = await CTA.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: ctas });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const cta = await CTA.create(body);
    return NextResponse.json({ success: true, data: cta }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

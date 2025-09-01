import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "✅ Database connected successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

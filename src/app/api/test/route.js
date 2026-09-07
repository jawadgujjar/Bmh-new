import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";

export async function GET(req) {
  const auth = requireAuth(req, ["admin"]);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    return NextResponse.json({ message: "✅ Database connected successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}

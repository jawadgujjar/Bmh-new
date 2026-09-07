import dbConnect from "@/lib/mongodb";
import CTA from "@/models/cta"; // Use absolute path if possible
import { NextResponse } from "next/server";
import { requireAuth, escapeRegex } from "@/lib/apiAuth";
import { safeError } from "@/lib/security";

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get("isActive");
    const search = searchParams.get("search");

    let query = {};
    if (isActive !== null) query.isActive = isActive === "true";
    if (search) {
      query.name = { $regex: escapeRegex(search.slice(0, 100)), $options: "i" };
    }

    const ctas = await CTA.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: ctas });
  } catch (error) {
    return safeError(error, { context: "ctas.GET" });
  }
}

export async function POST(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  await dbConnect();
  try {
    const body = await req.json();
    const cta = await CTA.create(body);
    return NextResponse.json({ success: true, data: cta }, { status: 201 });
  } catch (error) {
    return safeError(error, {
      context: "ctas.POST",
      status: 400,
      message: "Could not save the CTA. Please check your inputs.",
    });
  }
}

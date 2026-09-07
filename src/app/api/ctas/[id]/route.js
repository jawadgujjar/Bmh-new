import dbConnect from "@/lib/mongodb";
import CTA from "@/models/cta";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";
import { safeError } from "@/lib/security";

// 1. GET Single CTA by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params; // ID nikalne ka tarika
    const cta = await CTA.findById(id);

    if (!cta) {
      return NextResponse.json(
        { success: false, error: "CTA not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: cta });
  } catch (error) {
    return safeError(error, { context: "ctas.GET[id]", status: 400 });
  }
}

// 2. PUT (Update) by ID
export async function PUT(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    const cta = await CTA.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!cta)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: cta });
  } catch (error) {
    return safeError(error, {
      context: "ctas.PUT[id]",
      status: 400,
      message: "Could not update the CTA. Please check your inputs.",
    });
  }
}

// 3. DELETE by ID
export async function DELETE(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  await dbConnect();
  try {
    const { id } = await params;
    const deletedCTA = await CTA.findByIdAndDelete(id);
    if (!deletedCTA)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return safeError(error, { context: "ctas.DELETE[id]", status: 400 });
  }
}

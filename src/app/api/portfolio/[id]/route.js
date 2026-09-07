import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Keyword from "@/models/portfolio";
import { requireAuth } from "@/lib/apiAuth";
import { safeError } from "@/lib/security";

// ✅ Get specific portfolio by ID
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const keyword = await Keyword.findById(id).lean();

    if (!keyword) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: keyword });
  } catch (error) {
    return safeError(error, { context: "portfolio.GET[id]" });
  }
}

// ✅ Update portfolio by ID (SEO MANUAL SUPPORT)
export async function PUT(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const body = await req.json();

    // ❌ NO AUTO SEO — ADMIN CONTROLS EVERYTHING

    const updatedKeyword = await Keyword.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedKeyword) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedKeyword,
      message: "Portfolio updated successfully",
    });

  } catch (error) {
    return safeError(error, {
      context: "portfolio.PUT[id]",
      status: 400,
      message: "Could not update the portfolio. Please check your inputs.",
    });
  }
}

// ✅ Delete portfolio by ID
export async function DELETE(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const deletedKeyword = await Keyword.findByIdAndDelete(params.id);

    if (!deletedKeyword) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: deletedKeyword,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    return safeError(error, { context: "portfolio.DELETE[id]" });
  }
}

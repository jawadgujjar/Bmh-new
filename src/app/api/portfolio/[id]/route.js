import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Keyword from "@/models/portfolio";

// ✅ Get specific portfolio by ID
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const keyword = await Keyword.findById(params.id).lean();

    if (!keyword) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: keyword });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ Update portfolio by ID (SEO MANUAL SUPPORT)
export async function PUT(req, { params }) {
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
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// ✅ Delete portfolio by ID
export async function DELETE(req, { params }) {
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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

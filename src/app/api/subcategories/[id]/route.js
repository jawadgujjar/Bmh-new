import { NextResponse } from "next/server";
import mongoose from "mongoose";
import SubCategory from "@/models/subcategory";

// ✅ VERY IMPORTANT (Next.js 15 + Vercel)
export const dynamic = "force-dynamic";

// ✅ MongoDB connect function (NO top-level await)
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI);
}

// ✅ GET - Fetch single subcategory
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // ✅ correct in Next 15

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const subcategory = await SubCategory.findById(id);

    if (!subcategory) {
      return NextResponse.json(
        { success: false, error: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: subcategory });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update subcategory
export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    body.seo = body.seo || {};

    const updated = await SubCategory.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "SubCategory updated successfully",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Delete subcategory
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

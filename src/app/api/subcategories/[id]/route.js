import { NextResponse } from "next/server";
import mongoose from "mongoose";
import SubCategory from "@/models/subcategory"; // Adjust path as needed

// ✅ Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// ✅ GET - Fetch single subcategory by ID
export async function GET(request, { params }) {
  try {
    // ✅ FIX: Await params first
    const { id } = await params;
    
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
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update subcategory
export async function PUT(request, { params }) {
  try {
    // ✅ FIX: Await params first
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Ensure SEO object exists
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
      data: updated 
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Delete subcategory
export async function DELETE(request, { params }) {
  try {
    // ✅ FIX: Await params first
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "SubCategory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "SubCategory deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
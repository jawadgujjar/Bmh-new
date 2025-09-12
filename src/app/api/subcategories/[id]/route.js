import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";

// GET single
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const subcategory = await SubCategory.findById(params.id);
    if (!subcategory) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(subcategory);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    // Transform middleSection if using old structure
    if (body.middleSection) {
      const { description, images, extraDescription, ...rest } = body.middleSection;
      body.middleSection = {
        description1: description || body.middleSection.description1 || "",
        image1: images?.[0] || body.middleSection.image1 || "",
        image2: images?.[1] || body.middleSection.image2 || "",
        description2: extraDescription || body.middleSection.description2 || "",
        ...rest, // Preserve any new fields
      };
    }

    const subcategory = await SubCategory.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!subcategory) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(subcategory);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await SubCategory.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
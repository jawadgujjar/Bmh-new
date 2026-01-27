import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";

// GET single page by ID
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const page = await Page.findById(params.id);
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(page);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE page by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.subcatpagedescr) body.subcatpagedescr = "";

    if (body.middleSection) {
      const { description, images, extraDescription, ...rest } = body.middleSection;
      body.middleSection = {
        description1: description || body.middleSection.description1 || "",
        image1: images?.[0] || body.middleSection.image1 || "",
        image2: images?.[1] || body.middleSection.image2 || "",
        description2: extraDescription || body.middleSection.description2 || "",
        ...rest,
      };
    }

    const page = await Page.findByIdAndUpdate(params.id, body, { new: true });
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(page);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE page by ID
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Page.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

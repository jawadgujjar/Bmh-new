import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";

// GET: fetch all pages or by subcategory
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subcategoryId = searchParams.get("subcategory");

    let query = {};
    if (subcategoryId) query.subcategory = subcategoryId;

    const pages = await Page.find(query).lean();
    return NextResponse.json(pages, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: create new page
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }

    // Ensure subcatpagedescr exists
    if (!body.subcatpagedescr) body.subcatpagedescr = "";

    // middleSection transformation
    if (body.middleSection) {
      const { description, images, extraDescription, ...rest } =
        body.middleSection;
      body.middleSection = {
        description1: description || body.middleSection.description1 || "",
        image1: images?.[0] || body.middleSection.image1 || "",
        image2: images?.[1] || body.middleSection.image2 || "",
        description2: extraDescription || body.middleSection.description2 || "",
        ...rest,
      };
    }

    const page = new Page(body);
    await page.save();
    return NextResponse.json(page, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PUT: update page
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body._id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (!body.subcatpagedescr) body.subcatpagedescr = "";

    if (body.middleSection) {
      const { description, images, extraDescription, ...rest } =
        body.middleSection;
      body.middleSection = {
        description1: description || body.middleSection.description1 || "",
        image1: images?.[0] || body.middleSection.image1 || "",
        image2: images?.[1] || body.middleSection.image2 || "",
        description2: extraDescription || body.middleSection.description2 || "",
        ...rest,
      };
    }

    const updated = await Page.findByIdAndUpdate(body._id, body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: remove page
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const deleted = await Page.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ error: "Page not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";

// GET ALL / FILTER
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    let query = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    if (slug) {
      query.slug = slug.toLowerCase();
    }

    const subcategories = await SubCategory.find(query).lean();

    return NextResponse.json(subcategories || [], { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// CREATE
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Generate slug if missing
    if (!body.slug && body.name) {
      body.slug = body.name;
    }

    // Normalize middleSection
    if (body.middleSection) {
      const { description, images, extraDescription } = body.middleSection;

      body.middleSection = {
        description1: description || "",
        image1: images?.[0] || "",
        image2: images?.[1] || "",
        description2: extraDescription || "",
      };
    }

    // Normalize CTA1
    body.cta1 = {
      heading: body.cta1?.heading || "",
      description: body.cta1?.description || "",
    };

    // Normalize CTA2
    body.cta2 = {
      heading: body.cta2?.heading || "",
      description: body.cta2?.description || "",
    };

    // Ensure SEO exists
    body.seo = body.seo || {};

    const subcategory = new SubCategory(body);
    await subcategory.save();

    return NextResponse.json(subcategory, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// UPDATE
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body._id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    // Normalize middleSection
    if (body.middleSection) {
      const { description, images, extraDescription } = body.middleSection;

      body.middleSection = {
        description1: description || "",
        image1: images?.[0] || "",
        image2: images?.[1] || "",
        description2: extraDescription || "",
      };
    }

    body.cta1 = {
      heading: body.cta1?.heading || "",
      description: body.cta1?.description || "",
    };

    body.cta2 = {
      heading: body.cta2?.heading || "",
      description: body.cta2?.description || "",
    };

    body.seo = body.seo || {};

    const updated = await SubCategory.findByIdAndUpdate(body._id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";

// GET: Fetch all subcategories or filter by category/slug
export async function GET(request) {
  try {
    await dbConnect();
    console.log("Connected to MongoDB successfully");

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    let query = {};
    if (category) {
      const normalizedCategory = category.toLowerCase();
      query.category = { $regex: `^${normalizedCategory}$`, $options: "i" };
      console.log(`Query for category (normalized): ${normalizedCategory}`);
      console.log(`Full query object: ${JSON.stringify(query)}`);
    }
    if (slug) {
      query.slug = slug.toLowerCase();
      console.log(`Query for slug: ${slug.toLowerCase()}`);
      console.log(`Updated full query: ${JSON.stringify(query)}`);
    }

    console.log("Executing find query with:", query);
    const subcategories = await SubCategory.find(query).lean();
    console.log(`Query results:`, subcategories);

    if (!subcategories || subcategories.length === 0) {
      console.warn(`No subcategories found for query: ${JSON.stringify(query)}`);
      const allCategories = await SubCategory.distinct("category").lean();
      console.log(`All categories in database:`, allCategories);
      return NextResponse.json(
        { message: "No subcategories found", data: [], debug: { allCategories } },
        { status: 200 }
      );
    }

    return NextResponse.json(subcategories, { status: 200 });
  } catch (err) {
    console.error("API GET Error:", err.stack);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Create a new subcategory with middleSection transformation
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }

    // Transform middleSection if using old structure
    if (body.middleSection) {
      const { description, images, extraDescription, ...rest } = body.middleSection;
      body.middleSection = {
        description1: description || "",
        image1: images?.[0] || "",
        image2: images?.[1] || "",
        description2: extraDescription || "",
        ...rest, // Preserve any new fields
      };
    }

    const subcategory = new SubCategory(body);
    await subcategory.save();

    return NextResponse.json(subcategory, { status: 201 });
  } catch (err) {
    console.error("API POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// PUT: Update a subcategory with middleSection transformation
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body._id) {
      return NextResponse.json({ error: "ID is required for update" }, { status: 400 });
    }

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

    const updated = await SubCategory.findByIdAndUpdate(body._id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "SubCategory not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("API PUT Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// DELETE: Remove a subcategory
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required for delete" }, { status: 400 });
    }

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "SubCategory not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("API DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
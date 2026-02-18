import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";
import CTA from "@/models/cta";

// 1. GET ALL / FILTER
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    const isActive = searchParams.get("isActive");

    let query = {};
    if (category) query.category = category.toLowerCase();
    if (slug) query.slug = slug.toLowerCase();
    if (isActive !== null) query.isActive = isActive === "true";

    const subcategories = await SubCategory.find(query)
      .populate({ path: "topSection.cta.ctaId", model: CTA })
      .populate({ path: "sections.cta.ctaId", model: CTA })
      .lean();

    return NextResponse.json(subcategories || [], { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. CREATE (POST)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Slug fallback
    if (!body.slug && body.name) body.slug = body.name;

    // --- DATA CLEANING (Normalization) ---
    // Top Section cleaning
    if (body.topSection) {
      if (!body.topSection.cta?.ctaId) {
        delete body.topSection.cta; // Agar ID nahi hai to object hi hata do
      }
    }

    // Sections cleaning
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((section, index) => {
        const cleanSection = {
          ...section,
          order: section.order !== undefined ? section.order : index,
        };
        // CTA check: Agar ID nahi to section se cta remove kar do
        if (!cleanSection.cta?.ctaId) {
          delete cleanSection.cta;
        }
        return cleanSection;
      });
    }

    const subcategory = new SubCategory(body);
    await subcategory.save();

    const populated = await SubCategory.findById(subcategory._id)
      .populate({ path: "topSection.cta.ctaId", model: CTA })
      .populate({ path: "sections.cta.ctaId", model: CTA })
      .lean();

    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

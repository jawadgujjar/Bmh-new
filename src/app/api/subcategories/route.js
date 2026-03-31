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
    console.error("GET Error:", err);
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

    // ✅ FIX: Keywordstitle normalization
    body.keywordstitle = body.keywordstitle?.trim() || body.name?.trim() || "";

    // --- DATA CLEANING (Updated for New Section Button) ---

    // Top Section cleaning (Existing Logic)
    if (body.topSection) {
      if (!body.topSection.cta?.ctaId) {
        delete body.topSection.cta;
      }
    }

    // 🔥 Sections cleaning (Added new fields support)
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((section, index) => {
        const cleanSection = {
          ...section,
          // Ensure order exists
          order: section.order !== undefined ? section.order : index,
          // Inline button fields normalization
          showButton: section.showButton ?? false,
          buttonText: section.buttonText?.trim() || "Learn More",
          buttonLink: section.buttonLink?.trim() || "",
          buttonVariant: section.buttonVariant || "primary",
        };

        // Agar section mein global CTA id nahi hai to usey remove kar do
        // Taake inline button aur global CTA overlap na karein
        if (cleanSection.cta && !cleanSection.cta.ctaId) {
          delete cleanSection.cta;
        }

        return cleanSection;
      });
    }

    // FAQS CLEANING
    if (body.faqs && Array.isArray(body.faqs)) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order !== undefined ? faq.order : index,
        isActive: faq.isActive !== undefined ? faq.isActive : true,
      }));
    }

    // SEO Keywords handling
    if (body.seo && typeof body.seo.metaKeywords === "string") {
      body.seo.metaKeywords = body.seo.metaKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
    }

    const subcategory = new SubCategory(body);
    await subcategory.save();

    const populated = await SubCategory.findById(subcategory._id)
      .populate({ path: "topSection.cta.ctaId", model: CTA })
      .populate({ path: "sections.cta.ctaId", model: CTA })
      .lean();

    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

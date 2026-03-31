import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";
import CTA from "@/models/cta";

// Helper to check if string is valid MongoDB ID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

/* ==========================================================
   1. GET: Fetch SubCategory by ID or Slug
   ========================================================== */
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID or Slug is required" },
        { status: 400 },
      );
    }

    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    const subcategory = await SubCategory.findOne(query)
      .populate("topSection.cta.ctaId")
      .populate("sections.cta.ctaId")
      .lean();

    if (!subcategory) {
      return NextResponse.json(
        { error: "Data nahi mila database mein" },
        { status: 404 },
      );
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (err) {
    console.error("❌ GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* ==========================================================
   2. PUT: Update SubCategory (The Main Logic)
   ========================================================== */
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    // --- DATA CLEANING START ---
    const updateData = { ...body };

    // Normalize Title
    updateData.keywordstitle = (
      updateData.keywordstitle ||
      updateData.name ||
      ""
    ).trim();

    // Hero Section CTA logic
    if (updateData.topSection) {
      if (!updateData.topSection.cta || !updateData.topSection.cta.ctaId) {
        updateData.topSection.cta = null;
      }
    }

    // 🔥 SECTIONS CLEANING (With New Inline Button Logic)
    if (updateData.sections && Array.isArray(updateData.sections)) {
      updateData.sections = updateData.sections.map((s, index) => {
        const cleanSection = {
          ...s,
          // Inline Button Fields (Admin control)
          showButton: s.showButton ?? false,
          buttonText: s.buttonText?.trim() || "Learn More",
          buttonLink: s.buttonLink?.trim() || "",
          buttonVariant: s.buttonVariant || "primary",
          // Order handling
          order: s.order !== undefined ? Number(s.order) : index,
        };

        // Agar global CTA select nahi kiya toh usey undefined kar do
        if (cleanSection.cta && !cleanSection.cta.ctaId) {
          cleanSection.cta = undefined;
        }

        return cleanSection;
      });
    }

    // FAQ Section cleaning
    if (updateData.faqs && Array.isArray(updateData.faqs)) {
      updateData.faqs = updateData.faqs
        .map((faq, index) => ({
          ...faq,
          question: faq.question?.trim(),
          answer: faq.answer?.trim(),
          order: faq.order !== undefined ? Number(faq.order) : index,
          isActive: faq.isActive !== undefined ? faq.isActive : true,
        }))
        .filter((f) => f.question && f.answer);
    }

    // SEO Keywords (String to Array)
    if (updateData.seo && typeof updateData.seo.metaKeywords === "string") {
      updateData.seo.metaKeywords = updateData.seo.metaKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
    }
    // --- DATA CLEANING END ---

    const updated = await SubCategory.findOneAndUpdate(
      query,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("topSection.cta.ctaId")
      .populate("sections.cta.ctaId")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { error: "Update fail! Record nahi mila" },
        { status: 404 },
      );
    }

    console.log(`✅ Subcategory ${updated.name} updated with buttons.`);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ PUT Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* ==========================================================
   3. DELETE: Remove SubCategory
   ========================================================== */
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    const deleted = await SubCategory.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Record nahi mila" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success! SubCategory deleted." });
  } catch (err) {
    console.error("❌ DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

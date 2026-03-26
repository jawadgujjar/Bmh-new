import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";
import CTA from "@/models/cta";

// Helper to check if string is valid MongoDB ID
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

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

    console.log("🔍 Query:", query);

    const subcategory = await SubCategory.findOne(query)
      .populate("topSection.cta.ctaId")
      .populate("sections.cta.ctaId")
      .lean();

    console.log(
      "📦 Raw subcategory from DB:",
      JSON.stringify(subcategory, null, 2),
    );
    console.log("🔑 keywordstitle value:", subcategory?.keywordstitle);
    console.log("🔑 All keys:", Object.keys(subcategory || {}));

    if (!subcategory) {
      return NextResponse.json(
        { error: "Data nahi mila database mein" },
        { status: 404 },
      );
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    console.log("📥 PUT Received body:", JSON.stringify(body, null, 2));
    console.log("📥 keywordstitle in PUT:", body.keywordstitle);

    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    // --- 1. CLEANING & PREPARING DATA ---
    const updateData = { ...body };

    // ✅ FIX: Always set keywordstitle (remove conditional)
    updateData.keywordstitle = (
      updateData.keywordstitle ||
      updateData.name ||
      ""
    ).trim();

    console.log("📝 After processing keywordstitle:", updateData.keywordstitle);

    // Hero Section CTA fix
    if (
      updateData.topSection &&
      (!updateData.topSection.cta || !updateData.topSection.cta.ctaId)
    ) {
      updateData.topSection.cta = undefined;
    }

    // Dynamic Sections CTA fix
    if (updateData.sections && Array.isArray(updateData.sections)) {
      updateData.sections = updateData.sections.map((s, index) => ({
        ...s,
        order: s.order !== undefined ? Number(s.order) : index,
        cta: s.cta && s.cta.ctaId ? s.cta : undefined,
      }));
    }

    // FAQ Section cleaning
    if (updateData.faqs && Array.isArray(updateData.faqs)) {
      updateData.faqs = updateData.faqs
        .map((faq, index) => ({
          question: faq.question?.trim(),
          answer: faq.answer?.trim(),
          order: faq.order !== undefined ? Number(faq.order) : index,
          isActive: faq.isActive !== undefined ? faq.isActive : true,
        }))
        .filter((f) => f.question && f.answer);
    }

    // SEO Keywords handling (string to array)
    if (updateData.seo && typeof updateData.seo.metaKeywords === "string") {
      updateData.seo.metaKeywords = updateData.seo.metaKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k);
    }

    console.log("📦 Final updateData:", JSON.stringify(updateData, null, 2));

    // --- 2. DATABASE UPDATE ---
    // ✅ Clean version - directly use updateData without duplicate
    const updated = await SubCategory.findOneAndUpdate(
      query,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        upsert: false,
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

    console.log(`✅ Subcategory ${updated.name} updated successfully.`);
    console.log("📦 Updated document:", JSON.stringify(updated, null, 2));
    console.log("🔑 keywordstitle in updated:", updated.keywordstitle);

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    const deleted = await SubCategory.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json(
        { error: "Record pehle hi delete ho chuka hai" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Gayab! Khalaas!" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

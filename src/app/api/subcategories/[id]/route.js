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

    const subcategory = await SubCategory.findOne(query)
      .populate("topSection.cta.ctaId sections.cta.ctaId")
      .lean();

    if (!subcategory)
      return NextResponse.json(
        { error: "Data nahi mila database mein" },
        { status: 404 },
      );

    // Debug: Check FAQs in single item fetch
    console.log(`Subcategory ${id} FAQs:`, {
      name: subcategory.name,
      faqsCount: subcategory.faqs?.length,
      activeFaqs: subcategory.faqs?.filter((f) => f.isActive)?.length,
    });

    return NextResponse.json(subcategory, { status: 200 });
  } catch (err) {
    console.error("GET by ID Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const query = isValidObjectId(id) ? { _id: id } : { slug: id };

    // --- DATA CLEANING ---
    if (body.topSection && !body.topSection.cta?.ctaId) {
      body.topSection.cta = undefined;
    }

    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((s) => {
        if (!s.cta?.ctaId) s.cta = undefined;
        return s;
      });
    }

    // ✅ FAQS CLEANING FOR UPDATE - ADD THIS
    if (body.faqs && Array.isArray(body.faqs)) {
      body.faqs = body.faqs.map((faq, index) => ({
        question: faq.question,
        answer: faq.answer,
        order: faq.order !== undefined ? faq.order : index,
        isActive: faq.isActive !== undefined ? faq.isActive : true,
      }));
      console.log("FAQs being updated:", body.faqs);
    }

    const updated = await SubCategory.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    })
      .populate("topSection.cta.ctaId sections.cta.ctaId")
      .lean();

    if (!updated)
      return NextResponse.json(
        { error: "Update karne ke liye record nahi mila" },
        { status: 404 },
      );

    console.log("Updated subcategory FAQs:", {
      name: updated.name,
      faqsCount: updated.faqs?.length,
    });

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

    if (!deleted)
      return NextResponse.json(
        { error: "Delete karne ke liye record nahi mila" },
        { status: 404 },
      );

    return NextResponse.json({
      message: "Gayab! Delete ho gaya successfully.",
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
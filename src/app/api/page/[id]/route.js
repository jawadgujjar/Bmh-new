import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";

/* ==================================================
   GET: Single Page By ID
================================================== */
export async function GET(req, { params }) {
  try {
    await dbConnect();

    const page = await Page.findById(params.id)
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId");

    if (!page)
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: page });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


/* ==================================================
   PUT: Update Page
================================================== */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    // 🔥 Validate category if provided
    if (body.category) {
      const validCategories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];

      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          { success: false, message: "Invalid category" },
          { status: 400 }
        );
      }
    }

    // 🔥 Maintain order logic
    if (body.sections) {
      body.sections = body.sections.map((sec, index) => ({
        ...sec,
        order: sec.order ?? index
      }));
    }

    if (body.faqs) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order ?? index
      }));
    }

    const updated = await Page.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: updated });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}


/* ==================================================
   DELETE: Remove Page
================================================== */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const deleted = await Page.findByIdAndDelete(params.id);

    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully"
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

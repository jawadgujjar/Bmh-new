import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";

/* ==================================================
   GET: Fetch All Pages OR By Filters OR By Slug
================================================== */
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const subcategory = searchParams.get("subcategory");
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    // 🔥 GET SINGLE BY SLUG
    if (slug) {
      const page = await Page.findOne({ slug, isActive: true })
        .populate("subcategory")
        .populate("sections.cta.ctaId")
        .populate("topSection.cta.ctaId")
        .lean();

      if (!page)
        return NextResponse.json(
          { success: false, message: "Page not found" },
          { status: 404 }
        );

      // Sort sections & faqs by order
      page.sections = page.sections?.sort((a, b) => a.order - b.order);
      page.faqs = page.faqs?.sort((a, b) => a.order - b.order);

      return NextResponse.json({ success: true, data: page });
    }

    // 🔥 FILTER LIST
    let query = { isActive: true };

    if (subcategory) query.subcategory = subcategory;
    if (category) query.category = category;

    const pages = await Page.find(query)
      .populate("subcategory")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: pages });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


/* ==================================================
   POST: Create Page
================================================== */
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 🔥 Category Validation
    const validCategories = [
      "digital-marketing",
      "web-development",
      "app-development",
    ];

    if (!body.category || !validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category" },
        { status: 400 }
      );
    }

    // 🔥 Ensure arrays exist
    body.sections = body.sections || [];
    body.faqs = body.faqs || [];

    // 🔥 Auto assign order if missing
    body.sections = body.sections.map((sec, index) => ({
      ...sec,
      order: sec.order ?? index
    }));

    body.faqs = body.faqs.map((faq, index) => ({
      ...faq,
      order: faq.order ?? index
    }));

    const page = new Page(body);
    await page.save();

    return NextResponse.json(
      { success: true, data: page },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

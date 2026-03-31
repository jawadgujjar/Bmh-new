import "@/models/subcategory";
import "@/models/cta";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
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
    const limit = searchParams.get("limit");
    const isActive = searchParams.get("isActive");

    // 🔥 CASE 1: GET SINGLE PAGE BY SLUG
    if (slug) {
      const page = await Page.findOne({
        slug,
        isActive: isActive !== null ? isActive === "true" : true,
      })
        .populate({
          path: "subcategory",
          select: "name slug icon category topSection sections seo",
        })
        .populate("sections.cta.ctaId")
        .populate("topSection.cta.ctaId")
        .lean();

      if (!page) {
        return NextResponse.json(
          { success: false, message: "Page not found" },
          { status: 404 },
        );
      }

      // Sorting sections & faqs by order
      if (page.sections) {
        page.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      if (page.faqs) {
        page.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
      }

      return NextResponse.json({
        success: true,
        data: page,
      });
    }

    // 🔥 CASE 2: FILTER PAGES BY CATEGORY OR SUBCATEGORY
    let query = {};
    query.isActive = isActive !== null ? isActive === "true" : true;

    if (subcategory) {
      try {
        query.subcategory = new mongoose.Types.ObjectId(subcategory);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: "Invalid subcategory ID format" },
          { status: 400 },
        );
      }
    }

    if (category) {
      const validCategories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];
      if (validCategories.includes(category)) {
        query.category = category;
      }
    }

    let pagesQuery = Page.find(query)
      .populate("subcategory", "name slug icon category")
      .sort({ createdAt: -1 });

    if (limit && !isNaN(parseInt(limit))) {
      pagesQuery = pagesQuery.limit(parseInt(limit));
    }

    const pages = await pagesQuery.lean();

    pages.forEach((page) => {
      if (page.sections) {
        page.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      if (page.faqs) {
        page.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    });

    return NextResponse.json({
      success: true,
      data: pages,
      count: pages.length,
    });
  } catch (error) {
    console.error("Error in GET /api/page:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

/* ==================================================
   POST: Create New Page - FIXED
================================================== */
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validation
    if (!body.title || !body.category || !body.subcategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, Category, and Subcategory are required",
        },
        { status: 400 },
      );
    }

    // Slug generation
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
    }

    // Check duplicate slug
    const existingPage = await Page.findOne({ slug: body.slug });
    if (existingPage) {
      return NextResponse.json(
        { success: false, message: "Page with this slug already exists" },
        { status: 400 },
      );
    }

    // 🔥 FIXED: Sanitize Sections with Strong Button Defaults
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((sec, index) => ({
        ...sec,
        order: sec.order !== undefined ? sec.order : index,

        // Strong Boolean conversion + defaults
        showButton: sec.showButton === true || sec.showButton === "true",
        buttonText: (sec.buttonText || "").trim() || "Get a Quote",
        buttonLink: (sec.buttonLink || "").trim() || "/getaquote",
      }));
    }

    // Sanitize FAQs
    if (body.faqs && Array.isArray(body.faqs)) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order !== undefined ? faq.order : index,
      }));
    }

    // SEO fallback
    if (!body.seo) {
      body.seo = {
        metaTitle: body.keywordstitle || body.title,
        metaDescription: body.subcatpagedescr || "",
        metaKeywords: [],
        schemaMarkup: {},
      };
    }

    const page = new Page(body);
    await page.save();

    const populatedPage = await Page.findById(page._id)
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId")
      .lean();

    return NextResponse.json(
      { success: true, data: populatedPage },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/page:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

import "@/models/subcategory"; // ✅ FIX
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
        isActive: isActive !== null ? isActive === "true" : true 
      })
        .populate({
          path: "subcategory",
          select: "name slug icon category topSection sections seo"
        })
        .populate("sections.cta.ctaId")
        .populate("topSection.cta.ctaId")
        .lean();

      if (!page) {
        return NextResponse.json(
          { success: false, message: "Page not found" },
          { status: 404 }
        );
      }

      // Sort sections & faqs by order
      if (page.sections) {
        page.sections = page.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      if (page.faqs) {
        page.faqs = page.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
      }

      return NextResponse.json({ 
        success: true, 
        data: page 
      });
    }

    // 🔥 CASE 2: FILTER PAGES BY CATEGORY OR SUBCATEGORY
    let query = {};
    
    // Only apply isActive filter if explicitly provided
    if (isActive !== null) {
      query.isActive = isActive === "true";
    } else {
      query.isActive = true; // Default to active only
    }

    if (subcategory) {
      try {
        query.subcategory = new mongoose.Types.ObjectId(subcategory);
      } catch (e) {
        return NextResponse.json(
          { success: false, message: "Invalid subcategory ID format" },
          { status: 400 }
        );
      }
    }
    
    if (category) {
      const validCategories = ["digital-marketing", "web-development", "app-development"];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { success: false, message: "Invalid category" },
          { status: 400 }
        );
      }
      query.category = category;
    }

    // Build query with pagination
    let pagesQuery = Page.find(query)
      .populate("subcategory", "name slug icon category")
      .sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit && !isNaN(parseInt(limit))) {
      pagesQuery = pagesQuery.limit(parseInt(limit));
    }

    const pages = await pagesQuery.lean();

    // Sort sections for each page
    pages.forEach(page => {
      if (page.sections) {
        page.sections = page.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      if (page.faqs) {
        page.faqs = page.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: pages,
      count: pages.length
    });

  } catch (error) {
    console.error("Error in GET /api/page:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ==================================================
   POST: Create New Page
================================================== */
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 🔥 Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = [
      "digital-marketing",
      "web-development",
      "app-development",
    ];

    if (!body.category || !validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing category" },
        { status: 400 }
      );
    }

    // Validate subcategory
    if (!body.subcategory) {
      return NextResponse.json(
        { success: false, message: "Subcategory is required" },
        { status: 400 }
      );
    }

    // 🔥 Generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }

    // 🔥 Check for duplicate slug
    if (body.slug) {
      const existingPage = await Page.findOne({ slug: body.slug });
      if (existingPage) {
        return NextResponse.json(
          { success: false, message: "Page with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // 🔥 Set default values
    if (body.isActive === undefined) body.isActive = true;
    if (!body.createdBy) body.createdBy = "admin";

    // 🔥 Initialize arrays if not present
    body.sections = body.sections || [];
    body.faqs = body.faqs || [];

    // 🔥 Auto assign order to sections and FAQs
    if (body.sections.length > 0) {
      body.sections = body.sections.map((sec, index) => ({
        ...sec,
        order: sec.order !== undefined ? sec.order : index
      }));
    }

    if (body.faqs.length > 0) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order !== undefined ? faq.order : index
      }));
    }

    // 🔥 Initialize SEO if not present
    if (!body.seo) {
      body.seo = {
        metaTitle: body.title,
        metaDescription: body.subcatpagedescr || "",
        metaKeywords: [],
        schemaMarkup: {}
      };
    }

    // Create page
    const page = new Page(body);
    await page.save();

    // Fetch populated page
    const populatedPage = await Page.findById(page._id)
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId")
      .lean();

    return NextResponse.json(
      { success: true, data: populatedPage },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in POST /api/page:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Page with this slug already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

/* ==================================================
   Note: PUT and DELETE methods are in [id]/route.js
   This file only handles collection operations
================================================== */
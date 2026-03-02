import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";
import mongoose from "mongoose";

/* ==================================================
   GET: Single Page By ID
================================================== */
export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 }
      );
    }

    const page = await Page.findById(id)
      .populate({
        path: "subcategory",
        select: "name slug icon category topSection sections seo isActive"
      })
      .populate({
        path: "sections.cta.ctaId",
        select: "name text link buttonStyle isExternal"
      })
      .populate({
        path: "topSection.cta.ctaId",
        select: "name text link buttonStyle isExternal"
      })
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

    // Sort description items in description-and-form sections
    if (page.sections) {
      page.sections = page.sections.map(section => {
        if (section.layoutType === "description-and-form" && section.descriptions) {
          section.descriptions = section.descriptions.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
        return section;
      });
    }

    return NextResponse.json({ 
      success: true, 
      data: page 
    });

  } catch (error) {
    console.error("Error in GET /api/page/[id]:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* ==================================================
   PUT: Update Page By ID
================================================== */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await req.json();

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 }
      );
    }

    // Validate category if provided
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

    // Check for duplicate slug if slug is being changed
    if (body.slug) {
      const existingPage = await Page.findOne({ 
        slug: body.slug,
        _id: { $ne: id } // Exclude current page
      });
      
      if (existingPage) {
        return NextResponse.json(
          { success: false, message: "Another page with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // 🔥 Maintain order for sections
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((section, index) => {
        // Ensure each section has an order
        const orderedSection = {
          ...section,
          order: section.order !== undefined ? section.order : index
        };

        // Handle description items for description-and-form layout
        if (section.layoutType === "description-and-form" && section.descriptions) {
          orderedSection.descriptions = section.descriptions.map((desc, descIndex) => ({
            ...desc,
            order: desc.order !== undefined ? desc.order : descIndex
          }));
        }

        return orderedSection;
      });
    }

    // 🔥 Maintain order for FAQs
    if (body.faqs && Array.isArray(body.faqs)) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order !== undefined ? faq.order : index
      }));
    }

    // 🔥 Clean up CTA references
    if (body.topSection) {
      if (!body.topSection.cta?.ctaId) {
        body.topSection.cta = null;
      }
    }

    if (body.sections) {
      body.sections = body.sections.map(section => {
        if (!section.cta?.ctaId) {
          section.cta = null;
        }
        return section;
      });
    }

    // 🔥 Process SEO data
    if (body.seo) {
      // Convert metaKeywords string to array if needed
      if (body.seo.metaKeywords && typeof body.seo.metaKeywords === 'string') {
        body.seo.metaKeywords = body.seo.metaKeywords
          .split(',')
          .map(k => k.trim())
          .filter(k => k);
      }

      // Parse schemaMarkup if it's a string
      if (body.seo.schemaMarkup && typeof body.seo.schemaMarkup === 'string') {
        try {
          body.seo.schemaMarkup = JSON.parse(body.seo.schemaMarkup);
        } catch (e) {
          body.seo.schemaMarkup = {};
        }
      }
    }

    // Update page
    const updatedPage = await Page.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { 
        new: true, 
        runValidators: true 
      }
    )
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId")
      .lean();

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    // Sort sections & faqs by order for response
    if (updatedPage.sections) {
      updatedPage.sections = updatedPage.sections.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    
    if (updatedPage.faqs) {
      updatedPage.faqs = updatedPage.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedPage,
      message: "Page updated successfully"
    });

  } catch (error) {
    console.error("Error in PUT /api/page/[id]:", error);
    
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
   DELETE: Remove Page By ID (Soft Delete)
================================================== */
export async function DELETE(req, context) {
  try {
    await dbConnect();

    // ✅ Next.js 15 fix
    const { params } = await context;
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 }
      );
    }

    // ✅ Soft delete (recommended)
    const deleted = await Page.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page deactivated successfully",
      data: deleted,
    });

  } catch (error) {
    console.error("Error in DELETE /api/page/[id]:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ==================================================
   PATCH: Partially Update Page By ID
================================================== */
export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await req.json();

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 }
      );
    }

    // Only allow partial updates
    const updatedPage = await Page.findByIdAndUpdate(
      id, 
      { $set: body }, 
      { 
        new: true, 
        runValidators: true 
      }
    )
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId")
      .lean();

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedPage,
      message: "Page updated successfully"
    });

  } catch (error) {
    console.error("Error in PATCH /api/page/[id]:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
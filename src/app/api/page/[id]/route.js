import "@/models/subcategory";
import "@/models/cta";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/page";
import mongoose from "mongoose";

/* ==================================================
   GET: Single Page By ID
================================================== */
export async function GET(req, context) {
  try {
    await dbConnect();

    const { params } = await context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 },
      );
    }

    const page = await Page.findById(id)
      .populate({
        path: "subcategory",
        select: "name slug icon category topSection sections seo isActive",
      })
      .populate({
        path: "sections.cta.ctaId",
        select: "name text link buttonStyle isExternal",
      })
      .populate({
        path: "topSection.cta.ctaId",
        select: "name text link buttonStyle isExternal",
      })
      .lean();

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    // Sorting
    if (page.sections) {
      page.sections = page.sections.sort(
        (a, b) => (a.order || 0) - (b.order || 0),
      );
    }
    if (page.faqs) {
      page.faqs = page.faqs.sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    // Sort descriptions in description-and-form
    if (page.sections) {
      page.sections = page.sections.map((section) => {
        if (
          section.layoutType === "description-and-form" &&
          section.descriptions
        ) {
          section.descriptions = section.descriptions.sort(
            (a, b) => (a.order || 0) - (b.order || 0),
          );
        }
        return section;
      });
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error("Error in GET /api/page/[id]:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

/* ==================================================
   PUT: Update Page By ID - FIXED
================================================== */
export async function PUT(req, context) {
  try {
    await dbConnect();

    const { params } = await context;
    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 },
      );
    }

    if (body.keywordstitle) {
      body.keywordstitle = body.keywordstitle.trim();
    }

    // Validate category
    if (body.category) {
      const validCategories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];
      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          { success: false, message: "Invalid category" },
          { status: 400 },
        );
      }
    }

    // Check duplicate slug
    if (body.slug) {
      const existingPage = await Page.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });
      if (existingPage) {
        return NextResponse.json(
          {
            success: false,
            message: "Another page with this slug already exists",
          },
          { status: 400 },
        );
      }
    }

    // 🔥 FIXED: Strong Button Handling in Sections
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((section, index) => {
        const orderedSection = {
          ...section,
          order: section.order !== undefined ? section.order : index,

          // Strong Boolean + Defaults (Yeh sabse important fix hai)
          showButton:
            section.showButton === true || section.showButton === "true",
          buttonText: (section.buttonText || "").trim() || "Get a Quote",
          buttonLink: (section.buttonLink || "").trim() || "/getaquote",
        };

        // Description-and-form handling
        if (
          section.layoutType === "description-and-form" &&
          section.descriptions
        ) {
          orderedSection.descriptions = section.descriptions.map(
            (desc, descIndex) => ({
              ...desc,
              order: desc.order !== undefined ? desc.order : descIndex,
            }),
          );
        }

        // Clean CTA if no ctaId
        if (!section.cta?.ctaId) {
          orderedSection.cta = null;
        }

        return orderedSection;
      });
    }

    // FAQs handling
    if (body.faqs && Array.isArray(body.faqs)) {
      body.faqs = body.faqs.map((faq, index) => ({
        ...faq,
        order: faq.order !== undefined ? faq.order : index,
      }));
    }

    // Top Section CTA cleanup
    if (body.topSection && !body.topSection.cta?.ctaId) {
      body.topSection.cta = null;
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    )
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .populate("topSection.cta.ctaId")
      .lean();

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: "Page updated successfully",
    });
  } catch (error) {
    console.error("Error in PUT /api/page/[id]:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

/* ==================================================
   DELETE: Soft Delete
================================================== */
export async function DELETE(req, context) {
  try {
    await dbConnect();
    const { params } = await context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid page ID format" },
        { status: 400 },
      );
    }

    const deleted = await Page.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page deactivated successfully",
      data: deleted,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

/* ==================================================
   PATCH: Partial Update - FIXED
================================================== */
export async function PATCH(req, context) {
  try {
    await dbConnect();
    const { params } = await context;
    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format" },
        { status: 400 },
      );
    }

    // 🔥 FIXED: Button handling in PATCH
    if (body.sections && Array.isArray(body.sections)) {
      body.sections = body.sections.map((sec) => ({
        ...sec,
        showButton: sec.showButton === true || sec.showButton === "true",
        buttonText: (sec.buttonText || "").trim() || "Get a Quote",
        buttonLink: (sec.buttonLink || "").trim() || "/getaquote",
      }));
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    )
      .populate("subcategory")
      .populate("sections.cta.ctaId")
      .lean();

    if (!updatedPage) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: "Page updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}

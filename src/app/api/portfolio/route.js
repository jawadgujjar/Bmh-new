import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Keyword from "@/models/portfolio";
import { requireAuth } from "@/lib/apiAuth";
import { safeError } from "@/lib/security";

// Get all portfolios
export async function GET() {
  try {
    await dbConnect();
    const data = await Keyword.find({}).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return safeError(error, { context: "portfolio.GET" });
  }
}

// Create new keyword + portfolio
export async function POST(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const body = await req.json();

    if (!body.keyword || body.keyword.trim() === "") {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    const existingKeyword = await Keyword.findOne({ keyword: body.keyword.trim() });
    if (existingKeyword) {
      return NextResponse.json({ 
        success: false, 
        error: `Keyword "${body.keyword}" already exists` 
      }, { status: 400 });
    }

    if (!body.websites || !Array.isArray(body.websites) || body.websites.length === 0) {
      return NextResponse.json({ success: false, error: "At least one website is required" }, { status: 400 });
    }

    // ✅ Validate ONLY — NO SEO AUTO
    for (const [index, website] of body.websites.entries()) {
      if (!website.link || website.link.trim() === "") {
        return NextResponse.json({ 
          success: false, 
          error: `Website link is required for website ${index + 1}` 
        }, { status: 400 });
      }

      if (website.portfolioPage && website.portfolioPage.header) {
        const { header } = website.portfolioPage;

        if (!header.title || header.title.trim() === "") {
          return NextResponse.json(
            { success: false, error: `Header title is required for website ${index + 1}` },
            { status: 400 }
          );
        }

        if (!header.description || header.description.trim() === "") {
          return NextResponse.json(
            { success: false, error: `Header description is required for website ${index + 1}` },
            { status: 400 }
          );
        }

        // ❌ SEO NOT TOUCHED — ADMIN CONTROLS IT
      }
    }

    const newKeyword = await Keyword.create(body);

    return NextResponse.json({ 
      success: true, 
      data: newKeyword,
      message: "Portfolio created successfully!"
    });

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: "Keyword already exists"
      }, { status: 400 });
    }

    return safeError(error, {
      context: "portfolio.POST",
      status: 400,
      message: "Could not create the portfolio. Please check your inputs.",
    });
  }
}

// Update portfolio
export async function PUT(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const body = await req.json();

    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, error: "Portfolio ID is required" }, { status: 400 });
    }

    const existingPortfolio = await Keyword.findById(_id);
    if (!existingPortfolio) {
      return NextResponse.json({ success: false, error: "Portfolio not found" }, { status: 404 });
    }

    if (!updateData.keyword || updateData.keyword.trim() === "") {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    if (updateData.keyword !== existingPortfolio.keyword) {
      const keywordExists = await Keyword.findOne({ 
        keyword: updateData.keyword.trim(),
        _id: { $ne: _id }
      });

      if (keywordExists) {
        return NextResponse.json({ 
          success: false, 
          error: `Keyword "${updateData.keyword}" already exists` 
        }, { status: 400 });
      }
    }

    if (!updateData.websites || !Array.isArray(updateData.websites) || updateData.websites.length === 0) {
      return NextResponse.json({ success: false, error: "At least one website is required" }, { status: 400 });
    }

    // ✅ Validate ONLY — NO SEO AUTO
    for (const [index, website] of updateData.websites.entries()) {
      if (!website.link || website.link.trim() === "") {
        return NextResponse.json({ 
          success: false, 
          error: `Website link is required for website ${index + 1}` 
        }, { status: 400 });
      }

      if (website.portfolioPage && website.portfolioPage.header) {
        const { header } = website.portfolioPage;

        if (!header.title || header.title.trim() === "") {
          return NextResponse.json(
            { success: false, error: `Header title is required for website ${index + 1}` },
            { status: 400 }
          );
        }

        if (!header.description || header.description.trim() === "") {
          return NextResponse.json(
            { success: false, error: `Header description is required for website ${index + 1}` },
            { status: 400 }
          );
        }

        // ❌ SEO untouched
      }
    }

    const updatedKeyword = await Keyword.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({ 
      success: true, 
      data: updatedKeyword,
      message: "Portfolio updated successfully!"
    });

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: "Keyword already exists"
      }, { status: 400 });
    }

    return safeError(error, {
      context: "portfolio.PUT",
      status: 400,
      message: "Could not update the portfolio. Please check your inputs.",
    });
  }
}

// Delete portfolio
export async function DELETE(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Portfolio ID is required" }, { status: 400 });
    }

    const deletedKeyword = await Keyword.findByIdAndDelete(id);

    if (!deletedKeyword) {
      return NextResponse.json({ success: false, error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Portfolio deleted successfully!",
      data: { id }
    });

  } catch (error) {
    return safeError(error, { context: "portfolio.DELETE", status: 400 });
  }
}

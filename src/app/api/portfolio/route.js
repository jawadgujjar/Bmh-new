import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Keyword from "@/models/portfolio";

// Get all portfolios
export async function GET() {
  try {
    await dbConnect();
    const data = await Keyword.find({}).lean();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Create new keyword + portfolio
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("POST body:", body); // Debug log

    // Basic validation
    if (!body.keyword || body.keyword.trim() === "") {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    // Check if keyword already exists
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

    // Validate each website entry (more flexible validation)
    for (const [index, website] of body.websites.entries()) {
      if (!website.link || website.link.trim() === "") {
        return NextResponse.json({ 
          success: false, 
          error: `Website link is required for website ${index + 1}` 
        }, { status: 400 });
      }

      // Validate header if portfolioPage exists
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
        // Header image is now optional - no validation for image
      }
    }

    const newKeyword = await Keyword.create(body);
    return NextResponse.json({ 
      success: true, 
      data: newKeyword,
      message: "Portfolio created successfully!"
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: false, 
        error: "Keyword already exists" 
      }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Update portfolio
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("PUT body:", body);

    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, error: "Portfolio ID is required" }, { status: 400 });
    }

    // Check if portfolio exists
    const existingPortfolio = await Keyword.findById(_id);
    if (!existingPortfolio) {
      return NextResponse.json({ success: false, error: "Portfolio not found" }, { status: 404 });
    }

    // Validate keyword
    if (!updateData.keyword || updateData.keyword.trim() === "") {
      return NextResponse.json({ success: false, error: "Keyword is required" }, { status: 400 });
    }

    // Check if keyword is being changed to an existing one
    if (updateData.keyword !== existingPortfolio.keyword) {
      const keywordExists = await Keyword.findOne({ 
        keyword: updateData.keyword.trim(),
        _id: { $ne: _id } // Exclude current document
      });
      if (keywordExists) {
        return NextResponse.json({ 
          success: false, 
          error: `Keyword "${updateData.keyword}" already exists` 
        }, { status: 400 });
      }
    }

    // Validate websites
    if (!updateData.websites || !Array.isArray(updateData.websites) || updateData.websites.length === 0) {
      return NextResponse.json({ success: false, error: "At least one website is required" }, { status: 400 });
    }

    // Validate each website
    for (const [index, website] of updateData.websites.entries()) {
      if (!website.link || website.link.trim() === "") {
        return NextResponse.json({ 
          success: false, 
          error: `Website link is required for website ${index + 1}` 
        }, { status: 400 });
      }

      // Validate header if portfolioPage exists
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
      }
    }

    const updatedKeyword = await Keyword.findByIdAndUpdate(
      _id, 
      updateData, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    return NextResponse.json({ 
      success: true, 
      data: updatedKeyword,
      message: "Portfolio updated successfully!"
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    
    if (error.code === 11000) {
      return NextResponse.json({ 
        success: false, 
        error: "Keyword already exists" 
      }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// Delete portfolio
export async function DELETE(req) {
  try {
    await dbConnect();
    
    // Get ID from URL params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    console.log("Deleting portfolio with ID:", id); // Debug log

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
    console.error("Error deleting portfolio:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

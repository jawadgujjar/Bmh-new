import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CallToActionQuote from "@/models/calltoactionquote";

// ✅ POST - Save new quote
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newQuote = await CallToActionQuote.create(body);

    return NextResponse.json(
      { success: true, data: newQuote },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// ✅ GET - Fetch all quotes
export async function GET() {
  try {
    await dbConnect();
    const quotes = await CallToActionQuote.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: quotes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// ✅ DELETE - Delete quote by id
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Quote ID is required" },
        { status: 400 }
      );
    }

    const deletedQuote = await CallToActionQuote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return NextResponse.json(
        { success: false, error: "Quote not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

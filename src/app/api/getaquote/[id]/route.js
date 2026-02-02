import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";

// DELETE - delete single proposal
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const deletedQuote = await GetaQuote.findByIdAndDelete(id);

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

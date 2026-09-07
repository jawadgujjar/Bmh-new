import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GetaQuote from "@/models/getaquote";
import { requireAuth } from "@/lib/apiAuth";

// DELETE - delete single proposal by ID
export async function DELETE(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
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
      { success: false, error: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}
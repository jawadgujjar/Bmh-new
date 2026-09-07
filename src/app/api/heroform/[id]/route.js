import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroForm from "@/models/heroform";
import { requireAuth } from "@/lib/apiAuth";

export async function DELETE(req, { params }) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();

    const { id } = params;

    const deletedForm = await HeroForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return NextResponse.json(
        { success: false, error: "Form submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 400 }
    );
  }
}
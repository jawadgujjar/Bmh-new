import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SelectedPages from "@/models/selectedpages";
import { requireAuth } from "@/lib/apiAuth";
import { safeError } from "@/lib/security";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category required" },
        { status: 400 }
      );
    }

    const data = await SelectedPages.findOne({ categoryName: category })
      .populate("pages") // full page data
      .lean();

    if (!data) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data.pages, { status: 200 });
  } catch (err) {
    return safeError(err, { context: "selected-pages.GET", success: false });
  }
}
export async function POST(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
  try {
    await dbConnect();
    const body = await req.json();
    const { categoryName, pages } = body;

    if (!categoryName || !pages) {
      return NextResponse.json(
        { error: "categoryName and pages are required" },
        { status: 400 }
      );
    }

    // Upsert: update if exists, create if not
    const updated = await SelectedPages.findOneAndUpdate(
      { categoryName },
      { pages },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: "Selected pages saved", data: updated });
  } catch (err) {
    return safeError(err, { context: "selected-pages.POST", success: false });
  }
}
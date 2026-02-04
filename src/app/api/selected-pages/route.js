import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SelectedPages from "@/models/selectedpages";

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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function POST(req) {
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
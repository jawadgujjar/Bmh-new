import dbConnect from "@/lib/mongodb";
import CTA from "@/models/cta";
import { NextResponse } from "next/server";

// 1. GET Single CTA by ID
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params; // ID nikalne ka tarika
    const cta = await CTA.findById(id);

    if (!cta) {
      return NextResponse.json(
        { success: false, error: "CTA not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: cta });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// 2. PUT (Update) by ID
export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const body = await req.json();
    const cta = await CTA.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!cta)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: cta });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

// 3. DELETE by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const deletedCTA = await CTA.findByIdAndDelete(id);
    if (!deletedCTA)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

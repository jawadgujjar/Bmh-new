import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/subcategory";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { identifier } = params;
    const { section } = await request.json();

    const query = /^[0-9a-fA-F]{24}$/.test(identifier)
      ? { _id: identifier }
      : { slug: identifier };
    const subcategory = await SubCategory.findOne(query);

    if (!subcategory)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Sanitize CTA in the new section
    const sectionToPush = { ...section };
    if (!sectionToPush.cta?.ctaId) {
      delete sectionToPush.cta;
    }

    sectionToPush.order = subcategory.sections.length;

    subcategory.sections.push(sectionToPush);
    await subcategory.save(); // Model validation yahan run hogi

    return NextResponse.json(subcategory.sections, { status: 201 });
  } catch (err) {
    // Agar image missing hui image-left/right mein, to yahan catch hogi validation error
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

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

    // --- Sanitize New Section ---
    const sectionToPush = {
      ...section,
      // 🔥 Naye button fields ko sanitize karein
      showButton: section.showButton ?? false,
      buttonText: section.buttonText?.trim() || "Learn More",
      buttonLink: section.buttonLink?.trim() || "",
      buttonVariant: section.buttonVariant || "primary",
      order:
        section.order !== undefined
          ? section.order
          : subcategory.sections.length,
    };

    // Sanitize Global CTA if it exists
    if (sectionToPush.cta && !sectionToPush.cta.ctaId) {
      delete sectionToPush.cta;
    }

    // Push and Save
    subcategory.sections.push(sectionToPush);

    // Model validation (jo humne image layouts ke liye lagayi thi) yahan trigger hogi
    await subcategory.save();

    return NextResponse.json(subcategory.sections, { status: 201 });
  } catch (err) {
    console.error("Section Push Error:", err);
    // Agar image missing hui image-left/right mein, toh Mongoose validation error yahan ayegi
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

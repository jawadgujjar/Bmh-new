import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Only JPEG, PNG, GIF, or WebP are allowed" },
        { status: 400 }
      );
    }

    // Convert file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Env vars
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error("Missing env vars:", { cloudName: !!cloudName, uploadPreset: !!uploadPreset });
      return NextResponse.json(
        { success: false, error: "Cloudinary configuration missing" },
        { status: 500 }
      );
    }

    // Cloudinary formData
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", new Blob([buffer]));
    cloudinaryFormData.append("upload_preset", uploadPreset);

    // Upload to Cloudinary
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const data = await res.json();
    console.log("Cloudinary response:", data);

    if (data.secure_url) {
      return NextResponse.json({ success: true, url: data.secure_url });
    } else {
      return NextResponse.json(
        { success: false, error: "Upload failed", details: data.error?.message || data },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
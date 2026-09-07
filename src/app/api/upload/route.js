import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/apiAuth";

export async function POST(req) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;
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

    // Validate file size (max 5 MB)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (typeof file.size === "number" && file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "File is too large. Maximum size is 5 MB." },
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
      console.error("[upload] Cloudinary env vars missing");
      return NextResponse.json(
        { success: false, error: "Cloudinary configuration missing" },
        { status: 500 }
      );
    }

    // Cloudinary formData
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append(
      "file",
      new Blob([buffer], { type: file.type }),
      file.name || "upload.png",
    );
    cloudinaryFormData.append("upload_preset", uploadPreset);

    // Upload to Cloudinary (with retry for transient network failures)
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    let res;
    let lastErr;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        res = await fetch(endpoint, {
          method: "POST",
          body: cloudinaryFormData,
          signal: AbortSignal.timeout(30000),
        });
        break;
      } catch (e) {
        lastErr = e;
        console.error(`[upload] Cloudinary attempt ${attempt} failed:`, e?.message);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 800 * attempt));
      }
    }

    if (!res) {
      return NextResponse.json(
        { success: false, error: "Could not reach the image service. Please try again." },
        { status: 502 },
      );
    }

    const data = await res.json();

    if (data.secure_url) {
      return NextResponse.json({ success: true, url: data.secure_url });
    }

    console.error("[upload] Cloudinary rejected upload:", data?.error?.message);
    return NextResponse.json(
      { success: false, error: "Image upload failed. Please try again." },
      { status: 400 }
    );
  } catch (err) {
    console.error("[upload]", err?.message || err);
    return NextResponse.json(
      { success: false, error: "Image upload failed. Please try again." },
      { status: 500 },
    );
  }
}
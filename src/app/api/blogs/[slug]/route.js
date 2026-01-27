import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

/* ================= GET ================= */
export async function GET(req, context) {
  try {
    const { slug } = await context.params; // ✅ FIXED
    await dbConnect();

    const query = /^[0-9a-fA-F]{24}$/.test(slug)
      ? { _id: slug }
      : { slug };

    const blog = await Blog.findOne(query).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

/* ================= PUT ================= */
export async function PUT(req, context) {
  try {
    const { slug } = await context.params; // ✅ FIXED
    await dbConnect();
    const body = await req.json();

    const query = /^[0-9a-fA-F]{24}$/.test(slug)
      ? { _id: slug }
      : { slug };

    const updatedBlog = await Blog.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 400 });
  }
}

/* ================= DELETE ================= */
export async function DELETE(req, context) {
  try {
    const { slug } = await context.params; // ✅ FIXED
    await dbConnect();

    const query = /^[0-9a-fA-F]{24}$/.test(slug)
      ? { _id: slug }
      : { slug };

    const deletedBlog = await Blog.findOneAndDelete(query).lean();

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

/* ================= GET ================= */
export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    await dbConnect();

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        category: blog.category,
        date: blog.createdAt,
        fullContent: blog.fullContent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET blog by slug error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

/* ================= PUT ================= */
export async function PUT(req, { params }) {
  try {
    const { slug } = await params;

    await dbConnect();
    const body = await req.json();

    const updatedBlog = await Blog.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT blog by slug error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 400 });
  }
}

/* ================= DELETE ================= */
export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;

    await dbConnect();

    const deletedBlog = await Blog.findOneAndDelete({ slug }).lean();

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE blog by slug error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

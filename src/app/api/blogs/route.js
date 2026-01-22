import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

/* =========================
   GET → All blogs / by slug / by category
   /api/blogs
   /api/blogs?slug=my-blog
   /api/blogs?category=Tech
========================= */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    let query = {};

    if (slug) query.slug = slug;
    if (category)
      query.category = { $regex: `^${category}$`, $options: "i" };

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* =========================
   POST → Create blog
   POST /api/blogs
========================= */
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Auto slug
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const exists = await Blog.findOne({ slug: body.slug });
    if (exists) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    const blog = await Blog.create(body);

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* =========================
   PUT → Update blog
   PUT /api/blogs (body must include _id OR slug)
========================= */
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body._id && !body.slug) {
      return NextResponse.json(
        { error: "_id or slug required for update" },
        { status: 400 }
      );
    }

    const query = body._id ? { _id: body._id } : { slug: body.slug };

    const updated = await Blog.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* =========================
   DELETE → Remove blog
   DELETE /api/blogs?id=xxx
   DELETE /api/blogs?slug=my-blog
========================= */
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "id or slug required for delete" },
        { status: 400 }
      );
    }

    const query = id ? { _id: id } : { slug };

    const deleted = await Blog.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

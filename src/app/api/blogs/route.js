import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

/* =========================
   GET → All blogs / by slug / by category
========================= */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    let query = {};

    if (slug) query.slug = slug;
    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* =========================
   POST → Create blog
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

    // SEO fallback auto-generate
    body.seo = {
      metaTitle: body?.seo?.metaTitle || body.title,
      metaDescription: body?.seo?.metaDescription || body.description,
      metaKeywords: body?.seo?.metaKeywords || [],
      schemaMarkup: body?.seo?.schemaMarkup || {
        "@context": "https://schema.org/",
        "@type": "Article",
        "headline": body.title,
      },
    };

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
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* =========================
   PUT → Update blog
========================= */
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body._id && !body.slug) {
      return NextResponse.json(
        { error: "_id or slug required" },
        { status: 400 }
      );
    }

    // Merge SEO safely
    if (body.seo) {
      body.seo = {
        metaTitle: body.seo.metaTitle,
        metaDescription: body.seo.metaDescription,
        metaKeywords: body.seo.metaKeywords,
        schemaMarkup: body.seo.schemaMarkup,
      };
    }

    const query = body._id ? { _id: body._id } : { slug: body.slug };

    const updated = await Blog.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

/* =========================
   DELETE → Remove blog
========================= */
export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { error: "id or slug required" },
        { status: 400 }
      );
    }

    const query = id ? { _id: id } : { slug };

    const deleted = await Blog.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

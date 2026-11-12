// app/blogs/[id]/layout.js
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";

// ✅ Server side metadata: page.js client component hai, is liye canonical yahan set hota hai
export async function generateMetadata({ params }) {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";

  let blog = null;
  try {
    await dbConnect();
    const query = /^[0-9a-fA-F]{24}$/.test(id) ? { _id: id } : { slug: id };
    blog = await Blog.findOne(query).lean();
  } catch (err) {
    console.error("Blog metadata error:", err);
  }

  // Agar blog ka slug mojood hai to wohi canonical, warna URL wala id
  const canonicalSlug = blog?.slug || id;
  const canonicalUrl = `${siteUrl}/blogs/${canonicalSlug}`;

  if (!blog) {
    return { alternates: { canonical: canonicalUrl } };
  }

  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.description;

  return {
    title,
    description,
    keywords: blog.seo?.metaKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default function BlogDetailLayout({ children }) {
  return children;
}

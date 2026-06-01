import React from "react";
import FirstPageBlog from "@/components/blogs/firstpageblog";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";
import "../blogs/blogs.css";

// ✅ 1. Static Metadata for Blogs Listing (Auto-Canonical Injection)
export const metadata = {
  title: "BMH Blog – Insights on Digital Marketing & Branding USA",
  description: "Explore the BMH Blog for tips, strategies, and trends in digital marketing, branding, and business growth. Learn, apply, and grow today.",
  keywords: ["blogs", "tech", "marketing", "tutorials"],
  alternates: {
    // Is se automatically: https://brandmarketinghub.com/blogs ban jayega
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ date: -1 }).lean();

  // ✅ 2. Schema Markup JSON-LD Definition
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "headline": "Our Blogs",
    "description": "Read the latest blogs about tech, marketing, and more.",
  };

  return (
    <div className="blogs-page-wrapper">
      {/* 🔹 Next.js Professional Method for Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ⚠️ Ab yahan <SEO /> component ki zaroorat nahi hai */}

      <header className="blogs-header">
        <div className="header-overlay">
          <h1 className="header-title">Blogs</h1>
        </div>
      </header>

      <main className="blogs-main-content">
        <FirstPageBlog blogs={blogs} />
      </main>
    </div>
  );
}
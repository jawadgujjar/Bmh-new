import React from "react";
import FirstPageBlog from "@/components/blogs/firstpageblog";
import SEO from "@/components/seo/seo";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blogs";
import "../blogs/blogs.css";

export default async function BlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ date: -1 }).lean();

  // Default SEO for Blogs listing
  const blogsSEO = {
    metaTitle: "Our Blogs",
    metaDescription: "Read the latest blogs about tech, marketing, and more.",
    metaKeywords: ["blogs", "tech", "marketing", "tutorials"],
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Blog",
      headline: "Our Blogs",
      description: "Read the latest blogs about tech, marketing, and more.",
    },
  };

  return (
    <div className="blogs-page-wrapper">
      <SEO seo={blogsSEO} />

      <header className="blogs-header">
        <div className="header-overlay">
          <h1 className="header-title">Blogs</h1>
          <nav className="breadcrumb">
            <span>Home › Blogs</span>
          </nav>
        </div>
      </header>

      <main className="blogs-main-content">
        <FirstPageBlog blogs={blogs} />
      </main>
    </div>
  );
}

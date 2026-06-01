// app/portfolio/[category]/page.js
import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import { notFound } from "next/navigation";
import { cache } from "react";

// Slug بنانے کا function
const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

// 🔹 Database connect karne aur category find karne ka optimization helper
const getCategoryData = cache(async (categorySlug) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));
  
  return safeKeywords.find((item) => slugify(item.keyword) === categorySlug);
});

// ✅ 1. Professional Next.js Metadata & Auto-Canonical Handler
export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const categoryMatch = await getCategoryData(categorySlug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandmarketinghub.com';

  if (!categoryMatch) return {};

  return {
    title: `${categoryMatch.keyword} Portfolio - Our Work Examples | BMH`,
    description: `Browse our ${categoryMatch.keyword} portfolio showcasing successful projects, case studies, and client work.`,
    keywords: [
      `${categoryMatch.keyword} portfolio`,
      `${categoryMatch.keyword} examples`,
      `${categoryMatch.keyword} case studies`
    ],
    // 🔹 Yeh automatic dynamic canonical URL handle karega
    alternates: {
      canonical: `${siteUrl}/portfolio/${categorySlug}`,
    },
  };
}

// 2. Main Page Component
export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const categoryMatch = await getCategoryData(categorySlug);

  if (!categoryMatch) notFound();

  return (
    <main>
      {/* ⚠️ Ab yahan purane <SEO /> component ki zaroorat nahi kyun k upar generateMetadata sab handle kar raha hai */}
      
      <Herofirstportfolio1
        header={{
          title: categoryMatch.keyword,
          subtitle: `Our ${categoryMatch.keyword} Portfolio`,
        }}
      />
      <PortfolioRemain initialCategory={categoryMatch.keyword} />
    </main>
  );
}
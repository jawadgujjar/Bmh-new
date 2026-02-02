// app/portfolio/[category]/page.js
import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import SEO from "@/components/seo/seo"; // ✅ SEO component
import { notFound } from "next/navigation";

// Slug بنانے کا function
const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default async function CategoryPage({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  // 🔹 Next.js 14 fix: await params destructuring
  const { category: categorySlug } = await params;

  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));

  // 🔹 Match category
  const categoryMatch = safeKeywords.find(
    (item) => slugify(item.keyword) === categorySlug
  );

  if (!categoryMatch) notFound();

  // ✅ اس category کے لیے SEO ڈیٹا بنائیں
  const seoData = {
    metaTitle: `${categoryMatch.keyword} Portfolio - Our Work Examples | YourCompany`,
    metaDescription: `Browse our ${categoryMatch.keyword} portfolio showcasing successful projects, case studies, and client work.`,
    metaKeywords: [
      `${categoryMatch.keyword} portfolio`,
      `${categoryMatch.keyword} examples`,
      `${categoryMatch.keyword} case studies`
    ]
  };

  return (
    <main>
      {/* ✅ Category page کے لیے SEO */}
      <SEO seo={seoData} />
      
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
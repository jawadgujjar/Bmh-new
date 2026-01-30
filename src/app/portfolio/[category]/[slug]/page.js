// app/portfolio/[category]/[slug]/page.js
import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import Calltoactionportfolio1 from "@/components/portfolio/portfoliopage/calltoactionportfolio1";
import SEO from "@/components/seo/seo"; // ✅ SEO component
import { notFound } from "next/navigation";

const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default async function ProjectPage({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  const { category: categorySlug, slug: projectSlug } = await params;

  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));

  // 🔹 Match category
  const categoryMatch = safeKeywords.find(
    (item) => slugify(item.keyword) === categorySlug
  );
  if (!categoryMatch) notFound();

  // 🔹 Match project inside category (slug-safe)
  const website = (categoryMatch.websites || []).find(
    (site) =>
      slugify(site?.portfolioPage?.header?.title) === projectSlug
  );
  if (!website) notFound();

  const portfolio = website.portfolioPage;
  
  // ✅ **IMPORTANT: Database میں stored SEO ڈیٹا use کریں**
  // اگر database میں SEO ڈیٹا ہے تو وہ use کریں، نہیں تو default بنائیں
  const seoData = portfolio.seo || {
    metaTitle: portfolio.header?.title ? 
      `${portfolio.header.title} - ${categoryMatch.keyword} Project | YourCompany` : 
      `${categoryMatch.keyword} Project | YourCompany`,
    metaDescription: portfolio.header?.description || 
      `Detailed showcase of our ${categoryMatch.keyword} project. See our work, process, and results.`,
    metaKeywords: [
      categoryMatch.keyword,
      'portfolio',
      'project',
      'case study',
      portfolio.header?.title
    ].filter(Boolean) // null values remove کریں
  };

  return (
    <main>
      {/* ✅ Project page کے لیے SEO */}
      <SEO seo={seoData} />
      
      <Heroportfolio header={portfolio.header} />
      <Imageportfolio middleSection={portfolio.middleSection} />
      <Calltoactionportfolio1 cta={portfolio.cta1} />
      <Highlightportfolio highlights={portfolio.webHighlights} />
      <Calltoactionportfolio cta={portfolio.cta2} />
    </main>
  );
}
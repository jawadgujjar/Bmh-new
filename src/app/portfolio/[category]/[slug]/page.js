// app/portfolio/[category]/[slug]/page.js
import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import { notFound } from "next/navigation";
import { cache } from "react";

const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

// 🔹 Database connection aur nested project matching ko optimize karne ke liye cache helper
const getProjectData = cache(async (categorySlug, projectSlug) => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));

  // Match category
  const categoryMatch = safeKeywords.find(
    (item) => slugify(item.keyword) === categorySlug
  );
  if (!categoryMatch) return null;

  // Match nested project inside category
  const website = (categoryMatch.websites || []).find(
    (site) => slugify(site?.portfolioPage?.header?.title) === projectSlug
  );
  if (!website) return null;

  return {
    categoryKeyword: categoryMatch.keyword,
    portfolio: website.portfolioPage,
  };
});

// ✅ 1. Professional Metadata Engine & Dynamic Nested Canonical URL Handler
export async function generateMetadata({ params }) {
  const { category: categorySlug, slug: projectSlug } = await params;
  const projectData = await getProjectData(categorySlug, projectSlug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandmarketinghub.com';

  if (!projectData) return {};

  const { portfolio, categoryKeyword } = projectData;

  // Database se dynamic custom SEO fetch karein, ya backup defaults apply karein
  const metaTitle = portfolio.seo?.metaTitle || 
    (portfolio.header?.title ? `${portfolio.header.title} - ${categoryKeyword} Project | BMH` : `${categoryKeyword} Project | BMH`);
    
  const metaDescription = portfolio.seo?.metaDescription || 
    portfolio.header?.description || `Detailed showcase of our ${categoryKeyword} project. See our work, process, and results.`;

  const metaKeywords = portfolio.seo?.metaKeywords || 
    [categoryKeyword, 'portfolio', 'project', 'case study', portfolio.header?.title].filter(Boolean);

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    // 🔹 Nested Dynamic Pages ka professional structured URL automatic link hoga
    alternates: {
      canonical: `${siteUrl}/portfolio/${categorySlug}/${projectSlug}`,
    },
  };
}

// 2. Main Page Render Component
export default async function ProjectPage({ params }) {
  const { category: categorySlug, slug: projectSlug } = await params;
  const projectData = await getProjectData(categorySlug, projectSlug);

  if (!projectData) notFound();

  const { portfolio } = projectData;

  return (
    <main>
      {/* ⚠️ <SEO /> component ki ab zaroorat nahi hai, Next.js metadata system isse inject kar raha hai */}
      
      <Heroportfolio header={portfolio.header} />
      <Highlightportfolio highlights={portfolio.webHighlights} />
      <Imageportfolio middleSection={portfolio.middleSection} />
      {/* <Calltoactionportfolio1 cta={portfolio.cta1} /> */}
        
      <Calltoactionportfolio cta={portfolio.cta2} />
    </main>
  );
}
import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import Calltoactionportfolio1 from "@/components/portfolio/portfoliopage/calltoactionportfolio1";
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

  return (
    <main>
      <Heroportfolio header={portfolio.header} />
      <Imageportfolio middleSection={portfolio.middleSection} />
      <Calltoactionportfolio1 cta={portfolio.cta1} />
      <Highlightportfolio highlights={portfolio.webHighlights} />
      <Calltoactionportfolio cta={portfolio.cta2} />
    </main>
  );
}

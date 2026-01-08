import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import Carousel from "@/components/landing/carousel";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import Calltoactionportfolio1 from "@/components/portfolio/portfoliopage/calltoactionportfolio1";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
import { notFound } from "next/navigation";
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";

// slug helper
function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export default async function PortfolioPage({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  const slug = params.slug;

  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));

  /* ==============================
     1️⃣ CATEGORY PAGE CHECK
     ============================== */
  const categoryMatch = safeKeywords.find(
    (item) => slugify(item.keyword) === slug
  );

  if (categoryMatch) {
    return (
      <main>
        {/* ✅ HERO FOR CATEGORY PAGE */}
        <Herofirstportfolio1
          header={{
            title: categoryMatch.keyword,
            subtitle: `Our ${categoryMatch.keyword} Portfolio`,
          }}
        />

        {/* ✅ PORTFOLIO LISTING */}
        <PortfolioRemain initialCategory={categoryMatch.keyword} /> 

       
      </main>
    );
  }

  /* ==============================
     2️⃣ PORTFOLIO DETAIL PAGE
     ============================== */
  const projectKeyword = safeKeywords.find((keyword) =>
    keyword.websites.some(
      (website) =>
        slugify(website.portfolioPage.header.title) === slug
    )
  );

  if (!projectKeyword) {
    notFound();
  }

  const website = projectKeyword.websites.find(
    (website) =>
      slugify(website.portfolioPage.header.title) === slug
  );

  if (!website) {
    notFound();
  }

  const portfolio = website.portfolioPage;

  return (
    <main>
      {/* <Herofirstportfolio1 header={portfolio.header} /> */}
      <Heroportfolio header={portfolio.header} />
      <Imageportfolio middleSection={portfolio.middleSection} />
      <Calltoactionportfolio1 cta={portfolio.cta1} />
      <Highlightportfolio highlights={portfolio.webHighlights} />
      <Calltoactionportfolio cta={portfolio.cta2} />
      <Carousel />
    </main>
  );
}

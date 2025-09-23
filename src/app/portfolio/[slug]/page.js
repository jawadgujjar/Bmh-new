import Carousel from "@/components/landing/carousel";
import Calltoactionportfolio from "@/components/portfolio/portfoliopage/calltoactionportfolio";
import Calltoactionportfolio1 from "@/components/portfolio/portfoliopage/calltoactionportfolio1";
import Heroportfolio from "@/components/portfolio/portfoliopage/heroportfolio";
import Highlightportfolio from "@/components/portfolio/portfoliopage/highlightportfolio";
import Imageportfolio from "@/components/portfolio/portfoliopage/imageportfolio";
import mongoose from "mongoose";
import Keyword from "@/models/portfolio"; // ✅ correct import

// ✅ Helper function: slugify
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// ✅ Server Component
export default async function PortfolioPage({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  const slug = params.slug;
  console.log("Fetching data for slug:", slug);

  try {
    // ✅ Fetch & safely serialize DB data
    const keywords = await Keyword.find().lean();
    const safeKeywords = JSON.parse(JSON.stringify(keywords));

    // ✅ Find the matching keyword
    const matchingKeyword = safeKeywords.find((keyword) =>
      keyword.websites.some(
        (website) => slugify(website.portfolioPage.header.title) === slug
      )
    );

    if (!matchingKeyword) {
      return <div>No matching keyword found</div>;
    }

    // ✅ Find the specific website
    const website = matchingKeyword.websites.find(
      (website) => slugify(website.portfolioPage.header.title) === slug
    );

    if (!website) {
      return <div>No matching website found</div>;
    }

    const portfolio = website.portfolioPage;

    return (
      <main>
        {/* Header Section */}
        <Heroportfolio header={portfolio.header} />

        {/* Middle Section */}
        <Imageportfolio middleSection={portfolio.middleSection} />

        {/* CTA Sections */}
        <Calltoactionportfolio1 cta={portfolio.cta1} />
        <Highlightportfolio highlights={portfolio.webHighlights} />
        <Calltoactionportfolio cta={portfolio.cta2} />

        {/* Carousel at the bottom */}
        <Carousel />
      </main>
    );
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return <div>Error loading portfolio</div>;
  }
}

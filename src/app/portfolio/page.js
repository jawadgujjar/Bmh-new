// app/portfolio/page.js
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import SEO from "@/components/seo/seo"; // ✅ SEO component

// Main portfolio page کے لیے SEO ڈیٹا
const portfolioSEO = {
  metaTitle: "Our Portfolio - Client Work & Case Studies | YourCompany",
  metaDescription: "Explore our portfolio of successful projects and client work. See real examples of our expertise.",
  metaKeywords: ["portfolio", "case studies", "client work", "project showcase"]
};

export default function PortfolioPage() {
  return (
    <main>
      {/* ✅ Main portfolio page کے لیے SEO */}
      <SEO seo={portfolioSEO} />
      
      <Herofirstportfolio1/>
      <PortfolioRemain />
    </main>
  );
}
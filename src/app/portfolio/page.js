// app/portfolio/page.js
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import SEO from "@/components/seo/seo";  

 
const portfolioSEO = {
  metaTitle: "BMH Portfolio – Projects We’ve Worked On Across the USA",
  metaDescription: "Explore BMH’s portfolio showcasing our digital marketing and branding projects in the USA. See how we help businesses grow with creative solutions.",
  // metaKeywords: ["portfolio", "case studies", "client work", "project showcase"]
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
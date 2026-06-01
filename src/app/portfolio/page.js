// app/portfolio/page.js
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";

// ✅ Next.js Native Metadata Configuration (Professional Engine)
export const metadata = {
  title: "BMH Portfolio – Projects We’ve Worked On Across the USA",
  description: "Explore BMH’s portfolio showcasing our digital marketing and branding projects in the USA. See how we help businesses grow with creative solutions.",
  keywords: ["portfolio", "case studies", "client work", "project showcase"],
  alternates: {
    // Is se automatic layout wale URL k sath '/portfolio' append ho jayega
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main>
      {/* ⚠️ Ab yahan <SEO /> component ki zaroorat nahi hai */}
      
      <Herofirstportfolio1 />
      <PortfolioRemain />
    </main>
  );
}
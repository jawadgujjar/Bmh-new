import Aboutdigital from "@/components/digital-marketing/aboutdigital";
import Calltoactiondigital1 from "@/components/digital-marketing/calltoactiondigital1";
import Calltoactiondigital2 from "@/components/digital-marketing/calltoactiondigital2";
import HeroDigitalMarketing from "@/components/digital-marketing/digitalhero";
import Keywordsdigital from "@/components/digital-marketing/keywordsdigital";
import Digitalservices1 from "@/components/digital-marketing/servicesdigital";
import Whydigital from "@/components/digital-marketing/whydigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import ProposalForm from "@/components/landing/proposalform";
import Reviews from "@/components/landing/reviews";
import SEO from "@/components/seo/seo";

// Main Digital Marketing page ke liye SEO data
const digitalMarketingSEO = {
  metaTitle: "Digital Marketing Services - Grow Your Business Online | YourCompany",
  metaDescription: "Professional digital marketing services including SEO, PPC, social media marketing, and content marketing. Boost your online presence and drive more sales.",
  metaKeywords: ["digital marketing", "SEO services", "social media marketing", "PPC advertising", "online marketing"],
  // ✅ schemaMarkup add karein (optional)
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Marketing Services",
    "description": "Professional digital marketing services",
    "provider": {
      "@type": "Organization",
      "name": "YourCompany"
    },
    "serviceType": "Digital Marketing",
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    }
  }
};

export default function DigitalmarketingPage() {
  return (
    <main>
      {/* ✅ Main Digital Marketing page ke liye SEO */}
      <SEO seo={digitalMarketingSEO} />
      
      <HeroDigitalMarketing/>
      <Heroform/>
      <Aboutdigital/>
      <Whydigital/>
      <Keywordsdigital/>
      <Calltoactiondigital1/>
      <Digitalservices1/>
      <Calltoactiondigital2/>
      <Form1/>
      <Carousel/>
    </main>
  );
};
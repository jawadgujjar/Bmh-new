import Aboutdigital from "@/components/digital-marketing/aboutdigital";
import Calltoactiondigital1 from "@/components/digital-marketing/calltoactiondigital1";
import Calltoactiondigital2 from "@/components/digital-marketing/calltoactiondigital2";
import HeroDigitalMarketing from "@/components/digital-marketing/digitalhero";
import FAQdigital from "@/components/digital-marketing/faqsdigital";
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
  metaTitle: "Top digital marketing agency for startups in USA",
  metaDescription: "Grow your startup with a top digital marketing agency in the USA. We create simple, smart strategies to get more customers and grow your business. Start today!",
  metaKeywords: ["Digital marketing agency for startups", "Top digital marketing agency USA", "digital marketing agency for small business", "digital marketing consultancy", "affordable digital marketing agency"],
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
      <Digitalservices1 category="digital-marketing" />
      <Calltoactiondigital2/>
      <Form1/>
      <Carousel/>
      <FAQdigital/>
    </main>
  );
};
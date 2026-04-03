import Appdevelopment1 from "@/components/app-development/appdevelopment";
import Calltoactionapp1 from "@/components/app-development/calltoactionapp1";
import Calltoactionapp2 from "@/components/app-development/calltoactionapp2";
import Faqapp1 from "@/components/app-development/faqsapp";
import Heroapp1 from "@/components/app-development/heroapp";
import Keywordsapp from "@/components/app-development/keywordsapp";
import Appservices1 from "@/components/app-development/servicesapp";
import Digitalservices1 from "@/components/digital-marketing/servicesdigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import SEO from "@/components/seo/seo"; // ✅ ADD

// ✅ App Development SEO Data
const appDevelopmentSEO = {
  metaTitle: "Custom Application Development & Cross Platform Services USA",
  metaDescription:
    "Create apps that work on any device with custom development and cross-platform services in the USA. Simple, fast, and ready to grow. Start today.",
  metaKeywords: [
    "custom application development",
    "cross platform app development services",
    "custom application development services",
    "services application development",
    "cross platform app development company",
  ],
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "App Development Services",
    description: "Professional mobile app development services",
    provider: {
      "@type": "Organization",
      name: "YourCompany",
    },
    serviceType: "App Development",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
  },
};

export default function AppdevelopmentPage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={appDevelopmentSEO} />

      <Heroapp1 />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* <Heroform/> */}
        <Appdevelopment1 />
        <Keywordsapp />
        <Calltoactionapp1 />
        <Appservices1 category="app-development" />
        <Calltoactionapp2 />
        <Form1 />
        <Carousel />
        <Faqapp1 />
      </div>
    </main>
  );
}
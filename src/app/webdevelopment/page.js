import Digitalservices1 from "@/components/digital-marketing/servicesdigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import Calltoactionweb1 from "@/components/web-development/calltoactionweb1";
import Calltoactionweb2 from "@/components/web-development/calltoactionweb2";
import Faqwebdevelopment1 from "@/components/web-development/faqswebdevelopment";
import Heroweb1 from "@/components/web-development/heroweb";
import Keywordsweb from "@/components/web-development/keywordsweb";
import Webservices1 from "@/components/web-development/servicesweb";
import Webdevelopment1 from "@/components/web-development/webdevelopment";
import SEO from "@/components/seo/seo"; // ✅ IMPORT ADD
import Alice from "@/components/landing/alicecarousel";

// ✅ Web Development SEO Data
const webDevelopmentSEO = {
  metaTitle: "Custom Website Development Company & Redesign Services USA",
  metaDescription:
    "Need a website that works and wows? Our USA-based custom website development and redesign services create sites that attract and convert.",
  metaKeywords: [
    "custom website development company",
    "website development company in usa",
    "website redesign services",
    "website management services",
    "web development consultant",
  ],
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Development Services",
    description: "Professional web development services for startups",
    provider: {
      "@type": "Organization",
      name: "YourCompany",
    },
    serviceType: "Web Development",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
  },
};

export default function WebdevelopmentPage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={webDevelopmentSEO} />

      <Heroweb1 />
       <Alice/>
      {/* <Heroform/> */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
       
        <Webdevelopment1 />
        <Keywordsweb />
        <Calltoactionweb1 />
        <Webservices1 category="web-development" />
        <Calltoactionweb2 />
        <Form1 />
        <Carousel />
        <Faqwebdevelopment1 />
      </div>
    </main>
  );
}
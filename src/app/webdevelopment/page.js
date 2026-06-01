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

// 🔥 1. Next.js Server-Side Metadata Engine (Web Dev Canonical Fixed)
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";
  
  return {
    title: webDevelopmentSEO.metaTitle,
    description: webDevelopmentSEO.metaDescription,
    keywords: webDevelopmentSEO.metaKeywords.join(", "),
    
    // ✅ Yeh block header me automated clean canonical link inject karega
    alternates: {
      // Is se dynamic check clear hoga: https://brandmarketinghub.com/web-development
      canonical: `${siteUrl}/web-development`,
    },
  };
}

// 2. Main Page Component
export default function WebdevelopmentPage() {
  return (
    <main>
      {/* 🔥 3. Schema Markup Script Injection (Structured Data for Google Bot) */}
      {webDevelopmentSEO.schemaMarkup && (
        <script
          type="application/ld+json"
          id="web-development-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webDevelopmentSEO.schemaMarkup) }}
        />
      )}

      {/* ⚠️ Purana <SEO /> tag completely removed */}

      <Heroweb1 />
      <Alice />
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
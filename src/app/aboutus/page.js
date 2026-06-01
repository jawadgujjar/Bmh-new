import AboutContent from '@/components/aboutus/aboutus';
import Heroabout1 from '@/components/aboutus/heroabout';

// ✅ About Page SEO Data
const aboutSEO = {
  metaTitle: "About Us – BMH Digital Marketing & Branding Experts USA",
  metaDescription:
    "Learn about BMH, a USA-based digital agency helping startups and businesses grow with smart marketing, branding, and web solutions.",
  metaKeywords: [
    "about company",
    "digital agency",
    "web development company",
    "app development company",
    "startup marketing agency",
  ],
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YourCompany",
    description: "We help startups grow with digital solutions",
    url: "https://brandmarketinghub.com", // Aap ki domain ke mutabiq update kar diya hai
  },
};

// 🔥 1. Next.js Server-Side Metadata Engine (About Page Canonical Fixed)
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";
  
  return {
    title: aboutSEO.metaTitle,
    description: aboutSEO.metaDescription,
    keywords: aboutSEO.metaKeywords.join(", "),
    
    // ✅ Yeh block head tag me automated clean canonical link inject karega
    alternates: {
      // Is se route structure clear ho jayega: https://brandmarketinghub.com/about
      canonical: `${siteUrl}/aboutus`,
    },
  };
}

// 2. Main Page Component
export default function getaquotePage() {
  return (
    <main>
      {/* 🔥 3. Schema Markup Script Injection (Structured Data for Google Bot) */}
      {aboutSEO.schemaMarkup && (
        <script
          type="application/ld+json"
          id="about-page-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSEO.schemaMarkup) }}
        />
      )}

      {/* ⚠️ Purana <SEO /> tag completely removed */}

      <Heroabout1 />
      <AboutContent />
    </main>
  );
} 
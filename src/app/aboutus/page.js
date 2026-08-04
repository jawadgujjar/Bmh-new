import AboutContent from '@/components/aboutus/aboutus';
import Certifications from '@/components/aboutus/certifications';
import Global from '@/components/aboutus/Global';
import Heroabout1 from '@/components/aboutus/heroabout';
import HowWork from '@/components/aboutus/HowWork';
import NewHero from '@/components/aboutus/newheroabout';
import OurStory from '@/components/aboutus/ourstory';
import Quote from '@/components/aboutus/Quote';
import Trust from '@/components/aboutus/Trust';
import WhatWeDo from '@/components/aboutus/WhatWeDo';
import WhyChoose from '@/components/aboutus/WhyChoose';

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
    
     
    alternates: {
      
      canonical: `${siteUrl}/aboutus`,
    },
  };
}

// 2. Main Page Component
export default function getaquotePage() {
  return (
    <main>
      {/*  Schema Markup Script Injection (Structured Data for Google Bot) */}
      {aboutSEO.schemaMarkup && (
        <script
          type="application/ld+json"
          id="about-page-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSEO.schemaMarkup) }}
        />
      )}

      {/* <Heroabout1 />
      <AboutContent /> */}
        <NewHero/>
        <OurStory/>
        <Certifications/>
        <WhatWeDo/>
        <HowWork/>
        <Trust/>
        <WhyChoose/>
        <Global/>
        <Quote/>

    </main>
  );
} 
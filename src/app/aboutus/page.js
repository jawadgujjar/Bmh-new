import AboutContent from '@/components/aboutus/aboutus';
import Heroabout1 from '@/components/aboutus/heroabout';
import SEO from "@/components/seo/seo"; // ✅ ADD

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
    url: "https://yourwebsite.com",
  },
};

export default function getaquotePage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={aboutSEO} />

      <Heroabout1 />
      <AboutContent />
    </main>
  );
}
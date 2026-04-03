import HeroPrivacy from "@/components/privacy-policy/heroprivacy";
import PrivacyPolicy from "@/components/privacy-policy/privacy";
import SEO from "@/components/seo/seo"; // ✅ ADD

// ✅ Privacy Policy SEO Data
const privacySEO = {
  metaTitle: "BMH Privacy Policy – Data Protection & User Safety USA",
  metaDescription:
    "Learn how BMH safeguards your information. Our privacy policy ensures data security, transparency, and safe digital services in the USA.",
  // metaKeywords: [
  //   "privacy policy",
  //   "data protection",
  //   "user privacy",
  //   "website privacy",
  //   "information security",
  // ],
  // schemaMarkup: {
  //   "@context": "https://schema.org",
  //   "@type": "WebPage",
  //   name: "Privacy Policy",
  //   description: "Privacy policy page explaining data usage and protection",
  // },
};

export default function getaquotePage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={privacySEO} />

      <HeroPrivacy />
      <PrivacyPolicy />
    </main>
  );
}
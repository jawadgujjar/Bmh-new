import HeroTerms from "@/components/terms-and-conditions/heroterms";
import TermsAndConditions from "@/components/terms-and-conditions/termsandconditions";
import SEO from "@/components/seo/seo"; // ✅ ADD

// ✅ Terms & Conditions SEO Data
const termsSEO = {
  metaTitle: "BMH Terms and Conditions – User Guidelines USA",
  metaDescription:
    "Learn BMH’s terms and conditions to use our services safely and responsibly. Clear rules and guidelines for digital marketing and branding in the USA.",
  // metaKeywords: [
  //   "terms and conditions",
  //   "user agreement",
  //   "website terms",
  //   "legal terms",
  //   "service conditions",
  // ],
  // schemaMarkup: {
  //   "@context": "https://schema.org",
  //   "@type": "WebPage",
  //   name: "Terms and Conditions",
  //   description: "Terms and conditions for using our website and services",
  // },
};

export default function getaquotePage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={termsSEO} />

      <HeroTerms />
      <TermsAndConditions />
    </main>
  );
}
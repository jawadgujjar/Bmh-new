import HeroTerms from "@/components/terms-and-conditions/heroterms";
import TermsAndConditions from "@/components/terms-and-conditions/termsandconditions";

// ✅ Terms & Conditions SEO Data
const termsSEO = {
  metaTitle: "BMH Terms and Conditions – User Guidelines USA",
  metaDescription:
    "Learn BMH’s terms and conditions to use our services safely and responsibly. Clear rules and guidelines for digital marketing and branding in the USA.",
  metaKeywords: [
    "terms and conditions",
    "user agreement",
    "website terms",
    "legal terms",
    "service conditions",
  ],
};

// 🔥 1. Next.js Server-Side Metadata Engine (Terms Page Canonical & Indexing Fixed)
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";
  
  return {
    title: termsSEO.metaTitle,
    description: termsSEO.metaDescription,
    keywords: termsSEO.metaKeywords.join(", "),
    
    // ✅ Extension me URL aur Canonical mismatch fix karne ke liye
    alternates: {
      // ⚠️ Agar aap ka folder name sirf 'terms' hai, to yahan '/terms' likhein
      canonical: `${siteUrl}/terms-and-conditions`, 
    },
    
    // ✅ NOINDEX, NOFOLLOW red alert khatam karne ke liye index allow fixed
    robots: {
      index: true,
      follow: true,
    }
  };
}

// 2. Main Page Component
export default function getaquotePage() {
  return (
    <main>
      {/* ⚠️ Purana <SEO /> tag completely removed */}

      <HeroTerms />
      <TermsAndConditions />
    </main>
  );
}
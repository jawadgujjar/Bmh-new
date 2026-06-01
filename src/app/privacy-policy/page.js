import HeroPrivacy from "@/components/privacy-policy/heroprivacy";
import PrivacyPolicy from "@/components/privacy-policy/privacy";

// ✅ Privacy Policy SEO Data
const privacySEO = {
  metaTitle: "BMH Privacy Policy – Data Protection & User Safety USA",
  metaDescription:
    "Learn how BMH safeguards your information. Our privacy policy ensures data security, transparency, and safe digital services in the USA.",
  metaKeywords: [
    "privacy policy",
    "data protection",
    "user privacy",
    "website privacy",
    "information security",
  ],
};

// 🔥 1. Next.js Server-Side Metadata Engine (Privacy Page Canonical & Indexing Fixed)
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";
  
  return {
    title: privacySEO.metaTitle,
    description: privacySEO.metaDescription,
    keywords: privacySEO.metaKeywords.join(", "),
    
    // ✅ Yeh block extension me dynamic clean route dikhayega
    alternates: {
      // ⚠️ Agar aap ka folder name 'privacy' hai, to yahan '/privacy' likhein
      canonical: `${siteUrl}/privacy-policy`, 
    },
    
    // ✅ Extension me 'NOINDEX, NOFOLLOW' ka red alert khatam karne ke liye
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

      <HeroPrivacy />
      <PrivacyPolicy />
    </main>
  );
}
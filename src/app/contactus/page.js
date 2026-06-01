import ContactUs from "@/components/contact-us/contactus";
import Herocontact1 from "@/components/contact-us/herocontact";

// ✅ Contact Page SEO Data
const contactSEO = {
  metaTitle: "Contact us if you want to come online.",
  metaDescription:
    "Need help or want to talk online? Contact BMH, a top USA digital agency, and chat with us today to grow your business easily.",
  metaKeywords: [
    "contact us",
    "get a quote",
    "web development contact",
    "digital marketing agency contact",
    "app development company contact",
  ],
};

// 🔥 1. Next.js Server-Side Metadata Engine (Contact Page Canonical & Indexing Fixed)
export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";
  
  return {
    title: contactSEO.metaTitle,
    description: contactSEO.metaDescription,
    keywords: contactSEO.metaKeywords.join(", "),
    
    // ✅ Extension me URL aur Canonical mismatch fix karne ke liye
    alternates: {
      // ⚠️ Agar aap ka folder name sirf 'contact' hai, to yahan '/contact' likhein
      canonical: `${siteUrl}/contactus`, 
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

      <Herocontact1 />
      <ContactUs />
    </main>
  );
}
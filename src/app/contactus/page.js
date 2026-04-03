import ContactUs from "@/components/contact-us/contactus";
import Herocontact1 from "@/components/contact-us/herocontact";
import SEO from "@/components/seo/seo"; // ✅ ADD

// ✅ Contact Page SEO Data
const contactSEO = {
  metaTitle: "Contact us if you want to come online.",
  metaDescription:
    "Need help or want to talk online? Contact BMH, a top USA digital agency, and chat with us today to grow your business easily.",
  // metaKeywords: [
  //   "contact us",
  //   "get a quote",
  //   "web development contact",
  //   "digital marketing agency contact",
  //   "app development company contact",
  // ],
  // schemaMarkup: {
  //   "@context": "https://schema.org",
  //   "@type": "ContactPage",
  //   name: "Contact Us",
  //   description: "Contact Skystack Technologiz for services and inquiries",
  // },
};

export default function getaquotePage() {
  return (
    <main>
      {/* ✅ SEO ADD */}
      <SEO seo={contactSEO} />

      <Herocontact1 />
      <ContactUs />
    </main>
  );
}
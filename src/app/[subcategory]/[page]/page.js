import { notFound } from "next/navigation";
import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital";
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1";
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subdynamicsection";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import SeoIndustries from "@/components/landing/seoindustries";
import Heroform from "@/components/landing/heroform";
import DescriptionAndFormSection from "@/components/descriptionandformsection/descriptionform";
import FaqSection from "@/components/faqspage/faqsection"; // ✅ Import FAQ component

// Simple HTML sanitizer
const sanitizeHtml = (html) => {
  if (!html) return "";

  let cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, "");

  cleanHtml = cleanHtml
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "")
    .replace(/javascript:/g, "")
    .replace(/vbscript:/g, "")
    .replace(/data:/g, "");

  return cleanHtml.trim();
};

// Strip HTML tags for headings
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

// For meta description
const stripHtmlTagsForMeta = (html) => {
  return stripHtmlTags(html);
};

// FIXED: Properly handle API response
async function getPageBySlug(slug) {
  try {
    console.log(`Fetching page with slug: ${slug}`);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/page?slug=${slug}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(`Response status: ${res.status}`);

    if (!res.ok) {
      console.error(`API error: ${res.status}`);
      return null;
    }

    const response = await res.json();
    console.log(`Page data received:`, response);

    // ✅ FIX: Handle the { success: true, data: {...} } structure
    if (response && response.success && response.data) {
      return response.data;
    }

    // Fallback for other response structures
    if (response && typeof response === "object") {
      if (Array.isArray(response)) {
        return response.length > 0 ? response[0] : null;
      } else {
        return response;
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getPageBySlug:", error);
    return null;
  }
}

// FIXED: Properly handle subcategory API response
async function getSubCategoryBySlug(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/subcategories?slug=${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const response = await res.json();

    // ✅ FIX: Handle the API response structure
    if (response && response.success && response.data) {
      return response.data;
    }

    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  // ✅ FIX: Await params properly
  const resolvedParams = await params;
  const { page } = resolvedParams;

  const pageData = await getPageBySlug(page);

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  const cleanMetaDescription = stripHtmlTagsForMeta(
    pageData.seo?.metaDescription ||
    pageData.topSection?.description ||
    pageData.subcatpagedescr ||
    "Professional services"
  );

  return {
    title: pageData.seo?.metaTitle || pageData.title || "Service Page",
    description: cleanMetaDescription,
    keywords: pageData.seo?.metaKeywords?.join(", ") || "",
  };
}

export default async function UniversalPageRoute({ params }) {
  // ✅ FIX: Await params properly (Next.js 15 requirement)
  const resolvedParams = await params;
  const { subcategory, page } = resolvedParams;

  console.log("=== UNIVERSAL ROUTE PARAMS ===");
  console.log("Subcategory slug:", subcategory);
  console.log("Page slug:", page);

  // Fetch page data
  const pageData = await getPageBySlug(page);

  console.log("=== PAGE DATA ===");
  console.log(pageData);

  if (!pageData) {
    console.log("Page not found, showing 404");
    notFound();
  }

  // Fetch subcategory for breadcrumb
  const subcategoryData = await getSubCategoryBySlug(subcategory);

  console.log("=== SUBCATEGORY DATA ===");
  console.log(subcategoryData);

  // Prepare props for components
  const heroProps = {
    backgroundImage: pageData.topSection?.backgroundImage || "/default-bg.jpg",
    heading: stripHtmlTags(
      pageData.topSection?.heading || pageData.title || "Service",
    ),
    description: sanitizeHtml(
      pageData.topSection?.description ||
      pageData.seo?.metaDescription ||
      "Description not available",
    ),
  };

  const whyChooseProps = {
    heading: "Why Choose Us",
    description: sanitizeHtml(pageData.sections?.[0]?.description || ""),
    description2: "",
    conclusion: "",
    image1: pageData.sections?.[0]?.image || "/default-image.jpg",
    image2: pageData.sections?.[1]?.image || "/default-image2.jpg",
    buttonText: "Get Started",
  };

  const cta1Props = {
    title: "Ready to Grow?",
    description: "Contact us for a free consultation",
  };

  const cta2Props = {
    title: "Need Help?",
    description: "Our experts are here to assist you",
    phoneNumber: "(813) 214-0535",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  // Check if there are dynamic sections
  const hasDynamicSections = pageData.sections && pageData.sections.length > 0;

  // ✅ Prepare FAQ data
  const faqHeading = pageData.faqs?.heading || "Frequently Asked Questions";
  const faqDescription = pageData.faqs?.description || "Find answers to common questions about our services";
  
  // Handle different API structures for FAQs
  let faqItems = [];
  if (pageData.faqs?.items && Array.isArray(pageData.faqs.items)) {
    faqItems = pageData.faqs.items;
  } else if (Array.isArray(pageData.faqs)) {
    faqItems = pageData.faqs;
  } else if (pageData.faqs && typeof pageData.faqs === 'object') {
    faqItems = pageData.faqs.faqs || pageData.faqs.questions || [];
  }

  return (
    <main>
      {/* Hero Section */}
      <SubHeroDigitalMarketing {...heroProps} renderHtml={true} />

      {/* Dynamic Sections */}
      {hasDynamicSections && (
        <>
          {pageData.sections.map((section, index) => {
            console.log("Rendering section:", section.layoutType, section);
            console.log("Section CTA:", section.cta); // Debug log for CTA

            switch (section.layoutType) {
              case 'image-left':
                return (
                  <SubAboutdigital
                    key={`section-${index}`}
                    layoutType="image-left"
                    heading={section.heading || "About Us"}
                    description1={sanitizeHtml(section.description || "")}
                    image1={section.image || "/default-image.jpg"}
                    image2=""
                    description2=""
                    cta={section.cta || null} // ✅ ADDED CTA PROP
                    renderHtml={true}
                  />
                );

              case 'image-right':
                return (
                  <SubAboutdigital
                    key={`section-${index}`}
                    layoutType="image-right"
                    heading={section.heading || "About Us"}
                    description1={sanitizeHtml(section.description || "")}
                    image1={section.image || "/default-image.jpg"}
                    image2=""
                    description2=""
                    cta={section.cta || null} // ✅ ADDED CTA PROP
                    renderHtml={true}
                  />
                );

              case 'description-only':
                return (
                  <SubAboutdigital
                    key={`section-${index}`}
                    layoutType="description-only"
                    heading={section.heading || "About Us"}
                    description1={sanitizeHtml(section.description || "")}
                    image1=""
                    image2=""
                    description2=""
                    cta={section.cta || null} // ✅ ADDED CTA PROP
                    renderHtml={true}
                  />
                );

              case 'description-and-form':
                return (
                  <DescriptionAndFormSection
                    key={`section-${index}`}
                    heading={section.heading || "Our Services"}
                    descriptions={section.descriptions || []}
                    cta={section.cta || null} // ✅ ADDED CTA PROP
                  />
                );

              default:
                return null;
            }
          })}
        </>
      )}

      {/* If no dynamic sections, show fallback components */}
      {!hasDynamicSections && (
        <>
          <SubWhydigital {...whyChooseProps} renderHtml={true} />
        </>
      )}

      {/* CTA Sections */}
      {/* <SubCalltoactiondigital1 {...cta1Props} renderHtml={true} /> */}
      <SeoIndustries {...industriesProps} />
      {/* <SubCalltoactiondigital2 {...cta2Props} renderHtml={true} /> */}
      <Form1 />
      <Carousel />

      {/* ✅ FAQs Section - Shows either FAQs or "No FAQs Found" message */}
      <FaqSection 
        heading={faqHeading}
        description={faqDescription}
        faqs={faqItems}
      />
    </main>
  );
}

// Generate static params if needed
export async function generateStaticParams() {
  return [];
}
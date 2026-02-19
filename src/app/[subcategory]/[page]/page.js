import { notFound } from "next/navigation";
import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital";
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1";
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subwhydigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import SeoIndustries from "@/components/landing/seoindustries";
import Heroform from "@/components/landing/heroform";

// Import the new DescriptionAndFormSection component
import DescriptionAndFormSection from "@/components/descriptionandformsection/descriptionform";

// Simple HTML sanitizer (remove only dangerous tags/attributes)
const sanitizeHtml = (html) => {
  if (!html) return "";

  // Remove script, style, iframe, and other dangerous tags
  let cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, "");

  // Remove dangerous attributes while preserving formatting
  cleanHtml = cleanHtml
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "")
    .replace(/javascript:/g, "")
    .replace(/vbscript:/g, "")
    .replace(/data:/g, "");

  return cleanHtml.trim();
};

// For headings only (remove all HTML tags)
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

// For meta description only (remove all HTML tags)
const stripHtmlTagsForMeta = (html) => {
  return stripHtmlTags(html);
};

async function getPageBySlug(slug) {
  try {
    console.log(`Fetching page with slug: ${slug}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/page?slug=${slug}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(`Response status: ${res.status}`);

    if (!res.ok) {
      console.error(`API error: ${res.status} - ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    console.log(`Page data received:`, data);

    if (data && typeof data === "object") {
      if (Array.isArray(data)) {
        return data.length > 0 ? data[0] : null;
      } else {
        return data;
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getPageBySlug:", error);
    return null;
  }
}

async function getSubCategoryBySlug(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?slug=${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { page } = params;

  const pageData = await getPageBySlug(page);

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  // Meta description کے لیے HTML tags remove کریں
  const cleanMetaDescription = stripHtmlTagsForMeta(
    pageData.metaDescription ||
    pageData.topSection?.description ||
    pageData.subcatpagedescr,
  );

  return {
    title: pageData.metaTitle || pageData.title || "Service Page",
    description: cleanMetaDescription || "Professional services",
    keywords: pageData.metaKeywords || "",
  };
}

export default async function UniversalPageRoute({ params }) {
  const { subcategory, page } = params;

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
  // ✅ Headings ke liye HTML strip karen, lekin descriptions ke liye nahin

  const heroProps = {
    backgroundImage: pageData.topSection?.backgroundImage || "/default-bg.jpg",
    heading: stripHtmlTags(
      pageData.topSection?.heading || pageData.title || "Service",
    ),
    description: sanitizeHtml(
      pageData.topSection?.description ||
      pageData.metaDescription ||
      "Description not available",
    ),
  };

  const aboutProps = {
    heading: pageData.title, // Always use page title for heading
    description1: sanitizeHtml(
      pageData.middleSection?.description1 ||
      pageData.subcatpagedescr ||
      "Detailed description",
    ),
    image1: pageData.middleSection?.image1 || "/default-image.jpg",
    image2: pageData.middleSection?.image2 || "/default-image2.jpg",
    description2: sanitizeHtml(pageData.middleSection?.description2 || ""),
  };

  const whyChooseProps = {
    heading: "Why Choose Us", // Fixed heading
    description: sanitizeHtml(pageData.middleSection?.description1 || ""),
    description2: sanitizeHtml(pageData.middleSection?.description2 || ""),
    conclusion: "",
    image1: pageData.middleSection?.image1 || "/default-image.jpg",
    image2: pageData.middleSection?.image2 || "/default-image2.jpg",
    buttonText: "Get Started",
  };

  const keywordsProps = {
    heading: pageData.metaKeywords ? "Keywords" : "Our Expertise",
    description: "",
    keywords: pageData.metaKeywords
      ? pageData.metaKeywords.split(",").map((k) => k.trim())
      : [],
    relatedHeading: [],
    relatedDescription: [],
    images: [
      pageData.middleSection?.image1,
      pageData.middleSection?.image2,
    ].filter(Boolean),
  };

  const cta1Props = {
    title: pageData.cta1?.heading || "Ready to Grow?",
    description: sanitizeHtml(
      pageData.cta1?.description || "Contact us for a free consultation",
    ),
  };

  const cta2Props = {
    title: pageData.cta2?.heading || "Need Help?",
    description: sanitizeHtml(
      pageData.cta2?.description || "Our experts are here to assist you",
    ),
    phoneNumber: "(813) 214-0535",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  // Check if there are dynamic sections from the new model
  const hasDynamicSections = pageData.sections && pageData.sections.length > 0;

  return (
    <main>
      {/* Hero Section - Always show */}
      <SubHeroDigitalMarketing {...heroProps} renderHtml={true} />
      <Heroform />
      
      {/* Dynamic Sections from new model - Only if they exist */}
      {hasDynamicSections && (
        <>
          {pageData.sections.map((section, index) => {
            switch(section.layoutType) {
              case 'image-left':
                return (
                  <SubAboutdigital
                    key={`section-${index}`}
                    heading={section.heading}
                    description1={sanitizeHtml(section.description)}
                    image1={section.image || "/default-image.jpg"}
                    image2={pageData.middleSection?.image2 || "/default-image2.jpg"}
                    description2=""
                    renderHtml={true}
                  />
                );
              
              case 'image-right':
                return (
                  <SubWhydigital
                    key={`section-${index}`}
                    heading={section.heading}
                    description={sanitizeHtml(section.description)}
                    description2=""
                    conclusion=""
                    image1={section.image || "/default-image.jpg"}
                    image2={pageData.middleSection?.image2 || "/default-image2.jpg"}
                    buttonText="Learn More"
                    renderHtml={true}
                  />
                );
              
              case 'description-only':
                return (
                  <SubAboutdigital
                    key={`section-${index}`}
                    heading={section.heading}
                    description1={sanitizeHtml(section.description)}
                    image1={pageData.middleSection?.image1 || "/default-image.jpg"}
                    image2={pageData.middleSection?.image2 || "/default-image2.jpg"}
                    description2=""
                    renderHtml={true}
                  />
                );
              
              case 'description-and-form':
                return (
                  <DescriptionAndFormSection
                    key={`section-${index}`}
                    heading={section.heading}
                    descriptions={section.descriptions || []}
                  />
                );
              
              default:
                return null;
            }
          })}
        </>
      )}

      {/* If no dynamic sections, show old components for backward compatibility */}
      {!hasDynamicSections && (
        <>
          {/* <SubAboutdigital {...aboutProps} renderHtml={true} /> */}
          <SubWhydigital {...whyChooseProps} renderHtml={true} />
          {/* <SubKeywordsdigital {...keywordsProps} /> */}
        </>
      )}
      
      {/* CTA Sections - Always show */}
      <SubCalltoactiondigital1 {...cta1Props} renderHtml={true} />
      <SeoIndustries {...industriesProps} />
      <SubCalltoactiondigital2 {...cta2Props} renderHtml={true} />
      <Form1 />
      <Carousel />
    </main>
  );
}

// Generate static params if needed
export async function generateStaticParams() {
  return [];
}
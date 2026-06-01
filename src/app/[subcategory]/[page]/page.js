import { notFound } from "next/navigation";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import Heroform from "@/components/landing/heroform";
import DescriptionAndFormSection from "@/components/descriptionandformsection/descriptionform";
import FaqSection from "@/components/faqspage/faqsection";
import PageKeywordsdigital from "@/components/digital-marketing/pagekeyword-digital/pagekeywordsdigital";
import SubDynamicSection from "@/components/digital-marketing/sub-category-digital/subdynamicsection";

// --- Helpers ---
const sanitizeHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
};

const stripHtmlTags = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

async function getPageBySlug(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/page?slug=${slug}`, {
      cache: "no-store",
    });
    const response = await res.json();
    return response?.success ? response.data : response;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

async function getSubCategoryBySlug(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/subcategories?slug=${slug}`, {
      cache: "no-store",
    });
    const response = await res.json();
    return response?.success ? response.data : response;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

// 🔥 1. Next.js Dynamic Metadata Implementation (Server-Side SEO with Auto-Canonical Engine)
export async function generateMetadata({ params }) {
  const { subcategory, page } = await params;
  const pageData = await getPageBySlug(page);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brandmarketinghub.com";

  if (!pageData || !pageData.seo) {
    return {
      title: pageData?.title || "Brand Marketing Hub",
      alternates: {
        // Fallback exact path matching rule
        canonical: `${siteUrl}/${subcategory}/${page}`,
      },
    };
  }

  const { seo } = pageData;

  return {
    title: seo.metaTitle || pageData.title || "Brand Marketing Hub",
    description: seo.metaDescription || "",
    keywords: Array.isArray(seo.metaKeywords) 
      ? seo.metaKeywords.join(", ") 
      : seo.metaKeywords || "",
    
    // ✅ Yeh block aap ka complete nested dynamic path code injector canonical engine me run karega
    alternates: {
      // Is se dynamic perfect layout generate hoga: https://brandmarketinghub.com/subcategory/page
      canonical: `${siteUrl}/${subcategory}/${page}`,
    },
  };
}

export default async function UniversalPageRoute({ params }) {
  const { subcategory, page } = await params;

  // Donon data calls parallel chalti hain
  const [pageData, subcategoryRaw] = await Promise.all([
    getPageBySlug(page),
    getSubCategoryBySlug(subcategory),
  ]);

  if (!pageData) notFound();

  // Subcategory data structure fix
  const subcategoryData = subcategoryRaw?.data || subcategoryRaw;
  const hasDynamicSections = pageData.sections && pageData.sections.length > 0;

  // Schema markup extract kar rahe hain pageData ke seo object se
  const schemaMarkup = pageData.seo?.schemaMarkup;

  return (
    <main className="flex flex-col w-full p-0 m-0 overflow-x-hidden">
      
      {/* 🔥 2. Schema Markup Injection (Structured Data for Google Bot) */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          id={`schema-${pageData.slug || "page"}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      )}

      {/* 1. Hero Section */}
      <SubHeroDigitalMarketing
        backgroundImage={
          pageData.topSection?.backgroundImage || "/images/hero.jpg"
        }
        heading={stripHtmlTags(pageData.topSection?.heading || pageData.title)}
        description={sanitizeHtml(pageData.topSection?.description || "")}
        renderHtml={true}
      />

      {/* 2. Hero Form */}
      <Heroform />

      {/* 3. Keywords Section (Sibling Pages) */}
      {pageData.subcategory && (
        <PageKeywordsdigital
          subcategoryId={pageData.subcategory}
          currentPageSlug={pageData.slug}
          heading={pageData.keywordstitle}
        />
      )}

      {/* 4. Dynamic Sections Loop */}
      {hasDynamicSections && (
        <>
          {pageData.sections.map((section, index) => {
            const buttonProps = {
              showButton:
                section.showButton === true || section.showButton === "true",
              buttonText: section.buttonText || "Get a Quote",
              buttonLink: section.buttonLink || "/getaquote",
            };

            switch (section.layoutType) {
              case "image-left":
              case "image-right":
              case "description-only":
                return (
                  <SubDynamicSection
                    key={`section-${index}`}
                    layoutType={section.layoutType}
                    heading={section.heading || ""}
                    description={sanitizeHtml(section.description || "")}
                    image={section.image || "/default-image.jpg"}
                    cta={section.cta}
                    index={index}
                    {...buttonProps}
                  />
                );

              case "description-and-form":
                return (
                  <DescriptionAndFormSection
                    key={`section-${index}`}
                    heading={section.heading || ""}
                    descriptions={section.descriptions || []}
                    cta={section.cta}
                    {...buttonProps}
                  />
                );

              default:
                return null;
            }
          })}
        </>
      )}

      {/* 5. FAQ Section */}
      <FaqSection
        heading={pageData.faqs?.heading || "Frequently Asked Questions"}
        faqs={
          Array.isArray(pageData.faqs)
            ? pageData.faqs
            : pageData.faqs?.items || []
        }
      />
    </main>
  );
}

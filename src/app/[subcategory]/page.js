import { notFound } from "next/navigation";
import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital";
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1";
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
// import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subwhydigital"; // Remove this
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import SeoIndustries from "@/components/landing/seoindustries";
import Heroform from "@/components/landing/heroform";
import SubDynamicSection from "@/components/digital-marketing/sub-category-digital/subdynamicsection";
import SubFaqs from "../../components/digital-marketing/sub-category-digital/subfaqs";


// HTML renderer component
function HtmlContent({ content, className = "" }) {
  if (!content) return null;

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
}

async function getSubCategoryData(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/subcategories?slug=${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) throw new Error("Failed to fetch subcategory");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

export default async function SubcategoryPage({ params }) {
  const { subcategory } = await params;

  // 1. Fetch Subcategory Data
  const subcategoryData = await getSubCategoryData(subcategory);

  if (!subcategoryData) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Subcategory not found</h1>
        <p>The requested subcategory "{subcategory}" does not exist.</p>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections =
    subcategoryData.sections?.sort((a, b) => (a.order || 0) - (b.order || 0)) ||
    [];

  return (
    <main>
      {/* Hero Section */}
      <SubHeroDigitalMarketing
        backgroundImage={
          subcategoryData.topSection?.backgroundImage || "/default-bg.jpg"
        }
        heading={subcategoryData.topSection?.heading || subcategoryData.name}
        description={
          <div
            dangerouslySetInnerHTML={{
              __html: subcategoryData.topSection?.description || "",
            }}
          />
        }
      />

      <Heroform />

      {/* Dynamic Services Section */}
      <SubKeywordsdigital
        heading={`Specialized ${subcategoryData.name} Services`}
        description={
          <HtmlContent
            content={subcategoryData.keywordsSection?.description}
            className="keywords-description"
          />
        }
        subcategoryId={subcategoryData._id}
        category={subcategoryData.category}
      />

      {/* 🔥 DYNAMIC SECTIONS RENDERING - This replaces SubWhydigital */}
      {sortedSections.map((section, index) => (
        <SubDynamicSection
          key={index}
          layoutType={section.layoutType}
          heading={section.heading}
          description={section.description}
          image={section.image}
          cta={section.cta}
          index={index}
        />
      ))}

      {/* CTA 1 */}
      <SubCalltoactiondigital1
        title={subcategoryData.cta1?.heading}
        description={
          <HtmlContent
            content={subcategoryData.cta1?.description}
            className="cta-description"
          />
        }
      />

      {/* Industries */}
      <SeoIndustries heading="Industries We Transform" industries={[]} />

      {/* CTA 2 */}
      <SubCalltoactiondigital2
        title={subcategoryData.cta2?.heading}
        description={
          <HtmlContent
            content={subcategoryData.cta2?.description}
            className="cta-description"
          />
        }
        phoneNumber="(813) 214-0535"
      />

      {/* Standard Layout Elements */}
      <Form1 />
      <Carousel />

      {/* 📝 FAQS SECTION - ADDED HERE (AFTER CAROUSEL) */}
      <SubFaqs 
        faqs={subcategoryData.faqs || []} 
        title={`Frequently Asked Questions About ${subcategoryData.name}`}
      />
      {/* Production hidden debug */}
      <div style={{ display: "none" }}>
        <pre>{JSON.stringify(subcategoryData, null, 2)}</pre>
      </div>
    </main>
  );
}
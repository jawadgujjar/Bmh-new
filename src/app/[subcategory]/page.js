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
  const { subcategory } = params;

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

  // 2. Determine Category Paths (for links/breadcrumbs if needed)
  let categoryPath = "digital-marketing";
  if (subcategoryData.category === "web-development")
    categoryPath = "web-development";
  if (subcategoryData.category === "app-development")
    categoryPath = "app-development";

  // 3. Prepare Props for Hero
  const heroProps = {
    backgroundImage:
      subcategoryData.topSection?.backgroundImage || "/default-bg.jpg",
    heading: subcategoryData.topSection?.heading || subcategoryData.name,
    description: subcategoryData.topSection?.description || "",
  };

  // 4. Prepare Props for Dynamic Services Section (Previously Keywords)
  const serviceKeywordsProps = {
    heading: `Specialized ${subcategoryData.name} Services`,
    description:
      subcategoryData.keywordsSection?.description ||
      "Explore our wide range of tailored solutions.",
    subcategoryId: subcategoryData._id, // Passing ID for internal fetch
    category: subcategoryData.category,
  };

  // 5. Why Choose Us Props
  const whyChooseProps = {
    heading:
      subcategoryData.keywordsSection?.relatedHeading?.[0] || "Why Choose Us",
    description: subcategoryData.middleSection?.description1 || "",
    description2: subcategoryData.middleSection?.description2 || "",
    conclusion: subcategoryData.keywordsSection?.relatedDescription?.[1] || "",
    image1: subcategoryData.middleSection?.image1 || "/default-image.jpg",
    image2: subcategoryData.middleSection?.image2 || "/default-image.jpg",
    buttonText: "Get Started",
  };

  return (
    <main>
      {/* Hero Section */}
      <SubHeroDigitalMarketing {...heroProps} />

      {/* Dynamic Services Section (Now using your updated component) */}

      {/* Why Choose Section */}
      <SubWhydigital {...whyChooseProps} />
      <SubKeywordsdigital {...serviceKeywordsProps} />

      {/* CTA 1 */}
      <SubCalltoactiondigital1
        title={subcategoryData.cta1?.heading}
        description={subcategoryData.cta1?.description}
      />

      {/* Industries */}
      <SeoIndustries heading="Industries We Transform" industries={[]} />
      
      {/* CTA 2 */}
      <SubCalltoactiondigital2
        title={subcategoryData.cta2?.heading}
        description={subcategoryData.cta2?.description}
        phoneNumber="+123-456-7890"
      />

      {/* Standard Layout Elements */}
      <Form1 />
      <Carousel />

      {/* Production hidden debug */}
      <div style={{ display: "none" }}>
        <pre>{JSON.stringify(subcategoryData, null, 2)}</pre>
      </div>
    </main>
  );
}

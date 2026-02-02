import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital";
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1";
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subwhydigital";
import Carousel from "@/components/landing/carousel";
import Form1 from "@/components/landing/getaquote";
import Heroform from "@/components/landing/heroform";
import ProposalForm from "@/components/landing/proposalform";
import SeoIndustries from "@/components/landing/seoindustries";
import SEO from "@/components/seo/seo";
import { notFound } from 'next/navigation';

async function getSubCategoryData(slug) {
  try {
    console.log(`Fetching data for slug: ${slug}, category: digital-marketing`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/subcategories?slug=${slug}&category=digital-marketing`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(`API request failed with status ${res.status}: ${await res.text()}`);
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    console.log(`Fetched subcategory data for slug ${slug}:`, data);

    // Handle both array and single object response
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

// Schema Markup generate karne ka function
const generateSchemaMarkup = (subcategory) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": subcategory.name || "Digital Marketing Service",
    "description": subcategory.topSection?.description || subcategory.keywordsSection?.description || "Professional digital marketing service",
    "provider": {
      "@type": "Organization",
      "name": "YourCompany"
    },
    "serviceType": subcategory.name,
    "url": `https://yourdomain.com/digitalmarketing/${subcategory.slug || slug}`,
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    }
  };
};

export default async function SubCategoryPage({ params }) {
  const { slug } = params;
  console.log(`Rendering page for slug: ${slug} under digitalmarketing`);

  const subcategory = await getSubCategoryData(slug);

  if (!subcategory) {
    notFound();
  }

  console.log("Subcategory data for rendering:", subcategory);

  // ✅ Database se SEO data nikal lein (model ke hisab se)
  const seoData = subcategory.seo ? {
    // Agar database mein SEO data hai
    metaTitle: subcategory.seo.metaTitle || subcategory.topSection?.heading || subcategory.name,
    metaDescription: subcategory.seo.metaDescription || subcategory.topSection?.description || subcategory.keywordsSection?.description,
    metaKeywords: subcategory.seo.metaKeywords || subcategory.keywordsSection?.keywords || [],
    schemaMarkup: subcategory.seo.schemaMarkup || generateSchemaMarkup(subcategory)
  } : {
    // Agar database mein SEO data nahi hai
    metaTitle: subcategory.topSection?.heading || subcategory.name || "Digital Marketing Services",
    metaDescription: subcategory.topSection?.description || subcategory.keywordsSection?.description || "Professional digital marketing services",
    metaKeywords: subcategory.keywordsSection?.keywords || ["digital marketing", "services"],
    schemaMarkup: generateSchemaMarkup(subcategory)
  };

  // Map database fields to component props with fallbacks
  const heroProps = {
    backgroundImage: subcategory.topSection?.backgroundImage || "/default-bg.jpg",
    heading: subcategory.topSection?.heading || subcategory.name || "Default Heading",
    description: subcategory.topSection?.description || "No description available",
  };

  const aboutProps = {
    heading: subcategory.middleSection?.description1 || "About This Service",
    description1: subcategory.middleSection?.description1 || "No about description",
    image1: subcategory.middleSection?.image1 || "/default-image.jpg",
    image2: subcategory.middleSection?.image2 || "/default-image.jpg",
    description2: subcategory.middleSection?.description2 || "",
  };

  const whyChooseProps = {
    heading: subcategory.keywordsSection?.relatedHeading?.[0] || "Why Choose Us",
    description: subcategory.middleSection?.description1 || subcategory.keywordsSection?.relatedDescription?.[0] || "No why choose description",
    description2: subcategory.middleSection?.description2 || "",
    conclusion: subcategory.keywordsSection?.relatedDescription?.[1] || "",
    image1: subcategory.middleSection?.image1 || "/default-image.jpg",
    image2: subcategory.middleSection?.image2 || "/default-image.jpg",
    buttonText: "Learn More",
  };

  const keywordsProps = {
    heading: subcategory.keywordsSection?.heading || "Keywords",
    description: subcategory.keywordsSection?.description || "",
    keywords: subcategory.keywordsSection?.keywords || [],
    relatedHeading: subcategory.keywordsSection?.relatedHeading || [],
    relatedDescription: subcategory.keywordsSection?.relatedDescription || [],
    images: [subcategory.middleSection?.image1, subcategory.middleSection?.image2].filter(Boolean) || [],
  };

  const cta1Props = {
    title: subcategory.cta1?.heading || "",
    description: subcategory.cta1?.description || "",
  };

  const cta2Props = {
    title: subcategory.cta2?.heading || "",
    description: subcategory.cta2?.description || "",
    phoneNumber: "+123-456-7890",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  return (
    <main>
      {/* ✅ Sub-category page ke liye SEO - database se actual data */}
      <SEO seo={seoData} />
      
      <SubHeroDigitalMarketing {...heroProps} />
      <Heroform/>
      <SubAboutdigital {...aboutProps} />
      <SubWhydigital {...whyChooseProps} />
      <SubKeywordsdigital {...keywordsProps} />
      <SubCalltoactiondigital1 {...cta1Props} />
      <SeoIndustries {...industriesProps} />
      <SubCalltoactiondigital2 {...cta2Props} />
      <Form1 />
      <Carousel />
    </main>
  );
}
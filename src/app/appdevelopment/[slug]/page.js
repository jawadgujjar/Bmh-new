import SubAboutdigital from "@/components/digital-marketing/sub-category-digital/subaboutdigital"; // Replace with app-specific if needed
import SubCalltoactiondigital1 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital1"; // Replace if needed
import SubCalltoactiondigital2 from "@/components/digital-marketing/sub-category-digital/subcalltoactiondigital2"; // Replace if needed
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero"; // Replace with app-specific if needed
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital"; // Replace if needed
import SubWhydigital from "@/components/digital-marketing/sub-category-digital/subwhydigital"; // Replace if needed
import Carousel from "@/components/landing/carousel";
import ProposalForm from "@/components/landing/proposalform";
import SeoIndustries from "@/components/landing/seoindustries";

async function getSubCategoryData(slug) {
  try {
    console.log(`Fetching data for slug: ${slug}, category: app-development`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/subcategories?slug=${slug}&category=app-development`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(`API request failed with status ${res.status}: ${await res.text()}`);
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    console.log(`Fetched subcategory data for slug ${slug}:`, data);

    // Handle array response consistently
    return Array.isArray(data) && data.length > 0 ? data[0] : (data && typeof data === "object" ? data : null);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

export default async function SubCategoryPage({ params }) {
  const { slug } = params;
  console.log(`Rendering page for slug: ${slug} under appdevelopment`);

  const subcategory = await getSubCategoryData(slug);

  if (!subcategory) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Subcategory not found</h1>
        <p>The requested subcategory does not exist for slug: {slug}</p>
        <p>Check the API response in the console for details.</p>
      </div>
    );
  }

  // Log the subcategory data to debug rendering
  console.log("Subcategory data for rendering:", subcategory);

  // Map database fields to component props with fallbacks, aligned with digital-marketing
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
    heading: subcategory.middleSection?.description1 || "Why Choose Us", // Use middleSection.description1
    description: subcategory.middleSection?.description1 || "No why choose description", // First description
    description2: subcategory.middleSection?.description2 || "", // Second description
    conclusion: "", // Clear to avoid confusion with keywordsSection
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
    // title: subcategory.middleSection?.description1 || "Call to Action",
    // subtitle: subcategory.middleSection?.description1 || "",
    // description: subcategory.middleSection?.description1 || "",
  };

  const cta2Props = {
    // title: subcategory.keywordsSection?.relatedHeading?.[0] || "Get in Touch",
    // subtitle: subcategory.keywordsSection?.relatedHeading?.[0] || "",
    // description: subcategory.keywordsSection?.relatedDescription?.[0] || "",
    // phoneNumber: "+123-456-7890",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  return (
    <main>
      <SubHeroDigitalMarketing {...heroProps} />
      <SubAboutdigital {...aboutProps} />
      <SubWhydigital {...whyChooseProps} />
      <SubKeywordsdigital {...keywordsProps} />
      <SubCalltoactiondigital1 {...cta1Props} />
      <SeoIndustries {...industriesProps} />
      <SubCalltoactiondigital2 {...cta2Props} />
      <ProposalForm />
      <Carousel />
    </main>
  );
}
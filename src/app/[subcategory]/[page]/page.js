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

  return {
    title: pageData.metaTitle || pageData.title || "Service Page",
    description:
      pageData.metaDescription ||
      pageData.topSection?.description ||
      "Professional services",
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

  // Determine category path based on page data
  let categoryPath = "";
  let categoryName = "";

  switch(pageData.category) {
    case "digital-marketing":
      categoryPath = "digitalmarketing";
      categoryName = "Digital Marketing";
      break;
    case "web-development":
      categoryPath = "webdevelopment";
      categoryName = "Web Development";
      break;
    case "app-development":
      categoryPath = "appdevelopment";
      categoryName = "App Development";
      break;
    default:
      // Default to digital marketing if category not set
      categoryPath = "digitalmarketing";
      categoryName = "Digital Marketing";
  }

  // Prepare props for components
  const heroProps = {
    backgroundImage: pageData.topSection?.backgroundImage || "/default-bg.jpg",
    heading: pageData.topSection?.heading || pageData.title || "Service",
    description:
      pageData.topSection?.description ||
      pageData.metaDescription ||
      "Description not available",
  };

  const aboutProps = {
    heading: pageData.middleSection?.description1 || pageData.title,
    description1:
      pageData.middleSection?.description1 ||
      pageData.subcatpagedescr ||
      "Detailed description",
    image1: pageData.middleSection?.image1 || "/default-image.jpg",
    image2: pageData.middleSection?.image2 || "/default-image2.jpg",
    description2: pageData.middleSection?.description2 || "",
  };

  const whyChooseProps = {
    heading: pageData.middleSection?.description1 || "Why Choose Us",
    description: pageData.middleSection?.description1 || "",
    description2: pageData.middleSection?.description2 || "",
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
    description:
      pageData.cta1?.description || "Contact us for a free consultation",
  };

  const cta2Props = {
    title: pageData.cta2?.heading || "Need Help?",
    description:
      pageData.cta2?.description || "Our experts are here to assist you",
    phoneNumber: "+123-456-7890",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  return (
    <main>
      {/* Breadcrumb Navigation */}
      {/* <div
        className="breadcrumb-container"
        style={{
          padding: "15px 20px",
          background: "#f8f9fa",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <div className="container">
          <nav style={{ fontSize: "14px" }}>
            <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>
              Home
            </a>
            <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
            <a
              href={`/${categoryPath}`}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {categoryName}
            </a>
            <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
            <a
              href={`/${categoryPath}/${subcategory}`}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {subcategoryData?.name || subcategory}
            </a>
            <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
            <span style={{ color: "#333", fontWeight: "500" }}>
              {pageData.title}
            </span>
          </nav>
        </div>
      </div> */}

      {/* Page Content */}
      <SubHeroDigitalMarketing {...heroProps} />
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

// Generate static params if needed
export async function generateStaticParams() {
  // You might want to pre-generate pages for known routes
  // Return an empty array for dynamic generation
  return [];
}
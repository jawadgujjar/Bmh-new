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
    console.log(`Fetching subcategory data for slug: ${slug}`);
    
    // IMPORTANT: Remove category parameter
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/subcategories?slug=${slug}`,
      // NOT: /api/subcategories?slug=${slug}&category=digital-marketing
      { cache: "no-store" }
    );

    console.log(`Response status: ${res.status}`);
    
    if (!res.ok) {
      console.error(`API request failed with status ${res.status}: ${await res.text()}`);
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    console.log(`Fetched subcategory data for slug ${slug}:`, data);

    // Handle both array and single object response
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : null;
    }
    
    return data || null;
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
}

async function getPagesForSubcategory(subcategoryId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/page?subcategory=${subcategoryId}`,
      { cache: "no-store" }
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch pages: ${res.status}`);
      return [];
    }
    
    const data = await res.json();
    console.log(`Pages for subcategory ${subcategoryId}:`, data);
    
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export default async function SubcategoryPage({ params }) {
  const { subcategory } = params;
  
  console.log(`=== SUB CATEGORY PAGE ===`);
  console.log(`Subcategory slug from params: ${subcategory}`);

  // Fetch subcategory data
  const subcategoryData = await getSubCategoryData(subcategory);
  
  console.log(`Subcategory data:`, subcategoryData);

  if (!subcategoryData) {
    console.log(`Subcategory not found for slug: ${subcategory}`);
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Subcategory not found</h1>
        <p>The requested subcategory does not exist: {subcategory}</p>
        <p>Check the API response in the console for details.</p>
      </div>
    );
  }

  // Fetch pages for this subcategory
  const pages = await getPagesForSubcategory(subcategoryData._id);
  console.log(`Pages for this subcategory:`, pages);

  // Determine category based on subcategory data or infer from URL
  // Check if subcategory has category field, otherwise try to determine
  let categoryPath = "digitalmarketing";
  let categoryName = "Digital Marketing";
  
  if (subcategoryData.category) {
    // If subcategory has category field
    switch(subcategoryData.category) {
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
    }
  } else {
    // Try to infer from API response structure or other fields
    console.log("No category field in subcategory data, using default");
  }

  console.log(`Category info: ${categoryName} (${categoryPath})`);

  // Map database fields to component props
  const heroProps = {
    backgroundImage: subcategoryData.topSection?.backgroundImage || "/default-bg.jpg",
    heading: subcategoryData.topSection?.heading || subcategoryData.name || "Default Heading",
    description: subcategoryData.topSection?.description || "No description available",
  };

  const aboutProps = {
    heading: subcategoryData.middleSection?.description1 || "About This Service",
    description1: subcategoryData.middleSection?.description1 || "No about description",
    image1: subcategoryData.middleSection?.image1 || "/default-image.jpg",
    image2: subcategoryData.middleSection?.image2 || "/default-image.jpg",
    description2: subcategoryData.middleSection?.description2 || "",
  };

  const whyChooseProps = {
    heading: subcategoryData.keywordsSection?.relatedHeading?.[0] || "Why Choose Us",
    description: subcategoryData.middleSection?.description1 || subcategoryData.keywordsSection?.relatedDescription?.[0] || "No why choose description",
    description2: subcategoryData.middleSection?.description2 || "",
    conclusion: subcategoryData.keywordsSection?.relatedDescription?.[1] || "",
    image1: subcategoryData.middleSection?.image1 || "/default-image.jpg",
    image2: subcategoryData.middleSection?.image2 || "/default-image.jpg",
    buttonText: "Learn More",
  };

  const keywordsProps = {
    heading: subcategoryData.keywordsSection?.heading || "Keywords",
    description: subcategoryData.keywordsSection?.description || "",
    keywords: subcategoryData.keywordsSection?.keywords || [],
    relatedHeading: subcategoryData.keywordsSection?.relatedHeading || [],
    relatedDescription: subcategoryData.keywordsSection?.relatedDescription || [],
    images: [subcategoryData.middleSection?.image1, subcategoryData.middleSection?.image2].filter(Boolean) || [],
  };

  const cta1Props = {
    title: subcategoryData.cta1?.heading || "",
    description: subcategoryData.cta1?.description || "",
  };

  const cta2Props = {
    title: subcategoryData.cta2?.heading || "",
    description: subcategoryData.cta2?.description || "",
    phoneNumber: "+123-456-7890",
  };

  const industriesProps = {
    heading: "Industries We Serve",
    industries: [],
  };

  return (
    <main>
      {/* Breadcrumb */}
      {/* <div style={{ 
        padding: "15px 20px", 
        background: "#f8f9fa", 
        borderBottom: "1px solid #eaeaea" 
      }}>
        <div className="container">
          <nav style={{ fontSize: "14px" }}>
            <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
            <a 
              href={`/${categoryPath}`} 
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {categoryName}
            </a>
            <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
            <span style={{ color: "#333", fontWeight: "500" }}>
              {subcategoryData.name}
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
      
      {/* Child Pages Section */}
      {pages.length > 0 && (
        <section style={{ padding: "60px 20px", background: "#f9f9f9" }}>
          <div className="container">
            <h2 style={{ 
              textAlign: "center", 
              marginBottom: "40px",
              fontSize: "32px",
              color: "#333"
            }}>
              Our {subcategoryData.name} Services
            </h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              {pages.map((page) => (
                <div 
                  key={page._id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
                  }}
                >
                  {page.topSection?.backgroundImage && (
                    <div style={{
                      height: "180px",
                      backgroundImage: `url(${page.topSection.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }} />
                  )}
                  <div style={{ 
                    padding: "25px", 
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <h3 style={{ 
                      marginBottom: "15px", 
                      color: "#333",
                      fontSize: "20px",
                      fontWeight: "600"
                    }}>
                      {page.title}
                    </h3>
                    <p style={{ 
                      color: "#666", 
                      marginBottom: "20px",
                      lineHeight: "1.6",
                      flex: 1,
                      fontSize: "14px"
                    }}>
                      {page.topSection?.description?.substring(0, 120) || 
                       page.metaDescription?.substring(0, 120) || 
                       "Learn more about this service..."}
                    </p>
                    <div style={{ marginTop: "auto" }}>
                      <a 
                        href={`/${subcategory}/${page.slug}`}
                        style={{
                          display: "inline-block",
                          padding: "12px 25px",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "6px",
                          fontWeight: "500",
                          textAlign: "center",
                          width: "100%",
                          transition: "all 0.3s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, #764ba2 0%, #667eea 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                        }}
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Form1 />
      <Carousel />
      
      {/* Debug info - remove in production */}
      <div style={{ display: 'none' }}>
        <pre>{JSON.stringify(subcategoryData, null, 2)}</pre>
      </div>
    </main>
  );
}
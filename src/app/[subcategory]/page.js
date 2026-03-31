import { notFound } from "next/navigation";
import SubHeroDigitalMarketing from "@/components/digital-marketing/sub-category-digital/subdigitalhero";
import SubKeywordsdigital from "@/components/digital-marketing/sub-category-digital/subkeywordsdigital";
import Heroform from "@/components/landing/heroform";
import SubDynamicSection from "@/components/digital-marketing/sub-category-digital/subdynamicsection";
import SubFaqs from "../../components/digital-marketing/sub-category-digital/subfaqs";

function HtmlContent({ content, className = "" }) {
  if (!content) return null;
  return (
    <div
      className={`${className} leading-snug`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

async function getSubCategoryData(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/subcategories?slug=${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    return null;
  }
}

export default async function SubcategoryPage({ params }) {
  const { subcategory } = await params;
  const subcategoryData = await getSubCategoryData(subcategory);

  if (!subcategoryData) return notFound();

  const sortedSections =
    subcategoryData.sections?.sort((a, b) => (a.order || 0) - (b.order || 0)) ||
    [];

  return (
    <main className="flex flex-col w-full p-0 m-0 overflow-x-hidden">
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

      <div className="py-10 bg-white">
        <SubKeywordsdigital
          heading={` ${subcategoryData.keywordstitle} `}
          description={
            <HtmlContent
              content={subcategoryData.keywordsSection?.description}
            />
          }
          subcategoryId={subcategoryData._id}
          category={subcategoryData.category}
        />
      </div>

      {sortedSections.map((section, index) => (
        <SubDynamicSection
          key={index}
          layoutType={section.layoutType}
          heading={section.heading}
          description={section.description}
          image={section.image}
          cta={section.cta}
          // 🔥 Yeh naye props lazmi pass karne hain:
          showButton={section.showButton}
          buttonText={section.buttonText}
          buttonLink={section.buttonLink}
          buttonVariant={section.buttonVariant}
          index={index}
        />
      ))}

      <div className="py-10">
        <SubFaqs
          faqs={subcategoryData.faqs || []}
          title={`Frequently Asked Questions About ${subcategoryData.name}`}
        />
      </div>
    </main>
  );
}

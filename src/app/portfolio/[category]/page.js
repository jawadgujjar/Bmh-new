import mongoose from "mongoose";
import Keyword from "@/models/portfolio";
import PortfolioRemain from "@/components/portfolio/portfolioremaining";
import Herofirstportfolio1 from "@/components/portfolio/herofirstportfolio";
import { notFound } from "next/navigation";

// slug helper
const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default async function CategoryPage({ params }) {
  await mongoose.connect(process.env.MONGODB_URI);

  // 🔹 Next.js 14 fix: await params destructuring
  const { category: categorySlug } = await params;

  const keywords = await Keyword.find().lean();
  const safeKeywords = JSON.parse(JSON.stringify(keywords));

  // 🔹 Match category
  const categoryMatch = safeKeywords.find(
    (item) => slugify(item.keyword) === categorySlug
  );

  if (!categoryMatch) notFound();

  return (
    <main>
      <Herofirstportfolio1
        header={{
          title: categoryMatch.keyword,
          subtitle: `Our ${categoryMatch.keyword} Portfolio`,
        }}
      />
      <PortfolioRemain initialCategory={categoryMatch.keyword} />
    </main>
  );
}

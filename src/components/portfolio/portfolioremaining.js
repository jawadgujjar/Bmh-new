"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ client-side navigation
import Carousel from "../landing/carousel";
import Portfolio from "./portfolio";
import styles from "../../styles/portfolioremianing.module.css";

// slug helper
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const PortfolioRemain = ({ initialCategory = "All" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [portfolioData, setPortfolioData] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const router = useRouter();

  // 🔹 Fetch portfolio data from API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio");
        const result = await response.json();

        if (result.success) {
          const keywordsData = result.data || [];

          // 🔹 Extract unique categories
          const uniqueKeywords = [
            ...new Set(keywordsData.map((item) => item.keyword)),
          ];
          setCategories(["All", ...uniqueKeywords]);

          // 🔹 Flatten all projects with category info
          const flattenedWebsites = keywordsData.flatMap((keywordItem) =>
            (keywordItem.websites || []).map((website) => ({
              ...website,
              keyword: keywordItem.keyword,
              categorySlug: slugify(keywordItem.keyword), // ✅ pre-slugify for safe routing
              projectSlug: slugify(
                website?.portfolioPage?.header?.title || ""
              ), // ✅ slug for project
            }))
          );

          setPortfolioData(flattenedWebsites);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  // 🔹 Handle category button click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    const slug = category === "All" ? "" : slugify(category);
    router.push(slug ? `/portfolio/${slug}` : "/portfolio");
  };

  return (
    <div>
      {/* Categories */}
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio listing */}
      <Portfolio
        activeCategory={activeCategory}
        portfolioData={portfolioData}
      />

      {/* CTA Section */}
      <div className={styles.containerportfolio}>
        <div className={styles.textBox}>
          <p>How Does Your Site Compare?</p>
          <button className={styles.actionButton}>Free Report</button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel />
    </div>
  );
};

export default PortfolioRemain;

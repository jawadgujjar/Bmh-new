"use client";
import React, { useState, useEffect } from "react";
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

  // 🔹 Fetch portfolio data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio");
        const result = await response.json();

        if (result.success) {
          const keywordsData = result.data || [];

          const uniqueKeywords = [
            ...new Set(keywordsData.map((item) => item.keyword)),
          ];

          setCategories(["All", ...uniqueKeywords]);

          const flattenedWebsites = keywordsData.flatMap((keywordItem) =>
            keywordItem.websites.map((website) => ({
              ...website,
              keyword: keywordItem.keyword,
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
            onClick={() => {
              setActiveCategory(category);

              // URL update (UX same, SEO handled server-side)
              if (category === "All") {
                window.history.pushState({}, "", "/portfolio");
              } else {
                window.history.pushState(
                  {},
                  "",
                  `/portfolio/${slugify(category)}`
                );
              }
            }}
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

      {/* CTA */}
      <div className={styles.containerportfolio}>
        <div className={styles.textBox}>
          <p>How Does Your Site Compare?</p>
          <button className={styles.actionButton}>Free Report</button>
        </div>
      </div>

      <Carousel />
    </div>
  );
};

export default PortfolioRemain;

"use client";
import React from "react";
import Link from "next/link";
import styles from "../../styles/portfolio.module.css";

// slug helper
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const Portfolio = ({ activeCategory, portfolioData }) => {
  // Filter projects by category
  const filteredData = portfolioData.filter((item) => {
    if (activeCategory === "All") return true;
    return item.keyword === activeCategory; // Exact match with DB keyword
  });

  return (
    <div className={styles.portfolioWrapper}>
      {filteredData.map((item, index) => {
        const categorySlug = slugify(item.keyword); // ✅ category slug
        const projectSlug = slugify(item.portfolioPage?.header?.title || ""); // ✅ project slug
        const previewUrl = item.portfolioPage?.header?.image || "";
        const title = item.portfolioPage?.header?.title || "Untitled";
        const description = item.portfolioPage?.header?.description || "";

        return (
          <Link
            key={index}
            href={`/portfolio/${categorySlug}/${projectSlug}`} // ✅ dynamic route
            className={styles.portfolioCardLink}
            data-item={JSON.stringify(item)}
          >
            <div className={styles.portfolioCard}>
              <div className={styles.portfolioCardInner}>
                <div className={styles.portfolioCardImageWrapper}>
                  <div className={styles.portfolioCardHoverPreview}>
                    <iframe
                      src={previewUrl}
                      className={styles.websitePreviewFrame}
                      title={`${title} preview`}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                </div>
                <div className={styles.portfolioCardContent}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className={styles.viewProjectBtn}>View Project Details</div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Portfolio;

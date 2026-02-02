"use client";
import React from "react";
import Link from "next/link";
import styles from "../../styles/portfolio.module.css";

// slug helper
const slugify = (text = "") =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const Portfolio = ({ activeCategory, portfolioData }) => {

  const filteredData = portfolioData.filter((item) => {
    if (activeCategory === "All") return true;
    return item.keyword === activeCategory;
  });

  return (
    <div className={styles.portfolioWrapper}>
      {filteredData.map((item, index) => {
        const categorySlug = slugify(item.keyword);
        const projectSlug = slugify(item.portfolioPage?.header?.title || "");
        const imageUrl = item.portfolioPage?.header?.image || "/placeholder.jpg";
        const title = item.portfolioPage?.header?.title || "Untitled";
        const description = item.portfolioPage?.header?.description || "";

        return (
          <Link
            key={index}
            href={`/portfolio/${categorySlug}/${projectSlug}`}
            className={styles.portfolioCardLink}
          >
            <div className={styles.portfolioCard}>
              <div className={styles.portfolioCardInner}>

                {/* ✅ LANDING IMAGE PREVIEW */}
                <div className={styles.portfolioCardImageWrapper}>
                  <img
                    src={imageUrl}
                    alt={title}
                    className={styles.websitePreviewImage}
                  />
                </div>

                {/* Text Content */}
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

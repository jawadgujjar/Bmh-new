"use client";
import React from "react";
import Link from "next/link";
import styles from "../../styles/portfolio.module.css";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const Portfolio = ({ activeCategory, portfolioData }) => {
  const filteredData = portfolioData.filter((item) => {
    if (activeCategory === "All") return true;
    return item.keyword === activeCategory;
  });

  return (
    <div className={styles.portfolioWrapper}>
      {filteredData.map((item, index) => {
        const title = item.portfolioPage?.header?.title || "Project";
        const categorySlug = slugify(item.keyword || "service");
        const projectSlug = slugify(title);
        const imageUrl =
          item.portfolioPage?.header?.image || "/placeholder.jpg";
        const description = item.portfolioPage?.header?.description || "";

        return (
          <Link
            key={index}
            href={`/portfolio/${categorySlug}/${projectSlug}`}
            className={styles.portfolioCardLink}
          >
            <div className={styles.portfolioCard}>
              <div className={styles.portfolioCardInner}>
                <div className={styles.portfolioCardImageWrapper}>
                  <img
                    src={imageUrl}
                    alt={title}
                    className={styles.websitePreviewImage}
                    loading="lazy"
                  />

                  <div className={styles.portfolioCardContent}>
                    <h3>{title}</h3>
                    <p>
                      {description.substring(0, 60)}
                      {description.length > 60 ? "..." : ""}
                    </p>
                    <span className={styles.viewProjectBtn}>
                      View Project Details
                    </span>
                  </div>
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

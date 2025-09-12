"use client";
import React, { useState } from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subkeywordsdigital.module.css";

function SubKeywordsdigital({
  heading = "Keywords",
  description = "",
  keywords = [],
  relatedHeading = [],
  relatedDescription = [],
  images = [], // Keep for optional image
}) {
  const [activeContent, setActiveContent] = useState({
    title: keywords[0] || "",
    content: relatedDescription[0] || "",
    image: images[0] || null, // Default to first image or null
  });
  const [activeKeyword, setActiveKeyword] = useState(keywords[0] || "");

  const handleKeywordClick = (keyword, index) => {
    const relatedDescriptionIndex = Math.min(index, relatedDescription.length - 1);
    const imageIndex = Math.min(index, images.length - 1); // Match image to index
    setActiveContent({
      title: keyword,
      content: relatedDescription[relatedDescriptionIndex] || "",
      image: images[imageIndex] || null,
    });
    setActiveKeyword(keyword);
  };

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>{heading}</h1>
        {description && (
          <div className={styles.subTitleContainer}>
            <h2 className={styles.subTitle}>{description}</h2>
            <div className={styles.titleUnderline}></div>
          </div>
        )}
      </div>

      <div className={styles.keywordsRow}>
        {keywords.map((keyword, index) => (
          <button
            key={index}
            className={`${styles.keywordButton} ${activeKeyword === keyword ? styles.activeKeyword : ""}`}
            onClick={() => handleKeywordClick(keyword, index)}
          >
            <span className={styles.keywordText}>{keyword}</span>
            {activeKeyword === keyword && <div className={styles.activeIndicator}></div>}
          </button>
        ))}
      </div>

      <div className={styles.dividerContainer}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>✦</div>
        <div className={styles.dividerLine}></div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <h3 className={styles.contentTitle}>{activeContent.title}</h3>
          <div className={styles.contentIcon}>◉</div>
        </div>
        <p className={styles.contentText}>{activeContent.content || ""}</p>
        {activeContent.content && ( // Show button only if there’s content
          <button className={styles.ctaButton}>
            Explore More
            <span className={styles.arrow}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default SubKeywordsdigital;
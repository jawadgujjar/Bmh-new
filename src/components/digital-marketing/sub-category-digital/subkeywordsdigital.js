"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subkeywordsdigital.module.css";

function SubKeywordsdigital({
  heading = "Our Specialized Services",
  description = "",
  subcategoryId = "",
  category = "",
  // Fallbacks in case API fails
  fallbackKeywords = [], 
}) {
  const [pages, setPages] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      if (!subcategoryId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Direct call to your existing API route
        const res = await fetch(`/api/page?subcategory=${subcategoryId}`);
        
        if (!res.ok) throw new Error("Failed to fetch services");
        
        const data = await res.json();
        setPages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading subcategory pages:", err);
        setError("Could not load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [subcategoryId]);

  const activePage = pages[activePageIndex];

  if (loading) return <div className={styles.loading}>Loading Services...</div>;
  if (!pages.length && !loading) return null; // Don't show anything if no pages found

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.mainTitle}>{heading}</h2>
        {description && (
          <div className={styles.subTitleContainer}>
            <p className={styles.subTitle}>{description}</p>
            <div className={styles.titleUnderline}></div>
          </div>
        )}
      </div>

      {/* Pages Selection Row (Buttons) */}
      <div className={styles.keywordsRow}>
        {pages.map((page, index) => (
          <button
            key={page._id}
            className={`${styles.keywordButton} ${
              activePageIndex === index ? styles.activeKeyword : ""
            }`}
            onClick={() => setActivePageIndex(index)}
          >
            <span className={styles.keywordText}>{page.title}</span>
            {activePageIndex === index && <div className={styles.activeIndicator}></div>}
          </button>
        ))}
      </div>

      <div className={styles.dividerContainer}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>✦</div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Content Section: Showing Title and subcatpagedescr */}
      <div className={styles.contentSection}>
        {activePage && (
          <>
            <div className={styles.contentHeader}>
              <h3 className={styles.contentTitle}>{activePage.title}</h3>
              <div className={styles.contentIcon}>◉</div>
            </div>
            
            <p className={styles.contentText}>
              {/* Yahan subcatpagedescr show ho raha hai */}
              {activePage.subcatpagedescr || activePage.topSection?.description}
            </p>

            <a 
              href={`/${activePage.slug}`} 
              className={styles.ctaButton}
            >
              Learn More About {activePage.title}
              <span className={styles.arrow}>→</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default SubKeywordsdigital;
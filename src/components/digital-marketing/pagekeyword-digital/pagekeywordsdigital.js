"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/digital-marketing/sub-category-digital/subkeywordsdigital.module.css";

function PageKeywordsdigital({
  heading = "Our Specialized Services",
  description = "",
  subcategoryId = "",
  category = "", // pass the parent subcategory slug here
  currentPageSlug = "", // Pass the current page slug to exclude it
  fallbackKeywords = [],
}) {
  const router = useRouter();
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
        const res = await fetch(`/api/page?subcategory=${subcategoryId}`);

        if (!res.ok) throw new Error("Failed to fetch services");

        const result = await res.json();

        // Fix: Handle the response structure correctly
        let pagesData = [];
        if (result.success && Array.isArray(result.data)) {
          pagesData = result.data;
        } else if (Array.isArray(result)) {
          pagesData = result;
        } else {
          pagesData = [];
        }

        // Filter out the current page if currentPageSlug is provided
        if (currentPageSlug) {
          pagesData = pagesData.filter(page => page.slug !== currentPageSlug);
        }

        setPages(pagesData);
      } catch (err) {
        console.error("Error loading subcategory pages:", err);
        setError("Could not load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [subcategoryId, currentPageSlug]);

  const activePage = pages[activePageIndex];

  if (loading) return <div className={styles.loading}>Loading Services...</div>;
  if (!pages.length && !loading) return null;

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.mainTitle}>{heading}</h2>
        {description && (
          <div className={styles.subTitleContainer}>
            <div className={styles.subTitle}>{description}</div>
            <div className={styles.titleUnderline}></div>
          </div>
        )}
      </div>

      {/* Pages Buttons Row - Only shows other pages, not the current one */}
      <div className={styles.keywordsRow}>
        {pages.map((page, index) => (
          <button
            key={page._id}
            className={`${styles.keywordButton} ${activePageIndex === index ? styles.activeKeyword : ""}`}
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

      {/* Content Section - Shows content for selected OTHER pages */}
      {activePage && (
        <div className={styles.contentSection}>
          <div className={styles.contentHeader}>
            <h3 className={styles.contentTitle}>{activePage.title}</h3>
            <div className={styles.contentIcon}>◉</div>
          </div>

          <p className={styles.contentText}>
            {activePage.subcatpagedescr || activePage.topSection?.description}
          </p>

          {/* CTA Navigation */}
          <div className={styles.contentFooter}>
            <button
              className={styles.ctaButton}
              onClick={() => router.push(`/${category}/${activePage.slug}`)}
            >
              Learn More About {activePage.title}
              <span className={styles.arrow}>→</span>
            </button>
          </div>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default PageKeywordsdigital;
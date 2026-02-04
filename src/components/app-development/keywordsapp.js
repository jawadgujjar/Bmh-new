"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/app-development/keywordsapp.module.css";

export default function Keywordsapp() {
  const router = useRouter();
  const [pages, setPages] = useState({});
  const [activePage, setActivePage] = useState(null);
  const [activeKey, setActiveKey] = useState("");

  // Fetch App Development pages from API
  const fetchPages = async () => {
    try {
      const res = await fetch("/api/selected-pages?category=app-development");
      const data = await res.json();

      // Transform to { title: {title, description, slug} }
      const formatted = {};
      data.forEach((page) => {
        formatted[page.title] = {
          title: page.title,
          description: page.subcatpagedescr || "No description available",
          slug: page.slug, // ensure slug exists
        };
      });

      setPages(formatted);

      // Set first page as active
      const firstKey = Object.keys(formatted)[0];
      setActiveKey(firstKey);
      setActivePage(formatted[firstKey]);
    } catch (err) {
      console.error("Error fetching pages:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleClick = (key) => {
    setActiveKey(key);
    setActivePage(pages[key]);
  };

  const handleExploreClick = () => {
    if (activePage?.slug) {
      router.push(`/app-development/${activePage.slug}`);
    }
  };

  if (!activePage) return <p className="text-center mt-10">Loading pages...</p>;

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>
          End-to-End Mobile App Development Services
        </h1>
        <div className={styles.subTitleContainer}>
          <h2 className={styles.subTitle}>
            From idea to launch — we build secure, scalable, and stunning mobile apps that users love.
          </h2>
          <div className={styles.titleUnderline}></div>
        </div>
      </div>

      {/* Pages buttons row */}
      <div className={styles.keywordsRow}>
        {Object.keys(pages).map((key, index) => (
          <button
            key={index}
            className={`${styles.keywordButton} ${
              activeKey === key ? styles.activeKeyword : ""
            }`}
            onClick={() => handleClick(key)}
          >
            <span className={styles.keywordText}>{key}</span>
            {activeKey === key && <div className={styles.activeIndicator}></div>}
          </button>
        ))}
      </div>

      <div className={styles.dividerContainer}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>✦</div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* Dynamic content section */}
      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <h3 className={styles.contentTitle}>{activePage.title}</h3>
          <div className={styles.contentIcon}>◉</div>
        </div>
        <p className={styles.contentText}>{activePage.description}</p>
        <div className={styles.contentFooter}>
          <button className={styles.ctaButton} onClick={handleExploreClick}>
            Explore Service
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

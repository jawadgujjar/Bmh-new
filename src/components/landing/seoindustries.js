"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/landing/seoindustries.module.css";

// slug helper
const slugify = (text = "") =>
  text?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const SeoIndustries = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  // ✅ Fetch portfolio
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const result = await res.json();

        if (result.success) {
          const keywordsData = result.data || [];

          const flattenedWebsites = keywordsData.flatMap((keywordItem) =>
            (keywordItem.websites || []).map((website) => ({
              ...website,
              keyword: keywordItem.keyword,
              categorySlug: slugify(keywordItem.keyword),
              projectSlug: slugify(
                website?.portfolioPage?.header?.title || ""
              ),
            }))
          );

          setPortfolioData(flattenedWebsites);
        }
      } catch (error) {
        console.error("Portfolio fetch error:", error);
        setPortfolioData([]);
      }
    };

    fetchPortfolio();
  }, []);

  // ✅ Auto carousel slide
  useEffect(() => {
    if (!portfolioData.length) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % portfolioData.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, portfolioData.length]);

  // ✅ Click → Portfolio detail page
  const handleClick = (item) => {
    router.push(`/portfolio/${item.categorySlug}/${item.projectSlug}`);
  };

  // ✅ Loading fallback
  if (!portfolioData.length) {
    return (
      <div className={styles.carouselContainer}>
        <h2 className={styles.carouselTitle}>
          Completed Projects with Proven Results
        </h2>
        <p className={styles.carouselSubtitle}>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>
        Completed Projects with Proven Results
      </h2>
      <p className={styles.carouselSubtitle}>
        SEO-driven app and web solutions for growth.
      </p>

      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${activeIndex * 25}%)` }}
        >
          {portfolioData.map((item, index) => {
            const title = item.portfolioPage?.header?.title || "Untitled";
            const description =
              item.portfolioPage?.header?.description || "";
            const imageUrl =
              item.portfolioPage?.header?.image || "/placeholder.jpg";

            return (
              <div
                key={index}
                className={`${styles.carouselSlide} ${
                  Math.abs(activeIndex - index) < 4
                    ? styles.activeSlide
                    : ""
                }`}
              >
                <div
                  className={styles.carouselCard}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => handleClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  {/* ✅ IMAGE PREVIEW */}
                  <img
                    src={imageUrl}
                    alt={title}
                    className={styles.cardImage}
                  />

                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDescription}>{description}</p>

                  <span className={styles.viewProjectBtn}>
                    View Project
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ✅ Indicators */}
      <div className={styles.carouselIndicators}>
        {portfolioData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.indicator} ${
              index === activeIndex ? styles.activeIndicator : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SeoIndustries;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/landing/seoindustries.module.css";

const slugify = (text = "") =>
  text
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

const SeoIndustries = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const router = useRouter();

  // Screen size check for responsive sliding
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setVisibleSlides(1.2);
      else if (window.innerWidth < 1024) setVisibleSlides(2.5);
      else setVisibleSlides(4);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

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
              categorySlug: slugify(keywordItem.keyword),
              projectSlug: slugify(website?.portfolioPage?.header?.title || ""),
            })),
          );
          setPortfolioData(flattenedWebsites);
        }
      } catch (error) {
        console.error("Fetch error", error);
      }
    };
    fetchPortfolio();
  }, []);

  // ✅ Auto-slide logic: Sirf tab chalega jab data visibleSlides se zyada ho
  const canScroll = portfolioData.length > visibleSlides;

  const nextSlide = useCallback(() => {
    if (!canScroll) return;
    setActiveIndex((prev) => (prev + 1) % portfolioData.length);
  }, [portfolioData.length, canScroll]);

  useEffect(() => {
    if (isPaused || !canScroll) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, canScroll]);

  if (!portfolioData.length) return null;

  const slideWidth = 100 / visibleSlides;

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>
        Completed Projects with Proven Results
      </h2>
      <p className={styles.carouselSubtitle}>
        SEO-driven solutions for growth.
      </p>

      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{
            // Agar scroll nahi ho sakta toh transform 0 rahega
            transform: canScroll
              ? `translateX(-${activeIndex * slideWidth}%)`
              : "translateX(0)",
            justifyContent: canScroll ? "flex-start" : "center", // Center if less cards
          }}
        >
          {portfolioData.map((item, index) => (
            <div
              key={index}
              className={styles.carouselSlide}
              style={{ minWidth: `${slideWidth}%` }}
            >
              <div
                className={styles.portfolioCard}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() =>
                  router.push(
                    `/portfolio/${item.categorySlug}/${item.projectSlug}`,
                  )
                }
              >
                <div className={styles.portfolioCardInner}>
                  <div className={styles.portfolioCardImageWrapper}>
                    <img
                      src={
                        item.portfolioPage?.header?.image || "/placeholder.jpg"
                      }
                      alt="Project Preview"
                      className={styles.websitePreviewImage}
                    />

                    <div className={styles.portfolioCardContent}>
                      <h3>{item.portfolioPage?.header?.title || "Untitled"}</h3>
                      <p>{item.portfolioPage?.header?.description}</p>
                      <button className={styles.viewProjectBtn}>
                        VIEW PROJECT DETAILS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Indicators: Sirf tabhi dikhen jab scrollable ho */}
      {canScroll && (
        <div className={styles.carouselIndicators}>
          {portfolioData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeoIndustries;

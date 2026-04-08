"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/digital-marketing/sub-category-digital/subkeywordsdigital.module.css";

function PageKeywordsdigital({
  subcategoryId,
  currentPageSlug,
  category = "digital-marketing", // Default category agar pass na ho
  heading = "Our Specialized Services",
  description = "",
}) {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      // Safety check for ID
      const id =
        typeof subcategoryId === "object" ? subcategoryId._id : subcategoryId;

      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/page?subcategory=${id}`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          // Current page ko list se nikal rahe hain
          const filtered = result.data.filter(
            (p) => p.slug !== currentPageSlug,
          );
          setPages(filtered);
        }
      } catch (err) {
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [subcategoryId, currentPageSlug]);

  const activePage = pages[activePageIndex];

  if (loading) return <div className={styles.loading}>Loading Services...</div>;
  if (!pages.length) return null; // Agar koi sibling page nahi hai toh section hide ho jayega

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

      {/* Keywords Area */}
      <div className={styles.keywordsRow}>
        {pages.map((page, index) => (
          <React.Fragment key={page._id}>
            <button
              className={`${styles.keywordButton} ${
                activePageIndex === index ? styles.activeKeyword : ""
              }`}
              onClick={() => setActivePageIndex(index)}
            >
              <span className={styles.keywordText}>{page.title}</span>
              {activePageIndex === index && (
                <div className={styles.activeIndicator}></div>
              )}
            </button>

            {/* MOBILE ONLY CONTENT: Har button ke foran baad mobile view mein box ayega */}
            {activePageIndex === index && (
              <div className={styles.mobileContentSection}>
                <div
                  className={styles.contentText}
                  dangerouslySetInnerHTML={{
                    __html:
                      page.subcatpagedescr || page.topSection?.description,
                  }}
                />
                <button
                  className={styles.ctaButton}
                  onClick={() => router.push(`/${category}/${page.slug}`)}
                >
                  Learn More About {page.title}
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* DESKTOP ONLY SECTION: Neeche wala bara box (Hidden on Mobile via CSS) */}
      <div className={styles.desktopOnlyContent}>
        <div className={styles.dividerContainer}>
          <div className={styles.dividerLine}></div>
          <div className={styles.dividerLine}></div>
        </div>

        {activePage && (
          <div className={styles.contentSection}>
            <div className={styles.contentHeader}>
              <h3 className={styles.contentTitle}>{activePage.title}</h3>
            </div>
            <div
              className={styles.contentText}
              dangerouslySetInnerHTML={{
                __html:
                  activePage.subcatpagedescr ||
                  activePage.topSection?.description,
              }}
            />
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
      </div>
    </div>
  );
}

export default PageKeywordsdigital;

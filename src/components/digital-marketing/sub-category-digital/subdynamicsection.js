"use client";
import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subdynamicsection.module.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

// Global CTA Component (For the big banner CTA)
function GlobalCTA({ ctaData }) {
  if (!ctaData) return null;
  const data = ctaData.ctaId || ctaData;

  return (
    <div className={styles.fullWidthCtaWrapper}>
      <div className={styles.ctaContainer}>
        <div className={styles.animatedLine}></div>
        <div className={styles.initialStep}>
          <div className={styles.titleWrapper}>
            <div className={styles.circle}></div>
            <h4 className={styles.ctaTitle}>
              {data.title || data.name || "Get a Quote"}
            </h4>
            <div className={styles.circle}></div>
          </div>
          <p className={styles.ctaDescriptionText}>
            {data.description || "Get Consultation with Us"}
          </p>
          <Link href={data.buttonLink || "/getaquote"} passHref>
            <button className={styles.quoteButton}>
              {data.buttonText || "Get a Quote"}
              <ArrowRightOutlined className={styles.arrowIcon} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SubDynamicSection({
  layoutType = "description-only",
  heading = "",
  description = "",
  image = "",
  cta = null,
  index = 0,
  showButton = false,
  buttonText = "Get a Quote",
  buttonLink = "/getaquote",
}) {
  const isInlineButtonVisible = showButton === true || showButton === "true";

  return (
    <div className="w-full">
      <section
        className={`${styles.sectionWrapper} ${index % 2 !== 0 ? styles.alternateBg : ""}`}
      >
        <div className={styles.mainContainer}>
          {layoutType === "description-only" ? (
            <div className={styles.centeredContent}>
              <h2 className={styles.mainHeading}>{heading}</h2>
              <div
                className={styles.mainDescription}
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {/* Inline Button (Small) */}
              {isInlineButtonVisible && (
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <Link href={buttonLink}>
                    <button className={styles.quoteButton}>
                      {buttonText}{" "}
                      <ArrowRightOutlined className={styles.arrowIcon} />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`${styles.flexRow} ${layoutType === "image-right" ? styles.rowReverse : ""}`}
            >
              <div className={styles.imageCol}>
                <div className={styles.imageBox}>
                  <Image
                    src={image || "/default.jpg"}
                    alt={heading}
                    width={600}
                    height={450}
                    layout="responsive"
                    className={styles.actualImg}
                  />
                </div>
              </div>
              <div className={styles.textCol}>
                <h2 className={styles.sideHeading}>{heading}</h2>
                <div
                  className={styles.sideDescription}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                {/* Inline Button (Small) */}
                {isInlineButtonVisible && (
                  <div style={{ marginTop: "20px" }}>
                    <Link href={buttonLink}>
                      <button className={styles.quoteButton}>
                        {buttonText}{" "}
                        <ArrowRightOutlined className={styles.arrowIcon} />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global CTA (Big Banner) */}
      {cta && <GlobalCTA ctaData={cta} />}
    </div>
  );
}

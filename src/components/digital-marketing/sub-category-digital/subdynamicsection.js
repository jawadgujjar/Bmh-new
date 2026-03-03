"use client";

import React, { useState } from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subdynamicsection.module.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

// Premium CTA Component using your specific data structure
function GlobalCTA({ ctaData }) {
  if (!ctaData) return null;

  return (
    <div className={styles.fullWidthCtaWrapper}>
      <div className={styles.ctaContainer}>
        <div className={styles.animatedLine}></div>

        <div className={styles.initialStep}>
          {/* 1. Title Uper */}
          <div className={styles.titleWrapper}>
            <div className={styles.circle}></div>
            <h4 className={styles.ctaTitle}>
              {ctaData.title || "Get a Quote"}
            </h4>
            <div className={styles.circle}></div>
          </div>

          {/* 2. Description Neeche */}
          <div className={styles.ctaSubtitleWrapper}>
            <p className={styles.ctaDescriptionText}>
              {ctaData.description || "Get Consultation with Us"}
            </p>
          </div>

          {/* 3. Button with Link & Text */}
          <Link href={ctaData.buttonLink || "/getaquote"} passHref>
            <button className={styles.quoteButton}>
              {ctaData.buttonText || "Get a Quote"}
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
}) {
  // Extracting data from your object structure
  const ctaData = cta?.ctaId || cta || null;

  return (
    <>
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
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Full Width CTA appearing separately */}
      {ctaData && <GlobalCTA ctaData={ctaData} />}
    </>
  );
}

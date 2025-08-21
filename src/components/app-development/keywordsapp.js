"use client";

import React, { useState } from "react";
import styles from "../../styles/app-development/keywordsapp.module.css";

function Keywordsapp() {
  // Mobile App Development keyword content
  const keywordContent = {
    "Native & Cross-Platform Apps": {
      title: "Native & Cross-Platform App Development",
      content:
        "We build high-performance mobile apps for both iOS and Android using native languages (Swift, Kotlin) and cross-platform frameworks like Flutter and React Native."
    },
    "UI/UX Design": {
      title: "Mobile UI/UX Design Services",
      content:
        "We craft intuitive and visually appealing interfaces that enhance the user journey across mobile devices, ensuring engagement and retention."
    },
    "App Store Optimization (ASO)": {
      title: "App Store Optimization (ASO)",
      content:
        "Improve your app's visibility and downloads with our ASO services — from keyword research to optimizing app titles, descriptions, and visuals."
    },
    "Mobile App QA & Testing": {
      title: "Mobile App Testing & Quality Assurance",
      content:
        "Ensure bug-free performance with rigorous manual and automated testing across devices, platforms, and operating systems."
    },
    "Push Notifications & Engagement": {
      title: "Push Notifications & User Engagement",
      content:
        "Re-engage users and drive retention through personalized push notifications, in-app messaging, and behavioral triggers."
    },
    "Backend & API Integration": {
      title: "Backend Integration & API Services",
      content:
        "We connect your mobile app with powerful backends, third-party APIs, databases, and cloud platforms for seamless functionality."
    },
    "Maintenance & Updates": {
      title: "App Maintenance & Version Updates",
      content:
        "Keep your app running smoothly with regular updates, OS compatibility checks, and performance monitoring."
    },
    "Ongoing Support": {
      title: "24/7 App Support & Monitoring",
      content:
        "Our team is available around the clock for troubleshooting, analytics monitoring, crash reports, and emergency fixes."
    }
  };

  const defaultKey = "Native & Cross-Platform Apps";

  const [activeKeyword, setActiveKeyword] = useState(defaultKey);
  const [activeContent, setActiveContent] = useState(keywordContent[defaultKey]);

  const handleKeywordClick = (keyword) => {
    setActiveContent(keywordContent[keyword]);
    setActiveKeyword(keyword);
  };

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
      
      {/* Keywords buttons row */}
      <div className={styles.keywordsRow}>
        {Object.keys(keywordContent).map((keyword, index) => (
          <button 
            key={index} 
            className={`${styles.keywordButton} ${activeKeyword === keyword ? styles.activeKeyword : ''}`}
            onClick={() => handleKeywordClick(keyword)}
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
      
      {/* Dynamic content section */}
      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <h3 className={styles.contentTitle}>{activeContent.title}</h3>
          <div className={styles.contentIcon}>◉</div>
        </div>
        <p className={styles.contentText}>{activeContent.content}</p>
        <div className={styles.contentFooter}>
          <button className={styles.ctaButton}>
            Explore Service
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Keywordsapp;
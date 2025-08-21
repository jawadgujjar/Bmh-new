"use client";

import React, { useState } from "react";
import styles from "../../styles/web-development/keywordsweb.module.css";

function Keywordsweb() {
  // Updated keyword content
  const keywordContent = {
    "Full Stack Migration & Porting": {
      title: "Full Stack Migration & Porting Services",
      content:
        "We offer seamless migration and porting solutions for full-stack applications, ensuring data integrity, compatibility, and minimal downtime during transitions.",
    },
    "Integration Provider": {
      title: "System Integration Services",
      content:
        "Our integration services help connect your existing systems, applications, and APIs for a unified, efficient digital environment.",
    },
    "CMS Development Service": {
      title: "Custom CMS Development",
      content:
        "From WordPress to enterprise CMS platforms, we develop content management systems tailored to your specific business requirements.",
    },
    "Full-Stack Development For E-Commerce": {
      title: "Full-Stack E-Commerce Solutions",
      content:
        "We provide complete front-end and back-end development for e-commerce platforms, ensuring scalability, performance, and secure transactions.",
    },
    "Completely Integrated Mobile Development": {
      title: "End-to-End Mobile App Development",
      content:
        "Our mobile solutions include fully integrated Android & iOS apps with backend support, API integration, and cross-platform capabilities.",
    },
    "Consulting Services": {
      title: "IT & Development Consulting",
      content:
        "Receive expert advice on technology stacks, development strategies, project planning, and scaling your digital infrastructure.",
    },
    Maintenance: {
      title: "Website & Application Maintenance",
      content:
        "We provide ongoing maintenance, bug fixing, performance optimization, and updates to keep your digital assets running smoothly.",
    },
    Support: {
      title: "24/7 Technical Support",
      content:
        "Our dedicated support team is available around the clock to assist you with any technical issues, updates, or troubleshooting.",
    },
  };

  // ✅ Set a valid default key here
  const [activeKeyword, setActiveKeyword] = useState(
    "Full Stack Migration & Porting"
  );
  const [activeContent, setActiveContent] = useState(
    keywordContent["Full Stack Migration & Porting"]
  );

  const handleKeywordClick = (keyword) => {
    setActiveContent(keywordContent[keyword]);
    setActiveKeyword(keyword);
  };

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>
          Custom Web Development Solutions That Deliver Results
        </h1>
        
        <div className={styles.subTitleContainer}>
          <h2 className={styles.subTitle}>
            Built for Performance, Designed for Impact — Let's Develop a Website
            That Works for Your Business.
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

export default Keywordsweb;
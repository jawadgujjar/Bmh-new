"use client";

import React, { useState } from 'react';
import styles from '../../styles/digital-marketing/keywordsdigital.module.css';

function Keywordsdigital() {
  // SEO keywords with associated content
  const keywordContent = {
    "Major Search Engines": {
      title: "Major Search Engines Optimization",
      content: "We optimize your website for all major search engines including Google, Bing, and Yahoo to ensure maximum visibility across platforms."
    },
    "Google My Business": {
      title: "Google My Business Optimization",
      content: "Enhance your local SEO with our expert Google My Business profile optimization services to appear in local searches and Google Maps."
    },
    "Different Type Of Seo": {
      title: "Comprehensive SEO Services",
      content: "We provide all types of SEO including on-page, off-page, technical, and local SEO tailored to your business needs."
    },
    "Seo Audits": {
      title: "Professional SEO Audits",
      content: "Our thorough SEO audits identify technical issues, content gaps, and optimization opportunities to improve your search rankings."
    },
    "E-Commerce Seo": {
      title: "E-Commerce SEO Solutions",
      content: "Specialized SEO strategies for online stores to improve product visibility, category pages, and conversion rates."
    },
    "Technical Seo": {
      title: "Technical SEO Expertise",
      content: "We fix crawl errors, improve site speed, implement schema markup, and ensure your website meets all technical SEO requirements."
    },
    "Other Search Engines": {
      title: "Multi-Platform Search Optimization",
      content: "Beyond Google, we optimize for alternative search platforms like YouTube, Amazon, and niche industry-specific search engines."
    },
    "Free Seo Tips": {
      title: "Free SEO Tips & Resources",
      content: "Of course! Why not. Our WordPress and Shopify SEO experts are dedicated to helping business owners boost their growth and rank better on the search engines without spending a lot of money. Our experts can provide basic SEO knowledge and consultation free of cost to make you understand your site better."
    }
  };

  const [activeContent, setActiveContent] = useState(keywordContent["Free Seo Tips"]);
  const [activeKeyword, setActiveKeyword] = useState("Free Seo Tips");

  const handleKeywordClick = (keyword) => {
    setActiveContent(keywordContent[keyword]);
    setActiveKeyword(keyword);
  };

  return (
    <div className={styles.seoContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>Premium SEO Solutions That Deliver Results</h1>
        
        <div className={styles.subTitleContainer}>
          <h2 className={styles.subTitle}>
            Why Trust Our Expertise With Your Digital Growth?
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

export default Keywordsdigital;
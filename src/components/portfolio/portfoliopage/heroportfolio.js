"use client";

import React from 'react';
import Image from 'next/image'; // Next.js optimization ke liye
import styles from '../../../styles/portfolio-page/heroportfolio.module.css';

function Heroportfolio({ header }) {
  // Aapka static image URL
  const staticImageUrl = "/images/portfolio-inner-background.jpg"; 

  return (
    <div className={styles.heroContainer}>
      
      <div className={styles.backgroundImageWrapper}>
        <Image 
          src={staticImageUrl} 
          alt={header?.title || "Hero Background"} 
          fill // Container ko poora bhar dega
          priority // Jaldi load hone ke liye
          className={styles.overlayImage} 
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={styles.imageOverlay}></div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          {header?.title || 'BRAND MARKETING HUB'}
        </h1>

        <div className={styles.divider}></div>

        {header?.description && (
          <p className={styles.description}>{header.description}</p>
        )}
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollCircle}>
          <div className={styles.scrollDot}></div>
        </div>
      </div>

    </div>
  );
}

export default Heroportfolio;
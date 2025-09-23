"use client";

import React from 'react';
import styles from '../../../styles/portfolio-page/heroportfolio.module.css';

function Heroportfolio({ header }) {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageOverlay}>
        {header.image && (
          <img 
            src={header.image} 
            alt={header.title} 
            className={styles.overlayImage} 
          />
        )}
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          {header.title || 'BRAND MARKETING HUB'}
        </h1>
        <div className={styles.divider}></div>
        
        {/* ✅ Show description */}
        {header.description && (
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

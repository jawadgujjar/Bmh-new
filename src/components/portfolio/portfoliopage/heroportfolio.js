// components/Heroportfolio.js
"use client";

import React from 'react';
import styles from '../../../styles/portfolio-page/heroportfolio.module.css';

function Heroportfolio() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.imageOverlay}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>BRAND MARKETING HUB</h1>
        <div className={styles.divider}></div>
        <p className={styles.credit}>DESIGNED BY BMH</p>
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
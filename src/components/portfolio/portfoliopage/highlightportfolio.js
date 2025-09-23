"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/portfolio-page/highlightportfolio.module.css';

function Highlightportfolio({ highlights }) {
  return (
    <div className={styles.highlightContainer}>
      <div className={styles.highlightContent}>
        <h2 className={styles.title}>See the Highlights of This Website</h2>

        <div className={styles.imageGrid}>
          {highlights && highlights.map((highlight, index) => (
            <div key={index} className={styles.imageWrapper}>
              {highlight.endsWith('.mp4') ? (
                <video
                  src={highlight}
                  className={styles.gridImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ) : (
                <Image
                  src={highlight}
                  alt={`Highlight ${index + 1}`}
                  fill
                  className={styles.gridImage}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Highlightportfolio;

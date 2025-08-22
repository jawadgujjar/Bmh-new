"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/portfolio-page/highlightportfolio.module.css';

function Highlightportfolio() {
    return (
        <div className={styles.highlightContainer}>
            <div className={styles.highlightContent}>
               <h2 className={styles.title}>See the Highlights of This Website</h2>

                <div className={styles.imageGrid}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh2.jpg"
                            alt="Portfolio item 1"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                    <div className={styles.imageWrapper}>
                        <video
                            src="/video/hero-section.mp4"
                            className={styles.gridImage}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                        />

                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 3"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 4"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                     <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 4"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                     <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 4"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                     <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 4"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                     <div className={styles.imageWrapper}>
                        <Image
                            src="/images/portfolio-bmh.png"
                            alt="Portfolio item 4"
                            fill
                            className={styles.gridImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Highlightportfolio;
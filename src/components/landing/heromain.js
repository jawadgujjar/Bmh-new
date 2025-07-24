"use client";

import React from 'react';
import styles from '../../styles/heromain.module.css';

function HeroMain() {
    return (
        <div className={styles.back}>
            <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className={styles.video}
            >
                <source src='/video/hero-section.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            <p className={styles.affordableText}>
                Your Most Affordable
            </p>
        </div>
    );
}

export default HeroMain;
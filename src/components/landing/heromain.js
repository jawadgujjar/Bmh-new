"use client";

import React from 'react';
import styles from '../../styles/heromain.module.css';

function HeroMain() {
    return (
        <div className={styles.back}>
            {/* Desktop Video - Hidden on Mobile */}
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

            {/* Mobile Image - Hidden on Desktop */}
            <img 
                src="/images/home-page/landing image main.png" 
                alt="Digital Marketing" 
                className={styles.mobileImage} 
            />

            <p className={styles.affordableText}>
                Your Most Affordable
            </p>
        </div>
    );
}

export default HeroMain;
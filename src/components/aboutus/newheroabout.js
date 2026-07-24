import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/newhero.module.css'; 

function NewHero() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                {/* Left Column: Content */}
                <div className={styles.leftColumn}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        ABOUT US
                    </div>
                    <h1 className={styles.heading}>
                        About <br />
                        <span className={styles.orangeText}>Brand Marketing Hub</span>
                    </h1>
                    <p className={styles.description}>
                        A full-service agency founded on real experience — not theory. 
                        Every service under one roof, handled by specialists who've actually done the work.
                    </p>
                    <div className={styles.locationBadge}>
                        📍 St. Petersburg, Florida • Founded 2023
                    </div>
                </div>

                {/* Right Column: Image and Card */}
                <div className={styles.rightColumn}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/About-Us-Page/hero-section.webp" 
                            alt="Team shaking hands in office"
                            width={500}
                            height={450}
                            objectFit="cover"
                            className={styles.heroImage}
                            priority
                        />
                        
                        {/* Floating Experience Card */}
                        <div className={styles.experienceCard}>
                            <div className={styles.star}>⭐</div>
                            <div>
                                <div className={styles.years}>8+ Years</div>
                                <div className={styles.expText}>Hands-on Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewHero;
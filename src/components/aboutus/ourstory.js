import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/ourstory.module.css';

function OurStory() {
    return (
        <section className={styles.storySection}>
            <div className={styles.container}>
                {/* Left Column: Image with Floating Orange Badge */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/download.jpg"
                            alt="Zack Mackenzie - Founder & CEO"
                            width={450}
                            height={520}
                            objectFit="cover"
                            className={styles.founderImage}
                            priority
                        />
                        <div className={styles.founderBadge}>
                            <span className={styles.badgeTitle}>FOUNDER & CEO</span>
                            <span className={styles.badgeName}>Zack Mackenzie</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content and Stats */}
                <div className={styles.contentColumn}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        OUR STORY
                    </div>

                    <h2 className={styles.heading}>
                        Founded on Experience,<br />
                        Not Just Credentials
                    </h2>

                    <p className={styles.description}>
                        Brand Marketing Hub is a full-service digital marketing and development company built to help businesses grow online. We work with US businesses across industries, providing everything they need under one roof — from marketing to design to development.
                        Brand Marketing Hub was founded in 2023 in St. Petersburg, Florida, by Zack Mackenzie, who brings over 8 years of hands-on digital marketing experience to every project we take on. That experience is what shaped how we work — every service under one roof, handled by people who've actually done the work before, not just studied it.

                    </p>

                    {/* <p className={styles.description}>
                        Zack holds a Bachelor's degree in Computer Science and has spent over 8 years working across digital marketing and web development. His background includes deep, hands-on experience with packaging and product-based websites, e-commerce store growth, and local business marketing — three areas that require very different strategies, and ones we've built real results in, not just theory.
                    </p>

                    <p className={styles.description}>
                        That experience shapes how our teams approach every project: with an understanding of what actually converts, not just what looks good on paper.
                    </p> */}

                    {/* Stats Cards Row */}
                    <div className={styles.statsContainer}>
                        <div className={styles.statBox}>
                            <div className={styles.statNumber}>8+</div>
                            <div className={styles.statLabel}>Years Experience</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statBox}>
                            <div className={styles.statNumber}>2023</div>
                            <div className={styles.statLabel}>Year Founded</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statBox}>
                            <div className={styles.statNumber}>6</div>
                            <div className={styles.statLabel}>Core Services</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurStory;
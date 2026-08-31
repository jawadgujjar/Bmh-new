import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/digital-marketing/digitalhero.module.css';
import Image from 'next/image';

function HeroDigitalMarketing() {
    return (
        <section className={styles.backheroDigital}>
            <div className={styles.backgroundImage}>
                <Image
                    // src="/images/banner.webp"
                    alt="Digital Marketing Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
                <div className={styles.darkOverlay}></div>
            </div>

            <div className={styles.mainHerodigital}>
                {/* Left Content Column */}
                <div className={styles.heroLeftContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.badgeDot}></span>
                        Digital Marketing Agency for Startups
                    </div>

                    <h1 className={styles.heroFirstText}>
                        The Digital Marketing Agency for Startups That <span className={styles.highlightText}>Actually Moves the Needle</span>
                    </h1>

                    <p className={styles.growText}>
                        Real growth strategies for early-stage companies ready to scale past their first bottleneck. BMH is a digital marketing agency for startups built differently — every decision is tied to a measurable business outcome, not a monthly report full of charts.
                    </p>

                    <div className={styles.heroButtonsRow}>
                        <Link href="/getaquote" passHref>
                            <Button className={styles.proposalButton}>
                                Get Your Free Growth Audit <span className={styles.arrowIcon}>➜</span>
                            </Button>
                        </Link>
                        <Link href="/portfolio" passHref>
                            <Button className={styles.secondaryButton}>
                                See How It Works <span className={styles.arrowIcon}>➤</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Rating & Social Proof */}
                    <div className={styles.trustProofRow}>
                        <div className={styles.avatarGroup}>
                            <span className={`${styles.avatarCircle} ${styles.av1}`}>A</span>
                            <span className={`${styles.avatarCircle} ${styles.av2}`}>B</span>
                            <span className={`${styles.avatarCircle} ${styles.av3}`}>C</span>
                            <span className={`${styles.avatarCircle} ${styles.av4}`}>D</span>
                        </div>
                        <div className={styles.ratingDetails}>
                            <div className={styles.stars}>★★★★★</div>
                            <span className={styles.reviewText}>500+ businesses served coast to coast</span>
                        </div>
                    </div>
                </div>

                {/* Right Image & Floating Card Column */}
                <div className={styles.heroRightContent}>
                    <div className={styles.imageWrapperCard}>
                        <div className={styles.mainFeatureImage}>
                            <Image
                                src="/images/digital-marketing/new images/Digital Marketing Agency for Startups.webp"
                                alt="Development workspace"
                                width={540}
                                height={330}
                                className={styles.laptopImg}
                            />
                        </div>
                        
                        {/* Floating Metric Card */}
                        <div className={styles.floatingMetricCard}>
                            <div className={styles.metricLeft}>
                                <div className={styles.metricIconBox}>↑</div>
                                <div>
                                    <h4 className={styles.metricTitle}>Organic Traffic</h4>
                                    <p className={styles.metricSub}>+247% increase after launch</p>
                                </div>
                            </div>
                            <div className={styles.metricRight}>
                                <span className={styles.metricPercent}>98%</span>
                                <span className={styles.metricLabel}>Client Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroDigitalMarketing;
"use client";

import React from 'react';
import Image from 'next/image';
import webImage from '../../../../public/images/portfolio-bmh.png';
import webImage2 from '../../../../public/images/portfolio-bmh.png';
import Link from 'next/link';
import styles from '../../../styles/portfolio-page/imageportfolio.module.css';
import { FaFire } from 'react-icons/fa';

const Imageportfolio = () => {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.brand}>Why Choose Us?</h1>
            </div>

            <div className={styles.container}>
                <div className={styles.textContent}>
                    <h2>
                        <span className={styles.span}>What</span> We Deliver
                    </h2>
                    <ul className={styles.bulletList}>
                        <li>
                            Modern and Responsive Design: Create a professional, user-friendly website that works seamlessly across various devices and screen sizes.
                        </li>
                        <li>
                            User-Focused Development: Design and develop a platform that attracts, engages, and converts customers with a focus on quality and creativity.
                        </li>
                        <li>
                            Performance Optimization: Ensure the website performs efficiently with regular updates and a commitment to driving business results.
                        </li>
                        <li>
                            Expert Team Support: Work with the <b>BMH</b> team to bring your vision to life, building a site that stands out and supports business growth.
                        </li>
                    </ul>
                </div>

                <div className={styles.imageContent}>
                    <Image
                        src={webImage}
                        alt="Web development services"
                        width={600}
                        height={400}
                        className={styles.image}
                        quality={100}
                    />
                </div>
            </div>

            {/* <div className={styles.infoRow}>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Credibility & Trust</p>
                    <p className={styles.infoText1}>A professional website establishes your business as a legitimate player, fostering trust and confidence with potential customers.</p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>24/7 Availability</p>
                    <p className={styles.infoText1}>Your website works tirelessly, showcasing your products or services around the clock, reaching new customers globally</p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Lead Generation & Sales</p>
                    <p className={styles.infoText1}>
                        Convert website visitors into leads and sales through strategic calls to action, contact forms, and e-commerce functionality.</p>
                </div>
            </div> */}

            <div className={styles.point}>
                <div className={styles.imageContent1}>
                    <Image
                        src={webImage2}
                        alt="Digital agency services"
                        width={600}
                        height={500}
                        className={styles.image}
                        quality={100}
                    />
                </div>
                <div className={styles.pointsList}>
                    <p className={styles.pointsTextx}>How We Work!</p>
                    <ul className={styles.featuresList}>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>User Experience (UX) Design:</span> Focus on creating a user-friendly interface that ensures easy navigation and a seamless experience for visitors.
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>Responsive Design:</span> Develop your website to be fully functional and visually appealing across various devices and screen sizes.
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>Search Engine Optimization (SEO):</span> Implement on-page SEO best practices to improve your website's visibility in search engine results.
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>Security and Performance:</span> Ensure your website is secure and performs efficiently by implementing HTTPS and regular updates.
                        </li>
                    </ul>
                    <div className={styles.ctaButtons}>
                        <Link href="/getaquote" className={styles.ctaButton}>Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Imageportfolio;

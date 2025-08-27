"use client";

import React from 'react';
import Image from 'next/image';
import appImage1 from '../../../public/images/brand marketing.jpg';
import appImage2 from '../../../public/images/digital-agencies.webp';
import Link from 'next/link';
import styles from '../../styles/app-development/appdevelopment.module.css';
import { FaFire } from 'react-icons/fa';

const Appdevelopment1 = () => {
    return (
        <section id="about" className={styles.section}>
            {/* <div className={styles.headerWrapper}>
                <h1 className={styles.brand}>Mobile App Development</h1>
            </div> */}

            <div className={styles.container}>
                <div className={styles.textContent}>
                    <h2><span className={styles.span}>Mobile App</span> Development</h2>
                    <h3>
                        We specialize in building high-performance mobile applications tailored for both Android and iOS platforms. From concept to deployment, our team delivers scalable, secure, and engaging apps that elevate user experience and drive real business value. Whether you need a native app, cross-platform solution, or progressive web app — we’ve got you covered.
                    </h3>
                </div>
                <div className={styles.imageContent}>
                    <Image 
                        src={appImage1}
                        alt="Mobile app development services"
                        width={600}
                        height={400}
                        className={styles.image}
                        quality={100}
                    />
                </div>
            </div>

            <div className={styles.infoRow}>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Engaging User Interfaces</p>
                    <p className={styles.infoText1}>
                        We design sleek and intuitive mobile interfaces that ensure seamless navigation and a great user experience.
                    </p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Cross-Platform Compatibility</p>
                    <p className={styles.infoText1}>
                        Build once, deploy everywhere — we use modern frameworks like React Native and Flutter for unified app experiences on iOS and Android.
                    </p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Scalable & Secure Solutions</p>
                    <p className={styles.infoText1}>
                        Our apps are built with scalability and security in mind, ensuring robust performance under heavy usage.
                    </p>
                </div>
            </div>

            <div className={styles.point}>
                <div className={styles.imageContent1}>
                    <Image 
                        src={appImage2}
                        alt="Mobile development workflow"
                        width={600}
                        height={500}
                        className={styles.image}
                        quality={100}
                    />
                </div>
                <div className={styles.pointsList}>
                    <p className={styles.pointsTextx}>How We Build Mobile Apps</p>
                    <ul className={styles.featuresList}>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>UI/UX Design:</span> We craft visually stunning designs that are user-friendly and optimized for mobile screens.
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>Native & Cross-Platform:</span> Choose between platform-specific performance (Swift/Kotlin) or cross-platform efficiency (Flutter/React Native).
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>API Integration:</span> We connect your app with powerful APIs, databases, and third-party tools for a seamless experience.
                        </li>
                        <li className={styles.featureItem}>
                            <span className={styles.featureTitle}>Push Notifications & Analytics:</span> Engage users and track app performance with integrated push messaging and analytics tools.
                        </li>
                    </ul>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appdevelopment1;

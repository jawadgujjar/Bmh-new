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
                    <h2><span className={styles.span}>Build Software </span> that Works the Way Your Business Operates</h2>
                    <h3>
                        Every business reaches a point where ready-made software stops working. Processes become slow, systems don’t connect properly, and teams start relying on workarounds. This is where custom application development becomes necessary. Instead of adjusting your operations to fit a tool, you get an application designed around how your business actually works.
                        At Brand Marketing Hub, we build applications that solve real business problems. The goal is not just to deliver software, but to create a system that improves efficiency, supports growth, and stays reliable over time

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
                    <p className={styles.infoText}>User-Friendly Interfaces</p>
                    <p className={styles.infoText1}>
                        We design clean and easy-to-use interfaces that help users navigate smoothly, stay engaged, and complete tasks without confusion, ensuring a simple and effective user experience.
                    </p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Cross-Platform Compatibility</p>
                    <p className={styles.infoText1}>
                       Our applications work consistently on mobile and desktop, delivering smooth performance and a unified experience across platforms without issues, delays, or functionality gaps.
                    </p>
                </div>
                <div className={styles.infoColumn}>
                    <div className={styles.iconWrapper}>
                        <FaFire className={styles.infoIcon} />
                    </div>
                    <p className={styles.infoText}>Scalable & Secure Solutions</p>
                    <p className={styles.infoText1}>
                        We build applications that handle increasing users and data while maintaining performance, security, and stability, ensuring your system grows with your business without technical limitations or risks.
                    </p>
                </div>
            </div>

            <div className={styles.point}>
                <div style={{ textAlign: "center", padding: "3%" }}>
                    <h2>
                        <span className={styles.span}>Built Around</span>  your Business, Not Templates
                    </h2>
                    <p>
                        Most businesses in the USA face limitations with generic solutions. They either include unnecessary features or miss the ones that actually matter. Our approach to custom application development focuses on understanding your operations in detail before building anything.
                        We take time to analyze how your business functions, how users interact with your system, and where improvements are needed. This allows us to create an application that fits naturally into your workflow without creating complexity.
                        The result is a system that feels easy to use, performs consistently, and supports your daily operations without disruption.

                    </p>
                </div>
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
                    <p className={styles.pointsTextx}>
                        Scalable and Reliable Application Development
                    </p>

                    <p className={styles.featuresList}>
                        An application should not only solve current problems but also support future growth. Many businesses face issues when their systems cannot handle increased demand or new requirements, which is where structured services application development becomes important. At Brand Marketing Hub, we design applications with scalability in mind so that as your business grows, your system adapts without requiring a complete rebuild. Performance, speed, and stability are treated as core priorities from the beginning, ensuring your application continues to deliver value long after it is launched.
                    </p>

                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appdevelopment1;

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
                    <h2><span className={styles.span}>Technology Designed </span> to Grow with Your Business</h2>
                    <h3>
                        Modern businesses grow faster when their technology works the same way they do. Relying on generic software often creates gaps between daily operations and long-term goals. Teams adjust their workflows, productivity slows down, and opportunities are missed. Custom-built applications remove these limitations by shaping technology around real business needs instead of forcing businesses to adapt to rigid systems. This is where Brand Marketing Hub brings a focused and experience-driven approach to custom application development.
                        Every application developed through this approach is built with purpose. It is designed to support real users, real decisions, and real growth. Instead of following trends, the focus remains on creating stable, scalable, and meaningful digital solutions that continue to deliver value over time.

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
                <div style={{ textAlign: "center", padding: "3%" }}>
                    <h2>
                        <span className={styles.span}>Custom Application Development</span>  as a Business Advantage
                    </h2>
                    <p>
                        Custom application development is not simply a technical decision. It is a strategic one. Businesses that rely on tailored applications gain better control over their processes, data, and user experience. Unlike ready-made tools that try to serve everyone, custom applications are shaped around specific workflows, performance expectations, and operational goals. At Brand Marketing Hub, the development process begins with understanding how a business functions on a daily basis. This understanding influences every technical and design decision. The result is an application that feels intuitive to users, reduces unnecessary steps, and supports smarter decision-making. Over time, this creates measurable efficiency and stronger digital stability.
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
                        Our Services We Provide
                    </p>

                    <ul className={styles.featuresList}>
                        <li>
                            <strong>Mobile App Development:</strong> Mobile app development focuses on building easy-to-use applications for smartphones and tablets that deliver smooth performance and a reliable user experience.
                        </li>

                        <li>
                            <strong>Web App Development:</strong> Web app development involves creating browser-based applications that allow users to access features and data securely from any location.
                        </li>

                        <li>
                            <strong>Desktop App Development:</strong> Desktop app development is the process of building stable applications designed to run directly on desktop systems with consistent performance.
                        </li>

                        <li>
                            <strong>Hybrid / Cross-Platform App Development:</strong> Hybrid and cross-platform app development enables applications to work across multiple operating systems while maintaining a unified user experience.
                        </li>

                        <li>
                            <strong>Enterprise & Custom Business Applications:</strong> Enterprise and custom business applications are designed to support specific business workflows, improve efficiency, and scale as organizational needs grow.
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

import React from 'react';
import Link from 'next/link';
import styles from '../../styles/about-us/whatwedo.module.css';

function WhatWeDo() {
    const services = [
        {
            title: "Search Engine Optimization (SEO)",
            icon: "🔍",
            link: "/services/seo"
        },
        {
            title: "Paid Advertising (Google & Meta Ads)",
            icon: "📈",
            link: "/services/paid-ads"
        },
        {
            title: "Social Media Marketing",
            icon: "🔗",
            link: "/services/social-media"
        },
        {
            title: "Web Development",
            icon: "💻",
            link: "/services/web-development"
        },
        {
            title: "Custom Application Development",
            icon: "📱",
            link: "/services/app-development"
        },
        {
            title: "Branding & Creative Design",
            icon: "🎨",
            link: "/services/branding"
        }
    ];

    return (
        <section className={styles.whatWeDoSection}>
            <div className={styles.container}>
                {/* Section Header */}
                <div className={styles.headerWrapper}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        WHAT WE DO
                    </div>
                    <h2 className={styles.heading}>Complete Digital Solutions</h2>
                    <p className={styles.subtext}>
                        Each service is handled by a dedicated, experienced team. This means every project gets the right specialists, not a single person handling everything.
                    </p>
                </div>

                {/* Services Grid (3x2) */}
                <div className={styles.gridContainer}>
                    {services.map((service, index) => (
                        <Link href={service.link} key={index} className={styles.cardLink}>
                            <div className={styles.serviceCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.iconBox}>{service.icon}</div>
                                    <h3 className={styles.cardTitle}>{service.title}</h3>
                                </div>
                                <div className={styles.arrowIcon}>→</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhatWeDo;
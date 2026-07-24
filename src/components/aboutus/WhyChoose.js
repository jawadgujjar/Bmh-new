import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/whychoose.module.css';

function WhyChoose() {
    const points = [
        "Founded and led by someone with real, hands-on industry experience",
        "Dedicated teams for every service",
        "Clear communication and honest reporting",
        "Long-term support, not one-time delivery",
        "Solutions built around your business, not templates"
    ];

    return (
        <section className={styles.whyChooseSection}>
            <div className={styles.container}>
                {/* Left Column: Content & Bullet Points */}
                <div className={styles.leftColumn}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        WHY CHOOSE US
                    </div>
                    <h2 className={styles.heading}>
                        Why Businesses Choose <br />
                        Brand Marketing Hub
                    </h2>

                    <div className={styles.pointsList}>
                        {points.map((point, index) => (
                            <div key={index} className={styles.pointItem}>
                                <span className={styles.checkIcon}>✓</span>
                                <p className={styles.pointText}>{point}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className={styles.rightColumn}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/About-Us-Page/whychoose.webp" 
                            alt="Team reviewing business charts and reports"
                            width={550}
                            height={450}
                            objectFit="cover"
                            className={styles.chooseImage}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChoose;
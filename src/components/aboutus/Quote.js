import React from 'react';
import Link from 'next/link';
import styles from '../../styles/about-us/quote.module.css';

function Quote() {
    return (
        <section className={styles.quoteSection}>
            <div className={styles.container}>
                {/* Top Label */}
                <div className={styles.label}>
                    <span className={styles.line}></span>
                    GET IN TOUCH
                    <span className={styles.line}></span>
                </div>

                {/* Main Heading */}
                <h2 className={styles.heading}>
                    Ready to Grow Your <br />
                    Business?
                </h2>

                {/* Description Text */}
                <p className={styles.description}>
                    If you&apos;re looking for a reliable digital marketing and development partner, we&apos;re ready to help. Contact us today to discuss your project.
                </p>

                {/* Contact Info (Email & Phone) */}
                <div className={styles.contactInfoWrapper}>
                    <a href="mailto:info@brandmarketinghub.com" className={styles.contactItem}>
                        <span className={styles.icon}>✉️</span> hello@brandmarketinghub.com
                    </a>
                   <a href="tel:+18132140535" className={styles.contactItem}>
                        <span className={styles.icon}>📞</span> contact us
                    </a>
                </div>

                {/* CTA Button */}
                <div className={styles.buttonWrapper}>
                    <Link href="/contactus" className={styles.ctaButton}>
                        Start a Conversation →
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Quote;
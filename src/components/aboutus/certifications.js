import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/certifications.module.css';

function Certifications() {
    const partners = [
        { name: 'WP Engine', logo: '/images/certifications/wpengine.png' },
        { name: 'Semrush', logo: '/images/certifications/semrush.png' },
        { name: 'Google Partner', logo: '/images/certifications/google-partner.png' },
        { name: 'HubSpot', logo: '/images/certifications/hubspot.png' },
        { name: 'Mailchimp', logo: '/images/certifications/mailchimp.png' },
        { name: 'Meta Business Partner', logo: '/images/certifications/meta.png' },
        { name: 'Bing Ads', logo: '/images/certifications/bing.png' },
        { name: 'Klaviyo Partner', logo: '/images/certifications/klaviyo.png' },
    ];

    return (
        <section className={styles.certSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Certifications and Partnerships</h2>
                <div className={styles.gridContainer}>
                    {partners.map((partner, index) => (
                        <div key={index} className={styles.badgeCard}>
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                width={140}
                                height={50}
                                objectFit="contain"
                                className={styles.logoImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;
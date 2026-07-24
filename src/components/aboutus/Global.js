import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/global.module.css';

function Global() {
    const countries = [
        { name: "USA", image: "/images/About-Us-Page/USA.webp" },
        { name: "United Kingdom", image: "/images/About-Us-Page/UK.webp" },
        { name: "Canada", image: "/images/About-Us-Page/Canada.webp" },
        { name: "Pakistan", image: "/images/About-Us-Page/pak.webp" },
        { name: "UAE", image: "/images/About-Us-Page/Dubai.webp" }
    ];

    return (
        <section className={styles.globalSection}>
            <div className={styles.container}>
                {/* Heading */}
                <h2 className={styles.heading}>
                    Our <span className={styles.orangeText}>Global Presence</span>
                </h2>

                {/* Countries Cards Grid */}
                <div className={styles.gridContainer}>
                    {countries.map((item, index) => (
                        <div key={index} className={styles.countryCard}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={250}
                                    height={350}
                                    objectFit="cover"
                                    className={styles.countryImage}
                                />
                            </div>
                            <span className={styles.countryName}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Global;
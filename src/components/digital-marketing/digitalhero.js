import React from 'react';
import { Button, Input } from 'antd';
import styles from '../../styles/digital-marketing/digitalhero.module.css'; // Using CSS Modules (recommended for Next.js)
import Image from 'next/image'; // Using Next.js Image component

function HeroDigitalMarketing() {
    return (
        <div className={styles.backheroDigital}>
            {/* Using Next.js Image component for optimized background */}
            <div className={styles.backgroundImage}>
                <Image
                    src="/images/hero.jpg"
                    alt="Digital Marketing Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>
            
            <div className={styles.mainHerodigital}>
                <p className={styles.heroFirstText}>Digital Marketing Services</p>
                <p className={styles.growText}>Grow Your Client Base With Data-Driven and Targeted Strategies</p>
                <div className={styles.formDigital}>
                    <Input placeholder="Enter Email Address" className={styles.inputDigital} />
                    <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                </div>
            </div>
        </div>
    );
}

export default HeroDigitalMarketing;
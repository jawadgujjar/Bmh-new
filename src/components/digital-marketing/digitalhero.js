import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/digital-marketing/digitalhero.module.css';
import Image from 'next/image';

function HeroDigitalMarketing() {
    return (
        <div className={styles.backheroDigital}>
            <div className={styles.backgroundImage}>
                <Image
                    src="/images/banner.webp"
                    alt="Digital Marketing Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>
            <div className={styles.mainHerodigital}>
                <h1 className={styles.heroFirstText}>The Digital Marketing Agency for Startups That Actually Moves the Needle</h1>
                <p className={styles.growText}>Real growth strategies for early-stage companies ready to scale past their first bottleneck.
 BMH is a digital marketing agency for startups built differently — every decision is tied to a measurable business outcome, not a monthly report full of charts.
</p>
                <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>  Get Your Free Growth Audit </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeroDigitalMarketing;
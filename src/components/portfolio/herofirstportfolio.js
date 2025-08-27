import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/herofirstportfolio.module.css';
import Image from 'next/image';

function Herofirstportfolio1() {
    return (
        <div className={styles.backheroDigital}>
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
                <p className={styles.heroFirstText}>Portfolio</p>
                <p className={styles.growText}>Expand your client base with targeted, data-driven strategies that boost visibility, build lasting trust, and deliver measurable results for your business.</p>
                <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Herofirstportfolio1;
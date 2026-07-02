import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/app-development/heroapp.module.css';
import Image from 'next/image';

function Heroapp1() {
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
                <h1 className={styles.heroFirstText}>Custom Application Development — Brand Marketing Hub</h1>
                <p className={styles.growText}>Brand Marketing Hub delivers custom application development for US businesses. From cross-platform apps to enterprise solutions — built for performance and real business growth.</p>
                <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Heroapp1;
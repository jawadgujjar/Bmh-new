import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/landing/herogetaquote/herogetaquote.module.css';
import Image from 'next/image';

function Heroabout1() {
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
                <p className={styles.heroFirstText}>About Brand Marketing Hub</p>
                <p className={styles.growText}>
                    Brand Marketing Hub helps businesses grow their online presence through simple, clear, and effective digital strategies.</p>
                {/* <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default Heroabout1;
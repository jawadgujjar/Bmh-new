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
                <p className={styles.heroFirstText}>Mobile App Development</p>
                <p className={styles.growText}>Turn your ideas into powerful mobile apps that boost customer engagement, improve accessibility, and drive business growth.</p>
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
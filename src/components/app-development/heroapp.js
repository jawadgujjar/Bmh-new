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
                <p className={styles.heroFirstText}>Custom Application Development Services in USA That Fit Your Business</p>
                <p className={styles.growText}>App development services focused on building simple, reliable, and scalable applications that support your business operations and improve user experience without unnecessary complexity.</p>
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
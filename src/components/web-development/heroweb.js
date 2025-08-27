import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/web-development/heroweb.module.css';
import Image from 'next/image';

function Heroweb1() {
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
                <p className={styles.heroFirstText}>Website Development</p>
                <p className={styles.growText}>Transform your ideas into dynamic, high-performing websites with clean code, modern design, and optimized performance.</p>
                <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Heroweb1;
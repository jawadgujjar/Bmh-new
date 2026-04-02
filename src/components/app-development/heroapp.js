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
                <p className={styles.heroFirstText}>Custom Application Development That Aligns With How Modern Businesses Operate</p>
                <p className={styles.growText}>Creating custom applications that help businesses run smoothly, grow faster, and make work easier for teams.</p>
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
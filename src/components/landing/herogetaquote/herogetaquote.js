import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../../styles/landing/herogetaquote/herogetaquote.module.css';
import Image from 'next/image';

function Herogetaquote1() {
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
                <p className={styles.heroFirstText}>GET A QUOTE</p>
                <p className={styles.growText}>
                    Get a personalized quote tailored to your business needs. Share your requirements and let our team provide you with the best solutions to achieve your goals efficiently.
                </p>
                {/* <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free Proposal</Button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default Herogetaquote1;
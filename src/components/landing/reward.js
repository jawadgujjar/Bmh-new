import React from 'react';
import Image from 'next/image';
import styles from '../../styles/reward.module.css';

function Reward() {
    return (
        <section className={styles.rewardBody}>
            <h3 className={styles.heading}>
                Award Winning digital <span className={styles.bolderText}>Marketing Agency</span>
            </h3>
            <p className={styles.textH6}>
                Brand Marketing Hub is a digital marketing and SEO company specializing in web and mobile application development with a track record of proven results.
            </p>
            <div className={styles.imageContainer}>
                <Image 
                    alt='Award Winning Agency Partnerships' 
                    src='/images/awards.jpg' 
                    className={styles.imageAwards}
                    width={1200}
                    height={300}
                    priority
                    style={{ height: 'auto', width: '100%' }}
                />
            </div>
        </section>
    )
}

export default Reward;
import React from 'react';
import Image from 'next/image';
import styles from '../../styles/reward.module.css';

function Reward() {
    return (
        <div className={styles.rewardBody}>
            <h3 className={styles.heading}>Award Winning digital <span className={styles.bolderText}>Marketing Agency</span></h3>
            <p className={styles.textH6}>Brand's is a digital marketing and SEO company specializing in web and mobile application development with a track record of proven results.</p>
            <div className={styles.imageContainer}>
                <Image 
                    alt='digital' 
                    src='/images/awards.jpg' 
                    className={styles.imageAwards}
                    width={1200}
                    height={600}
                    layout="responsive"
                    priority
                />
            </div>
        </div>
    )
}

export default Reward;
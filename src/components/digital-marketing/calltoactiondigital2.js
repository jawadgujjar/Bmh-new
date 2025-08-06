import React from 'react';
import { FaPhone } from 'react-icons/fa';
import styles from '../../styles/digital-marketing/calltoactiondigital2.module.css';

function Calltoactiondigital2() {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <span className={styles.circle}></span>
          <h2 className={styles.ctaTitle}>What are you waiting for?</h2>
          <span className={styles.circle}></span>
        </div>
        
        <h3 className={styles.ctaSubtitle}>Let’s Start Venture With Us Call Now</h3>
        <p className={styles.ctaDescription}>Let's Discuss How We Can Help Bring Your Project Life</p>
        
        <a href="tel:2134167355" className={styles.ctaButton}>
          <FaPhone className={styles.phoneIcon} />
          (213) 416-7355
        </a>
      </div>
      <div className={styles.animatedLine}></div>
    </div>
  );
}

export default Calltoactiondigital2;
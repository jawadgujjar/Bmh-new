import React from 'react';
import { FaPhone, FaArrowRight } from 'react-icons/fa';
import styles from '../../styles/app-development/calltoactionapp2.module.css';

function Calltoactionapp2() {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <span className={styles.circle}></span>
          <h2 className={styles.ctaTitle}>What are you waiting for?</h2>
          <span className={styles.circle}></span>
        </div>
        
        <h3 className={styles.ctaSubtitle}>Let's Start Your App Venture With Us</h3>
        <p className={styles.ctaDescription}>Let's Discuss How We Can Help Bring Your Mobile App to Life</p>
        
        <div className={styles.ctaActions}>
          <a href="tel:2134167355" className={styles.ctaButton}>
            <div className={styles.buttonContent}>
              <FaPhone className={styles.phoneIcon} />
              <span>(213) 416-7355</span>
              <div className={styles.buttonHoverEffect}></div>
            </div>
          </a>
          
          <a href="#contact" className={styles.secondaryButton}>
            <span>Schedule App Consultation</span>
            <FaArrowRight className={styles.arrowIcon} />
          </a>
        </div>
      </div>
      
      <div className={styles.decorativeElement}>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeCircle}></div>
      </div>
      
      <div className={styles.animatedLine}></div>
    </div>
  );
}

export default Calltoactionapp2;

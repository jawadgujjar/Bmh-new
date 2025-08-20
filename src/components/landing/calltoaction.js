import React from 'react';
import styles from '../../styles/landing/calltoaction.module.css';

function Calltoaction() {
  return (
    <div className={styles.container}>
      {/* Galaxy Stars Background */}
      <div className={styles.starsContainer}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className={`${styles.star} ${styles[`star${i}`]}`}></div>
        ))}
      </div>
      
      <div className={styles.process}>
        <h2 className={styles.processTitle}>How Our Process Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <button className={styles.stepButton}>01 Consultation</button>
            <p className={styles.stepDescription}>
              Share your goals, and we'll analyze your needs to create a roadmap.
            </p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>02 Strategy & Execution</button>
            <p className={styles.stepDescription}>
              We implement tailored solutions to maximize your business growth.
            </p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>03 Results & Scaling</button>
            <p className={styles.stepDescription}>
              We ensure measurable success and help you scale efficiently.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
        <p className={styles.ctaSubtitle}>
          Whether you need digital solutions, marketing, or consulting, we deliver 
          results that drive growth. Let's discuss how we can help you succeed.
        </p>
        <button className={styles.getStartedButton}>Get Started Now</button>
      </div>
    </div>
  );
}

export default Calltoaction;
import React from 'react';
import styles from '../../styles/landing/calltoaction.module.css';

function Calltoaction() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerItem}>Custom Websites</div>
        <div className={styles.headerItem}>Tailored Designs</div>
        <div className={styles.headerItem}>SEO Optimized</div>
        <div className={styles.headerItem}>Responsive and Fast</div>
      </div>
      <div className={styles.process}>
        <h2 className={styles.processTitle}>How Our Process Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <button className={styles.stepButton}>01 Ideation & Planning</button>
            <p className={styles.stepDescription}>Share your vision, goals, and design preferences to kickstart the process.</p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>02 Design & Development</button>
            <p className={styles.stepDescription}>We create a visually striking, functional, and SEO-friendly website tailored to your needs.</p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>03 Production & Delivery</button>
            <p className={styles.stepDescription}>Once design is finalized, we move to production and ensure timely delivery.</p>
          </div>
        </div>
      </div>
      <div className={styles.seoSection}>
        <h2 className={styles.seoTitle}>SEO Strategies That Deliver Results</h2>
        <p className={styles.seoSubtitle}>Boost your online presence with advanced SEO techniques designed to enhance search rankings, attract organic traffic, and deliver measurable growth. Let your business shine in the digital landscape.</p>
        <button className={styles.getStartedButton}>Get Started</button>
      </div>
    </div>
  );
}

export default Calltoaction;

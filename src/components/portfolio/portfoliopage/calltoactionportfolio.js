import React from 'react';
import { FaEye, FaArrowRight } from 'react-icons/fa';
import styles from '../../../styles/portfolio-page/calltoactionportfolio.module.css';

function Calltoactionportfolio({ cta }) {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <span className={styles.circle}></span>
          <h2 className={styles.ctaTitle}>{cta.heading || 'Ready To Showcase Your Work?'}</h2>
          <span className={styles.circle}></span>
        </div>
        
        {/* <h3 className={styles.ctaSubtitle}>{cta.description || "Let's Build Your Professional Portfolio"}</h3> */}
        <p className={styles.ctaSubtitle}>
          {cta.description || 'I specialize in creating stunning portfolio websites that highlight your best work, attract clients, and elevate your professional presence. From design to deployment, I\'ll help you stand out in your industry.'}
        </p>
        
        <div className={styles.ctaActions}>
          <a href="/portfolio" className={styles.ctaButton}>
            <div className={styles.buttonContent}>
              <FaEye className={styles.portfolioIcon} />
              <span>View My Portfolio</span>
              <div className={styles.buttonHoverEffect}></div>
            </div>
          </a>
          
          <a href="#contact" className={styles.secondaryButton}>
            <span>Start Your Project</span>
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

export default Calltoactionportfolio;
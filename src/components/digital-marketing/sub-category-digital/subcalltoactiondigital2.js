import React from 'react';
import { FaPhone, FaArrowRight } from 'react-icons/fa';
import styles from '../../../styles/digital-marketing/sub-category-digital/subcalltoactiondigital2.module.css';

function SubCalltoactiondigital2({ 
  title = "Ready To Transform Your Digital Presence?",
  description = "Our team of digital experts is ready to elevate your brand with tailored strategies that deliver exceptional results.",
  phoneNumber = "(213) 416-7355",
  renderHtml = false
}) {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <span className={styles.circle}></span>
          <h2 className={styles.ctaTitle}>{title}</h2>
          <span className={styles.circle}></span>
        </div>
        
        {/* Description with HTML support */}
        <div className={styles.ctaSubtitle}>
          {renderHtml ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p>{description}</p>
          )}
        </div>
        
        <div className={styles.ctaActions}>
          <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className={styles.ctaButton}>
            <div className={styles.buttonContent}>
              <FaPhone className={styles.phoneIcon} />
              <span>{phoneNumber}</span>
              <div className={styles.buttonHoverEffect}></div>
            </div>
          </a>
          
          <a href="#contact" className={styles.secondaryButton}>
            <span>Schedule Consultation</span>
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

export default SubCalltoactiondigital2;
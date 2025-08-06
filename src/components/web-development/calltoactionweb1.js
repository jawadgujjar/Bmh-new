"use client";

import React, { useState } from 'react';
import styles from '../../styles/web-development/calltoactionweb1.module.css';

function Calltoactionweb1() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Email submitted:', email);
    alert('Thank you! We will analyze your website and contact you soon.');
  };

  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <div className={styles.circle}></div>
          <h2 className={styles.ctaTitle}>See Your Digital Marketing Analysis</h2>
          <div className={styles.circle}></div>
        </div>
        <p className={styles.ctaSubtitle}>Did You Experiencing Low Traffic & Make Your Website Fastest</p>
        <p className={styles.ctaDescription}>
          Enter your email to get a SEO analysis and schedule consultation about it.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.ctaForm}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              placeholder="Your email address"
              required
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className={styles.animatedLine}></div>
    </div>
  );
}

export default Calltoactionweb1;
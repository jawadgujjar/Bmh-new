"use client";

import React, { useState } from 'react';
import styles from '../../styles/digital-marketing/calltoactiondigital1.module.css';

function Calltoactiondigital1() {
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
        <h2 className={styles.ctaTitle}>See Your Website's SEO Analysis</h2>
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
    </div>
  );
}

export default Calltoactiondigital1;
"use client";

import React, { useState } from 'react';
import styles from '../../styles/app-development/calltoactionapp1.module.css';

function Calltoactionapp1() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert('Thank you! Our app development team will reach out to you shortly.');
  };

  return (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContent}>
        <div className={styles.titleWrapper}>
          <div className={styles.circle}></div>
          <h2 className={styles.ctaTitle}>Let's Build Your Mobile App</h2>
          <div className={styles.circle}></div>
        </div>

        <p className={styles.ctaSubtitle}>
          Have an app idea? Need expert guidance to bring it to life?
        </p>
        <p className={styles.ctaDescription}>
          Enter your email to schedule a free consultation with our mobile app development experts. We’ll discuss your goals, platforms, features, and timelines.
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

export default Calltoactionapp1;

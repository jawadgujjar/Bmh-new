"use client";

import React, { useState } from 'react';
import styles from '../../../styles/digital-marketing/sub-category-digital/subcalltoactiondigital1.module.css';

function SubCalltoactiondigital1() {
  const [step, setStep] = useState(0); // 0 = initial, 1 = form, 2 = success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGetQuote = () => {
    setStep(1); // Move to form step
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    setStep(2); // Move to success step
  };

  const handleReset = () => {
    setStep(0);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className={styles.ctaContainer}>
      {step === 0 && (
        <div className={styles.initialStep}>
          <div className={styles.titleWrapper}>
            <div className={styles.circle}></div>
            <h2 className={styles.ctaTitle}>Premium Digital Marketing Analysis</h2>
            <div className={styles.circle}></div>
          </div>
          <p className={styles.ctaSubtitle}>Transform Your Online Presence With Expert Strategy</p>
          <p className={styles.ctaDescription}>
            Get a comprehensive SEO analysis and personalized consultation to elevate your digital marketing.
          </p>
          
          <button onClick={handleGetQuote} className={styles.quoteButton}>
            Get Instant Quote
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>
      )}

      {step === 1 && (
        <div className={styles.formStep}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Request Your Custom Quote</h3>
            <p className={styles.formSubtitle}>Complete the form below and we'll prepare your personalized strategy</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.quoteForm}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.inputLabel}>Your Goals & Requirements</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.formTextarea}
                placeholder="Tell us about your business and marketing goals"
                rows="4"
                required
              ></textarea>
            </div>
            
            <div className={styles.formActions}>
              <button type="button" onClick={handleReset} className={styles.backButton}>
                Back
              </button>
              <button type="submit" className={styles.submitFormButton}>
                Submit Request
                <span className={styles.arrowIcon}>→</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className={styles.successStep}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className={styles.successCircle} />
              <path d="M30,50 L45,65 L70,35" className={styles.successCheck} />
            </svg>
          </div>
          <h3 className={styles.successTitle}>Request Received!</h3>
          <p className={styles.successMessage}>
            Thank you for your interest. Our digital marketing experts will analyze your requirements 
            and contact you within 24 hours with a customized strategy.
          </p>
          <button onClick={handleReset} className={styles.newRequestButton}>
            Submit New Request
          </button>
        </div>
      )}
      
      <div className={styles.animatedLine}></div>
    </div>
  );
}

export default SubCalltoactiondigital1;
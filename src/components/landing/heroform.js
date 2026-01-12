import React, { useState } from 'react';
import styles from '../../styles/landing/heroform.module.css';

function Heroform() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.heroFormContainer}>
      <form onSubmit={handleSubmit} className={styles.quoteForm}>
        
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              name="name"
              className={styles.formInput}
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              name="email"
              className={styles.formInput}
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Website URL</label>
            <input
              type="url"
              name="website"
              className={styles.formInput}
              placeholder="https://yourwebsite.com"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitFormButton}>
            Get Free Consultation
            <span className={styles.arrowIcon}>→</span>
          </button>
        </div>

      </form>
    </div>
  );
}

export default Heroform;
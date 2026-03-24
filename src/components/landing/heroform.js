"use client";
import React, { useState } from "react";
import styles from "../../styles/landing/heroform.module.css";

function Heroform() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/heroform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          emailAddress: formData.email,
          websiteUrl: formData.website,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Form submitted successfully!");

        setFormData({
          name: "",
          email: "",
          website: "",
        });

        // message 3 seconds baad hide
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
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
              value={formData.name}
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
              value={formData.email}
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
              value={formData.website}
              className={styles.formInput}
              placeholder="https://yourwebsite.com"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={styles.submitFormButton}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get Free Consultation"}
            <span className={styles.arrowIcon}>→</span>
          </button>

        </div>

        {message && (
          <p style={{ marginTop: "10px", color: "white", fontWeight: "500" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Heroform;
"use client";

import React, { useState } from "react";
import styles from "../../styles/digital-marketing/calltoactiondigital1.module.css";
import Image from "next/image";
import webImage2 from "../../../public/images/web-development/Website Management Services for Long-Term Stability.webp";
import styless from "../../styles/webdevelopment.module.css";

function Calltoactionweb1() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    goalsAndRequirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetQuote = () => {
    setStep(1); // Move to form step
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/calltoactionquote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Form submitted:", data);
        setStep(2); // success step
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        setError(
          errorMessage.includes("validation failed")
            ? "Please fill out all required fields correctly."
            : errorMessage
        );
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setFormData({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      goalsAndRequirements: "",
    });
    setError(null);
  };

  return (
    <div>
      <div className={styles.ctaContainer}>
        {step === 0 && (
          <div className={styles.initialStep}>
            <div className={styles.titleWrapper}>
              <div className={styles.circle}></div>
              <h2 className={styles.ctaTitle}>
                See Your Digital Marketing Analysis
              </h2>
              <div className={styles.circle}></div>
            </div>
            <p className={styles.ctaSubtitle}>
              Did You Experiencing Low Traffic & Make Your Website Fastest
            </p>
            <p className={styles.ctaDescription}>
              Enter your email to get a SEO analysis and schedule consultation
              about it.
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
              <p className={styles.formSubtitle}>
                Complete the form below and we'll prepare your personalized
                strategy
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.quoteForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName" className={styles.inputLabel}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="emailAddress" className={styles.inputLabel}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber" className={styles.inputLabel}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label
                  htmlFor="goalsAndRequirements"
                  className={styles.inputLabel}
                >
                  Your Goals & Requirements
                </label>
                <textarea
                  id="goalsAndRequirements"
                  name="goalsAndRequirements"
                  value={formData.goalsAndRequirements}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Tell us about your business and marketing goals"
                  rows="4"
                  required
                ></textarea>
              </div>

              {error && <p className={styles.errorMessage}>{error}</p>}

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.backButton}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={styles.submitFormButton}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Request"}
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
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className={styles.successCircle}
                />
                <path
                  d="M30,50 L45,65 L70,35"
                  className={styles.successCheck}
                />
              </svg>
            </div>
            <h3 className={styles.successTitle}>Request Received!</h3>
            <p className={styles.successMessage}>
              Thank you for your interest. Our digital marketing experts will
              analyze your requirements and contact you within 24 hours with a
              customized strategy.
            </p>
            <button onClick={handleReset} className={styles.newRequestButton}>
              Submit New Request
            </button>
          </div>
        )}

        <div className={styles.animatedLine}></div>
      </div>

      {/* Process Section Styled Professionally as per reference image */}
      <section className={styless.processSection}>
        <div className={styless.processContainer}>
          <div className={styless.processHeader}>
            <span className={styless.processBadge}>HOW WE WORK</span>
            <h2 className={styless.processMainTitle}>
              Our Process — Straightforward, Transparent, and Built Around You
            </h2>
            <p className={styless.processSubTitle}>
              Every project at Brand Marketing Hub follows a clear process designed for US businesses that need predictable timelines, transparent communication, and zero surprises.
            </p>
          </div>

          <div className={styless.processGrid}>
            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>01</span>
                <span className={styless.cardNumBackground}>01</span>
              </div>
              <h3 className={styless.cardTitle}>Discovery</h3>
              <p className={styless.cardDesc}>
                We learn your business, your goals, and your current digital situation in detail before a single line of code is written.
              </p>
            </div>

            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>02</span>
                <span className={styless.cardNumBackground}>02</span>
              </div>
              <h3 className={styless.cardTitle}>Strategy & Architecture</h3>
              <p className={styless.cardDesc}>
                We map the site structure, define the conversion paths, and make the technical decisions that will shape the entire build.
              </p>
            </div>

            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>03</span>
                <span className={styless.cardNumBackground}>03</span>
              </div>
              <h3 className={styless.cardTitle}>Design</h3>
              <p className={styless.cardDesc}>
                Visual design that reflects your brand identity and is built with your target user's experience at the center of every decision.
              </p>
            </div>

            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>04</span>
                <span className={styless.cardNumBackground}>04</span>
              </div>
              <h3 className={styless.cardTitle}>Development</h3>
              <p className={styless.cardDesc}>
                Clean, well-documented code built to your approved design. Front end, back end, and CMS layers all built and tested in parallel.
              </p>
            </div>

            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>05</span>
                <span className={styless.cardNumBackground}>05</span>
              </div>
              <h3 className={styless.cardTitle}>Launch & Handover</h3>
              <p className={styless.cardDesc}>
                We handle deployment, run pre-launch QA, and provide full handover documentation so your team knows exactly how to manage the site going forward.
              </p>
            </div>

            <div className={styless.processCard}>
              <div className={styless.cardTop}>
                <span className={styless.cardNumBadge}>06</span>
                <span className={styless.cardNumBackground}>06</span>
              </div>
              <h3 className={styless.cardTitle}>Ongoing Support</h3>
              <p className={styless.cardDesc}>
                We stay available after launch because real websites need real ongoing attention to keep performing at their peak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Calltoactionweb1;
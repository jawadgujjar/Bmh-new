"use client";
import React, { useState, useEffect } from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import styles from "../../styles/digital-marketing/calltoactiondigital2.module.css";
import styless from "../../styles/digital-marketing/whydigital.module.css";
import Link from "next/link";
import { Row, Col } from "antd";
import Image from "next/image";
import WebCalltoaction from "../landing/webdevelopment/webcalltoaction";

function Calltoactiondigital2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <div>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaTitle}>
              Ready to Stop Guessing and Start Growing?
            </h2>
            <span className={styles.circle}></span>
          </div>

          <h3 className={styles.ctaSubtitle}>
            Your Brand Deserves to Be #1 on Google
          </h3>
          <p className={styles.ctaDescription}>
            We build digital strategies that turn clicks into customers — guaranteed ROI or we work for free.
          </p>

          <div className={styles.ctaActions}>
            <a href="tel:2134167355" className={styles.ctaButton}>
              <div className={styles.buttonContent}>
                <FaPhone className={styles.phoneIcon} />
                <span>(213) 416-7355</span>
                <div className={styles.buttonHoverEffect}></div>
              </div>
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.secondaryButton}
            >
              <span>Schedule Consultation</span>
              <FaArrowRight className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        {/* Modal logic with improved Overlay and Content wrapping */}
        {isModalOpen && (
          <div
            className={styles.modalOverlay}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
              <div className={styles.modalScrollBox}>
                <WebCalltoaction />
              </div>
            </div>
          </div>
        )}

        <div className={styles.decorativeElement}>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
        </div>
        <div className={styles.animatedLine}></div>
      </div>

      {/* --- Rest of the Content Sections --- */}
      <div className={styless.aboutdigitalMain}>
        <Row justify="center" gutter={[24, 24]} align="middle">
          <Col xs={22} sm={22} md={10} lg={10} xl={10}>
            <div className={styless.imageContainer}>
              <Image
                src="/images/digital-marketing/Why Brand Marketing Hub Is the Right Partner.webp"
                alt="Why Brand Marketing Hub Is the Right Partner"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </Col>
          <Col xs={18} sm={18} md={12} lg={10} xl={10}>
            <div className={styles.para}>
              <p className={styless.provenTextDigital}>
                What Makes BMH a Different Kind of Marketing Partner
              </p>
              <div className={styless.allTextDigital}>
                <p>Most agencies sell you a package. BMH builds you a strategy. Here is what that actually looks like:</p>

                <div>
                  <h4>We Work as an Extension of Your Team</h4>
                  <p>You get a dedicated marketing team that knows your product, your market, and your goals. No account manager relay. No communication delays. Direct access to the people doing the work.</p>
                </div>

                <div>
                  <h4>Transparent Reporting You Can Actually Use</h4>
                  <p>Every week, you see exactly what is working and what is being adjusted. Our transparent reporting metrics are built for founders and business owners, not marketing analysts. Plain numbers, clear context, honest conclusions.</p>
                </div>

                <div>
                  <h4>Strategy That Matches Your Stage</h4>
                  <p>Seed-stage startups need different tactics than Series B companies. We design ROI-driven growth plans that match your current runway, your proof-of-concept stage, and your next growth milestone.</p>
                </div>

                <div>
                  <h4>No Long-Term Lock-ins</h4>
                  <p>We offer flexible retainer options because we believe in earning your business every month. Our clients stay because the results justify it, not because a contract forces it.</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styless.aboutdigitalMain}>
        <Row justify="center" gutter={[24, 24]} align="middle">
          <Col xs={18} sm={18} md={12} lg={10} xl={10}>
            <div className={styles.para}>
              <p className={styless.provenTextDigital}>
                Performance-Driven Marketing With Numbers to Back It Up
              </p>
             <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "1000px", margin: "0 auto" }}>
  
  <p style={{ textAlign: "left", marginBottom: "30px", fontSize: "18px", lineHeight: "1.6" }}>
    We are a performance based marketing agency in every sense. That means campaigns are built around conversion goals and revenue targets, not impressions or follower counts. Every dollar you invest is tracked against a real business outcome.
  </p>

  {/* Stats Grid */}
  <div style={{ display: "flex", border: "1px solid #1a365d" }}>
    {[
      { val: "50+", label: "Startups Scaled" },
      { val: "3x", label: "Average ROI in 90 Days" },
      { val: "40%", label: "Avg. CAC Reduction" },
      { val: "24hr", label: "Response Guarantee" }
    ].map((item, index) => (
      <div 
        key={index} 
        style={{ 
          flex: 1, 
          backgroundColor: "#1a365d", // Dark Blue (Jaisa image mein tha)
          padding: "30px 20px", 
          textAlign: "center", 
          borderRight: index !== 3 ? "1px solid #ffffff" : "none" 
        }}
      >
        <h3 style={{ color: "#f67727", margin: "0", fontSize: "40px", fontWeight: "bold" }}>{item.val}</h3>
        <p style={{ color: "#ffffff", margin: "10px 0 0 0", fontSize: "16px" }}>{item.label}</p>
      </div>
    ))}
  </div>

  <p style={{ marginTop: "30px", fontSize: "18px", lineHeight: "1.6" }}>
    Our best <a href="#" style={{ color: "#1a365d", fontWeight: "bold", textDecoration: "none" }}>search engine marketing company</a> which provides services is a core part of how we drive fast, measurable results for startups across competitive markets.
  </p>
</div>
            </div>
          </Col>
          <Col xs={22} sm={22} md={10} lg={10} xl={10}>
            <div className={styless.imageContainer}>
              <Image
                src="/images/digital-marketing/Performance-Driven Marketing Built for the US Market.webp"
                alt="Performance-Driven Marketing Built for the US Market"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Calltoactiondigital2;

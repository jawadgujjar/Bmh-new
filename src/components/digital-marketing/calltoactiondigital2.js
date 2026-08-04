"use client";
import React, { useState, useEffect } from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import styles from "../../styles/digital-marketing/calltoactiondigital2.module.css";
import styless from "../../styles/digital-marketing/whydigital.module.css";
import Link from "next/link";
import { Row, Col } from "antd";
import Image from "next/image";
import WebCalltoaction from "../landing/webdevelopment/webcalltoaction";
import Ourbifference from "@/components/digital-marketing/ourdifference";

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
        <div>
          <Ourbifference/>
        </div>
        <Row justify="center" gutter={[24, 24]} align="middle">
          <Col xs={24} sm={24} md={22} lg={22} xl={22}>
            <div className={styles.para}>
              <p className={styless.provenTextDigital} style={{ textAlign: "center" }}>
                Performance-Driven Marketing With Numbers to Back It Up
              </p>
              <div style={{ padding: "20px 0", fontFamily: "sans-serif", maxWidth: "100%", margin: "0 auto" }}>

                <p style={{ textAlign: "center", marginBottom: "30px", fontSize: "18px", lineHeight: "1.6" }}>
                  We are a performance based marketing agency in every sense. That means campaigns are built around conversion goals and revenue targets, not impressions or follower counts. Every dollar you invest is tracked against a real business outcome.
                </p>

                {/* Stats Grid - Updated to Match Reference Image Style */}
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                  {[
                    { val: "50+", label: "Delivered Results", desc: "Clients who trusted us to drive their digital growth" },
                    { val: "3x", label: "Average ROI", desc: "Return on marketing investment across all campaigns" },
                    { val: "40%", label: "Avg. CAC Reduction", desc: "Lower cost per acquisition vs. previous agency or in-house" },
                    { val: "24hr", label: "Response Time", desc: "Guaranteed reply time for all client communications" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        flex: "1 1 220px",
                        maxWidth: "260px",
                        backgroundColor: "#111827",
                        padding: "30px 20px",
                        textAlign: "center",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                      }}
                    >
                      <h3 style={{ color: "#f97316", margin: "0 0 10px 0", fontSize: "36px", fontWeight: "900" }}>{item.val}</h3>
                      <p style={{ color: "#ffffff", margin: "0 0 8px 0", fontSize: "15px", fontWeight: "700" }}>{item.label}</p>
                      <p style={{ color: "#94a3b8", margin: "0", fontSize: "12.5px", lineHeight: "1.4" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                <p style={{ marginTop: "30px", fontSize: "18px", lineHeight: "1.6", textAlign: "center" }}>
                  Our best <a href="https://brandmarketinghub.com/search-engine-marketing" style={{ color: "#FF8400", fontWeight: "bold", textDecoration: "none" }}>search engine marketing company</a> which provides services is a core part of how we drive fast, measurable results for startups across competitive markets.
                </p>
              </div>
            </div>
          </Col>

          {/* Image Section Commented Out */}
          {/* 
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
          */}
        </Row>
      </div>
    </div>
  );
}

export default Calltoactiondigital2;
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
              Ready To Transform Your Digital Presence?
            </h2>
            <span className={styles.circle}></span>
          </div>

          <h3 className={styles.ctaSubtitle}>
            Let's Create Something Extraordinary Together
          </h3>
          <p className={styles.ctaDescription}>
            Our team of digital experts is ready to elevate your brand with
            tailored strategies that deliver exceptional results.
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
                Why Brand Marketing Hub Is the Right Partner
              </p>
              <p className={styless.allTextDigital}>
                Brand Marketing Hub stands out as a digital marketing agency for startups because we understand early-stage challenges. We know that resources are limited, competition is high, and every decision matters. Our role is to simplify digital marketing while delivering results that support long-term success. We bring experience working with startups and small businesses across different industries in the USA. This allows us to identify opportunities quickly and avoid strategies that waste time or budget. As a top digital marketing company in USA for growing businesses, we focus on execution that is practical, measurable, and aligned with real business needs. Trust is built through consistency and results. That is why we emphasize clear communication, realistic expectations, and performance tracking in everything we do.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styless.aboutdigitalMain}>
        <Row justify="center" gutter={[24, 24]} align="middle">
          <Col xs={18} sm={18} md={12} lg={10} xl={10}>
            <div className={styles.para}>
              <p className={styless.provenTextDigital}>
                Performance-Driven Marketing Built for the US Market
              </p>
              <p className={styless.allTextDigital}>
                Brand Marketing Hub operates with a performance-first mindset. As a performance based marketing agency, we measure success through meaningful metrics such as qualified leads, conversions, and growth trends. Every strategy is reviewed and optimized based on data and user behavior. This approach allows startups and small businesses to scale confidently. Instead of guessing what works, you gain insight into what drives results and where to invest next. In a competitive US market, this clarity is essential for sustainable growth.
              </p>
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

"use client";
import React, { useState, useEffect } from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import appImage2 from "../../../public/images/App development/A Process That Delivers Results.webp";
import styles from "../../styles/app-development/calltoactionapp2.module.css";
import styles1 from "../../styles/app-development/appdevelopment.module.css";
import WebCalltoaction from "../landing/webdevelopment/webcalltoaction";

function Calltoactionapp2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open to prevent double scrolling
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
      {/* --- Main CTA Section --- */}
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaTitle}>What are you waiting for?</h2>
            <span className={styles.circle}></span>
          </div>

          <h3 className={styles.ctaSubtitle}>
            Let's Start Your App Venture With Us
          </h3>
          <p className={styles.ctaDescription}>
            Let's Discuss How We Can Help Bring Your Mobile App to Life
          </p>

          <div className={styles.ctaActions}>
            <a href="tel:2134167355" className={styles.ctaButton}>
              <div className={styles.buttonContent}>
                <FaPhone className={styles.phoneIcon} />
                <span>(213) 416-7355</span>
                <div className={styles.buttonHoverEffect}></div>
              </div>
            </a>

            {/* Modal Trigger 1 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.secondaryButton}
            >
              <span>Schedule App Consultation</span>
              <FaArrowRight className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.decorativeElement}>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
        </div>
        <div className={styles.animatedLine}></div>
      </div>

      {/* --- Performance/Usability Section --- */}
      <div className={styles1.point}>
        <div style={{ textAlign: "center", padding: "3%" }}>
          <h2>
            <span className={styles1.span}> Focused on Usability</span> and Real
            Performance
          </h2>
          <p>
            An application is only useful if people can use it easily. Complex
            designs and confusing navigation often lead to poor user experience.
            At Brand Marketing Hub, we keep things simple and practical.
          </p>
        </div>

        <div className={styles1.imageContent1}>
          <Image
            src={appImage2}
            alt="Mobile development workflow"
            width={500}
            height={450}
            className={styles1.image}
            quality={100}
          />
        </div>

        <div className={styles1.pointsList}>
          <p className={styles1.pointsTextx} style={{ textAlign: "left" }}>
            A Process That Delivers Results
          </p>
          <p className={styles1.featuresList} style={{ textAlign: "left" }}>
            Successful applications are built through a clear and structured
            process. At Brand Marketing Hub, every stage of development is
            handled with attention to detail. We begin by understanding your
            goals and identifying the exact problem that needs to be solved.
            This is followed by planning the structure of the application to
            ensure it is stable and easy to scale. Development is carried out
            with clean and maintainable code, and every feature is tested before
            launch to ensure it performs as expected. After deployment, we
            continue to support and improve the system based on real usage. This
            ensures your application remains relevant and effective as your
            business evolves.
          </p>

          <div className={styles1.ctaButtons}>
            {/* Modal Trigger 2 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles1.ctaButton}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL IMPLEMENTATION --- */}
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
    </div>
  );
}

export default Calltoactionapp2;

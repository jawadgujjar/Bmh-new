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
        <div style={{ textAlign: "left", padding: "3%" }}>
          <h2>
            <span className={styles1.span}>Top Application Development </span>Company Standards — Built Into Every Project
          </h2>
          <p>
            Clients choose Brand Marketing Hub because they want the standards of a top application development company without the overhead of a large agency that treats their project as one of hundreds. Every application we build is treated as the business-critical investment it actually is — with dedicated project management, transparent timelines, and a direct line to the people doing the work.
            <br /><br />
            We have built applications for professional services firms, healthcare providers, logistics companies, fintech startups, and e-commerce brands across the USA. The industries are different but the standard is consistent — applications that work reliably, scale cleanly, and deliver measurable value to the business from day one. {' '}
            <a
              href="https://brandmarketinghub.com/web-development"
              style={{ color: '#FF8400', textDecoration: 'none' }}
            >
              Custom website development company
            </a>{' '}
            engagements often run in parallel with application builds, giving clients a unified digital presence that works together across web and app platforms.
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
          <p className={styles1.pointsTextx}>Cross Platform App Development Company That Delivers on Its Promises</p>
          <div className={styles1.featuresList}>
            <p>A cross platform app development company is only as good as the applications it has shipped and the clients who would recommend it. Our track record in the USA market is built on delivered projects, maintained relationships, and applications that continue to perform long after launch day.</p>

           <table style={{ 
  width: '100%', 
  borderCollapse: 'collapse', 
  fontFamily: 'sans-serif', 
  margin: '20px 0', 
  border: '1px solid #444' // Darker border for better contrast
}}>
  <thead>
    <tr style={{ backgroundColor: '#2a2a2a' }}>
      <th style={{ padding: '16px', border: '1px solid #444', textAlign: 'left', fontWeight: '700', color: '#ffffff' }}>What We Deliver</th>
      <th style={{ padding: '16px', border: '1px solid #444', textAlign: 'left', fontWeight: '700', color: '#ffffff' }}>How It Benefits Your Business</th>
    </tr>
  </thead>
  <tbody>
    {[
      { title: 'Single Codebase, Every Platform', desc: 'Reduces development cost and maintenance overhead without compromising performance on iOS, Android, or web.' },
      { title: 'Faster Time to Market', desc: 'Cross platform builds ship faster than native-per-platform builds — getting your application in front of users sooner.' },
      { title: 'Consistent User Experience', desc: 'Your app looks, feels, and performs the same across every device your customers use.' },
      { title: 'Post-Launch Support', desc: 'We stay involved after launch — monitoring performance, resolving issues, and evolving the application as your business grows.' },
      { title: 'Long-Term Accountability', desc: 'For US businesses making a significant development investment, ongoing accountability is not a nice-to-have — it is a requirement we build into every engagement.' }
    ].map((item, index) => (
      <tr key={index} style={{ borderBottom: '1px solid #444' }}>
        <td style={{ padding: '16px', border: '1px solid #444', fontWeight: '600', color: '#e0e0e0' }}>{item.title}</td>
        <td style={{ padding: '16px', border: '1px solid #444', color: '#b0b0b0', lineHeight: '1.6' }}>{item.desc}</td>
      </tr>
    ))}
  </tbody>
</table>
          </div>

          <div className={styles1.ctaButtons}>
            {/* Modal Trigger 2 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.mainOrangeButton}
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

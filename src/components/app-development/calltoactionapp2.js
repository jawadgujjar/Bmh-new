"use client";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
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
      {/* --- Performance/Usability Section (2 Columns in 1 Row) --- */}
      <div className={`${styles1.point} ${styles.forcedRowSection}`}>
        
        {/* Left Column: Content, Checkmarks & Industry Pills */}
        <div className={styles.leftColumn}>
          <span className={styles.topBadge}>
            Top Application Development Company Standards
          </span>
          <h2 className={styles.mainHeading}>
            Built Into Every Project
          </h2>
          <p className={styles.descriptionText}>
            Clients choose Brand Marketing Hub because they want the standards of a top application development company without the overhead of a large agency that treats their project as one of hundreds. Every application we build is treated as the business-critical investment it actually is — with dedicated project management, transparent timelines, and a direct line to the people doing the work.
          </p>
          <p className={styles.descriptionText}>
            We have built applications for professional services firms, healthcare providers, logistics companies, fintech startups, and e-commerce brands across the USA. The industries are different but the standard is consistent — applications that work reliably, scale cleanly, and deliver measurable value to the business from day one.{" "}
            <a 
              href="/web-development" 
              style={{ color: "#FF8400", fontWeight: "bold" }}
            >
              Custom website development company
            </a>{" "}
            engagements often run in parallel with application builds, giving clients a unified digital presence that works together across web and app platforms.
          </p>

          {/* Checkmark Bullets List */}
          <div className={styles.checkList}>
            {[
              "Dedicated project management — no account manager relay",
              "Transparent timelines with milestone-based delivery",
              "Direct access to the engineering team doing the work",
              "Applications that work reliably, scale cleanly, and deliver measurable value",
              "A unified digital presence across web and app platforms"
            ].map((text, i) => (
              <div key={i} className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <span className={styles.checkText}>{text}</span>
              </div>
            ))}
          </div>

          {/* Industries We Serve Pills */}
          <div>
            <h4 className={styles.industriesTitle}>
              Industries We Serve
            </h4>
            <div className={styles.pillsContainer}>
              {[
                "Professional Services",
                "Healthcare Providers",
                "Logistics & Supply Chain",
                "Fintech & Financial Services",
                "E-Commerce & Retail",
                "SaaS Startups"
              ].map((industry, i) => (
                <span key={i} className={styles.industryPill}>
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Table Content */}
        <div className={`${styles1.pointsList} ${styles.rightColumn}`}>
          <p className={styles.tableMainTitle}>
            Cross Platform App Development Company That Delivers on Its Promises
          </p>
          <p className={styles.tableSubDesc}>
            A cross platform app development company is only as good as the applications it has shipped and the clients who would recommend it. Our track record in the USA market is built on delivered projects, maintained relationships, and applications that continue to perform long after launch day.
          </p>
          <div className={styles1.featuresList}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderLeft}>WHAT WE DELIVER</th>
                  <th className={styles.tableHeaderRight}>HOW IT BENEFITS YOUR BUSINESS</th>
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
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCellLeft}>{item.title}</td>
                    <td className={styles.tableCellRight}>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
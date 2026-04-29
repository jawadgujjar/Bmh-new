"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/portfolio-page/imageportfolio.module.css';

const Imageportfolio = ({ middleSection }) => {
  if (!middleSection) return null;

  const premiumServices = [
    { id: '01', title: 'SEO Mastery', desc: 'Dominating search engines with data-driven keyword strategies and technical optimization.' },
    { id: '02', title: 'Digital Marketing', desc: 'Scaling brands through high-converting ad campaigns and strategic social growth.' },
    { id: '03', title: 'Luxury UI/UX', desc: 'Crafting high-end visual identities that resonate with premium audiences globally.' }
  ];

  return (
    <section className={styles.lightSection}>
      <div className={styles.container}>
        
        {/* --- LUXURY LIGHT HEADER --- */}
        <div className={styles.heroHeader}>
          <div className={styles.topBadge}>
            <span className={styles.line}></span>
            STRATEGIC DIGITAL SOLUTIONS
          </div>
          <h2 className={styles.luxuryTitle}>
            Architecting <span className={styles.orangeText}>Results-Driven</span> <br /> 
            Digital Ecosystems.
          </h2>
        </div>

        {/* --- SERVICE CARDS (WHITE & ORANGE) --- */}
        <div className={styles.serviceGrid}>
          {premiumServices.map((item) => (
            <div key={item.id} className={styles.premiumCard}>
              <span className={styles.cardNumber}>{item.id}</span>
              <div className={styles.cardInfo}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className={styles.bottomAccent}></div>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC SHOWCASE (LIGHT) --- */}
        <div className={styles.portfolioDetails}>
          
          <div className={styles.cleanRow}>
            <div className={styles.imageBox}>
              {middleSection.image1 && (
                <Image src={middleSection.image1} alt="Vision" fill className={styles.imageFilter} />
              )}
            </div>
            <div className={styles.textBox}>
              <span className={styles.tagline}>THE VISION</span>
              <h3 className={styles.boxTitle}>Strategic <span className={styles.thin}>Planning</span></h3>
              <p className={styles.paragraph}>{middleSection.description1}</p>
            </div>
          </div>

          <div className={`${styles.cleanRow} ${styles.rowReverse}`}>
            <div className={styles.imageBox}>
              {middleSection.image2 && (
                <Image src={middleSection.image2} alt="Execution" fill className={styles.imageFilter} />
              )}
            </div>
            <div className={styles.textBox}>
              <span className={styles.tagline}>THE STRATEGY</span>
              <h3 className={styles.boxTitle}>Perfect <span className={styles.thin}>Execution</span></h3>
              <p className={styles.paragraph}>{middleSection.description2}</p>
            </div>
          </div>
        </div>

        {/* --- FOOTER CTA --- */}
        <div className={styles.bottomZone}>
          <div className={styles.stackLabels}>
             <span>SEO ENGINE</span> • <span>MARKETING HUB</span> • <span>LUXURY UX</span>
          </div>
          <Link href="/getaquote" className={styles.primaryBtn}>
            ELEVATE YOUR BRAND
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Imageportfolio;
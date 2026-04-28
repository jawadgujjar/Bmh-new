"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/portfolio-page/imageportfolio.module.css';

const Imageportfolio = ({ middleSection }) => {
  if (!middleSection) return null;

  return (
    <section className={styles.mainSection}>
      <div className={styles.parallaxContainer}>
        
        {/* --- PART 1: HARDCODED SHOWCASE --- */}
        <div className={styles.creativeHeader}>
          <span className={styles.badge}>EXCELLENCE DELIVERED</span>
          <h2 className={styles.bigTitle}>Crafting Digital <br/> <span className={styles.textOutline}>Masterpieces</span></h2>
        </div>

        <div className={styles.floatingGrid}>
          <div className={`${styles.floatCard} ${styles.card1}`}>
            <span className={styles.cardIndex}>01</span>
            <h3>UI/UX Design</h3>
            <p>Brand-aligned visual identity, crafted for maximum trust.</p>
          </div>

          <div className={`${styles.floatCard} ${styles.card2}`}>
            <span className={styles.cardIndex}>02</span>
            <h3>SEO Power</h3>
            <p>Dominating search rankings in the USA market natively.</p>
          </div>

          <div className={`${styles.floatCard} ${styles.card3}`}>
            <span className={styles.cardIndex}>03</span>
            <h3>Performance</h3>
            <p>Optimized Core Web Vitals with sub 2s load times.</p>
          </div>
        </div>

        {/* --- PART 2: DYNAMIC API DATA --- */}
        <div className={styles.dynamicExperience}>
          
          {/* Vision Section */}
          <div className={styles.splitRow}>
            <div className={styles.imageBox}>
               {middleSection.image1 && (
                  <Image 
                    src={middleSection.image1} 
                    alt="Vision" 
                    fill 
                    className={styles.actualImg} 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               )}
            </div>
            <div className={styles.contentBox}>
               <div className={styles.miniLine}></div>
               <h4 className={styles.sectionLabel}>THE VISION</h4>
               <p className={styles.descriptionText}>{middleSection.description1}</p>
            </div>
          </div>

          {/* Execution Section */}
          <div className={`${styles.splitRow} ${styles.rowReverse}`}>
            <div className={styles.imageBox}>
               {middleSection.image2 && (
                  <Image 
                    src={middleSection.image2} 
                    alt="Execution" 
                    fill 
                    className={styles.actualImg} 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               )}
            </div>
            <div className={styles.contentBox}>
               <div className={styles.miniLine}></div>
               <h4 className={styles.sectionLabel}>THE STRATEGY</h4>
               <p className={styles.descriptionText}>{middleSection.description2}</p>
            </div>
          </div>

        </div>

        <div className={styles.actionZone}>
          <div className={styles.techCloud}>
            {['Next.js', 'Vercel', 'Shopify', 'Analytics'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <Link href="/getaquote" className={styles.magneticButton}>
            LET'S WORK TOGETHER
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Imageportfolio;
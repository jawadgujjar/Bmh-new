"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import styles from "../../styles/web-development/heroweb.module.css";

function Heroweb1() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        
        {/* Left Column: Content */}
        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Full Stack Web Development Company — USA
          </div>
          
          <h1 className={styles.heroTitle}>
            Custom Website Development Company — <span className={styles.orangeText}>Brand Marketing Hub</span>
          </h1>
          
          <p className={styles.heroDescription}>
           Brand Marketing Hub is a custom website development company in the USA. We build responsive, results-driven websites — from redesigns to full-stack builds that grow your business.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/getaquote" className={styles.primaryBtn}>
              Start Your Project <FiArrowRight className={styles.btnIcon} />
            </Link>
            <Link href="/portfolio" className={styles.secondaryBtn}>
              View Our Portfolio
            </Link>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              <div className={`${styles.avatar} ${styles.avatar1}`}>A</div>
              <div className={`${styles.avatar} ${styles.avatar2}`}>B</div>
              <div className={`${styles.avatar} ${styles.avatar3}`}>C</div>
              <div className={`${styles.avatar} ${styles.avatar4}`}>D</div>
            </div>
            <div className={styles.reviews}>
              <div className={styles.stars}>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span className={styles.reviewText}>500+ businesses served coast to coast</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Stats Card */}
        <div className={styles.heroRight}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/web-development/Web/Hero.webp"
              alt="Custom Website Development"
              fill
              className={styles.mainImage}
              priority
            />
            
            {/* Floating Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statsLeft}>
                <div className={styles.iconBox}>
                  <FiArrowUpRight className={styles.statsIcon} />
                </div>
                <div className={styles.statsTextLeft}>
                  <span className={styles.statsHeading}>Organic Traffic</span>
                  <span className={styles.statsSub}>+247% increase after launch</span>
                </div>
              </div>
              
              <div className={styles.statsRight}>
                <span className={styles.statsValue}>98%</span>
                <span className={styles.statsLabel}>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Heroweb1;
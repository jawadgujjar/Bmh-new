"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/portfolio-page/imageportfolio.module.css';

const Imageportfolio = ({ middleSection }) => {
  if (!middleSection) return null;

  return (
    <section id="about" className={styles.section}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.brand}>Why Choose Us?</h1>
      </div>

      {/* Section 1: Text Left, Image Right */}
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>What</span> We Deliver
          </h2>
          <ul className={styles.bulletList}>
            {middleSection.description1 && (
              <li>{middleSection.description1}</li>
            )}
          </ul>
        </div>

        <div className={styles.imageContent}>
          {middleSection.image1 && (
            <Image
              src={middleSection.image1}
              alt="Web development services"
              width={600}
              height={400}
              className={styles.image}
              quality={100}
              priority
            />
          )}
        </div>
      </div>

      {/* Section 2: Image Left, Text Right (Order Fixed) */}
      <div className={styles.point}>
        <div className={styles.imageContent1}>
          {middleSection.image2 && (
            <Image
              src={middleSection.image2}
              alt="Digital agency services"
              width={600}
              height={500}
              className={styles.image}
              quality={100}
            />
          )}
        </div>
        
        <div className={styles.pointsList}>
          <h2 className={styles.pointsTextx}>How We Work!</h2>

          {middleSection.description2 && (
            <p className={styles.subDescription}>{middleSection.description2}</p>
          )}

          <div className={styles.ctaButtons}>
            <Link href="/getaquote" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Imageportfolio;
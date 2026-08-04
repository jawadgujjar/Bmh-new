"use client";

import React from "react";
import Image from "next/image";
import appImage1 from "../../../public/images/App development/App Development images  2/Custom Application Development Services Built for US Businesses That Are Ready to Scale.webp";
import appImage2 from "../../../public/images/App development/Scalable and Reliable Application Development.webp";
import Link from "next/link";
import styles from "../../styles/app-development/appdevelopment.module.css";
import { FaCode, FaRocket, FaMobileAlt, FaShieldAlt, FaLayerGroup } from "react-icons/fa";
import Appservices1 from "./servicesapp";

const Appdevelopment1 = () => {
  return (
    <section id="about" className={styles.section}>
      {/* Top Section */}
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>Custom Application Development  </span>  Services Built for US Businesses That Are Ready to Scale
          </h2>
          <h3>
            Every business reaches a point where off-the-shelf software stops being enough. The workflows are too specific, the integrations too complex, the user experience too important to leave to a generic solution. That is the moment custom application development becomes not just an option but a necessity. At this stage, the right development partner makes everything and {' '}
            <a
              href="https://brandmarketinghub.com/"
              style={{ color: '#FF8400', textDecoration: 'none', fontWeight: 'bold' }}
            >
              digital branding solutions
            </a>{' '}
            are often what tie the application experience back to the brand identity that drives customer trust. We build applications that are shaped entirely around your business logic, your users, and the outcomes that matter most to you.
            <br /><br />
            As a purpose-driven custom application development services company, we do not start with a technology stack and work backwards. We start with your business problem, define the right solution, and build it with the precision and accountability that US businesses expect from a long-term development partner.
          </h3>
        </div>
        <div className={styles.imageContent}>
          <Image
            src={appImage1}
            alt="Mobile app development services"
            width={500}
            height={450}
            className={styles.image}
            quality={100}
          />
        </div>
      </div>

      <Appservices1 category="app-development" />

      {/* Middle Problem Section */}
      <div className={styles.point}>
        <div className={styles.textContentArea} style={{ width: '100%' }}>
            <div className={styles.topBadgeTextCenter}>THE REAL PROBLEM</div>
            <h2>
              Custom Application Development That Solves <span className={styles.span}>Real Business Problems</span>
            </h2>
            <p className={styles.problemSubTextCenter}>Most US businesses that come to us have already tried generic software — SaaS tools that almost fit, platforms that needed workarounds, off-the-shelf solutions that created more friction than they solved. Custom app development ends that cycle.</p>

            <div className={styles.problemCardsGrid}>
                <div className={styles.problemCardRed}>
                    <div className={styles.cardHeaderRow}>
                        <span className={styles.crossIcon}>✕</span>
                        <h3>Off-the-Shelf Software Limits You</h3>
                    </div>
                    <p>Generic tools force your team to adapt to the software, not the other way around. You end up paying for features you don't need while missing the exact capabilities your workflows demand.</p>
                </div>

                <div className={styles.problemCardGreen}>
                    <div className={styles.cardHeaderRow}>
                        <span className={styles.checkIcon}>✓</span>
                        <h3>Custom Applications Remove That Ceiling</h3>
                    </div>
                    <p>Built around your exact needs, a custom application becomes a competitive asset that scales with your business — transforming from a cost center into a growth driver.</p>
                </div>
            </div>

            <p className={styles.problemFooterTextCenter}>
                When your application is built around your exact processes and users, it becomes a growth driver — not a cost. {' '}
                <a
                    href="https://brandmarketinghub.com/digital-marketing"
                    style={{ color: '#FF8400', textDecoration: 'none', fontWeight: 'bold' }}
                >
                    Digital marketing agency for startups
                </a>{' '}
                partners often find a well-built custom app becomes the foundation their entire digital strategy runs on.
            </p>
        </div>
      </div>

      {/* Bottom Cross Platform Section */}
      <div className={styles.crossPlatformWrapper}>
        <div className={styles.cpLeftColumn}>
          <div className={styles.cpCleanImageContainer}>
            <Image
              src={appImage2}
              alt="Cross platform development workflow"
              width={520}
              height={480}
              className={styles.image}
              quality={100}
            />
          </div>
          
          <div className={styles.cpGridBadges}>
            <div className={styles.cpBadgeCard}>
              <span className={styles.cpBadgeIcon}><FaCode /></span>
              <p>One Codebase Lower Development Cost</p>
            </div>
            <div className={styles.cpBadgeCard}>
              <span className={styles.cpBadgeIcon}><FaRocket /></span>
              <p>Faster Time to Market</p>
            </div>
            <div className={styles.cpBadgeCard}>
              <span className={styles.cpBadgeIcon}><FaMobileAlt /></span>
              <p>Works Seamlessly Across Devices</p>
            </div>
            <div className={styles.cpBadgeCard}>
              <span className={styles.cpBadgeIcon}><FaShieldAlt /></span>
              <p>Maintainable & Scalable</p>
            </div>
          </div>

          {/* Centered CTA Button */}
          <div className={styles.ctaButtons}>
            <Link href="/contactus" className={styles.cpCtaButton}>
              Get Started →
            </Link>
          </div>
        </div>

        <div className={styles.cpRightColumn}>
          <div className={styles.topBadgeText}>APP DEVELOPMENT</div>
          <h2 className={styles.cpMainTitle}>
            Cross Platform App Development Services — One Codebase, Every Device
          </h2>
          <p className={styles.cpIntroText}>
            In 2026, your users are on every device. A solution that works only on desktop, only on iOS, or only on Android is a solution that excludes a significant portion of your audience before they even engage. Our cross platform app development services solve this problem at the architecture level — building applications that perform natively across iOS, Android, web, and desktop from a single, maintainable codebase.
          </p>

          <div className={styles.cpFeatureRows}>
            <div className={styles.cpFeatureCard}>
              <div className={styles.cpCardIconWrapper}><FaRocket /></div>
              <div>
                <h3>The Business Case for Cross Platform Development</h3>
                <p>Cross platform development is not a compromise — it is a strategic decision that reduces development cost, accelerates time to market, and simplifies long-term maintenance without sacrificing performance.</p>
              </div>
            </div>

            <div className={styles.cpFeatureCard}>
              <div className={styles.cpCardIconWrapper}><FaLayerGroup /></div>
              <div>
                <h3>Technologies We Build With</h3>
                <p>We work with React Native, Flutter, and other proven cross platform frameworks depending on what your project requires. Every technology recommendation is based on your specific use case and long-term roadmap.</p>
              </div>
            </div>

            <div className={styles.cpFeatureCard}>
              <div className={styles.cpCardIconWrapper}><FaShieldAlt /></div>
              <div>
                <h3>Built for Performance. Designed for Scale.</h3>
                <p>From startups to established enterprises, we architect and build cross platform apps that are fast, secure, and ready to grow with your business. One codebase. Lower cost. Faster delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appdevelopment1;
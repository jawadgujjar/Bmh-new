"use client";

import React from "react";
import Image from "next/image";
import appImage1 from "../../../public/images/App development/Build Software that Works the Way Your Business Operates.webp";
import appImage2 from "../../../public/images/App development/Scalable and Reliable Application Development.webp";
import Link from "next/link";
import styles from "../../styles/app-development/appdevelopment.module.css";
import { FaFire } from "react-icons/fa";

const Appdevelopment1 = () => {
  return (
    <section id="about" className={styles.section}>
      {/* <div className={styles.headerWrapper}>
                <h1 className={styles.brand}>Mobile App Development</h1>
            </div> */}

      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>Custom Application Development  </span>  Services Built for US Businesses That Are Ready to Scale
          </h2>
          <h3>
            Every business reaches a point where off-the-shelf software stops being enough. The workflows are too specific, the integrations too complex, the user experience too important to leave to a generic solution. That is the moment custom application development becomes not just an option but a necessity. At this stage, the right development partner makes everything and digital branding solutions are often what tie the application experience back to the brand identity that drives customer trust. We build applications that are shaped entirely around your business logic, your users, and the outcomes that matter most to you.
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

      <div className={styles.infoRow}>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>User-Friendly Interfaces</p>
          <p className={styles.infoText1}>
            We design clean and easy-to-use interfaces that help users navigate
            smoothly, stay engaged, and complete tasks without confusion,
            ensuring a simple and effective user experience.
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Cross-Platform Compatibility</p>
          <p className={styles.infoText1}>
            Our applications work consistently on mobile and desktop, delivering
            smooth performance and a unified experience across platforms without
            issues, delays, or functionality gaps.
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Scalable & Secure Solutions</p>
          <p className={styles.infoText1}>
            We build applications that handle increasing users and data while
            maintaining performance, security, and stability, ensuring your
            system grows with your business without technical limitations or
            risks.
          </p>
        </div>
      </div>

      <div className={styles.point}>
        <div style={{ textAlign: "left" }}>
          <h2>
            <span className={styles.span}> Custom Application Development </span>That Solves Real Business Problems
          </h2>
          <p>Most US businesses that come to us have already tried generic software — SaaS tools that almost fit, platforms that needed workarounds, off-the-shelf solutions that created more friction than they solved. Custom app development ends that cycle.</p>

          <ul>
            <li><strong>Off-the-Shelf Software Limits You</strong> — Generic tools force your team to adapt to the software, not the other way around.</li>
            <li><strong>Custom Applications Remove That Ceiling</strong> — Built around your exact needs, it becomes a competitive asset that scales with your business.</li>
          </ul>

          <p>When your application is built around your exact processes and users, it becomes a growth driver — not a cost. Digital marketing agency for startups partners often find a well-built custom app becomes the foundation their entire digital strategy runs on.</p>
        </div>
        <div className={styles.imageContent1}>
          <Image
            src={appImage2}
            alt="Mobile development workflow"
            width={500}
            height={450}
            className={styles.image}
            quality={100}
          />
        </div>
        <div className={styles.pointsList}>
          <p className={styles.pointsTextx}>
            Cross Platform App Development Services — One Codebase, Every Device
          </p>

          <div className={styles.featuresList}>
            <p>
              In 2026, your users are on every device. A solution that works only on desktop, only on iOS, or only on Android is a solution that excludes a significant portion of your audience before they even engage. Our cross platform app development services solve this problem at the architecture level — building applications that perform natively across iOS, Android, web, and desktop from a single, maintainable codebase.
            </p>

            <h3>The Business Case for Cross Platform Development</h3>
            <p>
              Cross platform development is not a compromise — it is a strategic decision that reduces development cost, accelerates time to market, and simplifies long-term maintenance without sacrificing the performance or user experience your customers expect. For US businesses that need to move fast and scale efficiently, it is often the most technically sound approach available.
            </p>

            <h3>Technologies We Build With</h3>
            <p>
              We work with React Native, Flutter, and other proven cross platform frameworks depending on what your project requires. Every technology recommendation is based on your specific use case, your target audience, and your long-term product roadmap — not on what is trending or what we happen to prefer.
            </p>
          </div>

          <div className={styles.ctaButtons}>
            <Link href="/contactus" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appdevelopment1;

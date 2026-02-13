"use client";

import React from "react";
import Image from "next/image";
import webImage from "../../../public/images/brand marketing.jpg";
import webImage2 from "../../../public/images/digital-agencies.webp";
import Link from "next/link";
import styles from "../../styles/webdevelopment.module.css";
import { FaFire } from "react-icons/fa";

const Webdevelopment1 = () => {
  return (
    <section id="about" className={styles.section}>
      {/* <div className={styles.headerWrapper}>
                <h1 className={styles.brand}>Website Development</h1>
            </div> */}

      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>Professional Website </span>{" "}
            Development Company in USA
          </h2>
          <h3>
            Brand Marketing Hub is a reliable and growth-focused custom website
            development company serving businesses across the USA. We help
            brands build strong digital foundations by creating websites that
            are practical, visually balanced, and designed for real users. In
            today’s competitive online space, a website must do more than look
            good — it should communicate trust, support user intent, and
            contribute directly to business goals. Our team understands how
            users interact with websites in the US market. That is why we focus
            on clarity, usability, and long-term performance rather than
            shortcuts or temporary trends. Every website we develop is built
            with purpose, backed by experience, and aligned with modern web
            standards.
          </h3>
        </div>
        <div className={styles.imageContent}>
          <Image
            src={webImage}
            alt="Web development services"
            width={600}
            height={400}
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
          <p className={styles.infoText}>Credibility & Trust</p>
          <p className={styles.infoText1}>
            A professional website establishes your business as a legitimate
            player, fostering trust and confidence with potential customers.
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>24/7 Availability</p>
          <p className={styles.infoText1}>
            Your website works tirelessly, showcasing your products or services
            around the clock, reaching new customers globally
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Lead Generation & Sales</p>
          <p className={styles.infoText1}>
            Convert website visitors into leads and sales through strategic
            calls to action, contact forms, and e-commerce functionality.
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>Custom Website Development </span>{" "}
            Built Around Real Business Needs
          </h2>
          <h3>
            As a professional custom website development company, Brand
            Marketing Hub creates solutions that are tailored, not templated. We
            believe every business has a unique story, audience, and objective,
            and your website should reflect that clearly. Our development
            process starts with understanding your goals, industry, and users
            before moving into design and technical execution. We provide custom
            web development services usa that focus on scalability, performance,
            and ease of use. Whether you are launching a new business or
            expanding an existing one, our approach ensures your website can
            grow with you without technical limitations. Being a trusted custom
            web development agency, we pay close attention to structure,
            navigation, and content flow so visitors can find what they need
            without confusion. This improves engagement, builds credibility, and
            supports better search visibility over time.
          </h3>
        </div>
        <div className={styles.imageContent}>
          <Image
            src={webImage}
            alt="Web development services"
            width={600}
            height={400}
            className={styles.image}
            quality={100}
          />
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "3%" }}>
        <h2>
          <span className={styles.span}>Web Development Consulting </span> Based
          on Experience
        </h2>
        <p>
          Choosing the right technical direction can be challenging without
          expert guidance. That is why we offer web development consulting to
          help businesses make informed decisions. As experienced website
          development consultants, we provide clear advice based on real project
          experience, not generic suggestions. Our web development consulting
          services cover planning, platform selection, performance improvements,
          and future scalability. Whether you need a second opinion or long-term
          technical guidance, our consulting approach is transparent, practical,
          and focused on your goals. Working with a professional website
          development consultant helps reduce risks and ensures your website
          effectively supports your business strategy.
        </p>
      </div>
      <div className={styles.point}>
        <div className={styles.imageContent1}>
          <Image
            src={webImage2}
            alt="Digital agency services"
            width={600}
            height={500}
            className={styles.image}
            quality={100}
          />
        </div>
        <div className={styles.pointsList}>
          <p className={styles.pointsTextx}>
            Why Brand Marketing Hub Is the Right Choice !
          </p>
          <p>
            Brand Marketing Hub combines experience, expertise, and user-first
            thinking. We do not believe in over-promising or under-delivering.
            Our work reflects transparency, consistency, and a deep
            understanding of what makes a website successful in the US market.
            If you are looking for a custom website development company that
            values quality, usability, and long-term growth, Brand Marketing Hub
            is here to support your journey with confidence and clarity.
          </p>
          {/* <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <span className={styles.featureTitle}>
                User Experience (UX) Design:
              </span>{" "}
              Focus on creating a user-friendly interface that ensures easy
              navigation and a seamless experience for visitors.
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureTitle}>Responsive Design:</span>{" "}
              Develop your website to be fully functional and visually appealing
              across various devices and screen sizes.
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureTitle}>
                Search Engine Optimization (SEO):
              </span>{" "}
              Implement on-page SEO best practices to improve your website's
              visibility in search engine results.
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureTitle}>
                Security and Performance:
              </span>{" "}
              Ensure your website is secure and performs efficiently by
              implementing HTTPS and regular updates.
            </li>
          </ul> */}
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

export default Webdevelopment1;

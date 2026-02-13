import React from "react";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import webImage from "../../../public/images/brand marketing.jpg";
import styless from "../../styles/webdevelopment.module.css";
import styles from "../../styles/web-development/calltoactionweb2.module.css";

function Calltoactionweb2() {
  return (
    <div>
      <section className={styless.section}>
        <div className={styless.container} style={{ marginTop: "2rem" }}>
          <div className={styless.textContent}>
            <h2>
              <span className={styless.span}>Website Redesign Services </span>{" "}
              That Improve User Experience
            </h2>
            <h3>
              An outdated or poorly structured website can hold your business
              back. Our website redesign services in USA are designed to improve
              usability, modernise the design, and align your site with current
              user expectations. Instead of changing everything blindly, we
              carefully analyse what is working and what needs improvement. We
              redesign websites with a strong focus on user behaviour,
              performance, and clarity. We refine layouts, improve page
              structure, and enhance overall flow so visitors feel confident
              navigating your site. This approach helps reduce bounce rates and
              increases meaningful user interaction. A redesigned website should
              feel familiar yet improved. That balance is what allows businesses
              to refresh their online presence without losing trust or brand
              identity.
            </h3>
          </div>

          <div className={styless.imageContent}>
            <Image
              src={webImage}
              alt="Web development services"
              width={600}
              height={400}
              className={styless.image}
              quality={100}
            />
          </div>
        </div>
      </section>
      <div style={{ textAlign: "center",padding:"3%" }}>
        <h2>
          <span className={styless.span}>Responsive Website Development </span>{" "}
          for Modern Users
        </h2>
        <p>
          Today, users access websites from multiple devices, and consistency
          matters. As a responsive website development company, we ensure your
          website performs smoothly on mobile phones, tablets, and desktops. Our
          designs adapt naturally to different screen sizes while maintaining
          usability and visual balance. Brand Marketing Hub is also recognised
          as a responsive web design company that prioritizes accessibility,
          loading speed, and clean layouts. These elements not only improve user
          satisfaction but also align with search engine expectations for
          quality websites in the USA market. Responsive design is not just a
          feature — it is a requirement for businesses that want to stay
          competitive and relevant online.
        </p>
      </div>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaTitle}>What are you waiting for?</h2>
            <span className={styles.circle}></span>
          </div>

          <h3 className={styles.ctaSubtitle}>
            Let's Start Your Venture With Us
          </h3>
          <p className={styles.ctaDescription}>
            Let's Discuss How We Can Help Bring Your Project to Life
          </p>

          <div className={styles.ctaActions}>
            <a href="tel:2134167355" className={styles.ctaButton}>
              <div className={styles.buttonContent}>
                <FaPhone className={styles.phoneIcon} />
                <span>(213) 416-7355</span>
                <div className={styles.buttonHoverEffect}></div>
              </div>
            </a>
            <a href="#contact" className={styles.secondaryButton}>
              <span>Schedule Consultation</span>
              <FaArrowRight className={styles.arrowIcon} />
            </a>
          </div>
        </div>
        <div className={styles.decorativeElement}>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeCircle}></div>
        </div>
        <div className={styles.animatedLine}></div>
      </div>
    </div>
  );
}

export default Calltoactionweb2;

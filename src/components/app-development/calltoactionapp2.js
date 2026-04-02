import React from 'react';
import { FaPhone, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import appImage2 from '../../../public/images/digital-agencies.webp';
import styles from '../../styles/app-development/calltoactionapp2.module.css';
import styles1 from '../../styles/app-development/appdevelopment.module.css';


function Calltoactionapp2() {
  return (
    <div>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaTitle}>What are you waiting for?</h2>
            <span className={styles.circle}></span>
          </div>

          <h3 className={styles.ctaSubtitle}>Let's Start Your App Venture With Us</h3>
          <p className={styles.ctaDescription}>Let's Discuss How We Can Help Bring Your Mobile App to Life</p>

          <div className={styles.ctaActions}>
            <a href="tel:2134167355" className={styles.ctaButton}>
              <div className={styles.buttonContent}>
                <FaPhone className={styles.phoneIcon} />
                <span>(213) 416-7355</span>
                <div className={styles.buttonHoverEffect}></div>
              </div>
            </a>

            <a href="#contact" className={styles.secondaryButton}>
              <span>Schedule App Consultation</span>
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
      <div className={styles1.point}>
        <div style={{ textAlign: "center", padding: "3%" }}>
          <h2>
            <span className={styles1.span}> Cross Platform</span>  App Development With Purpose
          </h2>
          <p>
            Businesses increasingly need applications that work across multiple platforms without sacrificing quality. Cross platform app development provides a practical solution when handled correctly. It allows businesses to reach users on different devices while maintaining a consistent experience. Brand Marketing Hub approaches cross platform development with a focus on usability and maintainability. Applications are designed to behave naturally across operating systems, ensuring users receive the same level of performance and reliability regardless of how they access the product. This thoughtful execution helps businesses reduce complexity while expanding their digital reach.
          </p>
           
        </div>
        <div className={styles1.imageContent1}>
          <Image
            src={appImage2}
            alt="Mobile development workflow"
            width={600}
            height={500}
            className={styles1.image}
            quality={100}
          />
        </div>
        <div className={styles1.pointsList}>
          <p className={styles1.pointsTextx}>
            Custom Application Development as a Business Advantage
          </p>

          <p className={styles1.featuresList}>
            Custom application development is not simply a technical decision. It is a strategic one. Businesses that rely on tailored applications gain better control over their processes, data, and user experience. Unlike ready-made tools that try to serve everyone, custom applications are shaped around specific workflows, performance expectations, and operational goals. At Brand Marketing Hub, the development process begins with understanding how a business functions on a daily basis. This understanding influences every technical and design decision. The result is an application that feels intuitive to users, reduces unnecessary steps, and supports smarter decision-making. Over time, this creates measurable efficiency and stronger digital stability.
          </p>

          <div className={styles1.ctaButtons}>
            <Link href="/contact" className={styles1.ctaButton}>Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calltoactionapp2;

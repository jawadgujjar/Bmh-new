import React from "react";
import styles from "../../styles/digital-marketing/aboutdigital.module.css";
import { Row, Col, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

function Aboutdigital() {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center" align="middle" gutter={[40, 24]}>
        {/* Left Column: Image with Floating Metric Card */}
        <Col xs={24} sm={24} md={12} lg={11} xl={11} order={{ xs: 2, md: 1 }}>
          <div className={styles.imageContainerWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/digital-marketing/new images/Built for Startups.webp"
                alt="about-digital"
                width={580}
                height={420}
                className={styles.featureImg}
                quality={100}
              />
            </div>
            
            {/* Floating Metric Card Overlay */}
            <div className={styles.floatingMetricCard}>
              <h3 className={styles.metricNumber}>50+</h3>
              <p className={styles.metricLabel}>Startups Grown</p>
            </div>
          </div>
        </Col>

        {/* Right Column: Content (Text, List & Button) */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12} order={{ xs: 1, md: 2 }}>
          <div className={styles.para}>
            {/* Top Small Badge */}
            <div className={styles.heroBadge}>
              Built for Startups
            </div>

            <h2 className={styles.provenTextDigital}>
              Built for Startups. Focused on Growth That Holds.
            </h2>

            <div className={styles.allTextDigital}>
              <p>
                Early-stage companies don't need a bigger agency. They need the right one. As a dedicated digital marketing agency for startups, BMH works with bootstrapped brands and funded teams across the <strong>USA</strong> that need fast traction, low customer acquisition costs, and a marketing partner who understands the pressure of proving ROI before the next funding round.
              </p>
              <p>
                We skip the fluff and get straight to what drives growth. Our agile execution model means your campaigns are live fast, optimized faster, and always tied to real numbers.
              </p>

              {/* Checkmark List */}
              <ul className={styles.featureList}>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Strategies built around your CAC targets and growth timeline
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Multi-channel customer acquisition from day one
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Scalable marketing frameworks that grow as your company grows
                </li>
              </ul>

              <p>
                Want to see what your growth potential looks like? Our <Link href="https://brandmarketinghub.com/seo-services" className={styles.inlineLink}>international SEO services</Link> are a strong starting point for startups targeting global reach.
              </p>

              {/* Action Button */}
              <div className={styles.buttonWrapper}>
                <Link href="/getaquote" passHref>
                  <Button className={styles.proposalButton}>
                    Let's Build Your Growth Plan <span className={styles.arrowIcon}>➜</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Aboutdigital;
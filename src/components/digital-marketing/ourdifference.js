import React from "react";
import styles from "../../styles/digital-marketing/ourdifference.module.css";
import { Row, Col } from "antd";
import Image from "next/image";
import { FaUsers, FaChartLine, FaBullseye, FaLock } from "react-icons/fa";

function Ourbifference() {
  return (
    <div className={styles.ourdifferenceMain}>
      <Row justify="center" align="middle" gutter={[40, 24]}>
        {/* Left Column: Image Container */}
        <Col xs={24} sm={24} md={12} lg={11} xl={11}>
          <div className={styles.imageContainerWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/digital-marketing/new images/Digital Marketing Agency for Startups 2.webp"
                alt="Why Brand Marketing Hub Is the Right Partner"
                width={550}
                height={720}
                className={styles.featureImg}
                quality={100}
              />
            </div>
          </div>
        </Col>

        {/* Right Column: Content (Badge, Heading, Intro & Feature Rows) */}
        <Col xs={24} sm={24} md={12} lg={13} xl={13}>
          <div className={styles.para}>
            {/* Top Small Badge */}
            <div className={styles.heroBadge}>
              Our Difference
            </div>

            <h2 className={styles.provenTextDigital}>
              What Makes BMH a Different Kind of Marketing Partner
            </h2>

            <div className={styles.allTextDigital}>
              <p>
                Most agencies sell you a package. BMH builds you a strategy. Here is what that actually looks like:
              </p>

              {/* Feature List with React Icons */}
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    <FaUsers />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>We Work as an Extension of Your Team</h4>
                    <p>You get a dedicated marketing team that knows your product, your market, and your goals. No account manager relay. No communication delays. Direct access to the people doing the work.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    <FaChartLine />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Transparent Reporting You Can Actually Use</h4>
                    <p>Every week, you see exactly what is working and what is being adjusted. Our transparent reporting metrics are built for founders and business owners, not marketing analysts. Plain numbers, clear context, honest conclusions.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    <FaBullseye />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>Strategy That Matches Your Stage</h4>
                    <p>Seed-stage startups need different tactics than Series B companies. We design ROI-driven growth plans that match your current runway, your proof-of-concept stage, and your next growth milestone.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.iconBox}>
                    <FaLock />
                  </div>
                  <div className={styles.featureContent}>
                    <h4>No Long-Term Lock-ins</h4>
                    <p>We offer flexible retainer options because we believe in earning your business every month. Our clients stay because the results justify it, not because a contract forces it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Ourbifference;
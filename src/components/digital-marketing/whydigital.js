import React from "react";
import styles from "../../styles/digital-marketing/whydigital.module.css";
import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";

function Whydigital() {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center" align="middle" gutter={[40, 24]}>
        {/* Left Column: Content (Text, Stats & Button) */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={styles.rightContentWrapper}>
            <div className={styles.para}>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot}></span>
                NATIONWIDE COVERAGE
              </div>

              <h2 className={styles.provenTextDigital}>
                Why Startups Across the USA Choose BMH Over Bigger Agencies
              </h2>

              <div className={styles.allTextDigital}>
                <p>
                  Big agencies take big retainers and assign you to a junior team. BMH gives every client a senior-level strategy from the first call. We are recognized as one of the top digital marketing agencies in USA because we treat startup budgets with the same seriousness as enterprise spend — just with faster decisions and zero bureaucracy.
                </p>
                <p>
                  Our team brings fractional CMO capabilities to brands that are not ready for a full-time hire. As a trusted digital marketing consultancy, we combine strategic depth with the execution speed of a hands-on specialized team.
                </p>
              </div>
            </div>

            {/* 4 Grid Stats Boxes */}
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <h4 className={styles.statNumber}>45+</h4>
                <p className={styles.statTitle}>Industries</p>
              </div>
              <div className={styles.statBox}>
                <h4 className={styles.statNumber}>20+</h4>
                <p className={styles.statTitle}>States Served</p>
              </div>
              <div className={styles.statBox}>
                <h4 className={styles.statNumber}>3x</h4>
                <p className={styles.statTitle}>Avg. Client Growth</p>
              </div>
              <div className={styles.statBox}>
                <h4 className={styles.statNumber}>89%</h4>
                <p className={styles.statTitle}>Client Retention</p>
              </div>
            </div>

            {/* Action Button */}
            <div className={styles.callactionButton}>
              <Link href="/getaquote" passHref>
                <Button className={styles.proposalButton}>
                  See What Sets BMH Apart <span className={styles.arrowIcon}>→</span>
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        {/* Right Column: Image with Floating Revenue Card */}
        <Col xs={24} sm={24} md={12} lg={11} xl={11}>
          <div className={styles.imageContainerWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/digital-marketing/new images/NATIONWIDE COVERAGE.webp"
                alt="about-digital"
                width={560}
                height={420}
                className={styles.featureImg}
                quality={100}
              />
            </div>

            {/* Floating Revenue Card */}
            <div className={styles.topRevenueCard}>
              <div className={styles.starsRow}>★★★★★</div>
              <h3 className={styles.revenueAmount}>$5M+</h3>
              <p className={styles.revenueLabel}>Revenue Generated</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Whydigital;
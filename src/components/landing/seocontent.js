import React from "react";
import styles from "../../styles/landing/seocontent.module.css";
import { Row, Col } from "antd";
import Image from "next/image";

function Seocontent1() {
  return (
    <div className={styles.aboutdigitalMainseo}>
      <Row justify="center" align="middle" gutter={[40, 0]}>
        {/* IMAGE COLUMN */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainerseo}>
            <Image
              src="/images/seo-content.webp"
              alt="about-digital"
              fill
              className={styles.imageseo}
              quality={90}
              priority
            />
          </div>
        </Col>

        {/* CONTENT COLUMN */}
        <Col xs={22} sm={22} md={12} lg={10} xl={10}>
          <p className={styles.provenTextDigitalseo}>
            Why Most Brands Fail to Connect Online
          </p>

          <p className={styles.allTextDigitalseo}>
            Many businesses struggle with one simple problem — their brand is
            not clear enough. The message feels confusing, the visuals are
            inconsistent, and the overall experience doesn’t build trust. When
            your audience cannot quickly understand what you do or why you
            matter, they move on. At Brand Marketing Hub, we fix this by
            bringing clarity to your brand. We take everything you have — your
            ideas, your services, your vision — and turn it into a structured,
            easy-to-understand system. Our approach to digital branding
            solutions focuses on making your communication simple, your
            positioning strong, and your presence consistent across every
            platform. Because clarity is what turns visitors into customers.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Seocontent1;

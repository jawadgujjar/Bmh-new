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
            Helping Brands Communicate Clearly and Confidently
          </p>

          <p className={styles.allTextDigitalseo}>
            Many businesses struggle to explain who they are and why they
            matter. We help remove that confusion. Our digital branding
            solutions are built to make your message clear and easy for your
            audience to understand. When people quickly understand your brand,
            they are more likely to trust it. We take time to understand your
            business, your audience, and your goals. This allows us to create
            branding that feels natural and useful, not complicated or
            overwhelming. Everything we do is focused on helping your brand
            communicate better online.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Seocontent1;

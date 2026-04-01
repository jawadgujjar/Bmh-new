import React from "react";
import styles from "../../styles/landing/webcontent.module.css";
import { Row, Col } from "antd";
import Image from "next/image";

function Webcontent1() {
  return (
    <div className={styles.aboutdigitalMainweb}>
      <Row justify="center" align="middle" gutter={[40, 0]}>
        {/* IMAGE COLUMN */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainerweb}>
            <Image
              src="/images/home-page/Small Business Branding Agency.webp"
              alt="Small Business Branding Agency"
              fill
              className={styles.imageweb}
              quality={90}
              priority
            />
          </div>
        </Col>

        {/* CONTENT COLUMN */}
        <Col xs={22} sm={22} md={12} lg={10} xl={10}>
          <p className={styles.provenTextDigitalweb}>
            Luxury Brand Marketing with a Calm and Refined Approach{" "}
          </p>

          <p className={styles.allTextDigitalweb}>
            Luxury branding should feel calm, confident, and well-designed. Our
            luxury brand marketing services are created for businesses that want
            a clean and professional image without being loud or confusing. We
            focus on quality, consistency, and clear messaging that reflects the
            true value of your brand. If your business offers premium products
            or services, your branding should show that. We help luxury brands
            present themselves online in a way that feels elegant and
            trustworthy while still being easy for users to understand.
          </p>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[40, 0]}>
        {/* IMAGE COLUMN */}

        {/* CONTENT COLUMN */}
        <Col xs={22} sm={22} md={12} lg={10} xl={10}>
          <p className={styles.provenTextDigitalweb}>
            Luxury Brand Marketing with a Calm and Refined Approach{" "}
          </p>

          <p className={styles.allTextDigitalweb}>
            Luxury branding should feel calm, confident, and well-designed. Our
            luxury brand marketing services are created for businesses that want
            a clean and professional image without being loud or confusing. We
            focus on quality, consistency, and clear messaging that reflects the
            true value of your brand. If your business offers premium products
            or services, your branding should show that. We help luxury brands
            present themselves online in a way that feels elegant and
            trustworthy while still being easy for users to understand.
          </p>
        </Col>
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainerweb}>
            <Image
              src="/images/home-page/Small Business Branding Agency.webp"
              alt="Small Business Branding Agency"
              fill
              className={styles.imageweb}
              quality={90}
              priority
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Webcontent1;

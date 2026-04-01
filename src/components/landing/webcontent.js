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
              src="/images/home-page/We Don’t Just Design Brands — We Build Direction.webp"
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
            We Don’t Just Design Brands — We Build Direction
          </p>

          <p className={styles.allTextDigitalweb}>
            Every strong brand starts with a clear strategy. That’s why we don’t
            jump straight into visuals. We first understand your business deeply
            — your audience, your goals, and what makes you different. From
            there, we build a complete brand foundation that includes: Clear
            messaging that your audience understands instantly Strong
            positioning that highlights your uniqueness Consistent identity
            across all platforms A professional look that builds trust at first
            glance As a branding and marketing agency, our goal is to make your
            brand feel aligned at every level. Whether someone visits your
            website, sees your social media, or reads your content — the
            experience should feel the same. That consistency is what creates
            recognition. And recognition is what builds trust.
          </p>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        gutter={[40, 0]}
        style={{ marginTop: "5rem" }}
      >
        {/* IMAGE COLUMN */}

        {/* CONTENT COLUMN */}
        <Col xs={22} sm={22} md={12} lg={10} xl={10}>
          <p className={styles.provenTextDigitalweb}>
            Built for Businesses That Want to Stand Out in the USA
          </p>

          <p className={styles.allTextDigitalweb}>
            We work with startups, growing businesses, and professionals who
            want to establish a strong presence in the US market. Our work is
            not about trends — it is about long-term impact. If you need online
            branding, brand positioning, or full online brand management, we
            focus on building systems that support growth, not just design. For
            premium businesses, we also provide a refined approach to luxury
            brand marketing — where everything is clean, minimal, and focused on
            quality rather than noise. And for individuals, our personal
            branding consultant services help you build authority, credibility,
            and a presence that feels authentic and trustworthy. No matter the
            size of your business, our goal is the same — to help you
            communicate clearly and confidently.
          </p>
        </Col>
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainerweb}>
            <Image
              src="/images/home-page/Your Brand Should Be Clear. Memorable. Easy to Trust.webp"
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

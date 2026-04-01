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
            Online Brand Management That Keeps Your Message Consistent{" "}
          </p>

          <p className={styles.allTextDigitalweb}>
            Your brand appears in many places online, including your website,
            social media, and search results. Our online brand management
            services help keep everything aligned and consistent. This means
            your audience always sees the same message, tone, and identity
            wherever they find you. Consistency builds trust. When your brand
            looks and feels the same across platforms, people feel more
            confident engaging with your business. We help you maintain that
            consistency while adapting to digital changes smoothly.
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
            A Small Business Branding Agency That Truly Understands You
          </p>

          <p className={styles.allTextDigitalweb}>
            Small businesses need branding that is simple, affordable, and
            effective. As a small business branding agency, Brand Marketing Hub
            focuses on practical solutions that help you grow step by step. We
            do not overcomplicate the process or use confusing language. We help
            small businesses create a strong foundation that supports future
            growth. Our branding strategies are designed to work today and still
            make sense tomorrow as your business expands.
          </p>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[40, 0]}>
        {/* IMAGE COLUMN */}

        {/* CONTENT COLUMN */}
        <Col xs={22} sm={22} md={12} lg={10} xl={10}>
          <p className={styles.provenTextDigitalweb}>
            Personal Branding Consultant Services for Real People{" "}
          </p>

          <p className={styles.allTextDigitalweb}>
            Your personal brand represents who you are and what you stand for.
            Our personal branding consultant services are designed for
            professionals, entrepreneurs, and leaders who want to build trust
            online in a simple and authentic way. As a personal brand
            consultant, we help you share your story clearly and professionally.
            We focus on real communication that feels human and relatable,
            helping you connect with the right audience and opportunities.
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
            A Friendly Branding Partner for Businesses Across the USA{" "}
          </p>

          <p className={styles.allTextDigitalweb}>
            Brand Marketing Hub works with businesses across the USA that want
            honest and effective branding support. We believe good branding
            should feel helpful, calm, and clear. Our focus is always on
            long-term trust, not short-term trends. We work closely with you and
            treat your brand with care. Every decision we make is guided by what
            will truly help your audience understand and trust your business.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Webcontent1;

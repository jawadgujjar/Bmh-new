import React from "react";
import { Row, Col, Button } from "antd";
import {
  RocketOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import styles from "../../styles/whychooseus.module.css";

const WhyChooseUs = () => {
  const [activeContent, setActiveContent] = React.useState(null);

  const featureItems = [
    {
      icon: <RocketOutlined />,
      title: "Fast Onboarding",
      content: "Get started with minimal setup time.",
      column2Content:
        "Twenty years of experience in digital transformation and software engineering.",
    },
    {
      icon: <CustomerServiceOutlined />,
      title: "Technical Support",
      content: "Round-the-clock expert assistance.",
      column2Content:
        "Agile methodology for quick adaptation and quality product delivery.",
    },
    {
      icon: <CheckCircleOutlined />,
      title: "Consistent Delivery",
      content: "Reliable milestone completion.",
      column2Content:
        "Our team follows strict quality assurance processes to ensure consistent delivery.",
    },
    {
      icon: <ProjectOutlined />,
      title: "Agile Management",
      content: "Flexible, high-quality delivery.",
      column2Content:
        "We use agile methodologies to adapt quickly to changing requirements.",
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]} className={styles.row}>
        {/* Column 1 - Content */}
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className={styles.column}>
            <h2 className={styles.title}>
              Let’s Build a Brand People Remember
            </h2>
            <p className={styles.text}>
              A strong brand is not built overnight. It is built with clarity, consistency, and the right direction.
At Brand Marketing Hub, we work as your long-term branding consultant — guiding you through every step of your brand’s growth. From strategy to execution, everything we do is focused on helping you succeed in a competitive digital space.
If your goal is to create a brand that feels professional, trustworthy, and easy to understand, then you’re in the right place.
Let’s build something that doesn’t just look good — but actually works.

            </p>
            <Button
              type="primary"
              size="large"
              className={styles.quoteButton}
              style={{ width: "100%" }}
            >
              Get Free Quote
            </Button>
          </div>
        </Col>

        {/* Column 2 - Image/Content */}
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className={styles.column}>
            <div className={styles.contentWrapper}>
              {activeContent === null ? (
                <img
                  src="../images/home-page/why choose us.webp"
                  alt="Why Choose Us"
                  className={styles.defaultImage}
                />
              ) : (
                <div className={styles.contentArea}>
                  <p className={styles.text}>
                    {featureItems[activeContent].column2Content}
                  </p>
                  <Button
                    type="default"
                    size="large"
                    className={styles.meetingButton}
                    style={{ width: "100%" }}
                  >
                    Schedule Meeting
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Column 3 - Features */}
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <div className={styles.column}>
            {featureItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.featureItem} ${
                  activeContent === index ? styles.active : ""
                }`}
                onClick={() => setActiveContent(index)}
              >
                <div className={styles.featureIcon}>{item.icon}</div>
                <div className={styles.featureContent}>
                  <h4 className={styles.featureTitle}>{item.title}</h4>
                  <p className={styles.featureText}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div className={styles.divider} />
    </div>
  );
};

export default WhyChooseUs;

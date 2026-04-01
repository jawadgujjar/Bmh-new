import React from "react";
import Link from "next/link";
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
      <div className={styles.inner}>
        <Row gutter={[24, 24]} className={styles.row}>

          {/* Column 1 */}
          <Col xs={24} md={8}>
            <div className={styles.column}>
              <h2 className={styles.title}>
                Brand Positioning That Makes Your Business Easy to Choose
              </h2>
              <p className={styles.textWhite}>
                People choose brands they understand. As a brand positioning agency, we help you clearly define what makes your business different and why it matters. This helps your audience quickly see the value you offer without needing extra explanation. Strong brand positioning helps your business feel confident and focused. It allows you to attract the right customers instead of trying to appeal to everyone. We make sure your positioning feels natural and honest, not forced or sales-driven.
              </p>

              {/* <Button
                size="large"
                className={styles.blackButton}
                style={{ width: "100%" }}
              >
                Get Free Quote
              </Button> */}
            </div>
          </Col>

          {/* Column 2 */}
          <Col xs={24} md={10}>
            <div className={styles.column}>
              <div className={styles.contentWrapper}>
                {/* {activeContent === null ? ( */}
                <img
                  src="/images/home-page/Brand_Marketing_Hub-landing.webp"
                  alt="Why Choose Us"
                  className={styles.defaultImage}
                />
                <Link href="/getaquote" passHref>
                  <Button size="large" className={styles.blackButton}>
                    Get Free Quote
                  </Button>
                </Link>
                {/* ) : (
                <div className={styles.contentArea}>
                  <p className={styles.textWhite}>
                    {featureItems[activeContent].column2Content}
                  </p>
                  <Button
                    size="large"
                    className={styles.blackButton}
                    style={{ width: "100%" }}
                  >
                    Schedule Meeting
                  </Button>
                </div>
              )} */}
              </div>
            </div>
          </Col>

          {/* Column 3 */}
          <Col xs={24} md={6}>
            <div className={styles.column}>
              {featureItems.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.featureItem} ${activeContent === index ? styles.active : ""
                    }`}
                  onClick={() => setActiveContent(index)}
                >
                  <div className={styles.featureIconWhite}>{item.icon}</div>
                  <div>
                    <h4 className={styles.featureTitleWhite}>{item.title}</h4>
                    <p className={styles.featureTextWhite}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default WhyChooseUs;
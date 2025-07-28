import React from "react";
import { Row, Col, Button } from "antd";
import {
  RocketOutlined,
  CustomerServiceOutlined,
  CheckCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import styles from "../../styles/whychooseus.module.css";

function WhyChooseUs() {
  const [activeContent, setActiveContent] = React.useState(0);

  const featureItems = [
    {
      icon: <RocketOutlined />,
      title: "Fast Onboarding",
      content: "Get started with minimal setup time.",
    },
    {
      icon: <CustomerServiceOutlined />,
      title: "Technical Support",
      content: "Round-the-clock expert assistance.",
    },
    {
      icon: <CheckCircleOutlined />,
      title: "Consistent Delivery",
      content: "Reliable milestone completion.",
    },
    {
      icon: <ProjectOutlined />,
      title: "Agile Management",
      content: "Flexible, high-quality delivery.",
    },
  ];

  const column2Content = [
    "Twenty years of experience in digital transformation and software engineering.",
    "Agile methodology for quick adaptation and quality product delivery.",
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[24, 24]} className={styles.row}>
        {/* Column 1 - Why Choose Us */}
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className={styles.column}>
            <h2 className={styles.title}>Why Choose Us?</h2>
            <p className={styles.text}>
              We’re a seasoned offshore software development partner, bringing
              over twenty years of experience to the table in digitally
              transforming business processes. Our collaborative approach has
              consistently earned us recognition as a top choice in software
              engineering.
            </p>
            <Button
              type="primary"
              size="large"
              className={styles.quoteButton}
              style={{ width: "80%" }}
            >
              Get Free Quote
            </Button>
          </div>
        </Col>

        {/* Column 2 - Dynamic Content */}
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <div className={styles.column}>
            <p className={styles.text}>{column2Content[activeContent]}</p>
            <Button
              type="default"
              size="large"
              className={styles.meetingButton}
              style={{ width: "80%" }}
            >
              Schedule Meeting
            </Button>
          </div>
        </Col>

        {/* Column 3 - Feature Items */}
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <div className={styles.column}>
            {featureItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.featureItem} ${
                  activeContent === index % 2 ? styles.active : ""
                }`}
                onClick={() => setActiveContent(index % 2)}
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
      <div className={styles.divider}></div>
    </div>
  );
}

export default WhyChooseUs;

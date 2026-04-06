"use client";
import React from "react";
import Link from "next/link";
import { Row, Col } from "antd";
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

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <Row gutter={[32, 48]} align="middle" className={styles.row}>
          
          {/* Column 1: Intro Text */}
          <Col xs={24} lg={8}>
            <div className={styles.textColumn}>
              <h2 className={styles.title}>
                Let’s Build a Brand People Remember
              </h2>
              <p className={styles.description}>
                A strong brand is not built overnight. It is built with clarity,
                consistency, and the right direction. At Brand Marketing Hub, we
                work as your long-term branding consultant.
              </p>
            </div>
          </Col>

          {/* Column 2: Center Image */}
          <Col xs={24} lg={8}>
            <div className={styles.imageColumn}>
              <img
                src="/images/home-page/Brand_Marketing_Hub-landing.webp"
                alt="Brand Strategy Funnel"
                className={styles.funnelImage}
              />
              <Link href="/getaquote" passHref>
                <button className={styles.strategyBtn}>
                  GET YOUR FREE STRATEGY
                </button>
              </Link>
            </div>
          </Col>

          {/* Column 3: Features (The Fixed Part) */}
          <Col xs={24} lg={8}>
            <div className={styles.featuresColumn}>
              {featureItems.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.featureItem} ${
                    activeContent === index ? styles.active : ""
                  }`}
                  onClick={() => setActiveContent(index)}
                >
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  <div className={styles.featureTextContent}>
                    <h4 className={styles.featureTitle}>{item.title}</h4>
                    <p className={styles.featureDesc}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>

        </Row>
      </div>
    </section>
  );
};

export default WhyChooseUs;
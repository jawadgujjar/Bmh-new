import React from "react";
import { Row, Col, Card, Button } from "antd";
import styles from "../../styles/forwhom.module.css";

// Import your icons (replace with actual icon paths)
import StartupIcon from "../../../public/images/startup-business.webp";
import SmbIcon from "../../../public/images/small-business.webp";
import EnterpriseIcon from "../../../public/images/enterprise.webp";
import AgencyIcon from "../../../public/images/digital-agencies.webp";

const Forwhom = () => {
  const cardData = [
    {
      title: "Startup Business",
      content:
        "Tailored solutions for new businesses looking to establish their online presence.",
      icon: StartupIcon,
    },
    {
      title: "Small & Medium Scale Business",
      content:
        "Cost-effective digital solutions designed for growing businesses.",
      icon: SmbIcon,
    },
    {
      title: "Enterprise",
      content: "Comprehensive digital strategies for large organizations.",
      icon: EnterpriseIcon,
    },
    {
      title: "Digital Agencies",
      content:
        "Partnership opportunities for agencies looking to expand their offerings.",
      icon: AgencyIcon,
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[48, 32]} align="middle">
        <Col xs={24} md={12}>
          <div className={styles.contentSection}>
            <h3 className={styles.subTitle}>
              Your Brand Should Be Clear. Memorable. Easy to Trust.
            </h3>
            <p className={styles.description}>
              Brand Marketing Hub helps businesses across the USA turn spread
              ideas into clear, confident, and consistent brands. We design
              digital branding systems that do more than just look good — they
              communicate value, build trust, and guide your audience to take
              action. In today’s digital world, people don’t have time to figure
              out complicated messages. They connect with brands that feel
              simple, professional, and easy to understand. That’s exactly what
              we create. From the very first interaction, we focus on making
              your brand feel reliable, structured, and meaningful. Because when
              your brand is easy to understand, it becomes easier to choose.
            </p>
            <Button type="primary" size="large" className={styles.quoteButton}>
             Start Building Your Brand
            </Button>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className={styles.cardsContainer}>
            <Row gutter={[16, 16]}>
              {cardData.map((card, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card className={styles.card} cover={null}>
                    <div className={styles.cardContentWrapper}>
                      <div className={styles.cardIconContainer}>
                        <img
                          alt={card.title}
                          src={card.icon.src}
                          className={styles.cardIcon}
                        />
                      </div>
                      <h4 className={styles.cardTitle}>{card.title}</h4>
                      {/* <p className={styles.cardContent}>{card.content}</p> */}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>

      <div className={styles.divider}></div>
    </div>
  );
};

export default Forwhom;

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
      content: "Tailored solutions for new businesses looking to establish their online presence.",
      icon: StartupIcon
    },
    {
      title: "Small & Medium Scale Business",
      content: "Cost-effective digital solutions designed for growing businesses.",
      icon: SmbIcon
    },
    {
      title: "Enterprise",
      content: "Comprehensive digital strategies for large organizations.",
      icon: EnterpriseIcon
    },
    {
      title: "Digital Agencies",
      content: "Partnership opportunities for agencies looking to expand their offerings.",
      icon: AgencyIcon
    },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[48, 32]} align="middle">
        <Col xs={24} md={12}>
          <div className={styles.contentSection}>
            <h3 className={styles.subTitle}>FOR WHOM WE WORK?</h3>
            <p className={styles.description}>
              The Brand Marketing Hub is one of the famous{" "}
              <strong>Mobile App</strong>, <strong>Web Development</strong> and{" "}
              <strong>Digital Marketing</strong> company based in Denver. A team
              of experts from Brand Marketing website development company
              welcomes all businesses from large enterprises to new startups
              across the globe. There are more than successful projects are on
              our credits since our goal is the satisfaction of our clients.
            </p>
            <Button type="primary" size="large" className={styles.quoteButton}>
              Get A Free Quote Now
            </Button>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className={styles.cardsContainer}>
            <Row gutter={[16, 16]}>
              {cardData.map((card, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card 
                    className={styles.card}
                    cover={null}
                  >
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
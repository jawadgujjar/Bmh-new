import React from "react";
import { Card, Button, Row, Col } from "antd";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCode,
  FaLink,
  FaLaptopCode,
  FaShareAlt,
  FaDollarSign,
  FaPencilAlt,
} from "react-icons/fa";
import styles from "../../styles/digital-marketing/servicesdigital.module.css";

const services = [
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Through careful keyword research and white hat SEO practices, we can help you achieve higher organic rankings and increased visibility in search results.",
    link: "https://example.com/seo",
    icon: <FaSearch />,
    bgColor: "black",
  },
  {
    title: "Franchise SEO",
    description:
      "Amplify your market reach and improve your brand reputation with Thrive's franchise SEO services.",
    link: "https://example.com/franchise-seo",
    icon: <FaMapMarkerAlt />,
    bgColor: "white",
  },
  {
    title: "Local SEO",
    description:
      "Statistics show that 88 percent of consumers searching for local businesses online will call or visit a store within 24 hours.",
    link: "https://example.com/local-seo",
    icon: <FaMapMarkerAlt />,
    bgColor: "black",
  },
  {
    title: "Technical SEO",
    description:
      "Establish a strong online foundation with on-point technical SEO and internet marketing services.",
    link: "https://example.com/technical-seo",
    icon: <FaCode />,
    bgColor: "white",
  },
  {
    title: "Link Building",
    description:
      "Acquire a steady stream of traffic from high-authority websites and increase your consumer trust.",
    link: "https://example.com/link-building",
    icon: <FaLink />,
    bgColor: "black",
  },
  {
    title: "Web Design & Development",
    description:
      "Thrive builds custom, mobile-ready and search engine optimized websites that help you meet your business objectives.",
    link: "https://example.com/web-design-development",
    icon: <FaLaptopCode />,
    bgColor: "white",
  },
  {
    title: "Social Media Marketing",
    description:
      "Ready to expand and market to your audiences on social media? We build social media campaigns to help your business grow.",
    link: "https://example.com/social-media-marketing",
    icon: <FaShareAlt />,
    bgColor: "black",
  },
  {
    title: "Pay Per Click (PPC) Management",
    description:
      "Reach your customers quickly and with precision with a data-driven PPC campaign.",
    link: "https://example.com/ppc-management",
    icon: <FaDollarSign />,
    bgColor: "white",
  },
  {
    title: "Content Writing",
    description:
      "Your website's content is crucial: it's the foundation of your SEO and the reason many people visit your site.",
    link: "https://example.com/content-writing",
    icon: <FaPencilAlt />,
    bgColor: "black",
  },
];

function Digitalservices1() {
  return (
    <div className={styles.container}>
      <p className={styles.text1}>Brand's Digital Marketing Services</p>
      <p className={styles.text2}>
        Build Brand Recognition as an Industry Leader and Increase Profitability
      </p>

      <div className={styles.cardsContainer}>
        <Row gutter={[16, 16]} justify="center">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                className={`${styles.card} ${
                  service.bgColor === "black"
                    ? styles.cardBlack
                    : styles.cardWhite
                }`}
                hoverable
                bordered={false}
              >
                <div className={styles.cardHeader}>
                  <span
                    className={
                      service.bgColor === "black"
                        ? styles.iconBlack
                        : styles.iconWhite
                    }
                  >
                    {service.icon}
                  </span>
                  <h3
                    className={
                      service.bgColor === "black"
                        ? styles.cardTitleBlack
                        : styles.cardTitleWhite
                    }
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  className={
                    service.bgColor === "black"
                      ? styles.cardDescriptionBlack
                      : styles.cardDescriptionWhite
                  }
                >
                  {service.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* <div className={styles.buttonContainer}>
        <Button type="primary" className={styles.proposalButton} size="large">
          GET STARTED NOW
        </Button>
      </div> */}
    </div>
  );
}

export default Digitalservices1;

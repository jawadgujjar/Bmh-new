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
import styles from "../../styles/web-development/servicesweb.module.css";

const services = [
  {
    title: "MEAN Stack Development",
    description:
      "Build robust, scalable web applications using MongoDB, Express, Angular, and Node.js for full-stack JavaScript solutions.",
    link: "https://example.com/mean-development",
    icon: <FaCode />,
    bgColor: "black",
  },
  {
    title: "MERN Stack Development",
    description:
      "Leverage the power of MongoDB, Express, React, and Node.js to create dynamic and modern web applications.",
    link: "https://example.com/mern-development",
    icon: <FaLaptopCode />,
    bgColor: "white",
  },
  {
    title: "Vast Technology Options",
    description:
      "From modern frameworks to custom stacks, we offer tailored tech solutions to fit your project requirements.",
    link: "https://example.com/technology-options",
    icon: <FaShareAlt />,
    bgColor: "black",
  },
  {
    title: "WordPress Development",
    description:
      "We craft powerful and fully-customized WordPress websites optimized for performance and easy management.",
    link: "https://example.com/wordpress",
    icon: <FaPencilAlt />,
    bgColor: "white",
  },
  {
    title: "Shopify (E-Commerce)",
    description:
      "Boost your online store with Shopify development services, from custom themes to powerful integrations.",
    link: "https://example.com/shopify",
    icon: <FaDollarSign />,
    bgColor: "black",
  },
  {
    title: "Python Development",
    description:
      "We build scalable and secure web applications using Python and Django for robust backend solutions.",
    link: "https://example.com/python-development",
    icon: <FaCode />,
    bgColor: "white",
  },
  {
    title: "JavaScript Development",
    description:
      "Expert JavaScript developers building interactive and responsive user interfaces with clean code.",
    link: "https://example.com/javascript-development",
    icon: <FaCode />,
    bgColor: "black",
  },
  {
    title: ".NET Development",
    description:
      "Create high-performance enterprise-level applications using Microsoft .NET technologies.",
    link: "https://example.com/dotnet",
    icon: <FaLaptopCode />,
    bgColor: "white",
  },
  {
    title: "Next.js Development",
    description:
      "Deliver fast, SEO-friendly, and server-rendered React apps using the power of Next.js.",
    link: "https://example.com/nextjs",
    icon: <FaCode />,
    bgColor: "black",
  },
];

function Webservices1() {
  return (
    <div className={styles.container}>
      <p className={styles.text1}>Our Expertise</p>
      <p className={styles.text2}>
        Our Full-stack developers tackle complex projects with ease. Our mastery
        of both front-end and back-end technologies ensures efficient
        development, getting your project done smoothly and effectively.
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

export default Webservices1;

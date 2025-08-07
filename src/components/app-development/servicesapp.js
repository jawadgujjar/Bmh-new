import React from "react";
import { Card, Row, Col } from "antd";
import {
  FaAndroid,
  FaApple,
  FaCode,
  FaCogs,
  FaCloud,
  FaShieldAlt,
  FaPalette,
  FaMobileAlt,
  FaRocket
} from "react-icons/fa";
import styles from "../../styles/app-development/servicesapp.module.css";

const services = [
  {
    title: "iOS App Development",
    description:
      "We build scalable, secure, and high-performance native apps for iPhone and iPad using Swift and Objective-C.",
    link: "#",
    icon: <FaApple />,
    bgColor: "black",
  },
  {
    title: "Android App Development",
    description:
      "Develop powerful and user-friendly native Android apps using Java or Kotlin tailored for all Android devices.",
    link: "#",
    icon: <FaAndroid />,
    bgColor: "white",
  },
  {
    title: "Cross-Platform Apps",
    description:
      "Build once, deploy everywhere. We use React Native and Flutter to deliver seamless apps for both iOS and Android.",
    link: "#",
    icon: <FaMobileAlt />,
    bgColor: "black",
  },
  {
    title: "UI/UX Design",
    description:
      "Engaging and intuitive app interfaces designed to enhance user experience and increase retention.",
    link: "#",
    icon: <FaPalette />,
    bgColor: "white",
  },
  {
    title: "Backend & APIs",
    description:
      "We build scalable backends and integrate third-party APIs to power your app with real-time and secure data.",
    link: "#",
    icon: <FaCloud />,
    bgColor: "black",
  },
  {
    title: "App Security",
    description:
      "We implement industry-leading security protocols to ensure user data, authentication, and transactions stay protected.",
    link: "#",
    icon: <FaShieldAlt />,
    bgColor: "white",
  },
  {
    title: "App Maintenance",
    description:
      "Keep your app updated and running smoothly with version updates, bug fixes, and ongoing performance improvements.",
    link: "#",
    icon: <FaCogs />,
    bgColor: "black",
  },
  {
    title: "App Store Optimization",
    description:
      "Improve app visibility and downloads with keyword optimization, engaging visuals, and strategic metadata setup.",
    link: "#",
    icon: <FaRocket />,
    bgColor: "white",
  },
  {
    title: "Custom App Development",
    description:
      "Have a unique app idea? We build tailor-made mobile applications from concept to deployment — 100% customized.",
    link: "#",
    icon: <FaCode />,
    bgColor: "black",
  },
];

function Appservices1() {
  return (
    <div className={styles.container}>
      <p className={styles.text1}>Mobile App Development Services</p>
      <p className={styles.text2}>
        Our expert mobile app developers deliver feature-rich, user-friendly apps built for performance and scalability — whether you need native, hybrid, or cross-platform solutions.
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

      {/* Uncomment the button if needed */}
      {/* <div className={styles.buttonContainer}>
        <Button type="primary" className={styles.proposalButton} size="large">
          GET STARTED NOW
        </Button>
      </div> */}
    </div>
  );
}

export default Appservices1;

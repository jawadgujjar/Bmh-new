"use client";

import React from "react";
import styles from "../../styles/app-development/processsection.module.css";
import { FaSearch, FaPalette, FaCode, FaCheckCircle, FaRocket } from "react-icons/fa";

const Process1 = () => {
  const processSteps = [
    {
      icon: <FaSearch />,
      title: "Discovery & Strategy",
      description: "A validated product roadmap, user journey maps, and technical architecture. This phase defines MVP scope, system requirements, and milestones before any code is written.",
    },
    {
      icon: <FaPalette />,
      title: "UX & Interface Design",
      description: "Interactive wireframes, clickable high-fidelity prototypes, and a scalable design system — crafted for user retention, accessible navigation, and intuitive workflows.",
    },
    {
      icon: <FaCode />,
      title: "Development & Integration",
      description: "Production-ready source code, custom API integrations, and secure database design, with cloud infrastructure setup and scalable back-end architecture.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Testing & QA",
      description: "Comprehensive test execution, cross-browser verification, automated UI testing, load capacity analysis, and security vulnerability patches ahead of deployment.",
    },
    {
      icon: <FaRocket />,
      title: "Launch & Ongoing Support",
      description: "Live server deployment, App Store and Google Play publishing, continuous monitoring, security patches, performance updates, and SLA-backed technical support after launch.",
    },
  ];

  return (
    <div className={styles.servicesGridContainer}>
      {processSteps.map((step, index) => (
        <div key={index} className={styles.serviceCard}>
          <div className={styles.iconWrapper}>{step.icon}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Process1;
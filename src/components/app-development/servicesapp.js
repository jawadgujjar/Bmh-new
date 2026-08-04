"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import styles from "@/styles/digital-marketing/servicesdigital.module.css";

export default function Appservices1({ category }) {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/subcategories?category=${category}`);
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setServices([]);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className={styles.container}>
      {/* <p className={styles.text1}>Application Development Services — End-to-End, From Concept to Launch</p>
      <p className={styles.text2}>
        The difference between a good application and one that actually gets used comes down to how well the development process handles the full picture. Our services cover every stage with absolute care, focusing purely on high-impact deliverables.
      </p>

      <ul>
        <li>
          <strong>Discovery & Strategy</strong> — We deliver a validated product roadmap, user journey maps, and robust technical architecture. This phase defines your MVP scope, system requirements, and clear milestones, alignment-ready before any coding begins.
        </li>
        <li>
          <strong>UX & Interface Design</strong> — We deliver interactive wireframes, clickable high-fidelity prototypes, and a complete, scalable design system. Every interface is crafted to maximize user retention, accessible navigation, and intuitive behavioral workflows.
        </li>
        <li>
          <strong>Development & Integration</strong> — We deliver production-ready source code, custom API integrations, and secure database design. Our engineering ensures cross-platform performance, cloud infrastructure setup, and fully scalable back-end architecture.
        </li>
        <li>
          <strong>Testing & QA</strong> — We deliver comprehensive test execution reports, cross-browser verification, and security vulnerability patches. Our strict testing covers automated UI runs, load capacity analysis, and zero-bug deployment readiness.
        </li>
        <li>
          <strong>Launch & Ongoing Support</strong> — We deliver live server deployment, App Store/Google Play publishing, and continuous monitoring. You receive ongoing security patches, performance optimization updates, and SLA-backed technical assistance.
        </li>
      </ul> */}

      <div className={styles.cardsContainer}>
        {!services.length ? (
          <p className={styles.noData}>No data found</p>
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {services.map((service, index) => {
              const isBlack = index % 2 === 0;

              return (
                <Col xs={24} sm={12} md={8} key={service._id}>
                  <Card
                    hoverable
                    bordered={false}
                    className={`${styles.card} ${isBlack ? styles.cardBlack : styles.cardWhite
                      }`}
                    onClick={() => router.push(`/${service.slug}`)}
                  >
                    <div className={styles.cardHeader}>
                      <h3
                        className={
                          isBlack
                            ? styles.cardTitleBlack
                            : styles.cardTitleWhite
                        }
                      >
                        {service.name}
                      </h3>
                    </div>

                    <div
                      className={
                        isBlack
                          ? styles.cardDescriptionBlack
                          : styles.cardDescriptionWhite
                      }
                      dangerouslySetInnerHTML={{
                        __html: service.topSection?.description,
                      }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}

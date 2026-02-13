"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import styles from "@/styles/digital-marketing/servicesdigital.module.css";

export default function Digitalservices1({ category }) {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/subcategories?category=${category}`
        );
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
      <p className={styles.text1}>
        Custom Digital Marketing Solutions for Startups and Small Businesses
      </p>
      <p className={styles.text2}>
        Startups and small businesses require flexibility and precision. Brand Marketing Hub delivers custom digital marketing solutions that adapt as your business grows. We do not push pre-built packages or unnecessary services. Instead, we analyze your market position, growth stage, and objectives before designing a strategy that fits.
        As an affordable digital marketing agency, we help startups compete intelligently without overspending. Our focus is on building strong digital foundations that support scalability, whether through organic growth, paid acquisition, or brand positioning. This makes us a reliable marketing agency for small business owners who want clarity and control over their marketing investment.

      </p>

      <div className={styles.cardsContainer}>
        {!services.length ? (
          <p className={styles.noData}>
            No data found
          </p>
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {services.map((service, index) => {
              const isBlack = index % 2 === 0;

              return (
                <Col xs={24} sm={12} md={8} key={service._id}>
                  <Card
                    hoverable
                    bordered={false}
                    className={`${styles.card} ${isBlack
                        ? styles.cardBlack
                        : styles.cardWhite
                      }`}
                    onClick={() =>
                      router.push(`/${service.slug}`)
                    }
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

                    <p
                      className={
                        isBlack
                          ? styles.cardDescriptionBlack
                          : styles.cardDescriptionWhite
                      }
                    >
                      {service.topSection?.description}
                    </p>
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

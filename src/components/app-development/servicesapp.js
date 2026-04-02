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
      <p className={styles.text1}>Built for the Standards and Expectations of the USA Market</p>
      <p className={styles.text2}>
        The USA market demands more than basic functionality. Users expect speed, reliability, security, and consistency across devices. Applications that fail to meet these expectations often struggle to retain users or build trust. Recognizing this reality is essential when developing applications intended for long-term use. Brand Marketing Hub develops applications using modern and proven app development platforms that support performance and scalability. Careful testing and optimization ensure that applications perform smoothly under real-world conditions. This approach allows businesses to meet user expectations today while remaining prepared for future growth.
      </p>

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

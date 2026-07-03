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
    <section className={styles.container}>
      {/* Aapka Content - Title */}
      <h2 className={styles.text1}>
        A Full-Service Digital Suite for Every Growth Stage
      </h2>

      {/* Aapka Content - Full Paragraph */}
      <p className={styles.text2}>
        From visibility to conversion, BMH covers the entire acquisition funnel under one roof. Here is what we deliver for startups and growing businesses:
      </p>

      <div className={styles.cardsContainer}>
        {!services.length ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>No data found</p>
        ) : (
          <Row gutter={[24, 24]} justify="center">
            {services.map((service, index) => {
              const isBlack = index % 2 === 0;

              return (
                <Col xs={24} sm={12} md={8} key={service._id}>
                  <Card
                    hoverable
                    bordered={false}
                    className={`${styles.card} ${isBlack ? styles.cardBlack : styles.cardWhite}`}
                    onClick={() => router.push(`/${service.slug}`)}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={isBlack ? styles.cardTitleBlack : styles.cardTitleWhite}>
                        {service.name}
                      </h3>
                    </div>

                    <div
                      className={isBlack ? styles.cardDescriptionBlack : styles.cardDescriptionWhite}
                      dangerouslySetInnerHTML={{ __html: service.topSection?.description }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </section>
  );
}
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
      <p className={styles.text1}>Cross Platform Solutions for Modern Users</p>
      <p className={styles.text2}>
        Today’s users expect a consistent experience across devices. Whether they are using a mobile phone, tablet, or desktop, the application should work smoothly without limitations. Our cross platform app development services are designed to meet this expectation.
Instead of building separate systems, we create a unified application that performs reliably across platforms. This approach reduces complexity and ensures your users have the same experience everywhere.
For businesses, this means faster deployment, easier updates, and better control over the entire system.

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

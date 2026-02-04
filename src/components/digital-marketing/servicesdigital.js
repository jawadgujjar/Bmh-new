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
        Brand&apos;s Digital Marketing Services
      </p>
      <p className={styles.text2}>
        Build Brand Recognition as an Industry Leader and Increase Profitability
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
                    className={`${styles.card} ${
                      isBlack
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

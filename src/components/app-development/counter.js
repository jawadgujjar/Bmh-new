"use client";

import React from "react";
import styles from "../../styles/app-development/counter.module.css";

const Counter = () => {
  const stats = [
    {
      number: "150+",
      label: "Applications Delivered",
    },
    {
      number: "98%",
      label: "Client Retention Rate",
    },
    {
      number: "12+",
      label: "Industries Served",
    },
    {
      number: "5x",
      label: "Average ROI Increase",
    },
  ];

  return (
    <div className={styles.counterContainer}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.counterItem}>
          <h2>{stat.number}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Counter;
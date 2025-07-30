"use client";
import React from 'react';
import Carousel from '../landing/carousel';
import Portfolio from './portfolio';
import styles from '../../styles/portfolioremianing.module.css';

const PortfolioRemain = () => {
  return (
    <div>
      <p className={styles.portfolio}>PORTFOLIO</p>
      <Portfolio />
      <div className={styles.containerportfolio}>
        <div className={styles.textBox}>
          <p>How Does Your Site Compare?</p>
          <button className={styles.actionButton}>Free SEO Report</button>
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default PortfolioRemain;
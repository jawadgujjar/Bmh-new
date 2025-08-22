"use client";
import React, { useState } from 'react';
import Carousel from '../landing/carousel';
import Portfolio from './portfolio';
import styles from '../../styles/portfolioremianing.module.css';

const PortfolioRemain = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    'All',
    'Digital Marketing',
    'Web Development',
    'App Development',
    'SEO',
    'E-commerce',
    'Education & E-learning',
    'ERP System',
    'Food & Restaurant',
    'Gaming',
    'IT & Startups',
    'Jewelry',
    'Medical & Healthcare',
    'Real Estate',
    'Sports'
  ];

  return (
    <div>
      <p className={styles.portfolio}>PORTFOLIO</p>
      
      {/* Categories Section */}
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <Portfolio activeCategory={activeCategory} />
      
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

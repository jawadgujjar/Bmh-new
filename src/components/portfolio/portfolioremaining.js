"use client";
import React, { useState, useEffect } from 'react';
import Carousel from '../landing/carousel';
import Portfolio from './portfolio';
import styles from '../../styles/portfolioremianing.module.css';

const PortfolioRemain = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [portfolioData, setPortfolioData] = useState([]);
  const [categories, setCategories] = useState(['All']); // Initialize with 'All'

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio'); // Your API endpoint
        const result = await response.json();
        if (result.success) {
          const keywordsData = result.data || []; // Use result.data as the array of keyword objects

          // Extract unique keywords for categories
          const uniqueKeywords = [...new Set(keywordsData.map(item => item.keyword))];
          setCategories(['All', ...uniqueKeywords]);

          // Flatten websites and add keyword to each for filtering
          const flattenedWebsites = keywordsData.flatMap(keywordItem => 
            keywordItem.websites.map(website => ({
              ...website,
              keyword: keywordItem.keyword // Attach keyword to each website
            }))
          );
          setPortfolioData(flattenedWebsites);
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div>
      {/* <p className={styles.portfolio}>PORTFOLIO</p> */}

      {/* Categories Section - Now dynamic from API keywords */}
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

      <Portfolio activeCategory={activeCategory} portfolioData={portfolioData} />

      <div className={styles.containerportfolio}>
        <div className={styles.textBox}>
          <p>How Does Your Site Compare?</p>
          <button className={styles.actionButton}>Free Report</button>
        </div>
      </div>

      <Carousel />
    </div>
  );
};

export default PortfolioRemain;
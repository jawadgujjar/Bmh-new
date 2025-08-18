import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/landing/webdevelopment/webindustries.module.css';

const WebIndustries = () => {
  const industries = [
    {
      title: "Fitness & Wellness",
      description: "Boost your fitness brand's online presence with our SEO strategies.",
      link: "https://gympassport.pk/",
      image: "/images/fitness-wellness.jpg"
    },
    {
      title: "Fashion",
      description: "Elevate your fashion brand's visibility in search results.",
      link: "https://visitlahore.com/",
      image: "/images/fashion.jpg"
    },
    {
      title: "Education",
      description: "Improve your educational institution's online discoverability.",
      link: "https://www.sireprinting.com/",
      image: "/images/education.jpg"
    },
    {
      title: "Consultancy",
      description: "SEO-driven digital solutions for consultancy firms.",
      link: "https://www.7skyconsultancy.com/",
      image: "/images/consultancy.jpg"
    },
    {
      title: "E-Commerce",
      description: "Boost your online store's visibility and sales",
      link: "http://bmh.vercel.app/",
      image: "/images/ecommerce.jpg"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const iframeRefs = useRef(industries.map(() => React.createRef()));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % industries.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, industries.length]);

  const handleMouseEnter = (index) => {
    setIsPaused(true);
    const iframe = iframeRefs.current[index].current;
    if (iframe) {
      let scrollPosition = 0;
      const scrollInterval = setInterval(() => {
        scrollPosition += 2;
        iframe.contentWindow.scrollTo(0, scrollPosition);
        if (scrollPosition >= iframe.contentWindow.document.body.scrollHeight) {
          scrollPosition = 0;
        }
      }, 50);
      iframe.dataset.scrollInterval = scrollInterval;
    }
  };

  const handleMouseLeave = (index) => {
    setIsPaused(false);
    const iframe = iframeRefs.current[index].current;
    if (iframe && iframe.dataset.scrollInterval) {
      clearInterval(iframe.dataset.scrollInterval);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.carouselTitle}>Transform Your Industry with Web & App Development</h2>
      <p className={styles.carouselSubtitle}>Modern experiences across web and mobile—built to perform.</p>
      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${(activeIndex * 25)}%)` }}
        >
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`${styles.carouselSlide} ${Math.abs(activeIndex - index) < 4 ? styles.activeSlide : ''}`}
            >
              <a href={industry.link} target="_blank" rel="noopener noreferrer" className={styles.carouselLink}>
                <div
                  className={styles.carouselCard}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <iframe
                    ref={iframeRefs.current[index]}
                    src={industry.link}
                    className={styles.cardIframe}
                    title={industry.title}
                    sandbox="allow-scripts allow-same-origin"
                  />
                  <h3 className={styles.cardTitle}>{industry.title}</h3>
                  <p className={styles.cardDescription}>{industry.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselIndicators}>
        {industries.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WebIndustries;

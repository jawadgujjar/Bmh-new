'use client';
import { useState } from 'react';
import styles from '../../styles/landing/faqs.module.css';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What kind of businesses does Brand Marketing Hub work with?",
      answer: "We work with small businesses, luxury brands, service providers, and individuals who want clear and simple branding that works online."
    },
    {
      question: "Are your digital branding solutions easy to understand?",
      answer: "Yes. We focus on simple language, clear ideas, and practical strategies that make branding easy for business owners and users."
    },
    {
      question: "Can small businesses benefit from your branding services?",
      answer: "Absolutely. Our small business branding agency services are designed to be affordable, flexible, and focused on steady growth."
    },
    {
      question: "Do you help with personal branding as well?",
      answer: "Yes. We offer personal branding consultant services for professionals who want to build trust, visibility, and confidence online."
    },
    {
      question: "How does your branding help with Google and SEO?",
      answer: "Our content is AI-optimized and semantically structured to match how Google understands helpful and relevant information, while still being written for real people."
    }
    
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h1><span className={styles.frequently}>Frequently</span> Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>

      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
          >
            <div 
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <h3>{faq.question}</h3>
              <span className={styles.faqIcon}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.faqContact}>
        <h2>Still have questions?</h2>
        <p>
          Contact us directly at <a href="mailto:support@example.com">support@example.com</a> 
          or call <a href="tel:+18132140535">(813) 214-0535</a>
        </p>
      </div>
    </div>
  );
}

export default FAQ;

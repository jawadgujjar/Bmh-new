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
      question: "How long does it take to receive a quote?",
      answer: "We typically respond with a quote within 1-2 business days after receiving your request. Complex projects may take slightly longer."
    },
    {
      question: "What information do I need to provide for an accurate quote?",
      answer: "Please provide product type, quantity, dimensions, material preference, and any special requirements like printing or finishing options."
    },
    {
      question: "Do you offer design services?",
      answer: "Yes, we have an in-house design team that can help create or refine your packaging design for an additional fee."
    },
    {
      question: "What is your minimum order quantity?",
      answer: "Our MOQ varies by product type but typically starts at 100 units for standard items. Custom products may have higher MOQs."
    },
    {
      question: "What file formats do you accept for artwork?",
      answer: "We accept AI, EPS, PDF, PSD, JPG, and PNG files. Vector files are preferred for printing."
    },
    {
      question: "How long does production take?",
      answer: "Production time depends on the complexity of your order but typically ranges from 10-15 business days after approval."
    },
    {
      question: "Do you offer eco-friendly packaging options?",
      answer: "Yes, we offer a range of sustainable materials including recycled, compostable, and biodegradable options."
    },
    {
      question: "Can I get samples before placing a large order?",
      answer: "Absolutely! We provide samples of our standard products for a small fee that's credited back when you place your order."
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
          or call <a href="tel:+1234567890">(123) 456-7890</a>
        </p>
      </div>
    </div>
  );
}

export default FAQ;

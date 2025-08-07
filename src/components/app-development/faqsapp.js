"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '../../styles/app-development/faqsapp.module.css';

const Faqapp1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What platforms do you develop mobile apps for?",
      answer:
        "We develop apps for iOS (iPhone, iPad), Android smartphones/tablets, and also offer cross-platform solutions using frameworks like React Native and Flutter."
    },
    {
      question: "How long does it take to build a mobile app?",
      answer:
        "The timeline depends on the complexity and features of the app. A basic app may take 4–8 weeks, while more complex apps with custom backend, integrations, and advanced UI can take 3–6 months or more."
    },
    {
      question: "What technologies do you use for mobile app development?",
      answer:
        "We use Swift and Objective-C for iOS, Kotlin and Java for Android, and cross-platform tools like Flutter and React Native to build apps efficiently for both platforms."
    },
    {
      question: "Do you help with publishing the app on the App Store and Play Store?",
      answer:
        "Yes, we offer full deployment support including app store submission, preparing assets (icons, descriptions, screenshots), and ensuring your app meets Apple's and Google’s guidelines."
    },
    {
      question: "Will my app be secure and scalable?",
      answer:
        "Absolutely. We follow best practices in mobile security, including encrypted data transmission, secure API usage, and regular code audits. We also ensure your backend is scalable for growing users."
    }
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <div className={styles.faqColumns}>
          <div className={styles.faqHeadingCol}>
            <h2 className={styles.faqTitle}>FAQs</h2>
            <p className={styles.frequently}>
              <span className={styles.span}>Frequently</span> Asked Questions
            </p>
            <p className={styles.faqSubtitle}>Everything You Need to Know About Mobile App Development</p>
          </div>

          <div className={styles.faqQuestionsCol}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleAnswer(index)}
              >
                <div className={styles.faqQuestion}>
                  {faq.question}
                  <span className={styles.faqToggleIcon}>
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {openIndex === index && (
                  <div className={styles.faqAnswer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqapp1;

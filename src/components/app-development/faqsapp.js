"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import appImage2 from '../../../public/images/digital-agencies.webp';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/app-development/faqsapp.module.css';
import styles2 from '../../styles/app-development/appdevelopment.module.css';

const Faqapp1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is custom application development?",
      answer:
        " Custom application development means creating software designed specifically to meet a business’s unique needs and workflows, rather than using generic off-the-shelf tools."
    },
    {
      question: "Why do businesses in the USA invest in custom apps?",
      answer:
        " Businesses invest in custom applications because tailored solutions help improve operational efficiency and better match how teams and customers interact with technology."
    },
    {
      question: "How large is the application development market in the USA?",
      answer:
        " The USA application market is substantial, with strong growth driven by consumer demand and enterprise adoption across sectors like finance, healthcare, and entertainment."
    },
    {
      question: "What types of applications are most in demand?",
      answer:
        " In the USA, demand spans enterprise systems, mobile apps for iOS and Android, web-based solutions, and cross-platform applications that work across devices."
    },
    {
      question: "Does custom development improve user engagement?",
      answer:
        " Yes. Studies show that custom apps tailored to business and user needs often deliver higher efficiency and better user satisfaction compared to generic solutions."
    },
     {
      question: "Is the custom software market growing?",
      answer:
        "Yes. The custom software development market is expanding rapidly, with North America holding a major share and continued growth expected through the next decade."
    },
     {
      question: "What role does scalability play in custom app development?",
      answer:
        " Scalability is critical because applications must support business growth and handle increasing users and data without performance issues."
    },
    {
      question: "How does cross-platform development benefit businesses?",
      answer:
        " Cross-platform development allows an app to run on multiple devices with a consistent user experience, reducing development time and cost compared to building separate native apps. "
    }
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className={styles2.point}>
        <div style={{ textAlign: "center", padding: "3%" }}>
          <h2>
            <span className={styles.span}>Trusted by Businesses</span>  Looking for Real Solutions
          </h2>
          <p>
            As a top application development company, Brand Marketing Hub focuses on delivering solutions that work in real environments. Businesses trust us because we avoid unnecessary complexity and focus on what actually matters.
            Our approach is transparent and practical. We communicate clearly, deliver what we promise, and build systems that businesses can rely on daily. This has helped us work with companies that need dependable applications without the risk of frequent issues or costly changes.

          </p>
        </div>
        <div className={styles2.imageContent1}>
          <Image
            src={appImage2}
            alt="Mobile development workflow"
            width={600}
            height={500}
            className={styles2.image}
            quality={100}
          />
        </div>
        <div className={styles2.pointsList}>
          <p className={styles2.pointsTextx}>
            Long-Term Value for Your Business
          </p>

          <p className={styles2.featuresList}>
            Investing in custom application development is not just about solving immediate challenges. It is about creating a system that becomes a core part of your business operations.
            A well-built application improves efficiency, reduces manual work, and helps teams stay organized. It also provides better control over data and processes, allowing you to make informed decisions.
            Over time, this leads to better performance, smoother operations, and stronger business growth.

          </p>

        </div>
      </div>


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
    </div>
  );
};

export default Faqapp1;

"use client";

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from '../../styles/app-development/faqsapp.module.css';
import styles2 from '../../styles/app-development/appdevelopment.module.css';

const Faqapp1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
        question: "What is the difference between off-the-shelf software and custom application development?",
        answer: "Off-the-shelf software is a generic, pre-built solution designed for the mass market, which often forces your team to adapt to its limitations. Custom app development, however, is built entirely around your specific workflows, business logic, and scaling needs—acting as a competitive asset rather than an ongoing operational headache."
    },
    {
        question: "Why should a US business choose cross-platform app development over native development?",
        answer: "Cross-platform development allows you to build your application for iOS, Android, and web using a single, maintainable codebase. For US businesses, this means significantly reduced development costs, faster time-to-market, and simplified long-term maintenance, all without sacrificing native-like performance and user experience."
    },
    {
        question: "Which industries does Brand Marketing Hub specialize in?",
        answer: "While our engineering standards remain consistent, we have successfully delivered custom applications for a diverse range of industries across the USA, including professional services, healthcare providers, logistics companies, fintech startups, and e-commerce brands."
    },
    {
        question: "How do you handle post-launch support and application maintenance?",
        answer: "We don't just build and disappear. Long-term accountability is built into our engagement model. After launch, our team provides continuous performance monitoring, bug resolution, security updates, and feature evolution to ensure your application scales smoothly alongside your business."
    },
    {
        question: "How do we get started, and what does your discovery process look like?",
        answer: "Getting started is simple—just reach out through our contact form. Our process begins with a deep-dive Discovery phase where we analyze your business goals, map user journeys, and define technical requirements. This ensures we align on a clear architectural roadmap and budget before a single line of code is written."
    }
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapperContainer}>
      {/* --- Top CTA Section --- */}
      <div className={styles.ctaDarkSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaHeading}>
            Ready to Build an Application That Gives Your Business a <span className={styles.orangeHighlight}>Real Edge?</span>
          </h2>
          <p className={styles.ctaDescription}>
            The right application, built the right way, becomes one of the most valuable assets your business owns. It runs your workflows, serves your customers, and scales with your growth — without the limitations of software never designed for your specific needs.
          </p>
          
          <div className={styles.ctaButtonRow}>
            <Link href="/getaquote" className={styles.primaryBtn}>
              Get a Free Proposal <FiArrowRight className={styles.btnIcon} />
            </Link>
            <a href="tel:+18132140535" className={styles.secondaryBtn}>
              <HiOutlinePhone className={styles.btnIconPhone} /> Schedule a Call
            </a>
          </div>

          <div className={styles.ctaFooterInfo}>
            <span className={styles.infoItem}>
              <HiOutlineMail className={styles.infoIcon} /> hello@brandmarketinghub.com
            </span>
            <a href="tel:+18132140535" className={styles.infoItemLink}>
              <HiOutlinePhone className={styles.infoIcon} /> +1 (813) 214-0535
            </a>
            <span className={styles.infoItem}>
              <HiOutlineLocationMarker className={styles.infoIcon} /> United States
            </span>
          </div>
        </div>
      </div>

      {/* --- FAQ Section --- */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeaderCenter}>
            <span className={styles.commonQuestionsTag}>COMMON QUESTIONS</span>
            <h2 className={styles.frequentlyHeading}>Frequently Asked Questions</h2>
            <p className={styles.faqSubtitle}>Everything you need to know about working with Brand Marketing Hub.</p>
          </div>

          <div className={styles.faqListWrapper}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleAnswer(index)}
              >
                <div className={styles.faqQuestionRow}>
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <span className={`${styles.faqToggleIcon} ${openIndex === index ? styles.rotated : ''}`}>
                    <FaChevronDown />
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
      </section>
    </div>
  );
};

export default Faqapp1;
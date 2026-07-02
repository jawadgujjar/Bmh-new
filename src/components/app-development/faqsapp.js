"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import appImage2 from 'public/images/App development/Long-Term Value for Your Business.webp';
import Image from 'next/image';
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
    <div>
      <div className={styles2.point}>
        <div style={{ textAlign: "center", padding: "0%" }}>
          <h2>
            <span className={styles.span}> </span>  Ready to Build an Application That Gives Your Business a Real Edge?
          </h2>
          <p>
            The right application, built the right way, becomes one of the most valuable assets your business owns. It runs your workflows, serves your customers, and scales with your growth — without the limitations of software that was never designed for your specific needs.
            Brand Marketing Hub is the custom application development partner for US businesses that are serious about what they build. Get in touch today and let's talk about what your application needs to do — and how we build it to do exactly that.


          </p>
        </div>
        {/* <div className={styles2.imageContent1}>
          <Image
            src={appImage2}
            alt="Mobile development workflow"
            width={500}
            height={450}
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

        </div> */}
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

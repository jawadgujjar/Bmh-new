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
    <div>
      <div className={styles2.point}>
        <div style={{ textAlign: "center", padding: "3%" }}>
          <h2>
            <span className={styles.span}>Web Development Consulting </span> Based
            on Experience
          </h2>
          <p>
            Choosing the right technical direction can be challenging without
            expert guidance. That is why we offer web development consulting to
            help businesses make informed decisions. As experienced website
            development consultants, we provide clear advice based on real project
            experience, not generic suggestions. Our web development consulting
            services cover planning, platform selection, performance improvements,
            and future scalability. Whether you need a second opinion or long-term
            technical guidance, our consulting approach is transparent, practical,
            and focused on your goals. Working with a professional website
            development consultant helps reduce risks and ensures your website
            effectively supports your business strategy.
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
            Custom Application Development as a Business Advantage
          </p>

          <p className={styles2.featuresList}>
            Custom application development is not simply a technical decision. It is a strategic one. Businesses that rely on tailored applications gain better control over their processes, data, and user experience. Unlike ready-made tools that try to serve everyone, custom applications are shaped around specific workflows, performance expectations, and operational goals. At Brand Marketing Hub, the development process begins with understanding how a business functions on a daily basis. This understanding influences every technical and design decision. The result is an application that feels intuitive to users, reduces unnecessary steps, and supports smarter decision-making. Over time, this creates measurable efficiency and stronger digital stability.
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

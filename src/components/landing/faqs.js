"use client";
import { useState } from "react";
import styles from "../../styles/landing/faqs.module.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What does Brand Marketing Hub do?",
      answer:
        "Brand Marketing Hub helps businesses build clear and consistent brand identities that are easy to understand and trust. We focus on how your brand communicates across digital platforms, not just how it looks. Our work includes brand strategy, messaging, positioning, and overall brand management so your business presents itself in a structured and professional way.",
    },
    {
      question: "How is your approach to branding different?",
      answer:
        "Most branding focuses only on visuals, but we focus on clarity and communication. We look at how your audience understands your brand and how easily they can connect with it. By aligning strategy, messaging, and design, we create branding that feels consistent and meaningful instead of just decorative.",
    },
    {
      question: "Can small businesses work with you?",
      answer:
        "Small businesses often need branding that is simple, clear, and practical. Our approach is built to support that. We help small businesses create a strong foundation so they can communicate better, build trust, and grow steadily without unnecessary complexity.",
    },
    {
      question: "How do you handle brand positioning?",
      answer:
        "We focus on helping you clearly define what makes your business different. Instead of generic messaging, we work on creating a focused and relevant position in the market. This helps your audience quickly understand your value and makes your brand easier to choose.",
    },
    {
      question: "What is online brand management?",
      answer:
        "Online brand management is about keeping your brand consistent across all digital platforms. Your website, social media, and online presence should all reflect the same message and identity. This consistency helps build recognition and trust over time.",
    },
    {
      question: "Will your branding help with online visibility?",
      answer:
        "A clear and structured brand naturally performs better online. When your messaging is easy to understand and aligned with user intent, it supports better engagement and visibility. Our focus is on creating content and branding that works well for both users and search engines.",
    },
    {
      question: "Who do you usually work with?",
      answer:
        "We work with a wide range of clients in the USA, including startups, small businesses, service-based companies, and individuals. Anyone looking to improve how their brand communicates and connects with its audience can benefit from our approach.",
    },
    {
      question: "How long does the branding process take?",
      answer:
        "The timeline depends on the scope of the project and the specific needs of your business. We follow a structured process that allows us to focus on quality while moving at a steady and efficient pace.",
    },
    {
      question: "Why should I choose Brand Marketing Hub?",
      answer:
        "We focus on clarity, consistency, and meaningful communication. Instead of making branding complicated, we simplify the process and focus on what actually helps your business grow. Our goal is to create a brand that people understand, trust, and remember.",
    }
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h1>
          <span className={styles.frequently}>Frequently</span> Asked Questions
        </h1>
        <p>Find answers to common questions about our products and services</p>
      </div>

      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
          >
            <div
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <h3>{faq.question}</h3>
              <span className={styles.faqIcon}>
                {activeIndex === index ? "−" : "+"}
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
          Contact us directly at{" "}
          <a href="mailto:support@example.com">support@example.com</a>
          or call <a href="tel:+18132140535">(813) 214-0535</a>
        </p>
      </div>
    </div>
  );
}

export default FAQ;

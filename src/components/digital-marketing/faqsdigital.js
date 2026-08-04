"use client";
import { useState } from "react";
import styles from "../../styles/landing/faqs.module.css";
import Supportingstartup from "@/components/digital-marketing/supportingstartup";

function FAQdigital() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What does a digital marketing agency for startups actually do?",
      answer:
        "A digital marketing agency for startups builds and executes growth strategies designed for limited budgets and fast timelines. From high-intent SEO to hyper-targeted PPC campaigns, we handle the full acquisition funnel so your team can stay focused on the product.",
    },
    {
      question: "Is BMH a good marketing agency for small business owners?",
      answer:
        "Yes. BMH was built specifically for startups and small businesses that need real ROI without enterprise-level overhead. We offer flexible retainer options and transparent reporting metrics so you always know exactly where your budget is going.",
    },
    {
      question: "How long before I see results from digital marketing?",
      answer:
        "PPC and paid campaigns can generate leads within the first week. SEO typically shows measurable traction in 60 to 90 days. We set clear milestones from day one so you are never left guessing about progress.",
    },
    {
      question: "What makes BMH different from other top digital marketing agency USA?",
      answer:
        "We focus on measurable business outcomes, not vanity metrics. Every strategy is built around your CAC targets, your market stage, and your growth timeline. We act as a dedicated marketing team, not just an outsourced vendor.",
    },
    {
      question: "Do you offer custom digital marketing solutions for niche industries?",
      answer:
        "Yes. We build custom strategies based on your industry, competition, and growth goals. Whether you are in SaaS, e-commerce, professional services, or local markets, we put together a multi-channel plan that fits your specific situation.",
    },
    {
      question: "Can I get a free audit before committing to a plan?",
      answer:
        "Yes. We offer a complimentary digital marketing audit with zero obligation. Submit the proposal form on this page and our team will respond within 24 hours with a full breakdown of your growth opportunities.",
    },
    {
      question: "What is your process after I submit the proposal form?",
      answer:
        "Our three-step process starts with a deep audit and strategy session. From there, we move into agile execution across your chosen channels. Finally, we scale what is working and report every result in clear, easy-to-read dashboards.",
    },
  ];

  return (
    <div>
      {/* Render the Supportingstartup component cleanly separated */}
      <Supportingstartup />

      {/* FAQ Section with Professional Top/Bottom Padding */}
      <div className={styles.faqContainer} style={{ padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className={styles.faqHeader} style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1>
            <span className={styles.frequently}>Frequently</span> Asked Questions
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", marginTop: "10px" }}>
            Find answers to common questions about our products and services
          </p>
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

        <div className={styles.faqContact} style={{ textAlign: "center", marginTop: "60px" }}>
          <h2>Still have questions?</h2>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            Contact us directly at{" "}
            <a href="mailto:hello@brandmarketinghub.com" style={{ color: "#f97316" }}>hello@brandmarketinghub.com</a>{" "}
            or call <a href="tel:+18132140535" style={{ color: "#f97316" }}>(813) 214-0535</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQdigital;
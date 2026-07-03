"use client";
import { useState } from "react";
import styles from "../../styles/landing/faqs.module.css";
import styless from "../../styles/digital-marketing/whydigital.module.css"; // Using CSS Modules
import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image"; // Using Next.js Image component

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
      <div className={styless.aboutdigitalMain}>
        <Row justify="center" gutter={[24, 24]}>
          <Col
            xs={22} // Full width on extra small screens
            sm={22} // Full width on small screens
            md={10} // Half width on medium screens
            lg={10} // Slightly narrower on large screens
            xl={10} // Slightly narrower on extra large screens
          >
            <div className={styless.imageContainer}>
              <Image
                src="/images/digital-marketing/Supporting Startups and Small Businesses Across the USA.webp"
                alt="Supporting Startups and Small Businesses Across the USA"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </Col>
          <Col
            xs={18} // Full width on extra small screens
            sm={18} // Full width on small screens
            md={12} // Half width on medium screens
            lg={10} // Slightly narrower on large screens
            xl={10} // Slightly narrower on extra large screens
          >
            {/* <div style={{ display: "flex", alignItems: "flex-start", gap: "30px", marginTop: "0", marginBottom: "0" }}> */}



            {/* Text Section */}
            <div style={{ flex: "1" }}>
              <h3 style={{ marginTop: "0", marginBottom: "15px", fontSize: "24px" }}>Supporting Startups at Every Stage of the Growth Curve</h3>

              <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "20px" }}>
                From pre-revenue proof of concept to scaling past market validation, BMH has helped startups at every stage figure out their go-to-market strategy. We understand bootstrapped budgets. We understand the urgency that comes with seed funding. And we know how to build momentum without wasting your runway. BMH is also the go-to digital marketing agency for small business owners who want a real strategy partner, not just a vendor running ads in the background.
              </p>

              <h4 style={{ marginBottom: "10px" }}>How It Works</h4>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "15px", fontSize: "15px", lineHeight: "1.5" }}>
                  <strong>1. Audit and Strategy</strong> — We analyze your current digital presence, your competitors, and your market position. From there, we build custom digital marketing solutions aligned to your goals and timeline.
                </li>
                <li style={{ marginBottom: "15px", fontSize: "15px", lineHeight: "1.5" }}>
                  <strong>2. Execute and Optimize</strong> — Campaigns go live. Our team monitors, tests, and improves every element in real time. No set-and-forget. Just continuous, agile optimization across every active channel.
                </li>
                <li style={{ marginBottom: "15px", fontSize: "15px", lineHeight: "1.5" }}>
                  <strong>3. Scale and Report</strong> — We double down on what works and report every metric in plain language. Growth becomes repeatable, and you always know exactly what is driving it.
                </li>
              </ul>
            </div>
            {/* </div> */}

          </Col>
        </Row>

      </div>
      <div className={styless.aboutdigitalMain}>
        <Row justify="center" gutter={[24, 24]}>
          <Col
            xs={18} // Full width on extra small screens
            sm={18} // Full width on small screens
            md={12} // Half width on medium screens
            lg={10} // Slightly narrower on large screens
            xl={10} // Slightly narrower on extra large screens
          >
            <div className={styles.para} style={{ marginTop: "2rem" }}>
              <p className={styless.provenTextDigital}>
                The Right Digital Marketing Agency for Startups Ready to Grow
              </p>
              {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
              <p className={styless.allTextDigital}>
                Growth does not happen by accident. It happens when the right strategy meets consistent execution. BMH brings both. We are not here to run your ads and send you a report — we are here to help you build a brand that wins in its market.
                If you are a startup or small business that needs a real marketing partner — one that understands your constraints, speaks in outcomes, and moves fast — this is where to start.
                Our social media optimization services are already helping brands like yours build real audiences that convert. The next step is yours.

              </p>
            </div>
            {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
          </Col>
          <Col
            xs={22} // Full width on extra small screens
            sm={22} // Full width on small screens
            md={10} // Half width on medium screens
            lg={10} // Slightly narrower on large screens
            xl={10} // Slightly narrower on extra large screens
          >
            <div className={styless.imageContainer}>
              <Image
                src="/images/digital-marketing/Grow with Brand Marketing Hub.webp"
                alt="Grow with Brand Marketing Hub"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </Col>
        </Row>
        {/* <div className={styless.callactionButton}>
                <Link href="/getaquote" passHref>
                    <Button className={styless.proposalButton}>UNLOCK YOUR FRANCHISE'S POTENTIAL</Button>
                </Link>
            </div> */}
      </div>
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h1>
            <span className={styles.frequently}>Frequently</span> Asked
            Questions
          </h1>
          <p>
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

        <div className={styles.faqContact}>
          <h2>Still have questions?</h2>
          <p>
            Contact us directly at{" "}
            <a href="mailto:hello@brandmarketinghub.com">hello@brandmarketinghub.com</a>{" "}
            or call <a href="tel:+18132140535">(813) 214-0535</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQdigital;

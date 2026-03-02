"use client";

import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function SubFaqs({
  faqs = [],
  title = "Frequently Asked Questions",
}) {
  const [activeKey, setActiveKey] = useState([]);

  // Debug: Log received FAQs
  useEffect(() => {
    console.log("📝 SubFaqs Component Received:", {
      faqsCount: faqs?.length,
      faqsData: faqs,
      title: title,
    });
  }, [faqs, title]);

  // If no FAQs at all
  if (!faqs || faqs.length === 0) {
    console.log("⚠️ No FAQs array provided or empty array");
    return null; // Don't render anything
  }

  // Filter only active FAQs and sort by order
  const activeFaqs = faqs
    .filter((faq) => {
      // Check if faq exists and isActive is not false
      const isActive = faq.isActive !== false;
      if (!isActive) {
        console.log("⏸️ Skipping inactive FAQ:", faq.question);
      }
      return isActive;
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  console.log("✅ Active FAQs after filtering:", {
    total: faqs.length,
    active: activeFaqs.length,
    inactive: faqs.length - activeFaqs.length,
    activeFaqs: activeFaqs,
  });

  if (activeFaqs.length === 0) {
    console.log("⚠️ No active FAQs to display");
    return null; // Don't render if no active FAQs
  }

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          opacity: 0.05,
          borderRadius: "50%",
          transform: "translate(100px, -100px)",
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
              position: "relative",
              display: "inline-block",
            }}
          >
            {title}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "2px",
              }}
            />
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              maxWidth: "600px",
              margin: "20px auto 0",
            }}
          >
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQs Accordion */}
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <div
              style={{
                fontSize: "16px",
                color: "#1890ff",
                transition: "transform 0.3s",
                transform: isActive ? "rotate(45deg)" : "none",
              }}
            >
              {isActive ? <MinusOutlined /> : <PlusOutlined />}
            </div>
          )}
          expandIconPosition="end"
          activeKey={activeKey}
          onChange={setActiveKey}
          style={{
            background: "transparent",
            boxShadow: "none",
          }}
        >
          {activeFaqs.map((faq, index) => (
            <Panel
              key={index}
              header={
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#2d3748",
                    padding: "8px 0",
                  }}
                >
                  {faq.question}
                </span>
              }
              style={{
                marginBottom: "16px",
                background: "#ffffff",
                borderRadius: "12px !important",
                overflow: "hidden",
                border: "1px solid #e9ecef",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  padding: "16px 24px 24px 24px",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#4a5568",
                  borderTop: "1px solid #e9ecef",
                  background: "#ffffff",
                }}
              >
                {faq.answer}
              </div>
            </Panel>
          ))}
        </Collapse>

        {/* Still have questions? */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "30px",
            background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
            borderRadius: "16px",
            border: "1px dashed #667eea",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#2d3748",
              marginBottom: "12px",
            }}
          >
            Still have questions?
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "20px",
            }}
          >
            Can't find the answer you're looking for? Please chat with our
            friendly team.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "12px 30px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "50px",
              fontWeight: "500",
              fontSize: "16px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: activeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer.replace(/<[^>]*>/g, ""), // Strip HTML tags for schema
              },
            })),
          }),
        }}
      />
    </section>
  );
}

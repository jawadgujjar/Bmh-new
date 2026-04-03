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

  // Filter only active FAQs and sort by order
  const activeFaqs = faqs
    .filter((faq) => faq.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!activeFaqs || activeFaqs.length === 0) return null;

  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#000000",
            marginBottom: "10px",
            fontWeight: "700",
          }}
        >
          {/* "Frequently" word ko orange karne ke liye logic */}
          {title.includes("Frequently") ? (
            <>
              <span style={{ color: "#FD7E14" }}>Frequently</span>{" "}
              {title.replace("Frequently", "")}
            </>
          ) : (
            title
          )}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>
          Find answers to common questions about our services
        </p>
      </div>

      {/* FAQs Accordion */}
      <Collapse
        bordered={false}
        activeKey={activeKey}
        onChange={setActiveKey}
        expandIconPosition="end"
        style={{ background: "transparent" }}
        expandIcon={({ isActive }) => (
          <span
            style={{ fontSize: "1.5rem", color: "#FD7E14", fontWeight: "300" }}
          >
            {isActive ? "-" : "+"}
          </span>
        )}
      >
        {activeFaqs.map((faq, index) => {
          const isActive = activeKey.includes(index.toString());

          return (
            <Panel
              key={index}
              header={
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#000000",
                    padding: "10px 0",
                  }}
                >
                  {faq.question}
                </h3>
              }
              style={{
                marginBottom: "16px",
                backgroundColor: isActive ? "#ffffff" : "#f8f8f8",
                borderRadius: "8px",
                border: isActive ? "1px solid #FD7E14" : "1px solid #e2e8f0",
                boxShadow: isActive
                  ? "0 4px 6px rgba(253, 126, 20, 0.1)"
                  : "none",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  padding: "0px 10px 20px 10px",
                  lineHeight: "1.6",
                  color: "#333",
                  fontSize: "16px",
                  background: "#ffffff",
                }}
              >
                {faq.answer}
              </div>
            </Panel>
          );
        })}
      </Collapse>

      {/* Contact Section */}
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#f8f8f8",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          marginTop: "40px",
        }}
      >
        <h2 style={{ margin: "0 0 15px 0", color: "#000000" }}>
          Still have questions?
        </h2>
        <p style={{ margin: 0, color: "#666" }}>
          Can't find the answer you're looking for? Please{" "}
          <a
            href="/contactus"
            style={{
              color: "#FD7E14",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Contact Us
          </a>
        </p>
      </div>

      {/* SEO Schema */}
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
                text: faq.answer.replace(/<[^>]*>/g, ""),
              },
            })),
          }),
        }}
      />
    </section>
  );
}

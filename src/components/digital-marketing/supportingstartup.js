"use client";
import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { FaFileAlt, FaRocket, FaSyncAlt, FaCheckCircle } from "react-icons/fa";
import styles from "../../styles/digital-marketing/supportingstartup.module.css";
import styless from "../../styles/digital-marketing/whydigital.module.css";

function Supportingstartup() {
  return (
    <div className={styless.aboutdigitalMain} style={{ padding: "60px 20px" }}>
      {/* Section 09: Supporting Startups + How It Works */}
      <Row justify="center" gutter={[32, 32]} align="middle" style={{ marginBottom: "80px" }}>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/digital-marketing/new images/How We Work 2.webp"
              alt="Supporting Startups and Small Businesses Across the USA"
              width={550}
              height={420}
              layout="responsive"
              quality={100}
              style={{ borderRadius: "16px", objectFit: "cover" }}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={styles.contentWrapper}>
            <span style={{ backgroundColor: "rgba(249, 115, 22, 0.1)", color: "#f97316", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", display: "inline-block", marginBottom: "15px" }}>
              How We Work
            </span>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff", marginBottom: "15px", lineHeight: "1.3" }}>
              Supporting Startups at Every Stage of the Growth Curve
            </h2>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "20px" }}>
              From pre-revenue proof of concept to scaling past market validation, BMH has helped startups at every stage figure out their go-to-market strategy. We understand bootstrapped budgets. We understand the urgency that comes with seed funding. And we know how to build momentum without wasting your runway.
            </p>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "30px" }}>
              BMH is also the go-to digital marketing agency for small business owners who want a real strategy partner, not just a vendor running ads in the background.
            </p>

            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#ffffff", marginBottom: "20px" }}>
              How It Works
            </h3>

            {/* Steps List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#f97316", padding: "14px", borderRadius: "12px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "48px", minHeight: "48px" }}>
                  <FaFileAlt size={20} />
                </div>
                <div>
                  <span style={{ color: "#f97316", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>STEP 01</span>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", margin: "4px 0 8px 0", fontWeight: "bold" }}>Audit and Strategy</h4>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                    We analyze your current digital presence, your competitors, and your market position. From there, we build custom digital marketing solutions aligned to your goals and timeline.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#f97316", padding: "14px", borderRadius: "12px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "48px", minHeight: "48px" }}>
                  <FaRocket size={20} />
                </div>
                <div>
                  <span style={{ color: "#f97316", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>STEP 02</span>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", margin: "4px 0 8px 0", fontWeight: "bold" }}>Execute and Optimize</h4>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                    Campaigns go live. Our team monitors, tests, and improves every element in real time. No set-and-forget. Just continuous, agile optimization across every active channel.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#f97316", padding: "14px", borderRadius: "12px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "48px", minHeight: "48px" }}>
                  <FaSyncAlt size={20} />
                </div>
                <div>
                  <span style={{ color: "#f97316", fontSize: "12px", fontWeight: "700", letterSpacing: "1px" }}>STEP 03</span>
                  <h4 style={{ color: "#ffffff", fontSize: "18px", margin: "4px 0 8px 0", fontWeight: "bold" }}>Scale and Report</h4>
                  <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                    We double down on what works and report every metric in plain language. Growth becomes repeatable, and you always know exactly what is driving it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Section 10 — Grow with BMH Block */}
      <Row justify="center" gutter={[32, 32]} align="middle">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={styles.contentWrapper}>
            <span style={{ backgroundColor: "rgba(249, 115, 22, 0.1)", color: "#f97316", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", display: "inline-block", marginBottom: "15px" }}>
              The Right Choice
            </span>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff", marginBottom: "15px", lineHeight: "1.3" }}>
              The Right Digital Marketing Agency for Startups Ready to Grow
            </h2>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "20px" }}>
              Growth does not happen by accident. It happens when the right strategy meets consistent execution. BMH brings both. We are not here to run your ads and send you a report — we are here to help you build a brand that wins in its market.
            </p>
            <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "25px" }}>
              If you are a startup or small business that needs a real marketing partner — one that understands your constraints, speaks in outcomes, and moves fast — this is where to start.
            </p>

            {/* Checkmark Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "30px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FaCheckCircle style={{ color: "#f97316", marginTop: "4px", minWidth: "16px" }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: "1.4" }}>No agency-speak or vanity metric reports</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FaCheckCircle style={{ color: "#f97316", marginTop: "4px", minWidth: "16px" }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: "1.4" }}>Real humans who answer your calls and emails</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FaCheckCircle style={{ color: "#f97316", marginTop: "4px", minWidth: "16px" }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: "1.4" }}>Strategy built on data, not guesswork</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <FaCheckCircle style={{ color: "#f97316", marginTop: "4px", minWidth: "16px" }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: "1.4" }}>Month-to-month engagements — no lock-ins</span>
              </div>
            </div>

            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: "1.6" }}>
              Our <a href="https://brandmarketinghub.com/smm-services" style={{ color: '#f97316', fontWeight: 'bold', textDecoration: 'none' }}>social media optimization services</a> are already helping brands like yours build real audiences that convert. The next step is yours.
            </p>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <div className={styles.imageContainer} style={{ position: "relative" }}>
            <Image
              src="/images/digital-marketing/new images/The Right Choice.webp"
              alt="Grow with Brand Marketing Hub"
              width={550}
              height={420}
              layout="responsive"
              quality={100}
              style={{ borderRadius: "16px", objectFit: "cover" }}
            />
            {/* Floating Badge */}
            <div style={{ position: "absolute", bottom: "-20px", right: "20px", backgroundColor: "#f97316", padding: "16px 24px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
              <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold", margin: 0, lineHeight: "1" }}>89%</h3>
              <p style={{ color: "#ffffff", fontSize: "12px", margin: "4px 0 0 0", fontWeight: "600", textTransform: "uppercase" }}>Client Retention</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Supportingstartup;
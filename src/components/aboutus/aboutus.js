"use client";
import React, { useState } from "react";
import { Row, Col, Typography, Button, Form, Input } from "antd";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/about-us/aboutus.module.css";
import Form1 from "../landing/getaquote";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const AboutContent = () => {
  const [activeValue, setActiveValue] = useState(0);

  const stats = [
    { label: "Expert Engineers", value: "1,200+" },
    { label: "Countries Served", value: "23+" },
    { label: "Years of Excellence", value: "10+" },
    { label: "Projects Delivered", value: "500+" },
  ];

  const values = [
    { title: "Ship & Iterate", desc: "We move swiftly, refining our approach with every step.", icon: "🚀" },
    { title: "Trusted Pair of Hands", desc: "Dependable and steadfast, we are always there.", icon: "🤝" },
    { title: "Overdeliver on the Promise", desc: "Exceeding expectations is our standard.", icon: "🎯" },
    { title: "Clear is Kind", desc: "Transparent, honest communication keeps everyone aligned.", icon: "✨" },
  ];

  const locations = [
    { name: "Pakistan", img: "/images/pakistan.webp" },
    { name: "USA", img: "/images/pakistan.webp" },
    { name: "UAE", img: "/images/pakistan.webp" },
    { name: "Saudi Arabia", img: "/images/pakistan.webp" },
    { name: "United Kingdom", img: "/images/pakistan.webp" },
  ];

  const leaders = [
    { name: "Sire", surname: "khan", role: "Founder & CEO", img: "/images/pakistan.webp" },
    { name: "Qamar Abbas", surname: "Sipra", role: "CFO", img: "/images/pakistan.webp" },
    { name: "sara", surname: "Khan", role: "Chief of Staff", img: "/images/pakistan.webp" },
    { name: "Ali", surname: "Khan", role: "Chief of Staff", img: "/images/pakistan.webp" },
  ];

  return (
    <div className={styles.aboutWrapper}>
      {/* HERO SECTION */}
      <section className={styles.sectionGap}>
        <div className={styles.container}>
          <Row gutter={[30, 30]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.heroLeft}>
                <Text className={styles.badge}>ABOUT US</Text>
                <Title level={1} className={styles.boldHeading}>
                  Empowering Businesses, <br />
                  <span className={styles.orangeText}>Inspiring Innovation</span>
                </Title>
                <Paragraph className={styles.smallDesc}>
                  We specialize in transforming businesses with enterprise-grade software solutions tailored to their needs.We specialize in transforming businesses with enterprise-grade software solutions tailored to their needs.We specialize in transforming businesses with enterprise-grade software solutions tailored to their needs.
                </Paragraph>
                <Link href="/getaquote">
                  <Button type="primary" size="large" className={styles.orangeBtn}>
                    Get In Touch <ArrowRightOutlined />
                  </Button>
                </Link>
                <div className={styles.statsGrid}>
                  {stats.map((s, i) => (
                    <div key={i} className={styles.statCard}>
                      <Title level={3} className={styles.orangeText} style={{ margin: 0 }}>{s.value}</Title>
                      <Text className={styles.statLabel}>{s.label}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <img src="/images/office.png" alt="Office" className={styles.fullImg} />
            </Col>
          </Row>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.sectionGapGrey}>
        <div className={styles.containerSmall}>
          <Row gutter={[25, 25]}>
            <Col xs={24} md={12}>
              <div className={styles.missionCard}>
                <div className={styles.cardHeader}>
                  <Title level={2} className={styles.boldHeading}>Our <span className={styles.orangeText}>Mission</span></Title>
                  <div className={styles.quoteCircle}>“</div>
                </div>
                <Paragraph className={styles.cardPara}>To empower businesses with cutting-edge technology solutions, unlocking growth potential.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.missionCard}>
                <div className={styles.cardHeader}>
                  <Title level={2} className={styles.boldHeading}>Our <span className={styles.orangeText}>Vision</span></Title>
                  <div className={styles.quoteCircle}>“</div>
                </div>
                <Paragraph className={styles.cardPara}>To become a global leader in digital transformation by delivering future-ready technology solutions.</Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className={styles.sectionGap}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <Text className={styles.badge}>OUR VALUES</Text>
            <Title level={2} className={styles.boldHeading}>We Believe in Providing Values.</Title>
          </div>
          <Row gutter={[40, 30]} align="middle">
            <Col xs={24} md={10}>
              <img src="/images/team.png" alt="Team" className={styles.fullImgRounded} />
            </Col>
            <Col xs={24} md={14}>
              <div className={styles.valuesList}>
                {values.map((v, i) => (
                  <div
                    key={i}
                    className={`${styles.valueItem} ${activeValue === i ? styles.activeValue : ""}`}
                    onMouseEnter={() => setActiveValue(i)}
                  >
                    <span className={styles.icon}>{v.icon}</span>
                    <div>
                      <Title level={4} className={activeValue === i ? styles.whiteText : styles.boldTitleSmall}>{v.title}</Title>
                      <Paragraph className={activeValue === i ? styles.whiteText : styles.cardPara} style={{ margin: 0 }}>{v.desc}</Paragraph>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      {/* GLOBAL PRESENCE - FIXED CARD WIDTHS */}
      <section className={styles.sectionGap}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <Title level={2} className={styles.boldHeading}>
              Our <span className={styles.orangeText}>Global Presence</span>
            </Title>
          </div>

          {/* Maine yahan class name changed to "locationGrid" */}
          <div className={styles.locationGrid}>
            {locations.map((loc, i) => (
              <div key={i} className={styles.locCard}>
                <img src={loc.img} alt={loc.name} className={styles.locImg} />
                {/* Added 'locNameWrapper' to make sure names don't hilaofy width */}
                <div className={styles.locNameWrapper}>
                  <Text strong className={styles.locName}>
                    {loc.name}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className={`${styles.sectionGap} ${styles.sectionGapGrey}`}>
        <div className={styles.container}>
          <div className={styles.centerHeader}>
            <Title level={2} className={styles.boldHeading}>Our <span className={styles.orangeText}>Leadership</span></Title>
          </div>
          <Row gutter={[30, 30]} justify="center">
            {leaders.map((l, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={styles.leaderCard}>
                  <img src={l.img} alt={l.name} className={styles.leaderImg} />
                  <Title level={4} className={styles.boldTitleSmall} style={{ marginTop: '15px' }}>
                    {l.name} <span className={styles.orangeText}>{l.surname}</span>
                  </Title>
                  <Text type="secondary">{l.role}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CONTACT FORM */}
      <Form1 />
    </div>
  );
};

export default AboutContent;
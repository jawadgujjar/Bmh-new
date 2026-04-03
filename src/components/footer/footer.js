"use client";
import React, { useState } from "react"; // useState add kiya
import { Row, Col, Input, Button, message } from "antd"; // Input, Button, message add kiya
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SendOutlined, // Icon for button
} from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/footer.module.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      return message.error("Please enter a valid email!");
    }

    setLoading(true);
    try {
      // Yahan apna API endpoint dalein
      // const response = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

      // Temporary Success Message
      setTimeout(() => {
        message.success("Subscribed successfully!");
        setEmail("");
        setLoading(false);
      }, 1500);
    } catch (error) {
      message.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <Row gutter={[32, 32]}>
          {/* Column 1: Brand Info */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <Link href="/">
                <img
                  src="/bmhlogo.svg"
                  alt="Brand Marketing Hub Logo"
                  className={styles.footerLogo}
                  draggable={false}
                />
              </Link>
              <p className={styles.sectionText}>
                Follow us on social media to get more updates about our
                services.
              </p>
              <h4 className={styles.sectionSubtitle}>Follow Us!</h4>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.facebook.com/brandmarketinghubofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FacebookOutlined />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <TwitterOutlined />
                </a>
                <a
                  href="https://www.instagram.com/brandmarketinghub_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <InstagramOutlined />
                </a>
                <a
                  href="https://www.linkedin.com/company/brand-marketing-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <LinkedinOutlined />
                </a>
              </div>
            </div>
          </Col>

          {/* Column 2: Information */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Information</h3>
              <ul className={styles.footerList}>
                <li>
                  <Link href="/aboutus" className={styles.footerLink}>
                    About Us
                  </Link>
                </li>

                <li>
                  <Link href="/faq" className={styles.footerLink}>
                    FAQ
                  </Link>
                </li>

                <li>
                  <Link href="/blogs" className={styles.footerLink}>
                    Blog
                  </Link>
                </li>

                <li>
                  <Link href="/portfolio" className={styles.footerLink}>
                    Portfolio
                  </Link>
                </li>

                <li>
                  <Link href="/privacy-policy" className={styles.footerLink}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className={styles.footerLink}
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/contactus" className={styles.footerLink}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Column 3: Our Services */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Our Services</h3>
              <ul className={styles.footerList}>
                <li>Custom Web Development</li>
                <li>SEO / SEM</li>
                <li>UI and UX Design</li>
                <li>App Development</li>
                <li>Graphics & Branding</li>
                <li>DevOps</li>
              </ul>
            </div>
          </Col>

          {/* Column 4: Contact & Newsletter */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Contact Us</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactDetail}>
                  <PhoneOutlined className={styles.contactIcon} />
                  <a href="tel:+18132140535">(813) 214-0535</a>
                </div>
                <div className={styles.contactDetail}>
                  <EnvironmentOutlined className={styles.contactIcon} />
                  <span>7901 4TH ST N STE 300 ST. PETERSBURG FL 33702</span>
                </div>
                <div className={styles.contactDetail}>
                  <MailOutlined className={styles.contactIcon} />
                  <a
                    href="mailto:hello@brandmarketinghub.com"
                    className={styles.mailLink}
                  >
                    hello@brandmarketinghub.com
                  </a>
                </div>
              </div>

              {/* --- Newsletter Input Added Here --- */}
              <div className={styles.newsletterSection}>
                <h4 className={styles.newsletterTitle}>
                  Subscribe to Newsletter
                </h4>
                <form
                  onSubmit={handleSubscribe}
                  className={styles.newsletterForm}
                >
                  <Input
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                    type="email"
                    required
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={styles.newsletterButton}
                    icon={<SendOutlined />}
                  />
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.footerBottom}>
        <p>
          © {new Date().getFullYear()} Brand Marketing. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

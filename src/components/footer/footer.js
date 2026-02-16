import React from "react";
import { Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import styles from "../../styles/footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <Row gutter={[32, 32]}>
          {/* Column 1: Brand Info and Social Media */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <img
                src="/bmhlogo.svg"
                alt="Brand Marketing Hub Logo"
                className={styles.footerLogo}
                draggable={false}
              />

              <p className={styles.sectionText}>
                Follow us on social media to get more updates about our
                services.
              </p>
              <h4 className={styles.sectionSubtitle}>Follow Us!</h4>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                  <FacebookOutlined />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <TwitterOutlined />
                </a>
                <a href="#" className={styles.socialIcon}>
                  <InstagramOutlined />
                </a>
                <a href="#" className={styles.socialIcon}>
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
                <li>About Us</li>
                <li>FAQ</li>
                <li>
                  <Link href="/blogs" className={styles.footerLink}>
                    Blog
                  </Link>
                </li>

                <li>Portfolio</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>Company Profile</li>
              </ul>
            </div>
          </Col>

          {/* Column 3: Our Services */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Our Services</h3>
              <ul className={styles.footerList}>
                <li>Custom Web Development</li>
                <li>SEO</li>
                <li>SEM</li>
                <li>UI and UX Design</li>
                <li>App Development</li>
                <li>Graphics & Branding</li>
                <li>Quality Assurance</li>
                <li>DevOps</li>
                <li>CMS</li>
              </ul>
            </div>
          </Col>

          {/* Column 4: Contact Us */}
          <Col xs={24} sm={12} md={6} lg={6}>
            <div className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>Contact Us</h3>
              <p className={styles.sectionText}>
                Get in touch today, and we'll help you build your dream project
                real soon.
              </p>

              <div className={styles.contactInfo}>
                <h4 className={styles.contactCountry}>USA</h4>
                <div className={styles.contactDetail}>
                  <PhoneOutlined className={styles.contactIcon} />
                  <a href="tel:+18132140535">(813) 214-0535</a>
                </div>

                <div className={styles.contactDetail}>
                  <EnvironmentOutlined className={styles.contactIcon} />
                  <span>7901 4TH  ST N STE 300 ST. PETERSURG  FL 33702</span>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <h4 className={styles.contactCountry}>UK</h4>
                <div className={styles.contactDetail}>
                  <PhoneOutlined className={styles.contactIcon} />
                  <span>+447425471610</span>
                </div>
                <div className={styles.contactDetail}>
                  <EnvironmentOutlined className={styles.contactIcon} />
                  <span>
                    27 Saint Andrews Drive Flat no. 3/4, Glasgow, G41 5JN
                  </span>
                </div>
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

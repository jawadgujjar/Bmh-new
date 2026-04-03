"use client";
import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "../../styles/privacy.module.css";

const { Title, Paragraph, Text } = Typography;

const PrivacyPolicy = () => {
  return (
    <section className={styles.privacyWrapper}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={24} lg={20}>
            <div className={styles.contentCard}>
              {/* SECTION 1 */}
              <div className={styles.section}>
                <Title level={3}>1. Introduction</Title>
                <Paragraph className={styles.para}>
                  At Brand Marketing Hub, we prioritize your privacy and are
                  committed to protecting your personal information. This
                  Privacy Policy explains how we collect, use, store, and
                  safeguard the data you provide when visiting our website or
                  engaging with our services.
                </Paragraph>
                <Paragraph className={styles.para}>
                  By using our website or services, you explicitly agree to the
                  terms outlined in this Privacy Policy. This policy applies to
                  all users globally, including those from the USA, UK, Canada,
                  UAE, Pakistan, and any other country where our services are
                  provided. Our goal is to ensure transparency, trust, and
                  compliance with international privacy standards.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 2 */}
              <div className={styles.section}>
                <Title level={3}>2. Information We Collect</Title>
                <Paragraph className={styles.para}>
                  We collect information to provide our services effectively and
                  improve your experience. This includes:
                </Paragraph>
                <ul className={styles.list}>
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, business information, or any other details you
                    voluntarily provide through forms.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> Device type, browser
                    type, IP address, and other technical data collected
                    automatically.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Interactions on our website,
                    pages visited, links clicked, and navigation behavior.
                  </li>
                  <li>
                    <strong>Optional Information:</strong> Survey responses,
                    feedback, or communication with our team.
                  </li>
                </ul>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 3 */}
              <div className={styles.section}>
                <Title level={3}>3. How We Use Your Information</Title>
                <ul className={styles.list}>
                  <li>To respond to inquiries and provide support promptly.</li>
                  <li>
                    To manage, maintain, and improve our website and services.
                  </li>
                  <li>
                    To communicate updates, announcements, and promotions.
                  </li>
                  <li>
                    To ensure compliance with legal and regulatory requirements.
                  </li>
                  <li>
                    To analyze website performance and enhance user experience.
                  </li>
                </ul>
                <Paragraph className={styles.para}>
                  All data usage is based on your consent or legitimate business
                  interest. We do not sell your personal information to third
                  parties.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 4 */}
              <div className={styles.section}>
                <Title level={3}>4. Data Sharing & Disclosure</Title>
                <Paragraph className={styles.para}>
                  We may share your information under limited circumstances:
                </Paragraph>
                <ul className={styles.list}>
                  <li>
                    With trusted service providers assisting our operations.
                  </li>
                  <li>When required by law, regulation, or legal process.</li>
                  <li>
                    To protect our rights, safety, or business operations.
                  </li>
                </ul>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 5 */}
              <div className={styles.section}>
                <Title level={3}>5. Cookies and Tracking</Title>
                <Paragraph className={styles.para}>
                  We use cookies to enhance your experience and track usage
                  patterns. You can choose to disable cookies through your
                  browser settings; however, some features may not function
                  correctly. Our website may use third-party analytics platforms
                  governed by their own policies.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 6 */}
              <div className={styles.section}>
                <Title level={3}>6. Data Retention</Title>
                <Paragraph className={styles.para}>
                  Brand Marketing Hub retains personal information only as long
                  as necessary for the purposes outlined. Once no longer
                  required, we implement secure deletion or anonymization
                  processes to protect your privacy.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 7 */}
              <div className={styles.section}>
                <Title level={3}>7. Security of Your Data</Title>
                <Paragraph className={styles.para}>
                  We implement technical and administrative measures to
                  safeguard your data. However, no system is 100% secure. By
                  using our website, you acknowledge the inherent risks
                  associated with online data transmission.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 8 */}
              <div className={styles.section}>
                <Title level={3}>8. Your Rights</Title>
                <Paragraph className={styles.para}>
                  Depending on your location (GDPR/CCPA), you may have the right
                  to:
                </Paragraph>
                <ul className={styles.list}>
                  <li>Access your personal information.</li>
                  <li>Request correction or deletion of data.</li>
                  <li>Withdraw consent or object to processing.</li>
                </ul>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 9 */}
              <div className={styles.section}>
                <Title level={3}>9. Third-Party Links</Title>
                <Paragraph className={styles.para}>
                  Our website may contain links to external sites. We are not
                  responsible for the privacy practices or content of these
                  third-party websites.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 10 */}
              <div className={styles.section}>
                <Title level={3}>10. International Data Transfers</Title>
                <Paragraph className={styles.para}>
                  By using our services, you consent to the transfer and
                  processing of your information across international borders,
                  ensuring appropriate safeguards are in place.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 11 */}
              <div className={styles.section}>
                <Title level={3}>11. Updates to Privacy Policy</Title>
                <Paragraph className={styles.para}>
                  We may update this policy at any time. Continued use of our
                  website after updates constitutes acceptance of the revised
                  policy.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 12 */}
              <div className={styles.section}>
                <Title level={3}>12. Contact Us</Title>
                <div className={styles.contactInfo}>
                  <div block className={styles.para}>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:hello@brandmarketinghub.com">hello@brandmarketinghub.com</a>
                  </div>
                  <div block className={styles.para}>
                    <strong>Website:</strong>{" "}
                    <a href="https://brandmarketinghub.com" target="_blank" rel="noreferrer">
                      www.brandmarketinghub.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

"use client";
import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "../../styles/privacy.module.css";

const { Title, Paragraph, Text } = Typography;

const TermsAndConditions = () => {
  return (
    <section className={styles.privacyWrapper}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={24} lg={20}>
            <div className={styles.contentCard}>
              {/* SECTION 1 */}
              <div className={styles.section}>
                <Title level={3}>1. Acceptance of Terms</Title>
                <Paragraph className={styles.para}>
                  By accessing this website or engaging with our services, you
                  agree to be legally bound by these Terms and Conditions. If
                  you do not agree with any part of these Terms, you are not
                  authorized to use the website or services. These Terms apply
                  to clients worldwide, ensuring consistency across all regions,
                  including the USA, UK, Canada, Dubai, and Pakistan.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 2 */}
              <div className={styles.section}>
                <Title level={3}>2. General Use</Title>
                <Paragraph className={styles.para}>
                  Services are to be used only for lawful purposes. Providing
                  false, misleading, or incomplete information is strictly
                  prohibited. Attempts to disrupt, harm, or misuse operations
                  may result in immediate restriction or termination of access.
                  These measures protect both the company and all clients
                  globally.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 3 */}
              <div className={styles.section}>
                <Title level={3}>3. Service Engagement</Title>
                <Paragraph className={styles.para}>
                  All work is based on mutual agreement, either written or
                  verbal. The company reserves the right to accept, reject,
                  pause, or cancel any project at its discretion. This ensures
                  efficient management of workloads and maintenance of quality
                  standards. Clients will be notified promptly if any service
                  adjustments are required.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 4 */}
              <div className={styles.section}>
                <Title level={3}>4. Payments and Refund Policy</Title>
                <Paragraph className={styles.para}>
                  Payments must be made in advance unless otherwise agreed.{" "}
                  <strong>
                    All payments are final and strictly non-refundable.
                  </strong>{" "}
                  Work outside the agreed-upon scope will be billed separately.
                  By making a payment, clients waive the right to initiate
                  chargebacks or disputes through banks or payment providers.
                  Any attempt to reverse a payment may result in legal action.
                </Paragraph>
                <ul className={styles.list}>
                  <li>Payments are final and non-refundable.</li>
                  <li>
                    Any additional services beyond the agreement will incur
                    separate charges.
                  </li>
                </ul>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 5 */}
              <div className={styles.section}>
                <Title level={3}>5. No Guarantees and External Factors</Title>
                <Paragraph className={styles.para}>
                  All services are provided on a best-effort basis. Specific
                  results, timelines, revenue growth, or business success cannot
                  be guaranteed. Outcomes may vary due to factors beyond
                  control, such as third-party platforms, algorithm changes, or
                  market conditions. Clients acknowledge that external factors
                  may impact results and are not the responsibility of the
                  service provider.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 6 */}
              <div className={styles.section}>
                <Title level={3}>6. Project Timelines and Communication</Title>
                <Paragraph className={styles.para}>
                  Timely communication from clients is critical for project
                  completion. Delays in providing feedback, approvals, or
                  materials will extend project timelines. The company is not
                  responsible for missed deadlines resulting from client delays.
                </Paragraph>
                <ul
                  className={styles.list}
                  style={{ listStyleType: "decimal" }}
                >
                  <li>Providing accurate and complete materials.</li>
                  <li>Responding promptly to requests for feedback.</li>
                  <li>Approving deliverables in a timely manner.</li>
                </ul>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 7 */}
              <div className={styles.section}>
                <Title level={3}>
                  7. Client Responsibility and Content Liability
                </Title>
                <Paragraph className={styles.para}>
                  Clients are responsible for all content, materials, and
                  information provided. All content must comply with local laws
                  and regulations. Once content is approved, the service
                  provider holds no liability for copyright, trademark, or other
                  legal issues. Legal responsibility for provided content
                  remains solely with the client.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 8 */}
              <div className={styles.section}>
                <Title level={3}>8. Third-Party Dependencies</Title>
                <Paragraph className={styles.para}>
                  Some services rely on third-party tools or platforms. The
                  provider does not control their policies or systems and is not
                  liable for any disruptions, errors, downtime, or policy
                  changes caused by these platforms. Any interruptions from
                  external sources are outside of responsibility.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 9 */}
              <div className={styles.section}>
                <Title level={3}>9. Limitation of Liability</Title>
                <Paragraph className={styles.para}>
                  Under no circumstances will the provider be liable for direct,
                  indirect, financial, or business losses resulting from the use
                  of services. Any liability, if determined, is strictly limited
                  to the total amount paid for the specific service in question.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 10 */}
              <div className={styles.section}>
                <Title level={3}>10. Intellectual Property</Title>
                <Paragraph className={styles.para}>
                  All work remains the property of the provider until full
                  payment is received. Unauthorized use or duplication is
                  prohibited. Upon full payment, ownership may be transferred.
                  Completed work may be displayed in portfolios or promotional
                  materials unless otherwise agreed.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 11 */}
              <div className={styles.section}>
                <Title level={3}>11. Termination</Title>
                <Paragraph className={styles.para}>
                  Services may be terminated or suspended at any time for
                  violations of these Terms, payment issues, or misconduct.
                  Termination does not entitle clients to refunds for payments
                  already made.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 12 */}
              <div className={styles.section}>
                <Title level={3}>12. Indemnification</Title>
                <Paragraph className={styles.para}>
                  Clients agree to indemnify and hold the service provider
                  harmless from any claims, damages, or legal actions arising
                  from the use of services, including violations of laws or
                  third-party rights.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 13 */}
              <div className={styles.section}>
                <Title level={3}>13. Governing Law and Jurisdiction</Title>
                <Paragraph className={styles.para}>
                  These Terms are governed by the laws of the{" "}
                  <strong>United States of America</strong>. Disputes shall be
                  resolved in the courts of <strong>New York, USA</strong>,
                  unless otherwise agreed. Clients using services from other
                  countries consent to this jurisdiction for legal matters.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 14 & 15 */}
              <div className={styles.section}>
                <Title level={3}>14. Changes and Global Operations</Title>
                <Paragraph className={styles.para}>
                  Terms may be updated at any time. Continued use of services
                  after changes constitutes acceptance of the revised Terms.
                  Services are provided internationally, including the USA, UK,
                  Canada, Dubai, and Pakistan, applying consistently across all
                  regions.
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default TermsAndConditions;

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
                  By accessing this website or engaging with Brand Marketing
                  Hub, you agree to be legally bound by these Terms and
                  Conditions. If you do not agree with any part of these Terms,
                  you must not use our website or services.
                </Paragraph>
                <Paragraph className={styles.para}>
                  These Terms apply globally to all users, regardless of their
                  country of residence, ensuring consistent standards across all
                  regions.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 2 */}
              <div className={styles.section}>
                <Title level={3}>2. General Use</Title>
                <ul className={styles.list}>
                  <li>
                    You must use our website and services only for lawful
                    purposes.
                  </li>
                  <li>
                    You must not provide false, misleading, or incomplete
                    information.
                  </li>
                  <li>
                    You must not attempt to harm, disrupt, or misuse our
                    operations.
                  </li>
                </ul>
                <Paragraph className={styles.para}>
                  These conditions are in place to protect both our business and
                  all users. Any misuse, fraudulent activity, or violation of
                  applicable laws may result in immediate restriction or
                  termination of access without prior notice.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 3 */}
              <div className={styles.section}>
                <Title level={3}>3. Service Engagement</Title>
                <ul className={styles.list}>
                  <li>
                    All work is carried out based on mutual agreement (written
                    or verbal).
                  </li>
                  <li>
                    We reserve the right to accept, reject, pause, or cancel any
                    project.
                  </li>
                </ul>
                <Paragraph className={styles.para}>
                  This means that every engagement is subject to our discretion.
                  We maintain the right to manage workloads, refuse projects
                  that do not align with our policies, or discontinue services
                  if necessary to protect our operations.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 4 */}
              <div className={styles.section}>
                <Title level={3}>4. Payments & No Refund Policy</Title>
                <ul className={styles.list}>
                  <li>
                    All payments must be made in advance unless agreed
                    otherwise.
                  </li>
                  <li>
                    <strong>
                      All payments are strictly non-refundable under any
                      circumstances.
                    </strong>
                  </li>
                  <li>
                    Any work outside the agreed scope will be billed separately.
                  </li>
                </ul>
                <Paragraph className={styles.para}>
                  All payments made to Brand Marketing Hub are final. Once a
                  payment has been processed, it cannot be reversed, including
                  in cases where services are partially used or outcomes differ
                  from expectations.
                </Paragraph>
                <Paragraph className={styles.para}>
                  By making a payment, you explicitly agree to waive your right
                  to initiate chargebacks or disputes through any bank or
                  payment provider. Any attempt to reverse or dispute a payment
                  will be treated as a violation of these Terms and may result
                  in legal action.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 5 */}
              <div className={styles.section}>
                <Title level={3}>5. No Guarantees & External Factors</Title>
                <ul className={styles.list}>
                  <li>
                    We do not guarantee specific results, performance, or
                    outcomes.
                  </li>
                  <li>We do not guarantee timelines or completion dates.</li>
                  <li>
                    We do not guarantee business growth, revenue, or success.
                  </li>
                </ul>
                <Paragraph className={styles.para}>
                  All services are provided on a best-effort basis. However,
                  outcomes may vary due to factors beyond our control. You
                  acknowledge that we do not control third-party systems,
                  platforms, or algorithms. Any fluctuations or losses are not
                  the responsibility of Brand Marketing Hub.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 6 */}
              <div className={styles.section}>
                <Title level={3}>6. Project Timelines & Communication</Title>
                <Paragraph className={styles.para}>
                  Timely communication from the client is required. Delays in
                  feedback or approvals will automatically extend timelines. We
                  are not responsible for any missed deadlines that occur due to
                  the client’s lack of responsiveness or incomplete input.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 7 */}
              <div className={styles.section}>
                <Title level={3}>
                  7. Client Responsibility & Content Liability
                </Title>
                <Paragraph className={styles.para}>
                  Clients are responsible for all provided materials and
                  information. Final approval of all content rests solely with
                  the client. Once approved, Brand Marketing Hub holds no
                  responsibility for any copyright, trademark, or legal issues
                  that may arise.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 8 */}
              <div className={styles.section}>
                <Title level={3}>8. Third-Party Dependency</Title>
                <Paragraph className={styles.para}>
                  Our work may involve third-party platforms or tools (Google,
                  Meta, etc.). We do not control their policies or systems and
                  are not responsible for account suspensions, policy changes,
                  or system errors caused by these providers.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 9 */}
              <div className={styles.section}>
                <Title level={3}>9. Limitation of Liability</Title>
                <Paragraph className={styles.para}>
                  Under no circumstances shall Brand Marketing Hub be held
                  liable for any loss of revenue, profits, business
                  opportunities, or data. If any liability arises, it will be
                  strictly limited to the total amount paid by the client for
                  the specific service in question.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 10 */}
              <div className={styles.section}>
                <Title level={3}>10. Intellectual Property</Title>
                <Paragraph className={styles.para}>
                  All work remains our property until full payment is received.
                  Unauthorized use or duplication is prohibited. We reserve the
                  right to display completed work in our portfolio unless
                  otherwise agreed in writing.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 11 */}
              <div className={styles.section}>
                <Title level={3}>11. Termination</Title>
                <Paragraph className={styles.para}>
                  We reserve full rights to terminate or suspend services
                  without prior notice if any Terms are violated or if
                  misconduct occurs. No refunds will be issued in case of
                  termination.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 12 */}
              <div className={styles.section}>
                <Title level={3}>12. Indemnification</Title>
                <Paragraph className={styles.para}>
                  You agree to fully indemnify and hold Brand Marketing Hub
                  harmless from any claims, damages, or legal actions arising
                  from your use of our services, violations of laws, or
                  third-party rights.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 13 */}
              <div className={styles.section}>
                <Title level={3}>13. Governing Law & Jurisdiction</Title>
                <Paragraph className={styles.para}>
                  These Terms shall be governed by the laws of{" "}
                  <strong>Pakistan</strong>. Any disputes arising shall be
                  exclusively handled in the courts of{" "}
                  <strong>Lahore, Pakistan</strong>.
                </Paragraph>
              </div>

              <Divider className={styles.divider} />

              {/* SECTION 14 & 15 */}
              <div className={styles.section}>
                <Title level={3}>14. Changes & Global Operations</Title>
                <Paragraph className={styles.para}>
                  We may update these Terms at any time. Continued use of our
                  services after updates means you accept the revised Terms.
                  These Terms apply universally to all clients worldwide,
                  ensuring consistency across all engagements.
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

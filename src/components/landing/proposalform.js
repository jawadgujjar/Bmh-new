'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import styles from '../../styles/proposalform.module.css';
import Form1 from './getaquote';

function ProposalForm() {
    return (
        <div className={styles.mainProposalform}>
            <div>
                <p className={styles.getProposalText}>Get My <span className={styles.freeText}>FREE Digital Marketing Proposal</span></p>
            </div>

            <div className={styles.centerProposalform}>
                <Row gutter={[32, 32]} align="middle">
                    {/* Form Column */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form1 />
                    </Col>

                    {/* Contact Info Column */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className={styles.contactInfoContainer}>
                            <h2 className={styles.contactTitle}>Contact Us</h2>
                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <PhoneOutlined className={styles.contactIcon} />
                                    <span className={styles.contactText}>+123-456-7890</span>
                                </div>
                                <div className={styles.contactItem}>
                                    <MailOutlined className={styles.contactIcon} />
                                    <span className={styles.contactText}>info@example.com</span>
                                </div>
                            </div>

                            <div className={styles.socialIcons}>
                                <a href="#" className={styles.socialIcon}><FacebookOutlined /></a>
                                <a href="#" className={styles.socialIcon}><TwitterOutlined /></a>
                                <a href="#" className={styles.socialIcon}><InstagramOutlined /></a>
                                <a href="#" className={styles.socialIcon}><LinkedinOutlined /></a>
                            </div>

                            <button className={styles.contactButton}>
                                Contact Us Now
                            </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProposalForm;
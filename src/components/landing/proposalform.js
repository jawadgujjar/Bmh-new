'use client';
import React from 'react';
import { Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import styles from '../../styles/proposalform.module.css';

function ProposalForm() {
    return (
        <div className={styles.mainProposalform}>
            <div>
                <p className={styles.getProposalText}>Get My <span className={styles.freeText}>FREE Digital Marketing Proposal</span></p>
            </div>

            <div className={styles.centerProposalform}>
                <Row gutter={[32, 32]} align="middle">
                    {/* Form Column */}
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <div className={styles.formContainer}>
                            <form className={styles.form}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>First Name *</label>
                                        <input 
                                            type="text" 
                                            className={styles.input}
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Last Name *</label>
                                        <input 
                                            type="text" 
                                            className={styles.input}
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Phone Number *</label>
                                        <input 
                                            type="tel" 
                                            className={styles.input}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email Address *</label>
                                        <input 
                                            type="email" 
                                            className={styles.input}
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Website URL (Optional)</label>
                                        <input 
                                            type="url" 
                                            className={styles.input}
                                            placeholder="Enter your website URL"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Projected Monthly Budget *</label>
                                        <div className={styles.inputWithIcon}>
                                            <span className={styles.dollarIcon}>$</span>
                                            <input 
                                                type="number" 
                                                className={styles.input}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Project Details</label>
                                    <textarea 
                                        className={styles.textarea}
                                        placeholder="What goal are you trying to achieve?"
                                        rows={4}
                                    ></textarea>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    SUBMIT
                                </button>

                                <p className={styles.callText}>
                                    In a Hurry? Give us a call at <a href="tel:+1234567890" className={styles.callLink}>+123-456-7890</a>
                                </p>
                            </form>
                        </div>
                    </Col>

                    {/* Contact Info Column */}
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
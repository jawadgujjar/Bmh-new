"use client";
import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, Divider, message } from 'antd';
import Link from 'next/link';
import styles from '../../styles/descriptionandform/descriptionform.module.css';

const { Title, Text } = Typography;

// HTML Content Renderer Component
const HTMLContent = ({ content, className = "" }) => {
  if (!content) return null;

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  let cleanContent = content;

  if (content.includes('&lt;') || content.includes('&gt;')) {
    cleanContent = decodeHTML(content);
  }

  return (
    <div
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

const DescriptionAndFormSection = ({ heading, descriptions = [], cta = null }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form submitted:', values);
    message.success('Thank you! We\'ll contact you shortly.');
    form.resetFields();
  };

  // Render CTA button - FIXED button text mapping
  const renderCTA = () => {
    if (!cta?.ctaId) return null;

    // API se button text "dm here" aa raha hai
    const buttonText = cta.ctaId?.buttonText || cta.ctaId?.title || cta.ctaId?.text || cta.ctaId?.name || "Learn More";
    const buttonLink = cta.ctaId?.buttonLink || cta.ctaId?.link || cta.ctaId?.url || "/getaquote";

    // Small title agar API mein ho to
    const smallTitle = cta.ctaId?.smallTitle || "GET STARTED";

    console.log('CTA Data:', cta.ctaId); // Debug ke liye

    return (
      <div className={styles.ctaWrapper}>
        <div className={styles.ctaGradient}>
          {/* Animated Line */}
          <div className={styles.animatedLine}></div>
          
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaMainTitle}>
              {cta.ctaId?.title || "Take Your Business to Next Level"}
            </h2>
            <span className={styles.circle}></span>
          </div>

          <p className={styles.ctaDescription}>
            {cta.ctaId?.description || "Get started with our professional services today"}
          </p>
          
          <Link href={buttonLink} passHref legacyBehavior>
            <Button className={styles.ctaButton}>
              {buttonText} {/* Ab yeh "dm here" display karega */}
              <span className={styles.arrowIcon}>→</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <Row gutter={[40, 40]} align="top">
          {/* Left Side */}
          <Col xs={24} md={12}>
            <h2 className={styles.mainHeading}>
              {heading || 'Our Services'}
            </h2>

            {descriptions && descriptions.length > 0 ? (
              <div className={styles.descriptionsList}>
                {descriptions.map((desc, index) => (
                  <div key={index} className={styles.descriptionItem}>
                    {desc.icon ? (
                      <img
                        src={desc.icon}
                        alt="icon"
                        className={styles.iconImage}
                      />
                    ) : (
                      <div className={styles.defaultIcon}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                    <div className={styles.descriptionText}>
                      <HTMLContent content={desc.text} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No description points available</Text>
            )}
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} md={12}>
            <Card className={styles.formCard}>
              <h3 className={styles.formTitle}>
                GET YOUR FREE PROPOSAL
              </h3>
              <Divider className={styles.formDivider} />

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label={<span className={styles.formLabel}>* First Name</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="Enter first name" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label={<span className={styles.formLabel}>* Last Name</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="Enter last name" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      label={<span className={styles.formLabel}>* Phone Number</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input placeholder="Enter phone number" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="emailAddress"
                      label={<span className={styles.formLabel}>* Email Address</span>}
                      rules={[
                        { required: true, message: 'Required' },
                        { type: 'email', message: 'Invalid email' }
                      ]}
                    >
                      <Input placeholder="Enter email address" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="websiteUrl"
                      label={<span className={styles.formLabel}>Website URL (Optional)</span>}
                    >
                      <Input placeholder="Enter your website URL" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="projectDetails"
                      label={<span className={styles.formLabel}>* Project Details</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="What goal are you trying to achieve?"
                        className={styles.formTextarea}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={styles.submitButton}
                      >
                        SUBMIT
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <div className={styles.phoneSection}>
                <Text className={styles.phoneText}>
                  In a Hurry? Give us a call at{' '}
                  <a href="tel:+(813) 214-0535" className={styles.phoneLink}>
                    (813) 214-0535
                  </a>
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        {renderCTA()}
      </div>

      <style jsx global>{`
        .html-content {
          line-height: 1.7;
          color: #4a4a4a;
          font-size: 16px;
        }
        .html-content h1 { font-size: 28px; margin-bottom: 15px; }
        .html-content h2 { font-size: 24px; margin-bottom: 12px; }
        .html-content h3 { font-size: 20px; margin-bottom: 10px; }
        .html-content h4 { font-size: 18px; margin-bottom: 8px; }
        .html-content p { margin-bottom: 12px; }
        .html-content ul, .html-content ol { padding-left: 20px; margin-bottom: 12px; }
        .html-content li { margin-bottom: 5px; }
        .html-content a { color: #FF7F11; text-decoration: none; }
        .html-content a:hover { text-decoration: underline; }
        .html-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; }
      `}</style>
    </div>
  );
};

export default DescriptionAndFormSection;
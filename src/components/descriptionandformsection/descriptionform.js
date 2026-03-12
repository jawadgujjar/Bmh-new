"use client";
import React, { useState } from "react";
import { Row, Col, Card, Form, Input, Button, Typography, Divider } from "antd";
import Link from "next/link";
import styles from "../../styles/descriptionandform/descriptionform.module.css";

const { Text } = Typography;

const HTMLContent = ({ content, className = "" }) => {
  if (!content) return null;

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  let cleanContent = content;

  if (content.includes("&lt;") || content.includes("&gt;")) {
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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const submitData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        websiteUrl: values.websiteUrl || "",
        projectDetails: values.projectDetails,
        monthlyBudget: 0,
        sourcePage: window.location.href, // NEW: captures page URL
      };

      const res = await fetch("/api/getaquote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        setSuccessMessage("Form submitted successfully!");
        form.resetFields();

        setTimeout(() => setSuccessMessage(""), 3000); // hide after 3s
      } else {
        const errorData = await res.json();
        setSuccessMessage(errorData.error || "Failed to submit form.");
      }
    } catch (error) {
      setSuccessMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCTA = () => {
    if (!cta?.ctaId) return null;

    const buttonText =
      cta.ctaId?.buttonText ||
      cta.ctaId?.title ||
      cta.ctaId?.text ||
      cta.ctaId?.name ||
      "Learn More";

    const buttonLink =
      cta.ctaId?.buttonLink || cta.ctaId?.link || cta.ctaId?.url || "/getaquote";

    return (
      <div className={styles.ctaWrapper}>
        <div className={styles.ctaGradient}>
          <div className={styles.animatedLine}></div>

          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaMainTitle}>
              {cta.ctaId?.title || "Take Your Business to Next Level"}
            </h2>
            <span className={styles.circle}></span>
          </div>

          <p className={styles.ctaDescription}>
            {cta.ctaId?.description ||
              "Get started with our professional services today"}
          </p>

          <Link href={buttonLink}>
            <Button className={styles.ctaButton}>
              {buttonText}
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
          {/* LEFT SIDE */}
          <Col xs={24} md={12}>
            <h2 className={styles.mainHeading}>{heading || "Our Services"}</h2>

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
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
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

          {/* RIGHT SIDE FORM */}
          <Col xs={24} md={12}>
            <Card className={styles.formCard}>
              <h3 className={styles.formTitle}>GET YOUR FREE PROPOSAL</h3>
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
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Enter first name" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label={<span className={styles.formLabel}>* Last Name</span>}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Enter last name" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      label={<span className={styles.formLabel}>* Phone Number</span>}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Enter phone number" className={styles.formInput} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="emailAddress"
                      label={<span className={styles.formLabel}>* Email Address</span>}
                      rules={[
                        { required: true, message: "Required" },
                        { type: "email", message: "Invalid email" },
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
                      rules={[{ required: true, message: "Required" }]}
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
                        loading={loading}
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "SUBMIT"}
                      </Button>

                      {successMessage && (
                        <p
                          style={{
                            color: "#16a34a",
                            marginTop: "10px",
                            fontWeight: "500",
                          }}
                        >
                          {successMessage}
                        </p>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <div className={styles.phoneSection}>
                <Text className={styles.phoneText}>
                  In a Hurry? Give us a call at{" "}
                  <a href="tel:+(813) 214-0535" className={styles.phoneLink}>
                    (813) 214-0535
                  </a>
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {renderCTA()}
      </div>
    </div>
  );
};

export default DescriptionAndFormSection;
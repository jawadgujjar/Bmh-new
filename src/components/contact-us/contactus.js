"use client";
import React, { useState } from "react";
import { Row, Col, Typography, Button, Form, Input, message } from "antd";
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from "@ant-design/icons";
import styles from "../../styles/contactus/contactus.module.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage(); // For reliable notifications

  const mapAddress = "7901 4TH ST N STE 300 ST. PETERSBURG FL 33702";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        form.resetFields();
        messageApi.success({
          content: "Message sent successfully ✅",
          duration: 3,
        });
      } else {
        messageApi.error({
          content: data.message || "Something went wrong ❌",
          duration: 3,
        });
      }
    } catch (error) {
      messageApi.error({
        content: "Server error ❌",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactWrapper}>
      {contextHolder} {/* Important for showing messages */}
      <div className={styles.container}>
        <Row gutter={[60, 40]} align="middle">
          
          {/* LEFT: FORM SECTION */}
          <Col xs={24} md={14}>
            <Form 
              layout="vertical" 
              className={styles.contactForm}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item 
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Full Name" className={styles.customInput} />
              </Form.Item>

              <Form.Item 
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: 'email', message: "Please enter a valid email" }
                ]}
              >
                <Input placeholder="Email Address" className={styles.customInput} />
              </Form.Item>

              <Form.Item 
                name="phone"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input placeholder="Phone" className={styles.customInput} />
              </Form.Item>

              <Form.Item 
                name="message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <TextArea rows={6} placeholder="Message" className={styles.customInput} />
              </Form.Item>

              <div className={styles.btnWrapper}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className={styles.sendBtn}
                  loading={loading}
                >
                  Send
                </Button>
              </div>
            </Form>
          </Col>

          {/* RIGHT: CONTACT INFO SECTION */}
          <Col xs={24} md={10}>
            <div className={styles.infoContent}>
              
              <a href="tel:+18132140535" className={styles.infoLink}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><PhoneOutlined /></div>
                  <Text className={styles.infoText}>(813) 214-0535</Text>
                </div>
              </a>

              <a href="mailto:support@bmh.com" className={styles.infoLink}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><MailOutlined /></div>
                  <Text className={styles.infoText}>support@bmh.com</Text>
                </div>
              </a>

              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}><EnvironmentOutlined /></div>
                  <Text className={styles.infoText}>
                    7901 4TH ST N STE 300 ST. PETERSBURG FL 33702
                  </Text>
                </div>
              </a>

            </div>
          </Col>

        </Row>
      </div>
    </section>
  );
};

export default ContactUs;
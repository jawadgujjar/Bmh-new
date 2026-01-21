'use client';
import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, ApartmentOutlined } from '@ant-design/icons';
import styles from '../../styles/blogs/mainpageform.module.css';

const { Option } = Select;

export default function MainpageForm() {
  const handleFinish = (values) => {
    console.log('Form Submitted:', values);
    alert('Thank you! We will contact you within 24 hours.');
  };

  return (
    <div className={styles.formCard}>
      <p className={styles.formTitle}>Get Expert Consultation</p>

      <Form layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="company"
              rules={[{ required: true, message: 'Please enter company name' }]}
            >
              <Input prefix={<ApartmentOutlined />} placeholder="Company Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                { required: true, type: 'email', message: 'Please enter valid email' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email Address" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="service"
          rules={[{ required: true, message: 'Please select a service' }]}
        >
          <Select placeholder="Select Required Service">
            <Option value="web-development">Web Development</Option>
            <Option value="app-development">App Development</Option>
            <Option value="ui-ux">UI/UX Design</Option>
            <Option value="seo">SEO & Marketing</Option>
            <Option value="blockchain">Blockchain Development</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="message"
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <Input.TextArea placeholder="Your Message" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p className={styles.formNote}>We'll respond within 24 hours.</p>
    </div>
  );
}

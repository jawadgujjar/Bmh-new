'use client';
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import styles from '../../styles/blogs/mainpageform.module.css';

const { TextArea } = Input;

export default function MainpageForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);

    const submitData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      emailAddress: values.emailAddress,
      websiteUrl: values.websiteUrl || '',
      monthlyBudget: values.monthlyBudget,
      projectDetails: values.projectDetails,
    };

    try {
      const res = await fetch('/api/getaquote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        message.success(
          'Your request has been submitted successfully. Our team will review your details and get back to you shortly.'
        );
        form.resetFields();
      } else {
        const errorData = await res.json();
        message.error(errorData.error || 'Form submission failed. Please try again.');
      }
    } catch (error) {
      message.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <p className={styles.formTitle}>Get Expert Consultation</p>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please enter phone number' },
                { pattern: /^\d+$/, message: 'Please enter a valid phone number' },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="emailAddress"
              rules={[
                { required: true, type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email Address" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="websiteUrl"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <Input
            prefix={<GlobalOutlined />}
            placeholder="Website URL (Optional)"
          />
        </Form.Item>

        <Form.Item
          name="monthlyBudget"
          rules={[{ required: true, message: 'Please enter your projected budget' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            prefix={<DollarOutlined />}
            placeholder="Projected Monthly Budget"
            formatter={(value) => `$ ${value}`}
            parser={(value) => value.replace('$ ', '')}
          />
        </Form.Item>

        <Form.Item
          name="projectDetails"
          rules={[{ required: true, message: 'Please describe your project' }]}
        >
          <TextArea
            rows={4}
            placeholder="Tell us about your project requirements..."
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
            loading={loading}
            disabled={loading}
            block
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form.Item>
      </Form>

      <p className={styles.formNote}>We'll respond within 24 hours.</p>
    </div>
  );
}

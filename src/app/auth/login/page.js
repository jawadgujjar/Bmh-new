'use client';
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/admin/auth/login.module.css';

const { Option } = Select;

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      // ✅ Role Validation: Check if selected role matches DB role
      if (data.user.role !== values.role) {
        throw new Error(`Unauthorized! You are not registered as ${values.role}`);
      }

      // Store user data
      localStorage.setItem('username', data.user.name);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userData', JSON.stringify(data.user));

      message.success(`Welcome ${data.user.name}! Redirecting...`);
      setTimeout(() => router.push('/admin'), 1500);
    } catch (error) {
      console.error('Login Error:', error);
      message.error(error.message || 'Login failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Row className={styles.loginBox}>
        <Col xs={0} md={12} className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome to Brand Marketing Hub</h1>
          <p className={styles.welcomeText}>Manage your content and marketing strategy effectively.</p>
        </Col>

        <Col xs={24} md={12} className={styles.formSection}>
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <h2 className={styles.formTitle}>Portal Login</h2>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Enter a valid email!' },
              ]}
            >
              <Input placeholder="Email" size="large" className={styles.formInput} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Password" size="large" className={styles.formInput} />
            </Form.Item>

            {/* ✅ NEW ROLE SELECTION */}
            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Select placeholder="Select Your Role" size="large" className={styles.formInput}>
                <Option value="admin">Admin</Option>
                <Option value="digital-marketing">Digital Marketing</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large" className={styles.loginButton}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>

            <div className={styles.signupLink}>
              Don't have an account? <Link href="/auth/signin">Sign up here</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
'use client';
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/admin/auth/login.module.css';

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

      if (data.user.role !== 'admin') {
        throw new Error('Only Admins are allowed to login here');
      }

      // Store user data (token cookie already set by API)
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
        {/* Left Section - Welcome Message */}
        <Col xs={0} md={12} className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome to Brand Marketing Hub Admin Portal</h1>
          <p className={styles.welcomeText}>
            Please login to access the admin dashboard and manage your content.
          </p>
        </Col>

        {/* Right Section - Login Form */}
        <Col xs={24} md={12} className={styles.formSection}>
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <h2 className={styles.formTitle}>Admin Login</h2>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Email" size="large" className={styles.formInput} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                className={styles.formInput}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className={styles.loginButton}
              >
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

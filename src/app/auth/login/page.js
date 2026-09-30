'use client';
import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Select, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/admin/auth/login.module.css';
import Captcha, { RECAPTCHA_SITE_KEY } from '../../../components/captcha/captcha';

const { Option } = Select;

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaReset, setCaptchaReset] = useState(0);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const showError = (text) => {
    setStatus({ type: 'error', text });
    messageApi.error(text);
  };

  const handleLogin = async (values) => {
    setStatus(null);
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      showError('Please tick "I\'m not a robot" to complete the captcha.');
      return;
    }
    setLoading(true);
    let loggedIn = false;
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password, captchaToken }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) throw new Error('Wrong credentials. Please check your email and password.');
        if (response.status === 429) throw new Error('Too many login attempts. Please wait a few minutes and try again.');
        if (response.status === 400 && /captcha/i.test(data.message || data.error || '')) {
          throw new Error('Captcha verification failed. Please tick "I\'m not a robot" again.');
        }
        throw new Error(data.message || data.error || 'Login failed. Please try again.');
      }

      // Role Validation
      if (data.user.role !== values.role) {
        // Server already set the auth cookie — clear it since this login is rejected
        await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
        throw new Error(`Wrong credentials. You are not registered as ${values.role}.`);
      }

      // ✅ Login Session & Expiry Logic
      // 1. Permanent data (jab tak 24 hours pure na hon)
      localStorage.setItem('username', data.user.name);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('loginTimestamp', new Date().getTime().toString());

      // 2. Temporary data (Browser/Tab close hote hi khatam ho jaye)
      sessionStorage.setItem('isSessionActive', 'true');

      loggedIn = true;
      const welcome = `Login successful! Welcome, ${data.user.name}. Redirecting to your dashboard...`;
      setStatus({ type: 'success', text: welcome });
      messageApi.success(welcome);
      setTimeout(() => router.push('/admin'), 1500);
    } catch (error) {
      console.error('Login Error:', error);
      showError(error.message || 'Login failed! Please try again.');
    } finally {
      setLoading(false);
      // Captcha tokens are single-use; get a fresh one for the next attempt
      if (!loggedIn) setCaptchaReset((n) => n + 1);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {contextHolder}
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

            <Form.Item
              name="role"
              rules={[{ required: true, message: 'Please select your role!' }]}
            >
              <Select placeholder="Select Your Role" size="large" className={styles.formInput}>
                <Option value="admin">Admin</Option>
                <Option value="digital-marketing">Digital Marketing</Option>
              </Select>
            </Form.Item>

            <Captcha onToken={setCaptchaToken} resetSignal={captchaReset} theme="light" />

            {status && (
              <Alert
                type={status.type}
                message={status.text}
                showIcon
                closable
                onClose={() => setStatus(null)}
                style={{ marginBottom: 16 }}
              />
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large" className={styles.loginButton}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>

            {/* <div className={styles.signupLink}>
              Don't have an account? <Link href="/auth/signin">Sign up here</Link>
            </div> */}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

'use client';
import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/admin/auth/signin.module.css';

const { Option } = Select;

function Signup() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed. Please try again.');
            }

            // Store token (assuming /api/register sets a cookie, no localStorage for token)
            localStorage.setItem('username', data.user?.name || 'User');
            localStorage.setItem('role', data.user?.role || 'admin');
            localStorage.setItem('userData', JSON.stringify(data.user || {}));

            message.success('Account successfully created! Redirecting to login...');
            setTimeout(() => router.push('/auth/login'), 1000);

        } catch (error) {
            console.error('Signup Failed:', error.response?.data || error.message);
            message.error('Signup failed! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <Row className={styles.signupBox}>
                {/* Left Section - Welcome Message */}
                <Col xs={0} md={12} className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Welcome to Brand Marketing Hub Admin Portal</h1>
                    <p className={styles.welcomeText}>
                        Sign up your account to access the portal.
                    </p>
                </Col>

                {/* Right Section - Signup Form */}
                <Col xs={24} md={12} className={styles.formSection}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSignup}
                    >
                        <h2 className={styles.formTitle}>Create an Account</h2>

                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input
                                placeholder="Name"
                                size="large"
                                className={styles.formInput}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }]}
                        >
                            <Input
                                placeholder="Email"
                                size="large"
                                className={styles.formInput}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                size="large"
                                className={styles.formInput}
                            />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Please select your role!' }]}
                        >
                            <Select
                                size="large"
                                placeholder="Select Role"
                                className={styles.roleSelector}
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="marketing">Digital Marketer</Option>
                                <Option value="seo">SEO Expert</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                                className={styles.signupButton}
                            >
                                Signup
                            </Button>
                        </Form.Item>

                        <Form.Item className={styles.loginLink}>
                            <span>Already have an account? </span>
                            <Link href="/auth/login">Login</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Signup;
'use client';
import React, { useState } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import styles from '../../styles/landing/getaquote.module.css';

const { TextArea } = Input;

function Form1() {
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
                websiteUrl: values.websiteUrl || '',
                monthlyBudget: values.monthlyBudget,
                projectDetails: values.projectDetails,

                // ✅ capture page URL
                sourcePage: window.location.href
            };

            const res = await fetch("/api/getaquote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                setSuccessMessage("Form submitted successfully!");
                form.resetFields();

                // hide message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

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

    return (
        <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
                <h2 className={styles.formHeading}>Get Your Free Proposal</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <div className={styles.formItemRow}>
                        <Form.Item
                            label={<span className={styles.formLabel}>First Name</span>}
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter your first name!' }]}
                        >
                            <Input placeholder="Enter your first name" className={styles.customInput} />
                        </Form.Item>

                        <Form.Item
                            label={<span className={styles.formLabel}>Last Name</span>}
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter your last name!' }]}
                        >
                            <Input placeholder="Enter your last name" className={styles.customInput} />
                        </Form.Item>
                    </div>

                    <div className={styles.formItemRow}>
                        <Form.Item
                            label={<span className={styles.formLabel}>Phone Number</span>}
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Please enter your phone number!' },
                                { pattern: /^\d+$/, message: 'Please enter a valid phone number!' }
                            ]}
                        >
                            <Input placeholder="Enter your phone number" className={styles.customInput} />
                        </Form.Item>

                        <Form.Item
                            label={<span className={styles.formLabel}>Email Address</span>}
                            name="emailAddress"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input placeholder="Enter your email address" className={styles.customInput} />
                        </Form.Item>
                    </div>

                    <div className={styles.formItemRow}>
                        <Form.Item
                            label={<span className={styles.formLabel}>Website URL (Optional)</span>}
                            name="websiteUrl"
                            rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
                        >
                            <Input placeholder="Enter your website URL" className={styles.customInput} />
                        </Form.Item>

                        <Form.Item
                            label={<span className={styles.formLabel}>Projected Monthly Budget</span>}
                            name="monthlyBudget"
                            rules={[{ required: true, message: 'Please enter your projected monthly budget!' }]}
                        >
                            <InputNumber
                                placeholder="Enter your budget"
                                className={styles.customInputNumber}
                                formatter={value => `$ ${value}`}
                                parser={value => value.replace('$ ', '')}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label={<span className={styles.formLabel}>Project Details</span>}
                        name="projectDetails"
                        rules={[{ required: true, message: 'Please describe your project!' }]}
                    >
                        <TextArea
                            placeholder="What goal are you trying to achieve?"
                            rows={4}
                            className={styles.customTextarea}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className={styles.submitButton}
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>

                        {/* ✅ success message */}
                        {successMessage && (
                            <p
                                style={{
                                    color: "#16a34a",
                                    marginTop: "10px",
                                    fontWeight: "500"
                                }}
                            >
                                {successMessage}
                            </p>
                        )}
                    </Form.Item>

                </Form>

                <h6 className={styles.h6Form}>
                    In a Hurry? Give us a call at
                    <a href="tel:+1234567890" className={styles.callLink}> +123-456-7890</a>
                </h6>

                <hr />
            </div>
        </div>
    );
}

export default Form1;
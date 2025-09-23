'use client';
import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, message } from 'antd';
import styles from '../../styles/landing/getaquote.module.css';

const { TextArea } = Input;

function Form1() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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
            };

            const res = await fetch("/api/getaquote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData),
            });

            if (res.ok) {
                message.success("Thank you for your quote request! Our team will contact you within 24 hours.");
                form.resetFields();
            } else {
                const errorData = await res.json();
                message.error(errorData.error || "Failed to submit form. Please check your inputs and try again.");
            }
        } catch (error) {
            message.error("Something went wrong. Please try again later.");
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
                    </Form.Item>
                </Form>
                <h6 className={styles.h6Form}>
                    In a Hurry? Give us a call at <a href="tel:+1234567890" className={styles.callLink}>+123-456-7890</a>
                </h6>
                <hr />
            </div>
        </div>
    );
}

export default Form1;
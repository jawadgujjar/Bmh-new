"use client";
import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography } from 'antd';

const { Title, Text } = Typography;

const DescriptionAndFormSection = ({ heading, descriptions = [] }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form submitted:', values);
    // Handle form submission here
  };

  return (
    <div style={{ 
      padding: '60px 0', 
      background: '#f9f9f9',
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '0 24px' 
      }}>
        <Row gutter={48} align="middle">
          {/* Left Side - Description with Icons */}
          <Col xs={24} md={12}>
            <Title level={2} style={{ 
              fontSize: '32px', 
              marginBottom: '32px',
              color: '#333'
            }}>
              {heading || 'Why Choose Us'}
            </Title>
            
            {descriptions && descriptions.length > 0 ? (
              descriptions.map((desc, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '24px', 
                    display: 'flex', 
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}
                >
                  {desc.icon && (
                    <div style={{ 
                      flexShrink: 0,
                      width: '48px',
                      height: '48px',
                      background: '#f0f5ff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={desc.icon} 
                        alt="icon" 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          objectFit: 'contain' 
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <Text style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.7',
                      color: '#555',
                      display: 'block'
                    }}>
                      {desc.text}
                    </Text>
                  </div>
                </div>
              ))
            ) : (
              <Text type="secondary">No description points added yet</Text>
            )}
          </Col>
          
          {/* Right Side - Hard Coded Form */}
          <Col xs={24} md={12}>
            <Card 
              style={{ 
                padding: '40px', 
                borderRadius: '16px', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                background: '#ffffff'
              }}
            >
              <Title level={3} style={{ 
                marginBottom: '32px', 
                textAlign: 'center',
                color: '#1890ff'
              }}>
                Get in Touch
              </Title>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input 
                    placeholder="Enter your full name"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    placeholder="Enter your email"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input 
                    placeholder="Enter your phone number"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Tell us about your project"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    block
                    style={{ 
                      height: '48px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      background: '#1890ff'
                    }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DescriptionAndFormSection;
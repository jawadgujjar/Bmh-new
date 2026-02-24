"use client";
import React from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, Divider, message } from 'antd';

const { Title, Text } = Typography;

// HTML Content Renderer Component
const HTMLContent = ({ content, className = "" }) => {
  if (!content) return null;

  // Agar content string mein escaped HTML hai to unescape karein
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Clean content
  let cleanContent = content;
  
  // Check if content is escaped (contains &lt; or &gt;)
  if (content.includes('&lt;') || content.includes('&gt;')) {
    cleanContent = decodeHTML(content);
  }

  // Remove any empty paragraph tags at start/end
  cleanContent = cleanContent.replace(/^<p><\/p>|<\/?p>$/g, '');

  return (
    <div 
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
};

const DescriptionAndFormSection = ({ heading, descriptions = [] }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form submitted:', values);
    message.success('Thank you! We\'ll contact you shortly.');
    form.resetFields();
  };

  return (
    <div style={{
      padding: '80px 0',
      background: '#ffffff',
      width: '100%'
    }}>
      <div style={{
        maxWidth: 1300,
        margin: '0 auto',
        padding: '0 30px'
      }}>
        <Row gutter={[60, 40]} align="top">
          {/* Left Side - Dynamic Data from API */}
          <Col xs={24} md={12}>
            {/* Main Heading from API */}
            <Title level={2} style={{
              fontSize: '42px',
              fontWeight: 700,
              marginBottom: '35px',
              color: '#1a1a1a',
              lineHeight: 1.2,
              letterSpacing: '-0.5px'
            }}>
              {heading || 'Our Services'}
            </Title>

            {/* Description Items from API with Icons */}
            {descriptions && descriptions.length > 0 ? (
              <div style={{ marginBottom: '45px' }}>
                {descriptions.map((desc, index) => (
                  <div key={index} style={{
                    marginBottom: '28px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    {/* Icon from API or default orange box */}
                    {desc.icon ? (
                      <img
                        src={desc.icon}
                        alt="icon"
                        style={{
                          width: '28px',
                          height: '28px',
                          objectFit: 'contain',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: '#FF7F11',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}

                    {/* Description Text from API - NOW WITH HTML RENDERING */}
                    <div style={{ flex: 1 }}>
                      <HTMLContent content={desc.text} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No description points available</Text>
            )}

            {/* Static Divider */}
            <Divider style={{
              margin: '20px 0 40px',
              borderColor: '#e0e0e0',
              borderWidth: '1px'
            }} />

          </Col>

          {/* Right Side - Form */}
          <Col xs={24} md={12}>
            <Card
              style={{
                padding: '40px 35px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                background: '#172033',
                border: 'none'
              }}
            >
              <Title level={3} style={{
                marginBottom: '8px',
                color: '#FF7F11',
                fontSize: '30px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textAlign: 'left'
              }}>
                GET YOUR FREE PROPOSAL
              </Title>

              <Divider style={{
                margin: '12px 0 28px 0',
                borderColor: '#FF7F11',
                borderWidth: '2px',
                width: '70px',
                minWidth: '70px'
              }} />

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="middle"
                requiredMark={false}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>* First Name</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        placeholder="Enter first name"
                        style={{
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>* Last Name</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        placeholder="Enter last name"
                        style={{
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="phoneNumber"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>* Phone Number</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input
                        placeholder="Enter phone number"
                        style={{
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="emailAddress"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>* Email Address</span>}
                      rules={[
                        { required: true, message: 'Required' },
                        { type: 'email', message: 'Invalid email' }
                      ]}
                    >
                      <Input
                        placeholder="Enter email address"
                        style={{
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="websiteUrl"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>Website URL (Optional)</span>}
                    >
                      <Input
                        placeholder="Enter your website URL"
                        style={{
                          height: '44px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="projectDetails"
                      label={<span style={{ fontWeight: 500, color: '#ffffff', fontSize: '14px' }}>* Project Details</span>}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="What goal are you trying to achieve?"
                        style={{
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          fontSize: '14px',
                          resize: 'none'
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          height: '50px',
                          fontSize: '16px',
                          fontWeight: 600,
                          borderRadius: '8px',
                          background: '#FF7F11',
                          border: 'none',
                          color: '#ffffff',
                          marginTop: '8px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        SUBMIT
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              <div style={{
                marginTop: '24px',
                textAlign: 'center'
              }}>
                <Text style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                  In a Hurry? Give us a call at{' '}
                  <a href="tel:+(813) 214-0535" style={{ color: '#FF7F11', fontWeight: 600, textDecoration: 'none' }}>
                    (813) 214-0535
                  </a>
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Add CSS for HTML content styling */}
      <style jsx global>{`
        .ant-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .ant-input-textarea textarea::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
        }
        .ant-input {
          transition: all 0.3s ease;
        }
        .ant-input:hover, .ant-input:focus {
          border-color: #FF7F11 !important;
          background: rgba(255,255,255,0.12) !important;
        }
        
        /* HTML Content Styling */
        .html-content {
          line-height: 1.7;
          color: #4a4a4a;
          font-size: 16px;
        }
        
        .html-content h1 {
          font-size: 32px;
          margin-bottom: 16px;
          color: #1a1a1a;
          font-weight: 700;
        }
        
        .html-content h2 {
          font-size: 28px;
          margin-bottom: 14px;
          color: #1a1a1a;
          font-weight: 700;
        }
        
        .html-content h3 {
          font-size: 24px;
          margin-bottom: 12px;
          color: #1a1a1a;
          font-weight: 600;
        }
        
        .html-content h4 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #1a1a1a;
          font-weight: 600;
        }
        
        .html-content p {
          margin-bottom: 12px;
          line-height: 1.7;
        }
        
        .html-content ul, 
        .html-content ol {
          margin-bottom: 12px;
          padding-left: 20px;
        }
        
        .html-content li {
          margin-bottom: 6px;
          line-height: 1.7;
        }
        
        .html-content li p {
          margin-bottom: 0;
          display: inline;
        }
        
        .html-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .html-content em {
          font-style: italic;
        }
        
        .html-content a {
          color: #FF7F11;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .html-content a:hover {
          color: #e56c00;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default DescriptionAndFormSection;
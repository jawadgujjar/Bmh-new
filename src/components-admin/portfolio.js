"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Card,
  Typography,
  Popconfirm,
  message,
  Upload,
  Collapse,
  Tag,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  MinusCircleOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  ExpandOutlined,
  CompressOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Panel } = Collapse;

// Safe Image Component for table
const SafeTableImage = ({ src, alt, width = 35, height = 35 }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || typeof src !== 'string' || !src.startsWith('http') || imgError) {
    return (
      <div style={{ 
        width, 
        height, 
        borderRadius: 6, 
        background: '#f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: '1px solid #d9d9d9',
        fontSize: 10,
        color: '#999'
      }}>
        No Image
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ 
        width, 
        height, 
        borderRadius: 6, 
        objectFit: 'cover' 
      }}
      onError={() => setImgError(true)}
    />
  );
};

export default function Portfolio() {
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [form] = Form.useForm();
  const [expandedPanels, setExpandedPanels] = useState(['seo']);

  // Fetch Portfolios
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPortfolios(data);
      } else if (data.success && Array.isArray(data.data)) {
        setPortfolios(data.data);
      } else {
        message.error("Failed to load portfolios");
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      message.error("Error fetching portfolios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // ✅ Custom upload handler
  const handleCustomUpload = async (file, fieldPath) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        message.success("Image uploaded successfully");
        
        const currentValues = form.getFieldsValue(true);
        
        const updateNestedField = (obj, path, value) => {
          const keys = Array.isArray(path) ? path : path.split('.');
          let current = obj;
          
          for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
              current[keys[i]] = isNaN(keys[i + 1]) ? {} : [];
            }
            current = current[keys[i]];
          }
          
          current[keys[keys.length - 1]] = value;
          return obj;
        };

        const updatedValues = updateNestedField({ ...currentValues }, fieldPath, data.url);
        form.setFieldsValue(updatedValues);
        
        return data.url;
      } else {
        message.error(data.error || "Failed to upload image");
        return false;
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Error uploading image");
      return false;
    }
  };

  // ✅ Upload Field Component
  const SimpleUploadField = ({ name, label, required = false }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
      const currentValues = form.getFieldsValue(true);
      let value = currentValues;
      
      if (Array.isArray(name)) {
        name.forEach(key => {
          value = value?.[key];
        });
      } else {
        value = currentValues[name];
      }
      
      if (value) {
        setImageUrl(value);
      }
    }, [form, name, isModalOpen]);

    const handleBeforeUpload = async (file) => {
      const url = await handleCustomUpload(file, name);
      if (url) {
        setImageUrl(url);
      }
      return false;
    };

    const handleRemove = () => {
      setImageUrl('');
      
      const currentValues = form.getFieldsValue(true);
      
      const clearNestedField = (obj, path) => {
        const keys = Array.isArray(path) ? path : path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) return;
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = '';
        return obj;
      };

      const updatedValues = clearNestedField({ ...currentValues }, name);
      form.setFieldsValue(updatedValues);
    };

    return (
      <Form.Item label={label}>
        <div style={{ marginBottom: 8 }}>
          <Upload
            name="image"
            listType="picture"
            showUploadList={false}
            beforeUpload={handleBeforeUpload}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload {label}</Button>
          </Upload>
        </div>
        
        {imageUrl && (
          <div style={{ marginTop: 8 }}>
            <img 
              src={imageUrl} 
              alt={label}
              style={{ 
                width: 100, 
                height: 100, 
                objectFit: 'cover',
                borderRadius: 6,
                border: '1px solid #d9d9d9'
              }} 
            />
            <div style={{ marginTop: 4 }}>
              <Button 
                type="link" 
                danger 
                size="small" 
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
        
        <Form.Item name={name} noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form.Item>
    );
  };

  // Add / Edit Portfolio
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", JSON.stringify(values, null, 2));
      
      // Prepare SEO data for each website
      const websitesWithSEO = values.websites.map(website => {
        const portfolioPage = website.portfolioPage || {};
        
        // Create SEO object from form fields
        const seoData = portfolioPage.seo || {};
        
        // Update portfolioPage with SEO
        return {
          ...website,
          portfolioPage: {
            ...portfolioPage,
            seo: {
              metaTitle: seoData.metaTitle || portfolioPage.header?.title || '',
              metaDescription: seoData.metaDescription || portfolioPage.header?.description || '',
              metaKeywords: seoData.metaKeywords ? 
                (Array.isArray(seoData.metaKeywords) ? seoData.metaKeywords : seoData.metaKeywords.split(',').map(k => k.trim()).filter(k => k)) : 
                [],
              schemaMarkup: seoData.schemaMarkup || null
            }
          }
        };
      });

      // Final payload
      const payload = {
        keyword: values.keyword,
        websites: websitesWithSEO
      };

      if (editingPortfolio) {
        payload._id = editingPortfolio._id;
      }

      let url = "/api/portfolio";
      let method = editingPortfolio ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      console.log("API Response:", data);

      if (data.success) {
        message.success(editingPortfolio ? "Portfolio updated!" : "Portfolio added!");
        form.resetFields();
        setEditingPortfolio(null);
        setIsModalOpen(false);
        setExpandedPanels(['seo']);
        fetchPortfolios();
      } else {
        message.error(data.error || "Operation failed");
      }
    } catch (err) {
      console.error("Error saving portfolio:", err);
      message.error("Error saving portfolio");
    }
  };

  // Delete Portfolio
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/portfolio?id=${id}`, { 
        method: "DELETE" 
      });
      const data = await res.json();
      if (data.success) {
        message.success("Portfolio deleted successfully!");
        fetchPortfolios();
      } else {
        message.error(data.error || "Failed to delete portfolio");
      }
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      message.error("Error deleting portfolio");
    }
  };

  // Open modal for editing
  const handleEdit = (record) => {
    console.log("Editing record:", record);
    setEditingPortfolio(record);
    
    const formValues = {
      keyword: record.keyword,
      websites: record.websites?.map((website, index) => {
        const portfolioPage = website.portfolioPage || {};
        
        return {
          link: website.link,
          portfolioPage: {
            header: {
              image: portfolioPage.header?.image || "",
              title: portfolioPage.header?.title || "",
              description: portfolioPage.header?.description || "",
            },
            middleSection: {
              description1: portfolioPage.middleSection?.description1 || "",
              image1: portfolioPage.middleSection?.image1 || "",
              image2: portfolioPage.middleSection?.image2 || "",
              description2: portfolioPage.middleSection?.description2 || "",
            },
            webHighlights: portfolioPage.webHighlights || [],
            cta1: {
              heading: portfolioPage.cta1?.heading || "",
              description: portfolioPage.cta1?.description || "",
            },
            cta2: {
              heading: portfolioPage.cta2?.heading || "",
              description: portfolioPage.cta2?.description || "",
            },
            // ✅ SEO Fields
            seo: {
              metaTitle: portfolioPage.seo?.metaTitle || "",
              metaDescription: portfolioPage.seo?.metaDescription || "",
              metaKeywords: portfolioPage.seo?.metaKeywords ? 
                (Array.isArray(portfolioPage.seo.metaKeywords) ? portfolioPage.seo.metaKeywords.join(', ') : portfolioPage.seo.metaKeywords) : "",
              schemaMarkup: portfolioPage.seo?.schemaMarkup || ""
            }
          }
        };
      }) || [],
    };
    
    form.setFieldsValue(formValues);
    setIsModalOpen(true);
  };

  // Reset form when modal closes
  const handleModalClose = () => {
    form.resetFields();
    setEditingPortfolio(null);
    setIsModalOpen(false);
    setExpandedPanels(['seo']);
  };

  // Table Columns
  const columns = [
    {
      title: "Header Image",
      dataIndex: "websites",
      key: "headerImage",
      render: (websites) => {
        const headerImage = websites?.[0]?.portfolioPage?.header?.image;
        return (
          <SafeTableImage 
            src={headerImage} 
            alt="header" 
          />
        );
      },
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "SEO Status",
      key: "seoStatus",
      render: (_, record) => {
        const seo = record.websites?.[0]?.portfolioPage?.seo;
        return (
          <div>
            {seo?.metaTitle ? (
              <Tag color="green">✓ SEO Set</Tag>
            ) : (
              <Tag color="orange">No SEO</Tag>
            )}
            {seo?.metaDescription && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                {seo.metaDescription.substring(0, 40)}...
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Website",
      dataIndex: "websites",
      key: "website",
      render: (websites) => {
        const link = websites?.[0]?.link;
        return link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link.substring(0, 30)}...
          </a>
        ) : (
          <span style={{ color: '#999' }}>No website</span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm 
            title="Delete Portfolio?" 
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Space
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
      >
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
          📂 Portfolios Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingPortfolio(null);
            setIsModalOpen(true);
          }}
        >
          Add Portfolio
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={portfolios}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={
          <div>
            {editingPortfolio ? "✏️ Edit Portfolio" : "➕ Add Portfolio"}
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: '4px' }}>
              Complete all sections including SEO for better search rankings
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleOk}
        okText="Save"
        width={900}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
        okButtonProps={{ size: 'middle' }}
        cancelButtonProps={{ size: 'middle' }}
      >
        <Form layout="vertical" form={form}>
          {/* Keyword */}
          <Form.Item
            label="Keyword"
            name="keyword"
            rules={[{ required: true, message: "Please enter keyword" }]}
            extra="Main keyword for this portfolio category"
          >
            <Input placeholder="Enter keyword (e.g., SEO Services, Web Development)" />
          </Form.Item>

          {/* Websites */}
          <Form.Item label="Websites">
            <Form.List name="websites">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card
                      key={key}
                      style={{ marginBottom: 16, border: '1px solid #d9d9d9' }}
                      title={`Website ${name + 1}`}
                      extra={
                        <Space>
                          <Button 
                            type="text" 
                            icon={expandedPanels.includes(`website-${name}`) ? <CompressOutlined /> : <ExpandOutlined />}
                            onClick={() => {
                              if (expandedPanels.includes(`website-${name}`)) {
                                setExpandedPanels(expandedPanels.filter(panel => panel !== `website-${name}`));
                              } else {
                                setExpandedPanels([...expandedPanels, `website-${name}`]);
                              }
                            }}
                          >
                            {expandedPanels.includes(`website-${name}`) ? 'Collapse' : 'Expand'}
                          </Button>
                          {fields.length > 1 && (
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          )}
                        </Space>
                      }
                    >
                      <Collapse activeKey={expandedPanels} onChange={setExpandedPanels} ghost>
                        <Panel header="Basic Info" key={`basic-${name}`}>
                          <Form.Item
                            {...restField}
                            label="Website Link"
                            name={[name, "link"]}
                            rules={[{ required: true, message: "Enter website link" }]}
                            extra="Full URL of the website"
                          >
                            <Input placeholder="https://example.com" />
                          </Form.Item>
                        </Panel>

                        {/* Header Section */}
                        <Panel header="Header Section" key={`header-${name}`}>
                          <SimpleUploadField
                            name={['websites', name, 'portfolioPage', 'header', 'image']}
                            label="Header Image"
                          />
                          <Form.Item
                            label="Title"
                            name={[name, "portfolioPage", "header", "title"]}
                            rules={[{ required: true, message: "Enter header title" }]}
                          >
                            <Input placeholder="Enter header title" />
                          </Form.Item>
                          <Form.Item
                            label="Description"
                            name={[name, "portfolioPage", "header", "description"]}
                            rules={[{ required: true, message: "Enter header description" }]}
                            extra="This appears as the main description on the portfolio page"
                          >
                            <Input.TextArea placeholder="Enter header description" rows={4} />
                          </Form.Item>
                        </Panel>

                        {/* Middle Section */}
                        <Panel header="Middle Section" key={`middle-${name}`}>
                          <Form.Item
                            label="Description 1"
                            name={[name, "portfolioPage", "middleSection", "description1"]}
                          >
                            <Input.TextArea placeholder="Enter first description" rows={4} />
                          </Form.Item>
                          <SimpleUploadField
                            name={['websites', name, 'portfolioPage', 'middleSection', 'image1']}
                            label="Image 1"
                          />
                          <SimpleUploadField
                            name={['websites', name, 'portfolioPage', 'middleSection', 'image2']}
                            label="Image 2"
                          />
                          <Form.Item
                            label="Description 2"
                            name={[name, "portfolioPage", "middleSection", "description2"]}
                          >
                            <Input.TextArea placeholder="Enter second description" rows={4} />
                          </Form.Item>
                        </Panel>

                        {/* Web Highlights */}
                        <Panel header="Web Highlights" key={`highlights-${name}`}>
                          <Form.List name={[name, "portfolioPage", "webHighlights"]}>
                            {(highlightFields, { add: addHighlight, remove: removeHighlight }) => (
                              <>
                                {highlightFields.map(({ key: highlightKey, name: highlightName, ...restHighlightField }) => (
                                  <Space key={highlightKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                      {...restHighlightField}
                                      name={[highlightName]}
                                      rules={[{ required: true, message: "Enter web highlight URL" }]}
                                      style={{ flex: 1 }}
                                    >
                                      <Input placeholder="https://example.com/highlight.jpg" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => removeHighlight(highlightName)} />
                                  </Space>
                                ))}
                                <Button type="dashed" onClick={() => addHighlight()} block icon={<PlusOutlined />}>
                                  Add Web Highlight
                                </Button>
                              </>
                            )}
                          </Form.List>
                        </Panel>

                        {/* CTA Sections */}
                        <Panel header="Call to Action 1" key={`cta1-${name}`}>
                          <Form.Item 
                            label="Heading" 
                            name={[name, "portfolioPage", "cta1", "heading"]}
                          >
                            <Input placeholder="Enter CTA 1 heading" />
                          </Form.Item>
                          <Form.Item 
                            label="Description" 
                            name={[name, "portfolioPage", "cta1", "description"]}
                          >
                            <Input.TextArea placeholder="Enter CTA 1 description" rows={4} />
                          </Form.Item>
                        </Panel>

                        <Panel header="Call to Action 2" key={`cta2-${name}`}>
                          <Form.Item 
                            label="Heading" 
                            name={[name, "portfolioPage", "cta2", "heading"]}
                          >
                            <Input placeholder="Enter CTA 2 heading" />
                          </Form.Item>
                          <Form.Item 
                            label="Description" 
                            name={[name, "portfolioPage", "cta2", "description"]}
                          >
                            <Input.TextArea placeholder="Enter CTA 2 description" rows={4} />
                          </Form.Item>
                        </Panel>

                        {/* ✅ SEO Section */}
                        <Panel 
                          header={
                            <Space>
                              <GlobalOutlined />
                              <Text strong>SEO Settings</Text>
                            </Space>
                          } 
                          key={`seo-${name}`}
                        >
                          <Form.Item 
                            label="Meta Title" 
                            name={[name, "portfolioPage", "seo", "metaTitle"]}
                            extra="Title for search engines (recommended: 50-60 characters)"
                          >
                            <Input 
                              placeholder="Enter SEO title for this portfolio" 
                              maxLength={70}
                              showCount
                            />
                          </Form.Item>

                          <Form.Item 
                            label="Meta Description" 
                            name={[name, "portfolioPage", "seo", "metaDescription"]}
                            extra="Description for search results (recommended: 150-160 characters)"
                          >
                            <Input.TextArea 
                              rows={3}
                              placeholder="Enter SEO description for this portfolio"
                              maxLength={160}
                              showCount
                            />
                          </Form.Item>

                          <Form.Item 
                            label="Meta Keywords" 
                            name={[name, "portfolioPage", "seo", "metaKeywords"]}
                            extra="Separate with commas (e.g., keyword1, keyword2, keyword3)"
                          >
                            <Input 
                              placeholder="Enter SEO keywords"
                            />
                          </Form.Item>

                          <Form.Item 
                            label="Schema Markup (JSON-LD)" 
                            name={[name, "portfolioPage", "seo", "schemaMarkup"]}
                            extra={
                              <div>
                                <InfoCircleOutlined /> Optional: Add structured data in JSON format
                              </div>
                            }
                          >
                            <Input.TextArea 
                              rows={4}
                              placeholder='{"@context":"https://schema.org","@type":"CreativeWork",...}'
                            />
                          </Form.Item>
                        </Panel>
                      </Collapse>
                    </Card>
                  ))}
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />} 
                    style={{ marginTop: 16 }}
                  >
                    Add Another Website
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
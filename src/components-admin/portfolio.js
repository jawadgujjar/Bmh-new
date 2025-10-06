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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

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

  // ✅ SIMPLE FIX: Custom upload handler
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
        
        // Get current form values
        const currentValues = form.getFieldsValue(true);
        
        // Update the specific field manually
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

  // ✅ SIMPLE UPLOAD FIELD COMPONENT
  const SimpleUploadField = ({ name, label, required = false }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
      // Get current value when modal opens or editing
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
      return false; // Prevent default upload behavior
    };

    const handleRemove = () => {
      setImageUrl('');
      
      // Clear the field in form
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
        
        {/* Hidden input to store the value in form */}
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
      
      // Ensure proper data structure
      const payload = editingPortfolio 
        ? { _id: editingPortfolio._id, ...values }
        : values;

      let url = "/api/portfolio";
      let method = "POST";

      if (editingPortfolio) {
        method = "PUT";
      }

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
      websites: record.websites?.map((website, index) => ({
        link: website.link,
        portfolioPage: {
          header: {
            image: website.portfolioPage?.header?.image || "",
            title: website.portfolioPage?.header?.title || "",
            description: website.portfolioPage?.header?.description || "",
          },
          middleSection: {
            description1: website.portfolioPage?.middleSection?.description1 || "",
            image1: website.portfolioPage?.middleSection?.image1 || "",
            image2: website.portfolioPage?.middleSection?.image2 || "",
            description2: website.portfolioPage?.middleSection?.description2 || "",
          },
          webHighlights: website.portfolioPage?.webHighlights || [],
          cta1: {
            heading: website.portfolioPage?.cta1?.heading || "",
            description: website.portfolioPage?.cta1?.description || "",
          },
          cta2: {
            heading: website.portfolioPage?.cta2?.heading || "",
            description: website.portfolioPage?.cta2?.description || "",
          }
        }
      })) || [],
    };
    
    form.setFieldsValue(formValues);
    setIsModalOpen(true);
  };

  // Reset form when modal closes
  const handleModalClose = () => {
    form.resetFields();
    setEditingPortfolio(null);
    setIsModalOpen(false);
  };

  // Table Columns - FIXED
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
      title: "Website",
      dataIndex: "websites",
      key: "website",
      render: (websites) => {
        const link = websites?.[0]?.link;
        return link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
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
          📂 Portfolios
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
        title={editingPortfolio ? "✏️ Edit Portfolio" : "➕ Add Portfolio"}
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleOk}
        okText="Save"
        width={800}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Form layout="vertical" form={form}>
          {/* Keyword */}
          <Form.Item
            label="Keyword"
            name="keyword"
            rules={[{ required: true, message: "Please enter keyword" }]}
          >
            <Input placeholder="Enter keyword" />
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
                        fields.length > 1 && (
                          <Button danger onClick={() => remove(name)}>
                            Remove
                          </Button>
                        )
                      }
                    >
                      <Form.Item
                        {...restField}
                        label="Website Link"
                        name={[name, "link"]}
                        rules={[{ required: true, message: "Enter website link" }]}
                      >
                        <Input placeholder="https://example.com" />
                      </Form.Item>

                      {/* Header Section */}
                      <Card type="inner" title="Header Section" style={{ marginBottom: 16 }}>
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
                        >
                          <Input.TextArea placeholder="Enter header description" rows={4} />
                        </Form.Item>
                      </Card>

                      {/* Middle Section */}
                      <Card type="inner" title="Middle Section" style={{ marginBottom: 16 }}>
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
                      </Card>

                      {/* Web Highlights */}
                      <Card type="inner" title="Web Highlights" style={{ marginBottom: 16 }}>
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
                                    <Input placeholder="https://example.com/highlight" />
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
                      </Card>

                      {/* CTA Sections */}
                      <Card type="inner" title="Call to Action 1" style={{ marginBottom: 16 }}>
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
                      </Card>

                      <Card type="inner" title="Call to Action 2">
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
                      </Card>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ marginTop: 16 }}>
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
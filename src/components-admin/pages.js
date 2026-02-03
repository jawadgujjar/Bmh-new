"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Card,
  Typography,
  Popconfirm,
  message,
  Upload,
  Row,
  Col,
  Breadcrumb,
  Collapse,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UploadOutlined,
  HomeOutlined,
  CopyOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// Dynamically import TipTap to avoid SSR
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('./TipTapEditor').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div style={{
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      minHeight: '150px',
      padding: '20px',
      background: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      Loading editor...
    </div>
  )
});

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

export default function Pages() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form] = Form.useForm();
  const [expandedPanels, setExpandedPanels] = useState(['seo']);
  
  // State for all editor contents
  const [editorContents, setEditorContents] = useState({
    topSectionDescription: "",
    middleSectionDescription1: "",
    middleSectionDescription2: "",
    cta1Description: "",
    cta2Description: "",
  });

  // Fetch Pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/page");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPages(data);
      } else if (data.success && Array.isArray(data.data)) {
        setPages(data.data);
      } else {
        message.error("Failed to load pages");
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
      message.error("Error fetching pages");
    } finally {
      setLoading(false);
    }
  };

  // Fetch SubCategories for dropdown
  const fetchSubCategories = async () => {
    try {
      const res = await fetch("/api/subcategories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSubCategories(data);
      } else if (data.success && Array.isArray(data.data)) {
        setSubCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchPages();
    fetchSubCategories();
  }, []);

  // Handle file upload for Page Modal
  const handleUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        if (Array.isArray(fieldName)) {
          let nestedValue = data.url;
          for (let i = fieldName.length - 1; i >= 0; i--) {
            nestedValue = { [fieldName[i]]: nestedValue };
          }
          form.setFieldsValue(nestedValue);
        } else {
          form.setFieldsValue({ [fieldName]: data.url });
        }
        message.success("Image uploaded successfully");
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

  // Custom Upload Component
  const UploadField = ({ name, label, required = false }) => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
      const currentValue = form.getFieldValue(name);
      if (currentValue && currentValue.trim() !== '') {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: currentValue,
          },
        ]);
      }
    }, [form, name, isModalOpen]);

    return (
      <Form.Item
        label={label}
        name={name}
        rules={required ? [{ required: true, message: `Please upload ${label}` }] : []}
      >
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={async (file) => {
            const url = await handleUpload(file, name);
            if (url) {
              setFileList([{ uid: "-1", name: file.name, status: "done", url }]);
            }
            return Upload.LIST_IGNORE;
          }}
          onRemove={() => {
            form.setFieldsValue({ [name]: "" });
            setFileList([]);
          }}
        >
          <Button icon={<UploadOutlined />}>Upload {label}</Button>
        </Upload>
      </Form.Item>
    );
  };

  // Handle editor content change
  const handleEditorChange = (content, fieldName) => {
    setEditorContents(prev => ({
      ...prev,
      [fieldName]: content
    }));
    // Also update form values
    const formFieldMap = {
      topSectionDescription: ["topSection", "description"],
      middleSectionDescription1: ["middleSection", "description1"],
      middleSectionDescription2: ["middleSection", "description2"],
      cta1Description: ["cta1", "description"],
      cta2Description: ["cta2", "description"],
    };
    
    if (formFieldMap[fieldName]) {
      form.setFieldsValue({
        [formFieldMap[fieldName][0]]: {
          ...form.getFieldValue([formFieldMap[fieldName][0]]) || {},
          [formFieldMap[fieldName][1]]: content
        }
      });
    }
  };

  // Slug generator
  const generateSlug = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Add / Edit Page
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Merge editor contents with form values
      const finalValues = {
        ...values,
        topSection: {
          ...values.topSection,
          description: editorContents.topSectionDescription
        },
        middleSection: {
          ...values.middleSection,
          description1: editorContents.middleSectionDescription1,
          description2: editorContents.middleSectionDescription2
        },
        cta1: {
          ...values.cta1,
          description: editorContents.cta1Description
        },
        cta2: {
          ...values.cta2,
          description: editorContents.cta2Description
        }
      };

      // Prepare data for API according to Page model
      const pageData = {
        title: finalValues.title,
        slug: finalValues.slug,
        category: finalValues.category,
        subcategory: finalValues.subcategory,
        subcatpagedescr: finalValues.subcatpagedescr || "",
        // SEO Fields
        metaTitle: finalValues.metaTitle || "",
        metaDescription: finalValues.metaDescription || "",
        metaKeywords: finalValues.metaKeywords || "",
        metaSchema: finalValues.metaSchema || "",
        // Page Content Sections
        topSection: finalValues.topSection || {},
        middleSection: finalValues.middleSection || {},
        cta1: finalValues.cta1 || {},
        cta2: finalValues.cta2 || {},
      };

      let url = "/api/page";
      let method = "POST";

      if (editingPage) {
        // For editing, use PUT with _id
        url = "/api/page";
        method = "PUT";
        pageData._id = editingPage._id;
      }

      console.log("Saving page data:", pageData);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });
      
      const data = await res.json();

      if (res.ok) {
        message.success(
          editingPage ? "Page updated successfully!" : "Page created successfully!"
        );
        form.resetFields();
        setEditorContents({
          topSectionDescription: "",
          middleSectionDescription1: "",
          middleSectionDescription2: "",
          cta1Description: "",
          cta2Description: "",
        });
        setEditingPage(null);
        setIsModalOpen(false);
        setExpandedPanels(['seo']);
        fetchPages();
      } else {
        message.error(data.error || "Operation failed");
      }
    } catch (err) {
      console.error("Error saving page:", err);
      message.error("Error saving page");
    }
  };

  // Delete Page
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/page?id=${id}`, { 
        method: "DELETE" 
      });
      const data = await res.json();
      
      if (res.ok) {
        message.success("Page deleted successfully");
        fetchPages();
      } else {
        message.error(data.error || "Failed to delete page");
      }
    } catch (err) {
      console.error("Error deleting page:", err);
      message.error("Error deleting page");
    }
  };

  // Open modal for editing
  const handleEdit = (record) => {
    setEditingPage(record);
    
    // Set editor contents from record
    setEditorContents({
      topSectionDescription: record.topSection?.description || "",
      middleSectionDescription1: record.middleSection?.description1 || "",
      middleSectionDescription2: record.middleSection?.description2 || "",
      cta1Description: record.cta1?.description || "",
      cta2Description: record.cta2?.description || "",
    });
    
    form.setFieldsValue({
      title: record.title,
      slug: record.slug,
      category: record.category,
      subcategory: record.subcategory?._id || record.subcategory,
      subcatpagedescr: record.subcatpagedescr || "",
      // SEO Fields
      metaTitle: record.metaTitle || "",
      metaDescription: record.metaDescription || "",
      metaKeywords: record.metaKeywords || "",
      metaSchema: record.metaSchema || "",
      // Page Content Sections
      topSection: {
        backgroundImage: record.topSection?.backgroundImage || "",
        heading: record.topSection?.heading || "",
        description: record.topSection?.description || "",
      },
      middleSection: {
        description1: record.middleSection?.description1 || "",
        image1: record.middleSection?.image1 || "",
        image2: record.middleSection?.image2 || "",
        description2: record.middleSection?.description2 || "",
      },
      cta1: {
        heading: record.cta1?.heading || "",
        description: record.cta1?.description || "",
      },
      cta2: {
        heading: record.cta2?.heading || "",
        description: record.cta2?.description || "",
      },
    });
    setIsModalOpen(true);
  };

  // View Page in new tab
  const handleView = (slug) => {
    window.open(`/page/${slug}`, '_blank');
  };

  // Copy URL to clipboard
  const copyUrl = (slug) => {
    const url = `${window.location.origin}/page/${slug}`;
    navigator.clipboard.writeText(url)
      .then(() => message.success('URL copied to clipboard!'))
      .catch(() => message.error('Failed to copy URL'));
  };

  // Open modal for adding new page
  const openAddModal = () => {
    form.resetFields();
    setEditorContents({
      topSectionDescription: "",
      middleSectionDescription1: "",
      middleSectionDescription2: "",
      cta1Description: "",
      cta2Description: "",
    });
    setEditingPage(null);
    setIsModalOpen(true);
    setExpandedPanels(['seo']);
  };

  // Table Columns with SEO Status
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <div style={{ fontSize: 12, color: "#666" }}>
            Slug: {record.slug}
          </div>
          {record.metaTitle && (
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
              SEO: {record.metaTitle.substring(0, 40)}...
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={
          category === "digital-marketing" ? "blue" :
          category === "web-development" ? "green" :
          category === "app-development" ? "orange" : "default"
        }>
          {category || "N/A"}
        </Tag>
      ),
    },
    {
      title: "SubCategory",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (subcat) => {
        const subcatObj = subCategories.find(s => s._id === subcat || s._id === subcat?._id);
        return (
          <Tag color="purple">
            {subcatObj?.name || "Unknown"}
          </Tag>
        );
      },
    },
    {
      title: "SEO Status",
      key: "seoStatus",
      render: (_, record) => {
        return (
          <div>
            {record.metaTitle ? (
              <Tag color="green">✓ SEO Set</Tag>
            ) : (
              <Tag color="orange">No SEO</Tag>
            )}
            {record.metaDescription && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                {record.metaDescription.substring(0, 40)}...
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <Text type="secondary">
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record.slug)}
            title="View Page"
            size="small"
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            title="Edit Page"
            size="small"
          />
          <Button
            icon={<CopyOutlined />}
            onClick={() => copyUrl(record.slug)}
            title="Copy URL"
            size="small"
          />
          <Popconfirm
            title="Delete this page?"
            description="Are you sure you want to delete this page?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              title="Delete Page"
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/subcategories",
            title: "SubCategories",
          },
          {
            title: "Pages",
          },
        ]}
      />
      
      <Card
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
              📄 Pages Management
            </Title>
            <Text type="secondary">Manage all your pages here</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAddModal}
              size="large"
            >
              Add New Page
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={pages}
          rowKey="_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 10, showSizeChanger: true }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: 16, background: '#fafafa', borderRadius: 8 }}>
                <Row gutter={24}>
                  <Col span={6}>
                    <Text strong>Page Description:</Text>
                    <p style={{ marginTop: 8 }}>
                      {record.subcatpagedescr || "No description"}
                    </p>
                  </Col>
                  <Col span={6}>
                    <Text strong>Top Section:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Heading:</strong> {record.topSection?.heading || "No heading"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Background:</strong> {record.topSection?.backgroundImage ? "✓ Uploaded" : "No image"}
                    </p>
                  </Col>
                  <Col span={6}>
                    <Text strong>Middle Section:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Image 1:</strong> {record.middleSection?.image1 ? "✓ Uploaded" : "No image"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Image 2:</strong> {record.middleSection?.image2 ? "✓ Uploaded" : "No image"}
                    </p>
                  </Col>
                  <Col span={6}>
                    <Text strong>SEO Info:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Meta Title:</strong> {record.metaTitle ? "✓ Set" : "No"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Meta Desc:</strong> {record.metaDescription ? "✓ Set" : "No"}
                    </p>
                  </Col>
                </Row>
              </div>
            ),
          }}
        />

        {/* Page Modal with Tiptap Editors */}
        <Modal
          title={editingPage ? "✏️ Edit Page" : "➕ Add New Page"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
            setEditorContents({
              topSectionDescription: "",
              middleSectionDescription1: "",
              middleSectionDescription2: "",
              cta1Description: "",
              cta2Description: "",
            });
            setEditingPage(null);
            setExpandedPanels(['seo']);
          }}
          onOk={handleOk}
          okText={editingPage ? "Update" : "Create"}
          cancelText="Cancel"
          width={1000}
          style={{ top: 20 }}
        >
          <Form layout="vertical" form={form}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Page Title"
                  name="title"
                  rules={[{ required: true, message: "Please enter page title" }]}
                >
                  <Input 
                    placeholder="Enter page title" 
                    onChange={(e) => {
                      const slug = generateSlug(e.target.value);
                      form.setFieldsValue({ slug });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="URL Slug"
                  name="slug"
                  rules={[
                    { required: true, message: "Please enter URL slug" },
                    { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Only lowercase letters, numbers, and hyphens allowed' }
                  ]}
                  extra="yourdomain.com/your-slug"
                >
                  <Input placeholder="your-slug" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please select category" }]}
                >
                  <Select placeholder="Select category">
                    <Option value="digital-marketing">Digital Marketing</Option>
                    <Option value="web-development">Web Development</Option>
                    <Option value="app-development">App Development</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="SubCategory"
                  name="subcategory"
                  rules={[{ required: true, message: "Please select a subcategory" }]}
                >
                  <Select 
                    placeholder="Select subcategory" 
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {subCategories.map((subcat) => (
                      <Option key={subcat._id} value={subcat._id}>
                        {subcat.name} ({subcat.category})
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Page Short Description"
              name="subcatpagedescr"
              extra="Short description for meta tags and preview"
            >
              <Input.TextArea 
                placeholder="Enter short description" 
                rows={3}
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <Collapse activeKey={expandedPanels} onChange={setExpandedPanels} ghost>
              {/* SEO Panel */}
              <Panel
                header={
                  <Space>
                    <GlobalOutlined />
                    <Text strong>SEO Settings</Text>
                  </Space>
                }
                key="seo"
              >
                <Form.Item
                  label="Meta Title"
                  name="metaTitle"
                  extra="Title for search engines (recommended: 50-60 characters)"
                >
                  <Input
                    placeholder="Enter SEO title for this page"
                    maxLength={70}
                    showCount
                  />
                </Form.Item>

                <Form.Item
                  label="Meta Description"
                  name="metaDescription"
                  extra="Description for search results (recommended: 150-160 characters)"
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Enter SEO description for this page"
                    maxLength={160}
                    showCount
                  />
                </Form.Item>

                <Form.Item
                  label="Meta Keywords"
                  name="metaKeywords"
                  extra="Separate with commas (e.g., keyword1, keyword2, keyword3)"
                >
                  <Input
                    placeholder="Enter SEO keywords"
                  />
                </Form.Item>

                <Form.Item
                  label="Schema Markup (JSON-LD)"
                  name="metaSchema"
                  extra={
                    <div>
                      <InfoCircleOutlined /> Optional: Add structured data in JSON format
                    </div>
                  }
                >
                  <Input.TextArea
                    rows={5}
                    placeholder={`{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Your Service Name",
  "description": "Service description here",
  "provider": {
    "@type": "Organization",
    "name": "Your Company"
  }
}`}
                  />
                </Form.Item>
              </Panel>
            </Collapse>

            {/* Top Section */}
            <div style={{ 
              padding: 16, 
              background: '#f0f9ff', 
              borderRadius: 8,
              marginBottom: 16,
              marginTop: 16
            }}>
              <Text strong style={{ color: '#1890ff', fontSize: 16, marginBottom: 12 }}>
                Top Section
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <UploadField 
                    name={["topSection", "backgroundImage"]} 
                    label="Background Image" 
                    required={false}
                  />
                </Col>
                <Col span={12}>
                  <Form.Item label="Heading" name={["topSection", "heading"]}>
                    <Input placeholder="Enter top section heading" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Description">
                <TiptapEditor 
                  content={editorContents.topSectionDescription}
                  onChange={(content) => handleEditorChange(content, "topSectionDescription")}
                  height="150px"
                />
              </Form.Item>
            </div>

            {/* Middle Section */}
            <div style={{ 
              padding: 16, 
              background: '#f6ffed', 
              borderRadius: 8,
              marginBottom: 16,
            }}>
              <Text strong style={{ color: '#52c41a', fontSize: 16, marginBottom: 12 }}>
                Middle Section
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Description 1">
                    <TiptapEditor 
                      content={editorContents.middleSectionDescription1}
                      onChange={(content) => handleEditorChange(content, "middleSectionDescription1")}
                      height="150px"
                    />
                  </Form.Item>
                  <UploadField 
                    name={["middleSection", "image1"]} 
                    label="Image 1" 
                    required={false}
                  />
                </Col>
                <Col span={12}>
                  <Form.Item label="Description 2">
                    <TiptapEditor 
                      content={editorContents.middleSectionDescription2}
                      onChange={(content) => handleEditorChange(content, "middleSectionDescription2")}
                      height="150px"
                    />
                  </Form.Item>
                  <UploadField 
                    name={["middleSection", "image2"]} 
                    label="Image 2" 
                    required={false}
                  />
                </Col>
              </Row>
            </div>

            {/* Call to Actions */}
            <div style={{ 
              padding: 16, 
              background: '#fff7e6', 
              borderRadius: 8,
              marginBottom: 16,
            }}>
              <Text strong style={{ color: '#fa8c16', fontSize: 16, marginBottom: 12 }}>
                Call to Actions
              </Text>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ 
                    padding: 12, 
                    background: '#fff7e6', 
                    borderRadius: 8,
                    marginBottom: 16
                  }}>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      CTA 1
                    </Text>
                    <Form.Item label="Heading" name={["cta1", "heading"]} style={{ marginBottom: 8 }}>
                      <Input placeholder="Enter CTA 1 heading" />
                    </Form.Item>
                    <Form.Item label="Description">
                      <TiptapEditor 
                        content={editorContents.cta1Description}
                        onChange={(content) => handleEditorChange(content, "cta1Description")}
                        height="150px"
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ 
                    padding: 12, 
                    background: '#fff0f6', 
                    borderRadius: 8,
                    marginBottom: 16
                  }}>
                    <Text strong style={{ display: 'block', marginBottom: 8 }}>
                      CTA 2
                    </Text>
                    <Form.Item label="Heading" name={["cta2", "heading"]} style={{ marginBottom: 8 }}>
                      <Input placeholder="Enter CTA 2 heading" />
                    </Form.Item>
                    <Form.Item label="Description">
                      <TiptapEditor 
                        content={editorContents.cta2Description}
                        onChange={(content) => handleEditorChange(content, "cta2Description")}
                        height="150px"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
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
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UploadOutlined,
  HomeOutlined,
  LinkOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Pages() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [form] = Form.useForm();
  const router = useRouter();

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

  // Add / Edit Page
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Prepare data for API
      const pageData = {
        title: values.title,
        subcategory: values.subcategory,
        subcatpagedescr: values.subcatpagedescr || "",
        topSection: {
          backgroundImage: values.topSection?.backgroundImage || "",
          heading: values.topSection?.heading || "",
          description: values.topSection?.description || "",
        },
        middleSection: {
          description1: values.middleSection?.description1 || "",
          image1: values.middleSection?.image1 || "",
          image2: values.middleSection?.image2 || "",
          description2: values.middleSection?.description2 || "",
        },
        cta1: {
          heading: values.cta1?.heading || "",
          description: values.cta1?.description || "",
        },
        cta2: {
          heading: values.cta2?.heading || "",
          description: values.cta2?.description || "",
        },
      };

      let url = "/api/page";
      let method = "POST";

      if (editingPage) {
        // For editing, use PUT with _id
        url = "/api/page";
        method = "PUT";
        pageData._id = editingPage._id;
      }

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
        setEditingPage(null);
        setIsModalOpen(false);
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
    form.setFieldsValue({
      title: record.title,
      subcategory: record.subcategory?._id || record.subcategory,
      subcatpagedescr: record.subcatpagedescr || "",
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

  // Table Columns
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
        </div>
      ),
    },
    {
      title: "SubCategory",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (subcat) => {
        // Find subcategory name from subCategories list
        const subcatObj = subCategories.find(s => s._id === subcat || s._id === subcat?._id);
        return (
          <Tag color="blue">
            {subcatObj?.name || "Unknown"}
          </Tag>
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
              onClick={() => {
                form.resetFields();
                setEditingPage(null);
                setIsModalOpen(true);
              }}
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
                  <Col span={8}>
                    <Text strong>Page Description:</Text>
                    <p style={{ marginTop: 8 }}>
                      {record.subcatpagedescr || "No description"}
                    </p>
                  </Col>
                  <Col span={8}>
                    <Text strong>Top Section:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Heading:</strong> {record.topSection?.heading || "No heading"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Background:</strong> {record.topSection?.backgroundImage ? "✓ Uploaded" : "No image"}
                    </p>
                  </Col>
                  <Col span={8}>
                    <Text strong>Middle Section:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Image 1:</strong> {record.middleSection?.image1 ? "✓ Uploaded" : "No image"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Image 2:</strong> {record.middleSection?.image2 ? "✓ Uploaded" : "No image"}
                    </p>
                  </Col>
                </Row>
              </div>
            ),
          }}
        />

        {/* Page Modal */}
        <Modal
          title={editingPage ? "✏️ Edit Page" : "➕ Add New Page"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
            setEditingPage(null);
          }}
          onOk={handleOk}
          okText={editingPage ? "Update" : "Create"}
          cancelText="Cancel"
          width={800}
          okButtonProps={{
            style: {
              background: "linear-gradient(90deg, #1890ff 0%, #36cfc9 100%)",
              border: "none",
            }
          }}
        >
          <Form layout="vertical" form={form}>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  label="Page Title"
                  name="title"
                  rules={[{ required: true, message: "Please enter page title" }]}
                >
                  <Input placeholder="Enter page title" size="large" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="SubCategory"
                  name="subcategory"
                  rules={[{ required: true, message: "Please select a subcategory" }]}
                >
                  <Select 
                    placeholder="Select subcategory" 
                    size="large"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {subCategories.map((subcat) => (
                      <Option key={subcat._id} value={subcat._id}>
                        {subcat.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Page Description"
              name="subcatpagedescr"
            >
              <Input.TextArea 
                placeholder="Enter page description" 
                rows={4}
                style={{ borderRadius: 8 }}
              />
            </Form.Item>

            <div style={{ 
              padding: 16, 
              background: '#f0f9ff', 
              borderRadius: 8,
              marginBottom: 16 
            }}>
              <Text strong style={{ color: '#1890ff', fontSize: 16 }}>
                Top Section
              </Text>
            </div>
            
            <UploadField 
              name={["topSection", "backgroundImage"]} 
              label="Background Image" 
              required={false}
            />
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Heading" name={["topSection", "heading"]}>
                  <Input placeholder="Enter top section heading" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Description" name={["topSection", "description"]}>
                  <Input.TextArea
                    placeholder="Enter top section description"
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ 
              padding: 16, 
              background: '#f6ffed', 
              borderRadius: 8,
              marginBottom: 16,
              marginTop: 24
            }}>
              <Text strong style={{ color: '#52c41a', fontSize: 16 }}>
                Middle Section
              </Text>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Description 1"
                  name={["middleSection", "description1"]}
                >
                  <Input.TextArea placeholder="Enter first description" rows={3} />
                </Form.Item>
                <UploadField 
                  name={["middleSection", "image1"]} 
                  label="Image 1" 
                  required={false}
                />
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Description 2"
                  name={["middleSection", "description2"]}
                >
                  <Input.TextArea placeholder="Enter second description" rows={3} />
                </Form.Item>
                <UploadField 
                  name={["middleSection", "image2"]} 
                  label="Image 2" 
                  required={false}
                />
              </Col>
            </Row>

            <div style={{ 
              padding: 16, 
              background: '#fff7e6', 
              borderRadius: 8,
              marginBottom: 16,
              marginTop: 24
            }}>
              <Text strong style={{ color: '#fa8c16', fontSize: 16 }}>
                Call to Actions
              </Text>
            </div>
            
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
                  <Form.Item label="Description" name={["cta1", "description"]}>
                    <Input.TextArea placeholder="Enter CTA 1 description" rows={2} />
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
                  <Form.Item label="Description" name={["cta2", "description"]}>
                    <Input.TextArea placeholder="Enter CTA 2 description" rows={2} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
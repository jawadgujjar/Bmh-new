// app/admin/ctas/page.js
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
  Row,
  Col,
  Switch,
  Tabs,
  Tooltip,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

export default function CTAManagement() {
  const [loading, setLoading] = useState(false);
  const [ctas, setCtas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCTA, setEditingCTA] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filterActive, setFilterActive] = useState(null);

  // Fetch CTAs
  const fetchCTAs = async () => {
    try {
      setLoading(true);
      let url = "/api/ctas";
      const params = new URLSearchParams();
      
      if (filterActive !== null) {
        params.append("isActive", filterActive);
      }
      
      if (searchText) {
        params.append("search", searchText);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setCtas(data.data);
      } else {
        message.error("Failed to load CTAs");
      }
    } catch (error) {
      console.error("Error fetching CTAs:", error);
      message.error("Error fetching CTAs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCTAs();
  }, [filterActive, searchText]);

  // Create/Update CTA
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        ...values,
        isActive: values.isActive !== undefined ? values.isActive : true,
      };

      let url = "/api/ctas";
      let method = "POST";

      if (editingCTA) {
        payload._id = editingCTA._id;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        message.success(
          editingCTA ? "CTA updated successfully!" : "CTA created successfully!"
        );
        form.resetFields();
        setEditingCTA(null);
        setIsModalOpen(false);
        fetchCTAs();
      } else {
        message.error(data.error || "Operation failed");
      }
    } catch (err) {
      console.error("Error saving CTA:", err);
      message.error("Error saving CTA");
    }
  };

  // Delete CTA
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/ctas?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (data.success) {
        message.success("CTA deleted successfully");
        fetchCTAs();
      } else {
        message.error("Failed to delete CTA");
      }
    } catch (err) {
      console.error("Error deleting CTA:", err);
      message.error("Error deleting CTA");
    }
  };

  // Toggle active status
  const toggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/ctas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        message.success(`CTA ${!currentStatus ? 'activated' : 'deactivated'}`);
        fetchCTAs();
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      message.error("Error updating status");
    }
  };

  // Duplicate CTA
  const handleDuplicate = (record) => {
    const duplicateData = {
      ...record,
      name: `${record.name} (Copy)`,
      title: `${record.title} (Copy)`,
    };
    delete duplicateData._id;
    delete duplicateData.createdAt;
    delete duplicateData.updatedAt;
    
    setEditingCTA(null);
    form.setFieldsValue(duplicateData);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (record) => {
    setEditingCTA(record);
    form.setFieldsValue({
      name: record.name,
      title: record.title,
      description: record.description,
      buttonText: record.buttonText,
      buttonLink: record.buttonLink,
      buttonVariant: record.buttonVariant,
      isActive: record.isActive,
      style: record.style || {},
    });
    setIsModalOpen(true);
  };

  // Reset modal
  const resetModal = () => {
    setIsModalOpen(false);
    setEditingCTA(null);
    form.resetFields();
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => message.success("Copied to clipboard!"))
      .catch(() => message.error("Failed to copy"));
  };

  // Table Columns
  const columns = [
    {
      title: "Status",
      key: "status",
      width: 80,
      render: (_, record) => (
        <Switch
          size="small"
          checked={record.isActive}
          onChange={() => toggleActive(record._id, record.isActive)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <div>
            <Tag color="blue">{record.buttonVariant}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Button",
      key: "button",
      render: (_, record) => (
        <Tooltip title={record.buttonLink}>
          <Tag color="green">{record.buttonText}</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <Text type="secondary" style={{ maxWidth: 200 }} ellipsis>
          {text || "No description"}
        </Text>
      ),
    },
    {
      title: "Usage",
      key: "usage",
      render: () => (
        <Tag color="purple">0</Tag>
      ),
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
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
            title="Edit"
          />
          <Button 
            icon={<CopyOutlined />} 
            onClick={() => handleDuplicate(record)}
            size="small"
            title="Duplicate"
          />
          <Button 
            icon={<CopyOutlined />} 
            onClick={() => copyToClipboard(record._id)}
            size="small"
            title="Copy ID"
          />
          <Popconfirm
            title="Delete this CTA?"
            description="Are you sure you want to delete this CTA?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
              🎯 Call to Actions Management
            </Title>
            <Text type="secondary">Create and manage reusable CTAs for your pages</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setEditingCTA(null);
                setIsModalOpen(true);
              }}
              size="large"
            >
              Add New CTA
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Input
              placeholder="Search by name, title or button text"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Filter by status"
              style={{ width: "100%" }}
              value={filterActive}
              onChange={setFilterActive}
              allowClear
            >
              <Option value={true}>Active Only</Option>
              <Option value={false}>Inactive Only</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => {
                setSearchText("");
                setFilterActive(null);
                fetchCTAs();
              }}
            >
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Stats */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Card size="small">
              <Text type="secondary">Total CTAs</Text>
              <Title level={4}>{ctas.length}</Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Text type="secondary">Active</Text>
              <Title level={4} style={{ color: "#52c41a" }}>
                {ctas.filter(c => c.isActive).length}
              </Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Text type="secondary">Inactive</Text>
              <Title level={4} style={{ color: "#ff4d4f" }}>
                {ctas.filter(c => !c.isActive).length}
              </Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <Text type="secondary">Variants</Text>
              <Title level={4}>
                {new Set(ctas.map(c => c.buttonVariant)).size}
              </Title>
            </Card>
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={ctas}
          rowKey="_id"
          loading={loading}
          bordered
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} CTAs`
          }}
        />

        {/* CTA Modal */}
        <Modal
          title={editingCTA ? "✏️ Edit CTA" : "➕ Add New CTA"}
          open={isModalOpen}
          onCancel={resetModal}
          onOk={handleOk}
          okText={editingCTA ? "Update" : "Create"}
          cancelText="Cancel"
          width={800}
        >
          <Form layout="vertical" form={form}>
            <Tabs defaultActiveKey="basic">
              {/* Basic Info Tab */}
              <TabPane tab="Basic Info" key="basic">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Internal Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter internal name" },
                        { pattern: /^[a-z0-9-]+$/, message: "Only lowercase letters, numbers, and hyphens allowed" }
                      ]}
                      extra="Used for identification (e.g., free-consultation)"
                    >
                      <Input placeholder="free-consultation" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Display Title"
                      name="title"
                      rules={[{ required: true, message: "Please enter display title" }]}
                      extra="Shown to users (e.g., Get Free Consultation)"
                    >
                      <Input placeholder="Get Free Consultation" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Description"
                  name="description"
                  extra="Optional description for the CTA"
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Enter description..."
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Button Text"
                      name="buttonText"
                      rules={[{ required: true, message: "Please enter button text" }]}
                    >
                      <Input placeholder="Book Now" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Button Link"
                      name="buttonLink"
                      rules={[{ required: true, message: "Please enter button link" }]}
                      extra="/contact or https://example.com"
                    >
                      <Input placeholder="/contact" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Button Variant"
                      name="buttonVariant"
                      initialValue="primary"
                    >
                      <Select>
                        <Option value="primary">Primary (Blue)</Option>
                        <Option value="secondary">Secondary (Grey)</Option>
                        <Option value="outline">Outline</Option>
                        <Option value="ghost">Ghost</Option>
                        <Option value="danger">Danger (Red)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Status"
                      name="isActive"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch 
                        checkedChildren="Active" 
                        unCheckedChildren="Inactive"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>

              {/* Styling Tab */}
              <TabPane tab="Styling (Optional)" key="styling">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Background Color"
                      name={["style", "backgroundColor"]}
                    >
                      <Input placeholder="#1890ff" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Text Color"
                      name={["style", "textColor"]}
                    >
                      <Input placeholder="#ffffff" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Border Radius"
                      name={["style", "borderRadius"]}
                    >
                      <Input placeholder="4px" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Padding"
                      name={["style", "padding"]}
                    >
                      <Input placeholder="8px 16px" />
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>

              {/* Preview Tab */}
              <TabPane tab="Preview" key="preview">
                <Card style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: 200,
                  background: '#f5f5f5'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4}>
                      {form.getFieldValue('title') || 'CTA Title'}
                    </Title>
                    <Text type="secondary">
                      {form.getFieldValue('description') || 'CTA description will appear here'}
                    </Text>
                    <div style={{ marginTop: 16 }}>
                      <Button 
                        type={form.getFieldValue('buttonVariant') || 'primary'}
                        size="large"
                      >
                        {form.getFieldValue('buttonText') || 'Button Text'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabPane>
            </Tabs>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
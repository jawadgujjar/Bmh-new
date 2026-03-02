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

  // Re-render preview on form change
  const [previewValues, setPreviewValues] = useState({});

  const fetchCTAs = async () => {
    try {
      setLoading(true);
      let url = "/api/ctas";
      const params = new URLSearchParams();
      if (filterActive !== null) params.append("isActive", filterActive);
      if (searchText) params.append("search", searchText);
      if (params.toString()) url += `?${params.toString()}`;

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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        isActive: values.isActive !== undefined ? values.isActive : true,
      };

      // FIXED: URL logic for Edit vs Create
      const url = editingCTA ? `/api/ctas/${editingCTA._id}` : "/api/ctas";
      const method = editingCTA ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        message.success(editingCTA ? "CTA updated!" : "CTA created!");
        resetModal();
        fetchCTAs();
      } else {
        message.error(data.error || "Operation failed");
      }
    } catch (err) {
      message.error("Validation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/ctas/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        message.success("CTA deleted successfully");
        fetchCTAs();
      } else {
        message.error("Failed to delete");
      }
    } catch (err) {
      message.error("Error deleting CTA");
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      // FIXED: Using PUT on [id] endpoint instead of PATCH
      const res = await fetch(`/api/ctas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        message.success(`CTA ${!currentStatus ? "activated" : "deactivated"}`);
        fetchCTAs();
      }
    } catch (error) {
      message.error("Error updating status");
    }
  };

  const handleEdit = (record) => {
    setEditingCTA(record);
    form.setFieldsValue(record);
    setPreviewValues(record); // Set initial preview
    setIsModalOpen(true);
  };

  const handleDuplicate = (record) => {
    const { _id, createdAt, updatedAt, ...duplicateData } = record;
    duplicateData.name = `${record.name}-copy`;
    duplicateData.title = `${record.title} (Copy)`;
    setEditingCTA(null);
    form.setFieldsValue(duplicateData);
    setPreviewValues(duplicateData);
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingCTA(null);
    setPreviewValues({});
    form.resetFields();
  };

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
      title: "Name/Variant",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Tag color="blue" style={{ fontSize: "10px" }}>
            {record.buttonVariant}
          </Tag>
        </Space>
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
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
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            icon={<CopyOutlined />}
            onClick={() => handleDuplicate(record)}
            size="small"
          />
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        bordered={false}
        style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              🎯 CTA Management
            </Title>
            <Text type="secondary">Manage all Call to Action components</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setIsModalOpen(true);
              }}
              size="large"
            >
              Add New CTA
            </Button>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Input
              placeholder="Search CTAs..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Filter Status"
              style={{ width: "100%" }}
              value={filterActive}
              onChange={setFilterActive}
              allowClear
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Col>
          <Col>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setSearchText("");
                setFilterActive(null);
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={ctas}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 8 }}
        />

        <Modal
          title={editingCTA ? "Edit CTA" : "Create New CTA"}
          open={isModalOpen}
          onCancel={resetModal}
          onOk={handleOk}
          width={700}
          destroyOnClose
        >
          <Form
            layout="vertical"
            form={form}
            onValuesChange={(_, all) => setPreviewValues(all)}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Content" key="1">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Slug Name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="e.g. hero-cta" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Grab the offer!" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="description" label="Description">
                  <TextArea rows={2} />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="buttonText"
                      label="Button Text"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="buttonLink"
                      label="Button Link"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="/contact" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="buttonVariant"
                      label="Variant"
                      initialValue="primary"
                    >
                      <Select>
                        <Option value="primary">Primary</Option>
                        <Option value="secondary">Secondary</Option>
                        <Option value="danger">Danger</Option>
                        <Option value="outline">Outline</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="isActive"
                      label="Status"
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

              <TabPane tab="Style" key="2">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={["style", "backgroundColor"]}
                      label="Background Color"
                    >
                      <Input placeholder="#ffffff" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={["style", "textColor"]} label="Text Color">
                      <Input placeholder="#000000" />
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Preview" key="3">
                <div
                  style={{
                    padding: "40px",
                    background:
                      previewValues.style?.backgroundColor || "#f0f2f5",
                    color: previewValues.style?.textColor || "inherit",
                    textAlign: "center",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  <Title level={3} style={{ color: "inherit" }}>
                    {previewValues.title || "Title Preview"}
                  </Title>
                  <p>
                    {previewValues.description ||
                      "Description will appear here..."}
                  </p>
                  <Button
                    type={
                      previewValues.buttonVariant === "outline"
                        ? "default"
                        : previewValues.buttonVariant || "primary"
                    }
                    danger={previewValues.buttonVariant === "danger"}
                    size="large"
                  >
                    {previewValues.buttonText || "Button"}
                  </Button>
                </div>
              </TabPane>
            </Tabs>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

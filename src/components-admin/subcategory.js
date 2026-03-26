"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  Switch,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("./TipTapEditor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          padding: "20px",
          background: "#fafafa",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
        }}
      >
        Loading editor...
      </div>
    ),
  },
);

const { Title } = Typography;
const { Option } = Select;

// --- Image Upload Component ---
const ImageUploadField = ({ value, onChange, label, required = false }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value) {
      setFileList([
        { uid: "-1", name: "image.png", status: "done", url: value },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        message.success("Uploaded!");
      }
    } catch (error) {
      message.error("Upload failed");
    }
  };

  return (
    <Form.Item label={label} required={required}>
      <Upload
        listType="picture"
        fileList={fileList}
        beforeUpload={async (file) => {
          await handleUpload(file);
          return Upload.LIST_IGNORE;
        }}
        onRemove={() => {
          onChange("");
          setFileList([]);
        }}
      >
        <Button icon={<UploadOutlined />}>
          {value ? "Replace" : "Upload"}
        </Button>
      </Upload>
    </Form.Item>
  );
};

// --- Sub-component for CTA Fields ---
const CTAFields = ({ namePath, label, ctas }) => (
  <Card
    size="small"
    title={`${label} CTA`}
    style={{ marginBottom: 16, background: "#f9f9f9" }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Select CTA" name={[...namePath, "ctaId"]}>
          <Select placeholder="Link to CTA" allowClear>
            {ctas?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Style"
          name={[...namePath, "buttonVariant"]}
          initialValue="primary"
        >
          <Select>
            <Option value="primary">Primary</Option>
            <Option value="secondary">Secondary</Option>
            <Option value="outline">Outline</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

// --- Section Item Component ---
const SectionItem = ({ field, index, remove, move, form, ctas }) => {
  const layout = Form.useWatch(["sections", field.name, "layoutType"], form);
  const currentImageUrl = Form.useWatch(
    ["sections", field.name, "image"],
    form,
  );

  return (
    <Card
      size="small"
      style={{ marginBottom: 20, borderLeft: "4px solid #1890ff" }}
      title={`Section #${index + 1}`}
      extra={
        <Space>
          <Button
            size="small"
            icon={<ArrowUpOutlined />}
            onClick={() => move(index, index - 1)}
            disabled={index === 0}
          />
          <Button
            size="small"
            icon={<ArrowDownOutlined />}
            onClick={() => move(index, index + 1)}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => remove(index)}
          />
        </Space>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            {...field}
            label="Layout"
            name={[field.name, "layoutType"]}
            initialValue="description-only"
          >
            <Select>
              <Option value="image-left">Image Left</Option>
              <Option value="image-right">Image Right</Option>
              <Option value="description-only">Description Only</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...field}
            label="Order"
            name={[field.name, "order"]}
            initialValue={index}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        {...field}
        label="Heading"
        name={[field.name, "heading"]}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        {...field}
        label="Description"
        name={[field.name, "description"]}
      >
        <TiptapEditor
          content={
            form.getFieldValue(["sections", field.name, "description"]) || ""
          }
          onChange={(val) =>
            form.setFieldValue(["sections", field.name, "description"], val)
          }
        />
      </Form.Item>
      {(layout === "image-left" || layout === "image-right") && (
        <ImageUploadField
          label="Image"
          value={currentImageUrl}
          onChange={(url) =>
            form.setFieldValue(["sections", field.name, "image"], url)
          }
          required
        />
      )}
      <CTAFields namePath={[field.name, "cta"]} label="Section" ctas={ctas} />
    </Card>
  );
};

// --- FAQ Item Component ---
const FAQItem = ({ field, index, remove, move }) => (
  <Card
    size="small"
    style={{ marginBottom: 20, borderLeft: "4px solid #52c41a" }}
    title={`FAQ #${index + 1}`}
    extra={
      <Space>
        <Button
          size="small"
          icon={<ArrowUpOutlined />}
          onClick={() => move(index, index - 1)}
          disabled={index === 0}
        />
        <Button
          size="small"
          icon={<ArrowDownOutlined />}
          onClick={() => move(index, index + 1)}
        />
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => remove(index)}
        />
      </Space>
    }
  >
    <Row gutter={16}>
      <Col span={16}>
        <Form.Item
          {...field}
          label="Question"
          name={[field.name, "question"]}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          {...field}
          label="Order"
          name={[field.name, "order"]}
          initialValue={index}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item
      {...field}
      label="Answer"
      name={[field.name, "answer"]}
      rules={[{ required: true }]}
    >
      <Input.TextArea rows={2} />
    </Form.Item>
    <Form.Item
      {...field}
      name={[field.name, "isActive"]}
      valuePropName="checked"
      initialValue={true}
    >
      <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
    </Form.Item>
  </Card>
);

// --- Main Component ---
export default function SubCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCat, setEditingSubCat] = useState(null);
  const [ctas, setCtas] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, ctaRes] = await Promise.all([
        fetch("/api/subcategories"),
        fetch("/api/ctas"),
      ]);
      const subData = await subRes.json();
      const ctaData = await ctaRes.json();
      setSubCategories(Array.isArray(subData) ? subData : subData.data || []);
      if (ctaData.success) setCtas(ctaData.data);
    } catch (e) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (record) => {
    setEditingSubCat(record);
    const formattedValues = {
      ...record,
      topSection: {
        ...record.topSection,
        cta: record.topSection?.cta?.ctaId
          ? {
              ctaId:
                record.topSection.cta.ctaId._id || record.topSection.cta.ctaId,
              buttonVariant: record.topSection.cta.buttonVariant,
            }
          : undefined,
      },
      sections: (record.sections || []).map((s) => ({
        ...s,
        cta: s.cta?.ctaId
          ? {
              ctaId: s.cta.ctaId._id || s.cta.ctaId,
              buttonVariant: s.cta.buttonVariant,
            }
          : undefined,
      })),
      faqs: (record.faqs || []).map((f) => ({ ...f })),
      seo: {
        ...record.seo,
        metaKeywords: Array.isArray(record.seo?.metaKeywords)
          ? record.seo.metaKeywords.join(", ")
          : record.seo?.metaKeywords,
      },
    };
    form.setFieldsValue(formattedValues);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      // Validate all fields including hidden tabs
      await form.validateFields();

      // Use true to ensure we get values from all tabs (even if they weren't visited)
      const values = form.getFieldsValue(true);

      const payload = {
        ...values,
        slug: values.slug || values.name?.toLowerCase().replace(/\s+/g, "-"),
        sections:
          values.sections?.map((s, i) => ({ ...s, order: s.order ?? i })) || [],
        faqs: values.faqs?.map((f, i) => ({ ...f, order: f.order ?? i })) || [],
        seo: {
          ...values.seo,
          metaKeywords:
            typeof values.seo?.metaKeywords === "string"
              ? values.seo.metaKeywords.split(",").map((k) => k.trim())
              : [],
        },
      };

      const url = editingSubCat
        ? `/api/subcategories/${editingSubCat._id}`
        : "/api/subcategories";

      setLoading(true);
      const res = await fetch(url, {
        method: editingSubCat ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        message.success("Saved successfully");
        setIsModalOpen(false);
        form.resetFields();
        fetchData();
      } else {
        message.error("Failed to save to database");
      }
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Validation failed. Please check all tabs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={<Title level={3}>📂 SubCategory Management</Title>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingSubCat(null);
              form.resetFields();
              setActiveTab("1");
              setIsModalOpen(true);
            }}
          >
            Add SubCategory
          </Button>
        }
      >
        <Table
          loading={loading}
          dataSource={subCategories}
          rowKey="_id"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              render: (t) => <b>{t}</b>,
            },
            {
              title: "Category",
              dataIndex: "category",
              key: "category",
              render: (c) => <Tag color="blue">{c}</Tag>,
            },
            {
              title: "Sections",
              render: (_, r) => (
                <Tag color="purple">{r.sections?.length || 0}</Tag>
              ),
            },
            {
              title: "FAQs",
              render: (_, r) => <Tag color="green">{r.faqs?.length || 0}</Tag>,
            },
            {
              title: "Actions",
              render: (_, r) => (
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(r)}
                  />
                  <Popconfirm
                    title="Delete?"
                    onConfirm={() =>
                      fetch(`/api/subcategories/${r._id}`, {
                        method: "DELETE",
                      }).then(fetchData)
                    }
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title={editingSubCat ? "Edit SubCategory" : "Create SubCategory"}
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => setIsModalOpen(false)}
        width={1200}
        okText="Save Everything"
        forceRender
      >
        <Form form={form} layout="vertical">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            destroyInactiveTabPane={false} // CRITICAL: Fixes FAQ data loss
            items={[
              {
                key: "1",
                label: "General",
                children: (
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) =>
                            !editingSubCat &&
                            form.setFieldValue(
                              "slug",
                              e.target.value.toLowerCase().replace(/\s+/g, "-"),
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="slug" label="Slug">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="category"
                        label="Parent"
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Option value="digital-marketing">
                            Digital Marketing
                          </Option>
                          <Option value="web-development">
                            Web Development
                          </Option>
                          <Option value="app-development">
                            App Development
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="icon" label="Icon">
                        <ImageUploadField
                          value={form.getFieldValue("icon")}
                          onChange={(url) => form.setFieldValue("icon", url)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ),
              },
              {
                key: "2",
                label: "Hero Section",
                children: (
                  <>
                    <Form.Item
                      name={["topSection", "backgroundImage"]}
                      label="Hero BG"
                    >
                      <ImageUploadField
                        value={form.getFieldValue([
                          "topSection",
                          "backgroundImage",
                        ])}
                        onChange={(url) =>
                          form.setFieldValue(
                            ["topSection", "backgroundImage"],
                            url,
                          )
                        }
                      />
                    </Form.Item>
                    <Form.Item name={["topSection", "heading"]} label="Heading">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["topSection", "description"]}
                      label="Desc"
                    >
                      <TiptapEditor
                        content={form.getFieldValue([
                          "topSection",
                          "description",
                        ])}
                        onChange={(v) =>
                          form.setFieldValue(["topSection", "description"], v)
                        }
                      />
                    </Form.Item>
                    <CTAFields
                      namePath={["topSection", "cta"]}
                      label="Hero"
                      ctas={ctas}
                    />
                  </>
                ),
              },
              {
                key: "3",
                label: "Sections",
                children: (
                  <Form.List name="sections">
                    {(fields, { add, remove, move }) => (
                      <>
                        {fields.map((f, i) => (
                          <SectionItem
                            key={f.key}
                            field={f}
                            index={i}
                            remove={remove}
                            move={move}
                            form={form}
                            ctas={ctas}
                          />
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() =>
                            add({ layoutType: "description-only" })
                          }
                        >
                          Add Section
                        </Button>
                      </>
                    )}
                  </Form.List>
                ),
              },
              {
                key: "4",
                label: "FAQs",
                children: (
                  <Form.List name="faqs">
                    {(fields, { add, remove, move }) => (
                      <>
                        {fields.map((f, i) => (
                          <FAQItem
                            key={f.key}
                            field={f}
                            index={i}
                            remove={remove}
                            move={move}
                            form={form}
                          />
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() => add({ isActive: true })}
                        >
                          Add FAQ
                        </Button>
                      </>
                    )}
                  </Form.List>
                ),
              },
              {
                key: "5",
                label: "SEO",
                children: (
                  <Card size="small" style={{ background: "#f0f2f5" }}>
                    <Form.Item name={["seo", "metaTitle"]} label="Meta Title">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["seo", "metaDescription"]}
                      label="Meta Description"
                    >
                      <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                      name={["seo", "metaKeywords"]}
                      label="Keywords (comma separated)"
                    >
                      <Input />
                    </Form.Item>
                  </Card>
                ),
              },
            ]}
          />
        </Form>
      </Modal>
    </div>
  );
}

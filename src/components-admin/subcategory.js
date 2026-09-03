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

// --- Multi Image Upload Component (for Image Gallery layout) ---
// Reuses the proven single ImageUploadField for each slot.
const MultiImageUploadField = ({ value = [], onChange, label }) => {
  const list = Array.isArray(value) ? value.filter(Boolean) : [];
  const [slotCount, setSlotCount] = useState(Math.max(list.length, 1));

  useEffect(() => {
    if (list.length > slotCount) setSlotCount(list.length);
  }, [list.length, slotCount]);

  const setAt = (i, url) => {
    const next = [...list];
    while (next.length <= i) next.push("");
    next[i] = url;
    onChange(next.filter(Boolean));
  };

  const removeAt = (i) => {
    onChange(list.filter((_, idx) => idx !== i));
    setSlotCount((c) => Math.max(c - 1, 1));
  };

  return (
    <Form.Item label={label}>
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        Add 4 or 6 images (shown in 2 rows on the site).
      </Typography.Text>
      <Row gutter={12} style={{ marginTop: 8 }}>
        {Array.from({ length: slotCount }).map((_, i) => (
          <Col span={8} key={i}>
            <ImageUploadField
              label={`Image ${i + 1}`}
              value={list[i] || ""}
              onChange={(url) => setAt(i, url)}
            />
            {slotCount > 1 && (
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeAt(i)}
              >
                Remove
              </Button>
            )}
          </Col>
        ))}
      </Row>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => setSlotCount((c) => c + 1)}
        style={{ marginTop: 8 }}
      >
        Add Image Slot
      </Button>
    </Form.Item>
  );
};

const CTAFields = ({ namePath, label, ctas }) => (
  <Card
    size="small"
    title={`${label} CTA (Global)`}
    style={{ marginBottom: 16, background: "#f9f9f9" }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Select CTA" name={[...namePath, "ctaId"]}>
          <Select placeholder="Link to Global CTA" allowClear>
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

const SectionItem = ({
  field,
  index,
  remove,
  move,
  form,
  ctas,
  subCategories = [],
  currentId = null,
}) => {
  const layout = Form.useWatch(["sections", field.name, "layoutType"], form);
  const currentImageUrl = Form.useWatch(
    ["sections", field.name, "image"],
    form,
  );
  const showInlineButton = Form.useWatch(
    ["sections", field.name, "showButton"],
    form,
  );
  const galleryImages = Form.useWatch(
    ["sections", field.name, "galleryImages"],
    form,
  );
  const selectedCategory = Form.useWatch(["category"], form);

  const isGallery = layout === "image-gallery";
  const isCounter = layout === "counter";
  const isServices = layout === "services";

  // Sibling subcategories of the same category, excluding the one being edited
  const serviceOptions = (subCategories || []).filter(
    (s) =>
      s.category === selectedCategory &&
      String(s._id) !== String(currentId),
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
              <Option value="image-gallery">Image Gallery (2 rows)</Option>
              <Option value="counter">Counter / Stats</Option>
              <Option value="services">Services (Sub-categories)</Option>
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

      {/* 🔥 New Inline Button Controls */}
      <Card
        size="small"
        title="Inline Button Settings"
        style={{ marginBottom: 16, background: "#f0f7ff" }}
      >
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Form.Item
              {...field}
              label="Enable Button"
              name={[field.name, "showButton"]}
              valuePropName="checked"
              initialValue={false}
            >
              <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Form.Item>
          </Col>
          {showInlineButton && (
            <>
              <Col span={9}>
                <Form.Item
                  {...field}
                  label="Button Text"
                  name={[field.name, "buttonText"]}
                  initialValue="Learn More"
                >
                  <Input placeholder="Button text" />
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item
                  {...field}
                  label="Button Link"
                  name={[field.name, "buttonLink"]}
                >
                  <Input placeholder="/services/seo" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...field}
                  label="Button Variant"
                  name={[field.name, "buttonVariant"]}
                  initialValue="primary"
                >
                  <Select>
                    <Option value="primary">Primary (Blue)</Option>
                    <Option value="secondary">Secondary (Dark)</Option>
                    <Option value="outline">Outline</Option>
                    <Option value="ghost">Ghost (Simple)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Card>

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

      {/* 🔥 Image Gallery layout controls */}
      {isGallery && (
        <Card
          size="small"
          title="Image Gallery Settings"
          style={{ marginBottom: 16, background: "#f6ffed" }}
        >
          <Form.Item
            {...field}
            label="Heading Alignment"
            name={[field.name, "headingAlign"]}
            initialValue="center"
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="left">Left</Option>
              <Option value="center">Center</Option>
              <Option value="right">Right</Option>
            </Select>
          </Form.Item>
          <MultiImageUploadField
            label="Gallery Images"
            value={galleryImages}
            onChange={(urls) =>
              form.setFieldValue(
                ["sections", field.name, "galleryImages"],
                urls,
              )
            }
          />
        </Card>
      )}

      {/* 🔥 Counter / Stats layout controls */}
      {isCounter && (
        <Card
          size="small"
          title="Counter / Stats Settings"
          style={{ marginBottom: 16, background: "#fff7e6" }}
        >
          <Form.Item
            {...field}
            label="Heading Alignment"
            name={[field.name, "headingAlign"]}
            initialValue="center"
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="left">Left</Option>
              <Option value="center">Center</Option>
              <Option value="right">Right</Option>
            </Select>
          </Form.Item>
          <Form.List name={[field.name, "counters"]}>
            {(cFields, { add, remove }) => (
              <>
                {cFields.map((cf, ci) => (
                  <Card
                    key={cf.key}
                    size="small"
                    style={{ marginBottom: 12, background: "#fff" }}
                    title={`Counter #${ci + 1}`}
                    extra={
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(cf.name)}
                      />
                    }
                  >
                    <Row gutter={12}>
                      <Col span={8}>
                        <Form.Item
                          {...cf}
                          label="Value"
                          name={[cf.name, "value"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="50+" />
                        </Form.Item>
                      </Col>
                      <Col span={16}>
                        <Form.Item
                          {...cf}
                          label="Label"
                          name={[cf.name, "label"]}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Delivered Results" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...cf}
                          label="Description"
                          name={[cf.name, "description"]}
                        >
                          <Input placeholder="Clients who trusted us to drive their digital growth" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  onClick={() => add({ value: "", label: "", description: "" })}
                >
                  Add Counter
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      )}

      {/* 🔥 Services layout controls */}
      {isServices && (
        <Card
          size="small"
          title="Services Settings"
          style={{ marginBottom: 16, background: "#e6f4ff" }}
        >
          <Form.Item
            {...field}
            label="Heading Alignment"
            name={[field.name, "headingAlign"]}
            initialValue="center"
          >
            <Select style={{ maxWidth: 220 }}>
              <Option value="left">Left</Option>
              <Option value="center">Center</Option>
              <Option value="right">Right</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...field}
            label="Select Services (Sub-categories)"
            name={[field.name, "services"]}
            rules={[{ required: true, message: "Select at least one service" }]}
          >
            <Select
              mode="multiple"
              placeholder={
                selectedCategory
                  ? "Choose sub-categories to show as services"
                  : "Select a Parent category first (General tab)"
              }
              optionFilterProp="label"
              options={serviceOptions.map((s) => ({
                label: s.name,
                value: s.slug,
              }))}
              notFoundContent="No other sub-categories in this category"
            />
          </Form.Item>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Only sub-categories of the same parent are listed. The current
            sub-category is hidden automatically.
          </Typography.Text>
        </Card>
      )}

      <CTAFields namePath={[field.name, "cta"]} label="Global" ctas={ctas} />
    </Card>
  );
};

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
          : record.seo?.metaKeywords || "",
      },
    };
    form.setFieldsValue(formattedValues);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);

      const payload = {
        ...values,
        keywordstitle: values.keywordstitle || values.name || "",
        slug: values.slug || values.name?.toLowerCase().replace(/\s+/g, "-"),
        sections:
          values.sections?.map((s, i) => ({
            ...s,
            order: s.order !== undefined ? Number(s.order) : i,
            showButton: s.showButton ?? false,
            buttonText: s.buttonText?.trim() || "Learn More",
            buttonLink: s.buttonLink?.trim() || "",
            buttonVariant: s.buttonVariant || "primary",
          })) || [],
        faqs:
          values.faqs?.map((f, i) => ({
            ...f,
            order: f.order !== undefined ? Number(f.order) : i,
          })) || [],
        seo: {
          ...values.seo,
          metaKeywords:
            typeof values.seo?.metaKeywords === "string"
              ? values.seo.metaKeywords
                  .split(",")
                  .map((k) => k.trim())
                  .filter((k) => k)
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
        const errorData = await res.json();
        message.error(errorData.error || "Failed to save");
      }
    } catch (error) {
      message.error("Please fix validation errors.");
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
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!editingSubCat) {
                              form.setFieldValue(
                                "slug",
                                val.toLowerCase().replace(/\s+/g, "-"),
                              );
                              form.setFieldValue("keywordstitle", val);
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="keywordstitle" label="Keyword Title">
                        <Input />
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
                      <ImageUploadField
                        label="Icon"
                        value={form.getFieldValue("icon")}
                        onChange={(url) => form.setFieldValue("icon", url)}
                      />
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
                    <Form.Item
                      name={["topSection", "heading"]}
                      label="Hero Heading"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["topSection", "description"]}
                      label="Hero Desc"
                    >
                      <TiptapEditor
                        content={
                          form.getFieldValue(["topSection", "description"]) ||
                          ""
                        }
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
                            subCategories={subCategories}
                            currentId={editingSubCat?._id}
                          />
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() =>
                            add({
                              layoutType: "description-only",
                              showButton: false,
                            })
                          }
                        >
                          Add Content Section
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
                          />
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() => add({ isActive: true })}
                        >
                          Add New FAQ
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
                    <Form.Item name={["seo", "metaKeywords"]} label="Keywords">
                      <Input placeholder="comma, separated" />
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

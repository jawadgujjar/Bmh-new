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

const { Title, Text } = Typography;
const { Option } = Select;

// --- Image Upload Component ---
const ImageUploadField = ({ value, onChange, label, required = false }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: value,
        },
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
        message.success("Image uploaded successfully");
      } else {
        message.error(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Error uploading image");
    }
  };

  return (
    <Form.Item
      label={label}
      required={required}
      rules={required ? [{ required: true, message: `Please upload ${label}` }] : []}
    >
      <Upload
        listType="picture"
        fileList={fileList}
        beforeUpload={async (file) => {
          await handleUpload(file);
          return Upload.LIST_IGNORE;
        }}
        onRemove={() => {
          onChange('');
          setFileList([]);
        }}
      >
        <Button icon={<UploadOutlined />}>
          {value ? 'Replace Image' : 'Upload Image'}
        </Button>
      </Upload>
    </Form.Item>
  );
};

// --- Sub-component for CTA Fields ---
const CTAFields = ({ namePath, label, ctas }) => (
  <Card
    size="small"
    title={`${label} CTA (Optional)`}
    style={{
      marginBottom: 16,
      background: "#f9f9f9",
      border: "1px dashed #d9d9d9",
    }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Select CTA" name={[...namePath, "ctaId"]}>
          <Select placeholder="Link to existing CTA" allowClear>
            {ctas.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Button Style"
          name={[...namePath, "buttonVariant"]}
          initialValue="primary"
        >
          <Select>
            <Option value="primary">Primary</Option>
            <Option value="secondary">Secondary</Option>
            <Option value="outline">Outline</Option>
            <Option value="ghost">Ghost</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

// --- Section Item Component (Rendered inside Form.List) ---
const SectionItem = ({
  field,
  index,
  remove,
  move,
  form,
  ctas,
}) => {
  // Fix for 'Instance not connected' error: pass 'form' instance to useWatch
  const layout = Form.useWatch(["sections", field.name, "layoutType"], form);
  const currentImageUrl = Form.useWatch(
    ["sections", field.name, "image"],
    form,
  );
  const isImageRequired = layout === "image-left" || layout === "image-right";

  return (
    <Card
      size="small"
      style={{ marginBottom: 20, borderLeft: "4px solid #1890ff" }}
      title={<Text strong>Section #{index + 1}</Text>}
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
            disabled={
              index === (form.getFieldValue("sections")?.length || 0) - 1
            }
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
            label="Layout Type"
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
            <Input type="number" min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        {...field}
        label="Heading"
        name={[field.name, "heading"]}
        rules={[{ required: true, message: "Heading is required" }]}
      >
        <Input placeholder="Section Title" />
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
          onChange={(html) =>
            form.setFieldValue(["sections", field.name, "description"], html)
          }
        />
      </Form.Item>

      {isImageRequired && (
        <Form.Item
          name={[field.name, "image"]}
          rules={[{ required: true, message: "Image is required" }]}
        >
          <ImageUploadField 
            label="Section Image" 
            required={true}
            value={currentImageUrl}
            onChange={(url) => form.setFieldValue(["sections", field.name, "image"], url)}
          />
        </Form.Item>
      )}

      <CTAFields namePath={[field.name, "cta"]} label="Section" ctas={ctas} />
    </Card>
  );
};

// --- Main Component ---
export default function SubCategory() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCat, setEditingSubCat] = useState(null);
  const [ctas, setCtas] = useState([]);

  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/subcategories");
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      message.error("Failed to fetch subcategories");
    } finally {
      setLoading(false);
    }
  };

  const fetchCTAs = async () => {
    try {
      const res = await fetch("/api/ctas");
      const data = await res.json();
      if (data.success) setCtas(data.data);
    } catch (error) {
      console.error("CTA fetch error:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchCTAs();
  }, []);

  const generateSlug = (text) =>
    text
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) return data.url;
      throw new Error("Upload failed");
    } catch (error) {
      message.error("Image upload failed");
      return null;
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Process sections to ensure images are strings
      const processedSections = values.sections?.map((s, idx) => ({
        layoutType: s.layoutType || "description-only",
        heading: s.heading || "",
        description: s.description || "",
        image: s.image || "",
        cta: s.cta?.ctaId ? {
          ctaId: s.cta.ctaId,
          buttonVariant: s.cta.buttonVariant || "primary",
        } : null,
        order: s.order ?? idx,
      })) || [];

      const payload = {
        name: values.name,
        slug: values.slug || generateSlug(values.name),
        category: values.category,
        icon: values.icon || "",
        isActive: values.isActive !== undefined ? values.isActive : true,
        
        topSection: {
          backgroundImage: values.topSection?.backgroundImage || "",
          heading: values.topSection?.heading || "",
          description: values.topSection?.description || "",
          cta: values.topSection?.cta?.ctaId ? {
            ctaId: values.topSection.cta.ctaId,
            buttonVariant: values.topSection.cta.buttonVariant || "primary",
          } : null,
        },

        sections: processedSections,

        seo: {
          metaTitle: values.seo?.metaTitle || values.name,
          metaDescription: values.seo?.metaDescription || "",
          metaKeywords: typeof values.seo?.metaKeywords === "string"
            ? values.seo.metaKeywords.split(",").map((k) => k.trim()).filter(k => k)
            : values.seo?.metaKeywords || [],
          schemaMarkup: values.seo?.schemaMarkup || null,
        },
      };

      const url = editingSubCat
        ? `/api/subcategories/${editingSubCat._id}`
        : "/api/subcategories";
      const method = editingSubCat ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok || result.success || result._id) {
        message.success(
          editingSubCat ? "Updated successfully" : "Created successfully",
        );
        setIsModalOpen(false);
        form.resetFields();
        fetchSubCategories();
      } else {
        message.error(result.error || "Save failed.");
      }
    } catch (error) {
      console.error("Validation error:", error);
      message.error("Validation failed – check required fields.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            📂 SubCategory Management
          </Title>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields();
              setEditingSubCat(null);
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
              title: "Icon",
              dataIndex: "icon",
              render: (icon) => (
                <img 
                  src={icon || "https://via.placeholder.com/30"} 
                  style={{ width: 30, height: 30, borderRadius: 4 }} 
                  alt="" 
                />
              ),
            },
            { title: "Name", dataIndex: "name", render: (t) => <b>{t}</b> },
            {
              title: "Category",
              dataIndex: "category",
              render: (c) => <Tag color="blue">{c}</Tag>,
            },
            {
              title: "Sections",
              render: (_, record) => (
                <Tag color="purple">{record.sections?.length || 0}</Tag>
              ),
            },
            {
              title: "Status",
              dataIndex: "isActive",
              render: (act) => (
                <Tag color={act ? "green" : "red"}>
                  {act ? "Active" : "Draft"}
                </Tag>
              ),
            },
            {
              title: "Actions",
              render: (_, record) => (
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditingSubCat(record);
                      form.setFieldsValue({
                        name: record.name,
                        slug: record.slug,
                        category: record.category,
                        icon: record.icon,
                        isActive: record.isActive,
                        topSection: {
                          backgroundImage: record.topSection?.backgroundImage,
                          heading: record.topSection?.heading,
                          description: record.topSection?.description,
                          cta: {
                            ctaId: record.topSection?.cta?.ctaId?._id || record.topSection?.cta?.ctaId,
                            buttonVariant: record.topSection?.cta?.buttonVariant,
                          },
                        },
                        sections: (record.sections || []).map((s) => ({
                          layoutType: s.layoutType,
                          heading: s.heading,
                          description: s.description,
                          image: s.image || "",
                          cta: {
                            ctaId: s.cta?.ctaId?._id || s.cta?.ctaId,
                            buttonVariant: s.cta?.buttonVariant,
                          },
                          order: s.order,
                        })),
                        seo: {
                          metaTitle: record.seo?.metaTitle,
                          metaDescription: record.seo?.metaDescription,
                          metaKeywords: record.seo?.metaKeywords?.join(", ") || "",
                          schemaMarkup: record.seo?.schemaMarkup,
                        },
                      });
                      setIsModalOpen(true);
                    }}
                  />
                  <Popconfirm
                    title="Delete this subcategory?"
                    onConfirm={async () => {
                      await fetch(`/api/subcategories/${record._id}`, {
                        method: "DELETE",
                      });
                      fetchSubCategories();
                    }}
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
        title={
          editingSubCat ? "✏️ Edit SubCategory" : "➕ Create New SubCategory"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={1100}
        okText="Save Everything"
        destroyOnClose={true} // Fixed: was destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "General Info",
                children: (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="SubCategory Name"
                        rules={[{ required: true, message: "Please enter name" }]}
                      >
                        <Input
                          onChange={(e) =>
                            !editingSubCat &&
                            form.setFieldValue(
                              "slug",
                              generateSlug(e.target.value),
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="slug"
                        label="URL Slug"
                        rules={[{ required: true, message: "Please enter slug" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="category"
                        label="Parent Category"
                        rules={[{ required: true, message: "Please select category" }]}
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
                    <Col span={24}>
                      <Form.Item name="icon" label="Icon">
                        <ImageUploadField 
                          value={form.getFieldValue('icon')}
                          onChange={(url) => form.setFieldValue('icon', url)}
                          label="Icon"
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
                      label="Hero Background Image"
                    >
                      <ImageUploadField 
                        value={form.getFieldValue(['topSection', 'backgroundImage'])}
                        onChange={(url) => form.setFieldValue(['topSection', 'backgroundImage'], url)}
                        label="Background Image"
                      />
                    </Form.Item>
                    <Form.Item
                      name={["topSection", "heading"]}
                      label="Hero Heading"
                      rules={[{ required: true, message: "Please enter hero heading" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["topSection", "description"]}
                      label="Hero Description"
                    >
                      <TiptapEditor
                        content={
                          form.getFieldValue(["topSection", "description"]) ||
                          ""
                        }
                        onChange={(html) =>
                          form.setFieldValue(
                            ["topSection", "description"],
                            html,
                          )
                        }
                      />
                    </Form.Item>
                    <CTAFields namePath={["topSection", "cta"]} label="Hero" ctas={ctas} />
                  </>
                ),
              },
              {
                key: "3",
                label: "Content Sections",
                children: (
                  <Form.List name="sections">
                    {(fields, { add, remove, move }) => (
                      <>
                        {fields.map((field, index) => (
                          <SectionItem
                            key={field.key}
                            field={field}
                            index={index}
                            remove={remove}
                            move={move}
                            form={form} // Crucial to pass form instance
                            ctas={ctas}
                          />
                        ))}
                        <Button
                          type="dashed"
                          block
                          icon={<PlusOutlined />}
                          onClick={() =>
                            add({ 
                              layoutType: "description-only", 
                              image: "",
                              order: fields.length 
                            })
                          }
                          style={{ height: 60, marginTop: 10 }}
                        >
                          Add New Content Section
                        </Button>
                      </>
                    )}
                  </Form.List>
                ),
              },
              {
                key: "4",
                label: "SEO Settings",
                children: (
                  <Card size="small" style={{ background: "#f0f2f5" }}>
                    <Form.Item 
                      name={["seo", "metaTitle"]} 
                      label="Meta Title"
                      extra="Title for search engines (50-60 chars)"
                    >
                      <Input maxLength={70} showCount />
                    </Form.Item>
                    <Form.Item
                      name={["seo", "metaDescription"]}
                      label="Meta Description"
                      extra="Description for search results (150-160 chars)"
                    >
                      <Input.TextArea rows={3} maxLength={160} showCount />
                    </Form.Item>
                    <Form.Item
                      name={["seo", "metaKeywords"]}
                      label="Keywords (comma separated)"
                      extra="e.g., keyword1, keyword2, keyword3"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={["seo", "schemaMarkup"]}
                      label="Schema Markup (JSON)"
                    >
                      <Input.TextArea rows={4} placeholder='{"@context": "https://schema.org"}' />
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
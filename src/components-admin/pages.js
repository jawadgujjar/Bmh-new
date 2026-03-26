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
  Switch,
  Tabs,
  Alert,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UploadOutlined,
  HomeOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  WarningOutlined,
} from "@ant-design/icons";

// Dynamically import TipTap to avoid SSR
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("@/components-admin/TipTapEditor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          minHeight: "150px",
          padding: "20px",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
    if (value && typeof value === "string" && value.trim() !== "") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
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
      rules={
        required ? [{ required: true, message: `Please upload ${label}` }] : []
      }
    >
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
          {value ? "Replace Image" : "Upload Image"}
        </Button>
      </Upload>
    </Form.Item>
  );
};

// --- CTA Reference Fields Component ---
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

// --- FAQ Item Component ---
const FAQItem = ({ field, index, remove, move }) => {
  return (
    <Card
      size="small"
      style={{
        marginBottom: 16,
        background: "#fafafa",
        borderLeft: "4px solid #52c41a",
      }}
      title={`FAQ #${index + 1}`}
      extra={
        <Space.Compact>
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
        </Space.Compact>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            {...field}
            name={[field.name, "question"]}
            label="Question"
            rules={[{ required: true, message: "Please enter FAQ question" }]}
          >
            <Input placeholder="Enter FAQ question" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...field}
            name={[field.name, "answer"]}
            label="Answer"
            rules={[{ required: true, message: "Please enter FAQ answer" }]}
          >
            <Input.TextArea rows={2} placeholder="Enter FAQ answer" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        {...field}
        name={[field.name, "order"]}
        label="Order"
        initialValue={index}
      >
        <Input type="number" min={0} />
      </Form.Item>
    </Card>
  );
};

// --- Description Item Component (with TipTap Editor) ---
const DescriptionItem = ({ field, index, remove, move, form }) => {
  // Get the current value
  const textValue = form.getFieldValue([field.name, "text"]);

  return (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        background: "#fffbe6",
        borderLeft: "4px solid #faad14",
        borderTop: "1px dashed #d9d9d9",
      }}
      title={`Description Point #${index + 1}`}
      extra={
        <Space.Compact>
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
        </Space.Compact>
      }
    >
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            {...field}
            name={[field.name, "text"]}
            label="Description Text"
            rules={[
              { required: true, message: "Please enter description text" },
            ]}
          >
            <TiptapEditor
              content={textValue}
              onChange={(html) => {
                form.setFieldValue([field.name, "text"], html);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item {...field} name={[field.name, "icon"]} label="Icon">
            <ImageUploadField
              label="Icon"
              required={false}
              value={form.getFieldValue([field.name, "icon"])}
              onChange={(url) => form.setFieldValue([field.name, "icon"], url)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        {...field}
        name={[field.name, "order"]}
        label="Order"
        initialValue={index}
        hidden
      >
        <Input type="number" />
      </Form.Item>
    </Card>
  );
};

// --- Section Item Component ---
const SectionItem = ({ field, index, remove, move, form, ctas }) => {
  const layout = Form.useWatch(["sections", field.name, "layoutType"], form);
  const currentImageUrl = Form.useWatch(["sections", field.name, "image"], form);
  const descriptionValue = form.getFieldValue(["sections", field.name, "description"]);

  return (
    <Card
      size="small"
      style={{ marginBottom: 20, borderLeft: "4px solid #1890ff" }}
      title={<Text strong>Section #{index + 1}</Text>}
      extra={
        <Space.Compact>
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
        </Space.Compact>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            {...field}
            name={[field.name, "layoutType"]}
            label="Layout Type"
            initialValue="description-only"
            rules={[{ required: true, message: "Please select layout type for section" }]}
          >
            <Select>
              <Option value="image-left">Image Left</Option>
              <Option value="image-right">Image Right</Option>
              <Option value="description-only">Description Only</Option>
              <Option value="description-and-form">Description & Form</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...field}
            name={[field.name, "order"]}
            label="Order"
            initialValue={index}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        {...field}
        name={[field.name, "heading"]}
        label="Section Heading"
        rules={[
          { required: true, message: "Heading is required" },
          { min: 3, message: "Heading must be at least 3 characters" }
        ]}
      >
        <Input placeholder="Section Title" />
      </Form.Item>

      {layout !== "description-and-form" && (
        <Form.Item
          {...field}
          name={[field.name, "description"]}
          label="Description"
          rules={[
            { required: true, message: "Description is required" },
            { min: 10, message: "Description must be at least 10 characters" }
          ]}
        >
          <TiptapEditor
            content={descriptionValue}
            onChange={(html) => {
              form.setFieldValue(["sections", field.name, "description"], html);
            }}
          />
        </Form.Item>
      )}

      {(layout === "image-left" || layout === "image-right") && (
        <Form.Item
          {...field}
          name={[field.name, "image"]}
          rules={[{ required: true, message: "Image is required for this layout" }]}
        >
          <ImageUploadField
            label="Section Image"
            required={true}
            value={currentImageUrl}
            onChange={(url) =>
              form.setFieldValue(["sections", field.name, "image"], url)
            }
          />
        </Form.Item>
      )}

      {layout === "description-and-form" && (
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Card
                size="small"
                title="Description Side (Admin Editable)"
                style={{ background: "#f0f5ff", borderColor: "#1890ff" }}
              >
                <Text strong style={{ display: "block", marginBottom: 16 }}>
                  Description Points with Icons (Rich Text Supported)
                </Text>

                <Form.List name={[field.name, "descriptions"]}>
                  {(
                    descFields,
                    { add: addDesc, remove: removeDesc, move: moveDesc },
                  ) => (
                    <>
                      {descFields.map((descField, descIndex) => (
                        <DescriptionItem
                          key={descField.key}
                          field={descField}
                          index={descIndex}
                          remove={removeDesc}
                          move={moveDesc}
                          form={form}
                        />
                      ))}
                      <Button
                        type="dashed"
                        block
                        icon={<PlusOutlined />}
                        onClick={() =>
                          addDesc({
                            text: "",
                            icon: "",
                            order: descFields.length,
                          })
                        }
                        style={{ marginTop: 8 }}
                      >
                        Add Description Point
                      </Button>
                    </>
                  )}
                </Form.List>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                size="small"
                title="Form Side (Hard Coded)"
                style={{ background: "#fff7e6", borderColor: "#fa8c16" }}
              >
                <Text
                  type="secondary"
                  style={{ display: "block", marginBottom: 16 }}
                >
                  This form will be displayed on the frontend
                </Text>

                <div
                  style={{
                    padding: 16,
                    background: "#ffffff",
                    borderRadius: 8,
                  }}
                >
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>Name</div>
                    <Input placeholder="Your name" disabled />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>Email</div>
                    <Input placeholder="Your email" disabled />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>Phone</div>
                    <Input placeholder="Your phone" disabled />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8 }}>Message</div>
                    <Input.TextArea
                      rows={3}
                      placeholder="Your message"
                      disabled
                    />
                  </div>
                  <Button type="primary" block disabled>
                    Submit
                  </Button>
                </div>

                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: 16, fontSize: 12 }}
                >
                  ⚡ Form fields are hard-coded and cannot be edited from admin
                  panel
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      <CTAFields namePath={[field.name, "cta"]} label="Section" ctas={ctas} />
    </Card>
  );
};

export default function Pages() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [ctas, setCtas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Fetch Pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/page");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setPages(data.data);
      } else if (Array.isArray(data)) {
        setPages(data);
      }
    } catch (error) {
      message.error("Error fetching pages");
    } finally {
      setLoading(false);
    }
  };

  // Fetch SubCategories
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

  // Fetch CTAs
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
    fetchPages();
    fetchSubCategories();
    fetchCTAs();
  }, []);

  // Slug generator
  const generateSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Validate all sections for required fields
  const validateSections = (sections) => {
    const errors = [];
    
    if (!sections || sections.length === 0) {
      errors.push("❌ At least one content section is required");
      return errors;
    }
    
    sections.forEach((section, idx) => {
      const sectionNum = idx + 1;
      
      if (!section.heading || section.heading.trim() === '') {
        errors.push(`❌ Section #${sectionNum}: Heading is required`);
      } else if (section.heading.trim().length < 3) {
        errors.push(`❌ Section #${sectionNum}: Heading must be at least 3 characters`);
      }
      
      if (section.layoutType === "description-and-form") {
        if (!section.descriptions || section.descriptions.length === 0) {
          errors.push(`❌ Section #${sectionNum}: At least one description point is required when using "Description & Form" layout`);
        } else {
          section.descriptions.forEach((desc, descIdx) => {
            if (!desc.text || desc.text.trim() === '') {
              errors.push(`❌ Section #${sectionNum}, Description Point #${descIdx + 1}: Description text is required`);
            }
          });
        }
      } else {
        if (!section.description || section.description.trim() === '') {
          errors.push(`❌ Section #${sectionNum}: Description is required`);
        } else if (section.description.trim().length < 10) {
          errors.push(`❌ Section #${sectionNum}: Description must be at least 10 characters`);
        }
      }
      
      if ((section.layoutType === "image-left" || section.layoutType === "image-right") && (!section.image || section.image.trim() === '')) {
        errors.push(`❌ Section #${sectionNum}: Image is required for "${section.layoutType}" layout`);
      }
    });
    
    return errors;
  };
  
  // Validate FAQs
  const validateFaqs = (faqs) => {
    const errors = [];
    
    if (faqs && faqs.length > 0) {
      faqs.forEach((faq, idx) => {
        if (!faq.question || faq.question.trim() === '') {
          errors.push(`❌ FAQ #${idx + 1}: Question is required`);
        }
        if (!faq.answer || faq.answer.trim() === '') {
          errors.push(`❌ FAQ #${idx + 1}: Answer is required`);
        }
      });
    }
    
    return errors;
  };
  
  // Validate all form fields
  const validateFormFields = (values) => {
    const errors = [];
    
    // Basic required fields
    if (!values.title || values.title.trim() === '') {
      errors.push("❌ Page Title is required");
    }
    
    if (!values.slug || values.slug.trim() === '') {
      errors.push("❌ URL Slug is required");
    }
    
    if (!values.category || values.category.trim() === '') {
      errors.push("❌ Category is required");
    }
    
    if (!values.subcategory || values.subcategory.trim() === '') {
      errors.push("❌ Subcategory is required");
    }
    
    // Hero section validation
    if (values.topSection) {
      if (values.topSection.heading && values.topSection.heading.trim() === '') {
        errors.push("⚠️ Hero Heading is empty (optional but recommended)");
      }
    }
    
    // Validate sections
    const sectionErrors = validateSections(values.sections);
    errors.push(...sectionErrors);
    
    // Validate FAQs
    const faqErrors = validateFaqs(values.faqs);
    errors.push(...faqErrors);
    
    return errors;
  };

  // Add / Edit Page
  const handleOk = async () => {
    try {
      // First, validate the form fields
      const values = await form.validateFields();
      
      // Process sections to ensure proper structure
      const processedSections =
        values.sections?.map((s, idx) => {
          const sectionData = {
            layoutType: s.layoutType || "description-only",
            heading: s.heading || "",
            image: s.image || "",
            cta: s.cta?.ctaId
              ? {
                  ctaId: s.cta.ctaId,
                  buttonVariant: s.cta.buttonVariant || "primary",
                }
              : null,
            order: s.order ?? idx,
          };

          if (s.layoutType === "description-and-form") {
            if (s.descriptions && s.descriptions.length > 0) {
              sectionData.descriptions = s.descriptions.map((d, dIdx) => ({
                text: d.text,
                icon: d.icon || "",
                order: d.order ?? dIdx,
              }));
              sectionData.description = "";
            } else {
              sectionData.description = s.description || "";
              sectionData.descriptions = [];
            }
          } else {
            sectionData.description = s.description || "";
            sectionData.descriptions = [];
          }

          return sectionData;
        }) || [];

      // Process FAQs
      const processedFaqs =
        values.faqs?.map((f, idx) => ({
          question: f.question,
          answer: f.answer,
          order: f.order ?? idx,
        })) || [];

      // Process meta keywords
      let metaKeywords = [];
      if (values.seo?.metaKeywords) {
        if (typeof values.seo.metaKeywords === "string") {
          metaKeywords = values.seo.metaKeywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k);
        } else if (Array.isArray(values.seo.metaKeywords)) {
          metaKeywords = values.seo.metaKeywords;
        }
      }

      // Process schema markup
      let schemaMarkup = {};
      if (values.seo?.schemaMarkup) {
        try {
          schemaMarkup =
            typeof values.seo.schemaMarkup === "string"
              ? JSON.parse(values.seo.schemaMarkup)
              : values.seo.schemaMarkup;
        } catch (e) {
          console.warn("Invalid schema markup JSON");
        }
      }

      const pageData = {
        title: values.title,
        slug: values.slug || generateSlug(values.title),
        category: values.category,
        subcategory: values.subcategory,
        keywordstitle: values.keywordstitle || "", // Added keywordstitle field
        subcatpagedescr: values.subcatpagedescr || "",
        isActive: values.isActive !== undefined ? values.isActive : true,

        topSection: {
          backgroundImage: values.topSection?.backgroundImage || "",
          heading: values.topSection?.heading || "",
          description: values.topSection?.description || "",
          cta: values.topSection?.cta?.ctaId
            ? {
                ctaId: values.topSection.cta.ctaId,
                buttonVariant: values.topSection.cta.buttonVariant || "primary",
              }
            : null,
        },

        sections: processedSections,
        faqs: processedFaqs,

        seo: {
          metaTitle: values.seo?.metaTitle || values.title,
          metaDescription: values.seo?.metaDescription || "",
          metaKeywords: metaKeywords,
          schemaMarkup: schemaMarkup,
        },
      };

      let url = "/api/page";
      let method = "POST";

      if (editingPage) {
        url = `/api/page/${editingPage._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      const data = await res.json();

      if (res.ok || data.success || data._id) {
        message.success(
          editingPage ? "Page updated successfully!" : "Page created successfully!"
        );
        form.resetFields();
        setEditingPage(null);
        setShowAlert(false);
        setValidationErrors([]);
        setIsModalOpen(false);
        fetchPages();
      } else {
        message.error(data.error || "Operation failed");
        // Show server-side validation errors if any
        if (data.errors && Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
          setShowAlert(true);
        }
      }
    } catch (err) {
      console.error("Error saving page:", err);
      
      // Handle validation errors from Ant Design form
      if (err.errorFields && err.errorFields.length > 0) {
        const fieldErrors = err.errorFields.map(field => 
          `❌ ${field.name.join(' > ')}: ${field.errors.join(', ')}`
        );
        setValidationErrors(fieldErrors);
        setShowAlert(true);
        message.error({
          content: `Please fix ${fieldErrors.length} validation error(s)`,
          duration: 3,
        });
      } else {
        message.error("Error saving page");
      }
    }
  };

  // Delete Page
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/page/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok || data.success) {
        message.success("✅ Page deleted successfully");
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
    
    // Reset form first
    form.resetFields();

    const metaKeywordsString = record.seo?.metaKeywords?.join(", ") || "";

    let schemaMarkupString = "";
    if (record.seo?.schemaMarkup) {
      try {
        schemaMarkupString =
          typeof record.seo.schemaMarkup === "string"
            ? record.seo.schemaMarkup
            : JSON.stringify(record.seo.schemaMarkup, null, 2);
      } catch (e) {
        schemaMarkupString = "";
      }
    }

    const sectionsData = (record.sections || []).map((s) => {
      const sectionBase = {
        layoutType: s.layoutType || "description-only",
        heading: s.heading || "",
        image: s.image || "",
        cta: {
          ctaId: s.cta?.ctaId?._id || s.cta?.ctaId || "",
          buttonVariant: s.cta?.buttonVariant || "primary",
        },
        order: s.order || 0,
      };

      if (s.layoutType === "description-and-form") {
        if (s.descriptions && s.descriptions.length > 0) {
          sectionBase.descriptions = s.descriptions.map((d) => ({
            text: d.text || "",
            icon: d.icon || "",
            order: d.order || 0,
          }));
          sectionBase.description = "";
        } else {
          sectionBase.description = s.description || "";
          sectionBase.descriptions = [];
        }
      } else {
        sectionBase.description = s.description || "";
        sectionBase.descriptions = [];
      }

      return sectionBase;
    });

    // Set form values
    form.setFieldsValue({
      title: record.title || "",
      slug: record.slug || "",
      category: record.category || "",
      subcategory: record.subcategory?._id || record.subcategory || "",
      keywordstitle: record.keywordstitle || "", // Added keywordstitle field
      subcatpagedescr: record.subcatpagedescr || "",
      isActive: record.isActive !== undefined ? record.isActive : true,

      topSection: {
        backgroundImage: record.topSection?.backgroundImage || "",
        heading: record.topSection?.heading || "",
        description: record.topSection?.description || "",
        cta: {
          ctaId:
            record.topSection?.cta?.ctaId?._id ||
            record.topSection?.cta?.ctaId ||
            "",
          buttonVariant: record.topSection?.cta?.buttonVariant || "primary",
        },
      },

      sections: sectionsData,
      faqs: (record.faqs || []).map((f) => ({
        question: f.question || "",
        answer: f.answer || "",
        order: f.order || 0,
      })),

      seo: {
        metaTitle: record.seo?.metaTitle || "",
        metaDescription: record.seo?.metaDescription || "",
        metaKeywords: metaKeywordsString,
        schemaMarkup: schemaMarkupString,
      },
    });

    // Open modal
    setIsModalOpen(true);
  };

  // View Page in new tab
  const handleView = (slug) => {
    window.open(`/page/${slug}`, "_blank");
  };

  // Copy URL to clipboard
  const copyUrl = (slug) => {
    const url = `${window.location.origin}/page/${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => message.success("URL copied to clipboard!"))
      .catch(() => message.error("Failed to copy URL"));
  };

  // Open modal for adding new page
  const openAddModal = () => {
    form.resetFields();
    setEditingPage(null);
    setShowAlert(false);
    setValidationErrors([]);
    setIsModalOpen(true);
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
          <div style={{ fontSize: 12, color: "#666" }}>Slug: {record.slug}</div>
          <Tag
            color={record.isActive ? "green" : "red"}
            style={{ marginTop: 4 }}
          >
            {record.isActive ? "Active" : "Inactive"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category || "N/A"}</Tag>,
    },
    {
      title: "SubCategory",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (subcat) => {
        const subcatObj = subCategories.find(
          (s) => s._id === subcat || s._id === subcat?._id,
        );
        return <Tag color="purple">{subcatObj?.name || "Unknown"}</Tag>;
      },
    },
    {
      title: "Sections",
      key: "sectionsCount",
      render: (_, record) => (
        <Tag color="cyan">{record.sections?.length || 0} Sections</Tag>
      ),
    },
    {
      title: "FAQs",
      key: "faqCount",
      render: (_, record) => (
        <Tag color="gold">{record.faqs?.length || 0} FAQs</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <Space.Compact>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record.slug)}
            size="small"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
            type="primary"
          />
          <Button
            icon={<CopyOutlined />}
            onClick={() => copyUrl(record.slug)}
            size="small"
          />
          <Popconfirm
            title="Delete this page?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space.Compact>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[{ href: "/", title: <HomeOutlined /> }, { title: "Pages" }]}
      />

      <Card>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>📄 Pages Management</Title>
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
          pagination={{ pageSize: 10 }}
        />

        {/* Page Modal */}
        <Modal
          title={editingPage ? "✏️ Edit Page" : "➕ Add New Page"}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
            setEditingPage(null);
            setShowAlert(false);
            setValidationErrors([]);
          }}
          onOk={handleOk}
          okText={editingPage ? "Update" : "Create"}
          width={1200}
          style={{ top: 20 }}
          destroyOnClose={true}
        >
          {/* Validation Error Alert */}
          {showAlert && validationErrors.length > 0 && (
            <Alert
              message={
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <WarningOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                    <strong>Please fix the following issues before saving:</strong>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {validationErrors.map((error, idx) => (
                      <li key={idx} style={{ margin: '4px 0', color: '#ff4d4f' }}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              type="error"
              showIcon
              closable
              onClose={() => setShowAlert(false)}
              style={{ marginBottom: 16 }}
            />
          )}
          
          <Form form={form} layout="vertical">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "General Info",
                  children: (
                    <>
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
                                if (!editingPage) {
                                  form.setFieldsValue({
                                    slug: generateSlug(e.target.value),
                                  });
                                }
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            label="URL Slug"
                            name="slug"
                            rules={[{ required: true, message: "Please enter URL slug" }]}
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
                            label="SubCategory"
                            name="subcategory"
                            rules={[{ required: true, message: "Please select a subcategory" }]}
                          >
                            <Select placeholder="Select subcategory">
                              {subCategories.map((subcat) => (
                                <Option key={subcat._id} value={subcat._id}>
                                  {subcat.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            label="Keywords Title"
                            name="keywordstitle"
                            tooltip="Keywords for page categorization and search"
                          >
                            <Input placeholder="Enter keywords title" />
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

                      <Form.Item
                        label="Page Short Description"
                        name="subcatpagedescr"
                        rules={[
                          { max: 200, message: "⚠️ Short description cannot exceed 200 characters" }
                        ]}
                      >
                        <Input.TextArea rows={3} placeholder="Enter short description" />
                      </Form.Item>
                    </>
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
                          label="Background Image"
                        />
                      </Form.Item>

                      <Form.Item
                        name={["topSection", "heading"]}
                        label="Hero Heading"
                      >
                        <Input placeholder="Enter hero heading" />
                      </Form.Item>

                      <Form.Item
                        name={["topSection", "description"]}
                        label="Hero Description"
                      >
                        <TiptapEditor
                          content={form.getFieldValue([
                            "topSection",
                            "description",
                          ])}
                          onChange={(html) => {
                            form.setFieldValue(
                              ["topSection", "description"],
                              html,
                            );
                          }}
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
                              form={form}
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
                                description: "",
                                descriptions: [],
                                cta: { ctaId: '', buttonVariant: 'primary' },
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
                  label: "FAQs",
                  children: (
                    <Form.List name="faqs">
                      {(fields, { add, remove, move }) => (
                        <>
                          {fields.map((field, index) => (
                            <FAQItem
                              key={field.key}
                              field={field}
                              index={index}
                              remove={remove}
                              move={move}
                            />
                          ))}
                          <Button
                            type="dashed"
                            block
                            icon={<PlusOutlined />}
                            onClick={() =>
                              add({ 
                                question: '', 
                                answer: '', 
                                order: fields.length 
                              })
                            }
                            style={{ height: 60, marginTop: 10 }}
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
                  label: "SEO Settings",
                  children: (
                    <Card size="small" style={{ background: "#f5f5f5" }}>
                      <Alert
                        message="SEO Best Practices"
                        description="Meta title should be 50-60 characters, meta description 150-160 characters for optimal search results"
                        type="info"
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                      <Form.Item name={["seo", "metaTitle"]} label="Meta Title">
                        <Input maxLength={70} showCount placeholder="Enter meta title (recommended: 50-60 characters)" />
                      </Form.Item>

                      <Form.Item name={["seo", "metaDescription"]} label="Meta Description">
                        <Input.TextArea rows={3} maxLength={160} showCount />
                      </Form.Item>

                      <Form.Item name={["seo", "metaKeywords"]} label="Meta Keywords">
                        <Input placeholder="keyword1, keyword2, keyword3" />
                      </Form.Item>

                      <Form.Item name={["seo", "schemaMarkup"]} label="Schema Markup">
                        <Input.TextArea rows={5} placeholder='{"@context": "https://schema.org"}' />
                      </Form.Item>
                    </Card>
                  ),
                },
              ]}
            />
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
  
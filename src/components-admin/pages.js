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
} from "@ant-design/icons";

// Dynamically import TipTap to avoid SSR
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components-admin/TipTapEditor').then(mod => mod.default), {
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
const FAQItem = ({ field, index, remove, move }) => (
  <Card
    size="small"
    style={{ marginBottom: 16, background: "#fafafa", borderLeft: "4px solid #52c41a" }}
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
          rules={[{ required: true, message: "Please enter question" }]}
        >
          <Input placeholder="Enter FAQ question" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          {...field}
          name={[field.name, "answer"]}
          label="Answer"
          rules={[{ required: true, message: "Please enter answer" }]}
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

// --- Description Item Component (for description-and-form layout) ---
const DescriptionItem = ({ field, index, remove, move, form }) => {
  // Safe way to get field name
  const fieldName = Array.isArray(field.name) ? field.name : [field.name];
  
  return (
    <Card
      size="small"
      style={{ 
        marginBottom: 12, 
        background: "#fffbe6", 
        borderLeft: "4px solid #faad14",
        borderTop: "1px dashed #d9d9d9"
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
            name={[...fieldName, "text"]}
            label="Description Text"
            rules={[{ required: true, message: "Please enter description text" }]}
          >
            <Input.TextArea rows={2} placeholder="Enter description text" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[...fieldName, "icon"]}
            label="Icon"
          >
            <ImageUploadField 
              label="Icon"
              required={false}
              value={form?.getFieldValue([...fieldName, "icon"])}
              onChange={(url) => form?.setFieldValue([...fieldName, "icon"], url)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={[...fieldName, "order"]}
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
const SectionItem = ({
  field,
  index,
  remove,
  move,
  form,
  ctas,
}) => {
  const layout = Form.useWatch(["sections", field.name, "layoutType"], form);
  const currentImageUrl = Form.useWatch(["sections", field.name, "image"], form);
  
  const isImageRequired = layout === "image-left" || layout === "image-right";
  const isDescriptionAndForm = layout === "description-and-form";

  // Safe field name
  const fieldName = Array.isArray(field.name) ? field.name : [field.name];

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
            disabled={index === (form.getFieldValue("sections")?.length || 0) - 1}
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
            name={[...fieldName, "layoutType"]}
            label="Layout Type"
            initialValue="description-only"
            rules={[{ required: true, message: "Please select layout type" }]}
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
            name={[...fieldName, "order"]}
            label="Order"
            initialValue={index}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={[...fieldName, "heading"]}
        label="Section Heading"
        rules={[
          { required: true, message: "Heading is required" },
          { min: 3, message: "Heading must be at least 3 characters" }
        ]}
      >
        <Input placeholder="Section Title" />
      </Form.Item>

      {layout === "image-left" || layout === "image-right" ? (
        // Image Layouts
        <>
          <Form.Item
            name={[...fieldName, "description"]}
            label="Description"
            rules={[
              { required: true, message: "Description is required" },
              { min: 10, message: "Description must be at least 10 characters" }
            ]}
          >
            <TiptapEditor
              content={form.getFieldValue([...fieldName, "description"]) || ""}
              onChange={(html) =>
                form.setFieldValue([...fieldName, "description"], html)
              }
            />
          </Form.Item>

          <Form.Item
            name={[...fieldName, "image"]}
            rules={[{ required: true, message: "Image is required for this layout" }]}
          >
            <ImageUploadField 
              label="Section Image" 
              required={true}
              value={currentImageUrl}
              onChange={(url) => form.setFieldValue([...fieldName, "image"], url)}
            />
          </Form.Item>
        </>
      ) : layout === "description-only" ? (
        // Description Only Layout
        <Form.Item
          name={[...fieldName, "description"]}
          label="Description"
          rules={[
            { required: true, message: "Description is required" },
            { min: 10, message: "Description must be at least 10 characters" }
          ]}
        >
          <TiptapEditor
            content={form.getFieldValue([...fieldName, "description"]) || ""}
            onChange={(html) =>
              form.setFieldValue([...fieldName, "description"], html)
            }
          />
        </Form.Item>
      ) : layout === "description-and-form" ? (
        // Description & Form Layout
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Card 
                size="small" 
                title="Description Side (Admin Editable)" 
                style={{ background: "#f0f5ff", borderColor: "#1890ff" }}
              >
                <Text strong style={{ display: 'block', marginBottom: 16 }}>
                  Description Points with Icons
                </Text>
                
                <Form.List name={[...fieldName, "descriptions"]}>
                  {(descFields, { add: addDesc, remove: removeDesc, move: moveDesc }) => (
                    <>
                      {descFields.map((descField, descIndex) => {
                        // Create a unique key for each description item
                        const descKey = `${field.key}-desc-${descIndex}`;
                        
                        return (
                          <div key={descKey}>
                            <DescriptionItem
                              field={descField}
                              index={descIndex}
                              remove={removeDesc}
                              move={moveDesc}
                              form={form}
                            />
                          </div>
                        );
                      })}
                      <Button
                        type="dashed"
                        block
                        icon={<PlusOutlined />}
                        onClick={() => addDesc({ 
                          text: "", 
                          icon: "", 
                          order: descFields.length 
                        })}
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
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                  This form will be displayed on the frontend
                </Text>
                
                {/* Hard Coded Form Preview - Using div instead of Form to avoid nested forms */}
                <div style={{ padding: 16, background: "#ffffff", borderRadius: 8 }}>
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
                    <Input.TextArea rows={3} placeholder="Your message" disabled />
                  </div>
                  <Button type="primary" block disabled>
                    Submit
                  </Button>
                </div>
                
                <Text type="secondary" style={{ display: 'block', marginTop: 16, fontSize: 12 }}>
                  ⚡ Form fields are hard-coded and cannot be edited from admin panel
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      ) : null}

      <CTAFields namePath={fieldName.concat("cta")} label="Section" ctas={ctas} />
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

  // Fetch Pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/page");
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Received non-JSON response:", text);
        message.error("Server returned invalid response");
        return;
      }
      
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
      
      // Process sections to ensure proper structure
      const processedSections = values.sections?.map((s, idx) => {
        const sectionData = {
          layoutType: s.layoutType || "description-only",
          heading: s.heading || "",
          image: s.image || "",
          cta: s.cta?.ctaId ? {
            ctaId: s.cta.ctaId,
            buttonVariant: s.cta.buttonVariant || "primary",
          } : null,
          order: s.order ?? idx,
        };

        // Handle descriptions based on layout type
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
      const processedFaqs = values.faqs?.map((f, idx) => ({
        question: f.question,
        answer: f.answer,
        order: f.order ?? idx,
      })) || [];

      // Process meta keywords
      let metaKeywords = [];
      if (values.seo?.metaKeywords) {
        if (typeof values.seo.metaKeywords === 'string') {
          metaKeywords = values.seo.metaKeywords.split(',').map(k => k.trim()).filter(k => k);
        } else if (Array.isArray(values.seo.metaKeywords)) {
          metaKeywords = values.seo.metaKeywords;
        }
      }

      // Process schema markup
      let schemaMarkup = {};
      if (values.seo?.schemaMarkup) {
        try {
          schemaMarkup = typeof values.seo.schemaMarkup === 'string' 
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
        subcatpagedescr: values.subcatpagedescr || "",
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
      const res = await fetch(`/api/page/${id}`, { 
        method: "DELETE" 
      });
      const data = await res.json();
      
      if (res.ok || data.success) {
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
    
    const metaKeywordsString = record.seo?.metaKeywords?.join(', ') || '';
    
    let schemaMarkupString = '';
    if (record.seo?.schemaMarkup) {
      try {
        schemaMarkupString = typeof record.seo.schemaMarkup === 'string' 
          ? record.seo.schemaMarkup 
          : JSON.stringify(record.seo.schemaMarkup, null, 2);
      } catch (e) {
        schemaMarkupString = '';
      }
    }
    
    const sectionsData = (record.sections || []).map(s => {
      const sectionBase = {
        layoutType: s.layoutType,
        heading: s.heading,
        image: s.image || "",
        cta: {
          ctaId: s.cta?.ctaId?._id || s.cta?.ctaId,
          buttonVariant: s.cta?.buttonVariant,
        },
        order: s.order,
      };

      if (s.layoutType === "description-and-form") {
        if (s.descriptions && s.descriptions.length > 0) {
          sectionBase.descriptions = s.descriptions.map(d => ({
            text: d.text,
            icon: d.icon || "",
            order: d.order,
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
    
    form.setFieldsValue({
      title: record.title,
      slug: record.slug,
      category: record.category,
      subcategory: record.subcategory?._id || record.subcategory,
      subcatpagedescr: record.subcatpagedescr || "",
      isActive: record.isActive,
      
      topSection: {
        backgroundImage: record.topSection?.backgroundImage || "",
        heading: record.topSection?.heading || "",
        description: record.topSection?.description || "",
        cta: {
          ctaId: record.topSection?.cta?.ctaId?._id || record.topSection?.cta?.ctaId,
          buttonVariant: record.topSection?.cta?.buttonVariant,
        },
      },

      sections: sectionsData,
      faqs: (record.faqs || []).map(f => ({
        question: f.question,
        answer: f.answer,
        order: f.order,
      })),

      seo: {
        metaTitle: record.seo?.metaTitle,
        metaDescription: record.seo?.metaDescription,
        metaKeywords: metaKeywordsString,
        schemaMarkup: schemaMarkupString,
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
    setEditingPage(null);
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
          <div style={{ fontSize: 12, color: "#666" }}>
            Slug: {record.slug}
          </div>
          <Tag color={record.isActive ? "green" : "red"} style={{ marginTop: 4 }}>
            {record.isActive ? "Active" : "Inactive"}
          </Tag>
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
      title: "SEO",
      key: "seoStatus",
      render: (_, record) => (
        <Tag color={record.seo?.metaTitle ? "green" : "orange"}>
          {record.seo?.metaTitle ? "✓ SEO Set" : "No SEO"}
        </Tag>
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
      width: 220,
      render: (_, record) => (
        <Space.Compact>
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
        </Space.Compact>
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
            <Text type="secondary">Manage all your pages with dynamic sections and FAQs</Text>
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
                  <Col span={8}>
                    <Text strong>Page Description:</Text>
                    <p style={{ marginTop: 8 }}>
                      {record.subcatpagedescr || "No description"}
                    </p>
                  </Col>
                  <Col span={8}>
                    <Text strong>Hero Section:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Heading:</strong> {record.topSection?.heading || "No heading"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Background:</strong> {record.topSection?.backgroundImage ? "✓" : "✗"}
                    </p>
                  </Col>
                  <Col span={8}>
                    <Text strong>SEO Info:</Text>
                    <p style={{ marginTop: 8, marginBottom: 0 }}>
                      <strong>Meta Title:</strong> {record.seo?.metaTitle ? "✓" : "✗"}
                    </p>
                    <p style={{ marginTop: 4, marginBottom: 0 }}>
                      <strong>Meta Desc:</strong> {record.seo?.metaDescription ? "✓" : "✗"}
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
          width={1200}
          style={{ top: 20 }}
        >
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
                                  form.setFieldsValue({ slug: generateSlug(e.target.value) });
                                }
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

                      <Row gutter={16}>
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
                        extra="Short description for meta tags and preview"
                      >
                        <Input.TextArea 
                          placeholder="Enter short description" 
                          rows={3}
                          style={{ borderRadius: 8 }}
                        />
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
                          value={form.getFieldValue(['topSection', 'backgroundImage'])}
                          onChange={(url) => form.setFieldValue(['topSection', 'backgroundImage'], url)}
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
                          content={form.getFieldValue(["topSection", "description"]) || ""}
                          onChange={(html) =>
                            form.setFieldValue(["topSection", "description"], html)
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
                              add({ order: fields.length })
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
                      <Form.Item
                        name={["seo", "metaTitle"]}
                        label="Meta Title"
                        extra="Title for search engines (50-60 characters)"
                      >
                        <Input maxLength={70} showCount />
                      </Form.Item>

                      <Form.Item
                        name={["seo", "metaDescription"]}
                        label="Meta Description"
                        extra="Description for search results (150-160 characters)"
                      >
                        <Input.TextArea rows={3} maxLength={160} showCount />
                      </Form.Item>

                      <Form.Item
                        name={["seo", "metaKeywords"]}
                        label="Meta Keywords"
                        extra="Separate with commas (e.g., keyword1, keyword2, keyword3)"
                      >
                        <Input placeholder="Enter SEO keywords" />
                      </Form.Item>

                      <Form.Item
                        name={["seo", "schemaMarkup"]}
                        label="Schema Markup (JSON-LD)"
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
  "name": "Your Service Name"
}`}
                        />
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
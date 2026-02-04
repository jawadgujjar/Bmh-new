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
  Collapse,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  UploadOutlined,
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

export default function SubCategory() {
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCat, setEditingSubCat] = useState(null);
  const [form] = Form.useForm();
  const [expandedPanels, setExpandedPanels] = useState(['seo']);

  // NEW STATES FOR PAGE MODAL
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [pageForm] = Form.useForm();
  
  // State for all editor contents
  const [editorContents, setEditorContents] = useState({
    topSectionDescription: "",
    middleSectionDescription1: "",
    middleSectionDescription2: "",
    cta1Description: "",
    cta2Description: "",
  });

  // Fetch SubCategories
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/subcategories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSubCategories(data);
      } else if (data.success && Array.isArray(data.data)) {
        setSubCategories(data.data);
      } else {
        message.error("Failed to load subcategories");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      message.error("Error fetching subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Handle file upload to backend -> Cloudinary
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

  // Handle file upload for Page Modal
  const handlePageUpload = async (file, fieldName) => {
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
          pageForm.setFieldsValue(nestedValue);
        } else {
          pageForm.setFieldsValue({ [fieldName]: data.url });
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

  // Custom Upload Component with preview (FOR SUBCATEGORY MODAL)
  const UploadField = ({ name, label, formType = "subcategory" }) => {
    const [fileList, setFileList] = useState([]);
    const currentForm = formType === "page" ? pageForm : form;
    const isModalOpenState =
      formType === "page" ? isPageModalOpen : isModalOpen;
    const uploadHandler = formType === "page" ? handlePageUpload : handleUpload;

    useEffect(() => {
      const currentValue = currentForm.getFieldValue(name);
      if (currentValue) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: currentValue,
          },
        ]);
      }
    }, [currentForm, name, isModalOpenState]);

    return (
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: `Please upload ${label}` }]}
      >
        <Upload
          listType="picture"
          fileList={fileList}
          beforeUpload={async (file) => {
            const url = await uploadHandler(file, name);
            if (url) {
              setFileList([
                { uid: "-1", name: file.name, status: "done", url },
              ]);
            }
            return Upload.LIST_IGNORE;
          }}
          onRemove={() => {
            currentForm.setFieldsValue({ [name]: "" });
            setFileList([]);
          }}
        >
          <Button icon={<UploadOutlined />}>Upload {label}</Button>
        </Upload>
      </Form.Item>
    );
  };

  // Add / Edit SubCategory
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // ✅ Prepare SEO data according to model
      const seoData = {
        metaTitle: values.seo?.metaTitle || values.topSection?.heading || values.name,
        metaDescription: values.seo?.metaDescription || values.topSection?.description || values.keywordsSection?.description,
        metaKeywords: values.seo?.metaKeywords || values.keywordsSection?.keywords || [],
        schemaMarkup: values.seo?.schemaMarkup || null
      };

      // Combine all values with SEO
      const finalValues = {
        ...values,
        seo: seoData
      };

      let url = "/api/subcategories";
      let method = "POST";

      if (editingSubCat) {
        url = `/api/subcategories/${editingSubCat._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValues),
      });
      const data = await res.json();

      if (data.success) {
        message.success(
          editingSubCat ? "SubCategory updated!" : "SubCategory added!",
        );
        form.resetFields();
        setEditingSubCat(null);
        setIsModalOpen(false);
        setExpandedPanels(['seo']);
        fetchSubCategories();
      } else {
        message.error(data.error || "Operation failed");
      }
    } catch (err) {
      console.error("Error saving subcategory:", err);
      message.error("Error saving subcategory");
    }
  };

  // Delete SubCategory
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/subcategories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        message.success("Deleted successfully");
        fetchSubCategories();
      } else {
        message.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting subcategory:", err);
      message.error("Error deleting");
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

  // Handle editor content change
  const handleEditorChange = (content, fieldName) => {
    setEditorContents(prev => ({
      ...prev,
      [fieldName]: content
    }));
    // Also update form values
    pageForm.setFieldsValue({
      [fieldName]: content
    });
  };

  // NEW: Handle Page Creation
  const handlePageCreate = async () => {
    try {
      // First get form values
      const values = await pageForm.validateFields();
      
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

      // Ensure slug doesn't have unwanted prefixes
      let slug = values.slug || '';
      if (slug.startsWith('/')) {
        slug = slug.substring(1);
      }

      // Prepare SEO data for page
      const seoData = {
        metaTitle: values.metaTitle || values.title || '',
        metaDescription: values.metaDescription || values.subcatpagedescr || '',
        metaKeywords: values.metaKeywords ? 
          values.metaKeywords.split(',').map(k => k.trim()).filter(k => k) : [],
        metaSchema: values.metaSchema || null
      };

      // Prepare final data according to Page model
      const pageData = {
        title: finalValues.title,
        slug: slug,
        category: selectedSubCategory?.category || "digital-marketing",
        subcategory: selectedSubCategory?._id,
        subcatpagedescr: finalValues.subcatpagedescr,
        metaTitle: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        metaKeywords: seoData.metaKeywords.join(', '),
        metaSchema: seoData.metaSchema,
        topSection: finalValues.topSection,
        middleSection: finalValues.middleSection,
        cta1: finalValues.cta1,
        cta2: finalValues.cta2
      };

      console.log("Creating page with data:", pageData);

      const res = await fetch("/api/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      const data = await res.json();

      if (data.success) {
        message.success("Page created successfully!");

        // Close modal and reset
        setIsPageModalOpen(false);
        pageForm.resetFields();
        setEditorContents({
          topSectionDescription: "",
          middleSectionDescription1: "",
          middleSectionDescription2: "",
          cta1Description: "",
          cta2Description: "",
        });
        setSelectedSubCategory(null);

        // Redirect to pages page
        window.location.href = "/pages";
      } else {
        message.error(data.error || "Failed to create page");
      }
    } catch (err) {
      console.error("Error creating page:", err);
      message.error("Error creating page");
    }
  };

  // Open modal for editing
  const handleEdit = (record) => {
    setEditingSubCat(record);
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      icon: record.icon,
      topSection: record.topSection || {},
      middleSection: record.middleSection || {},
      keywordsSection: record.keywordsSection || {},
      cta1: record.cta1 || {},
      cta2: record.cta2 || {},
      // ✅ SEO Fields (model ke hisab se)
      seo: record.seo || {}
    });
    setIsModalOpen(true);
  };

  // NEW: Open Page Creation Modal
  const openPageModal = (subCategory) => {
    setSelectedSubCategory(subCategory);
    
    // Generate slug from subcategory name
    const slug = generateSlug(subCategory.name);
    
    // Reset editor contents
    setEditorContents({
      topSectionDescription: "",
      middleSectionDescription1: "",
      middleSectionDescription2: "",
      cta1Description: "",
      cta2Description: "",
    });
    
    pageForm.setFieldsValue({
      title: subCategory.name, // Auto-populate title
      slug: slug, // Auto-generate slug
      subcategory: subCategory._id, // Auto-populate subcategory ID
      category: subCategory.category, // Auto-populate category
      subcatpagedescr: "", // Reset short description
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      metaSchema: "",
      topSection: {
        heading: "",
        description: "",
        backgroundImage: ""
      },
      middleSection: {
        description1: "",
        description2: "",
        image1: "",
        image2: ""
      },
      cta1: {
        heading: "",
        description: ""
      },
      cta2: {
        heading: "",
        description: ""
      }
    });
    
    setIsPageModalOpen(true);
  };

  // Table Columns with SEO Status
  const columns = [
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => (
        <img
          src={icon || "https://via.placeholder.com/35"}
          alt="icon"
          style={{ width: 35, height: 35, borderRadius: 6 }}
          onError={(e) => (e.target.src = "https://via.placeholder.com/35")}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="blue">{cat || "N/A"}</Tag>,
    },
    {
      title: "SEO Status",
      key: "seoStatus",
      render: (_, record) => {
        const seo = record.seo || {};
        return (
          <div>
            {seo.metaTitle ? (
              <Tag color="green">✓ SEO Set</Tag>
            ) : (
              <Tag color="orange">No SEO</Tag>
            )}
            {seo.metaDescription && (
              <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                {seo.metaDescription.substring(0, 40)}...
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => window.open(`/${record.category}/${record.slug || record.name.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
            title="View Page"
          />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            type="primary"
            onClick={() => openPageModal(record)}
            style={{ marginLeft: 8 }}
          >
            Add Page
          </Button>
          <Popconfirm
            title="Delete SubCategory?"
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
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
          📂 Sub Categories Management
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingSubCat(null);
            setIsModalOpen(true);
          }}
        >
          Add Sub Category
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={subCategories}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* UPDATED: PAGE CREATION MODAL WITH TIPTAP EDITORS */}
      <Modal
        title={`Add Page for ${selectedSubCategory?.name || "SubCategory"}`}
        open={isPageModalOpen}
        onCancel={() => {
          setIsPageModalOpen(false);
          setSelectedSubCategory(null);
          pageForm.resetFields();
          setEditorContents({
            topSectionDescription: "",
            middleSectionDescription1: "",
            middleSectionDescription2: "",
            cta1Description: "",
            cta2Description: "",
          });
        }}
        onOk={handlePageCreate}
        okText="Create Page"
        width={1000}
        style={{ top: 20 }}
      >
        <Form layout="vertical" form={pageForm}>
          <Row gutter={24}>
            {/* Left Column: Basic Info and SEO */}
            <Col span={12}>
              <Form.Item
                label="Page Title"
                name="title"
                rules={[{ required: true, message: "Please enter page title" }]}
              >
                <Input placeholder="Enter page title" />
              </Form.Item>

              <Form.Item
                label="URL Slug"
                name="slug"
                rules={[
                  { required: true, message: "Please enter URL slug" },
                  { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Only lowercase letters, numbers, and hyphens allowed' }
                ]}
                extra="yourdomain.com/your-slug"
              >
                <Input 
                  placeholder="your-slug"
                  onChange={(e) => {
                    const slug = generateSlug(e.target.value);
                    pageForm.setFieldsValue({ slug });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
              >
                <Input 
                  disabled 
                  value={selectedSubCategory?.category}
                />
              </Form.Item>

              <Form.Item
                label="SubCategory"
                name="subcategory"
              >
                <Input
                  disabled
                  value={selectedSubCategory?.name}
                />
              </Form.Item>

              <Form.Item 
                label="Short Description" 
                name="subcatpagedescr"
              >
                <Input.TextArea placeholder="Enter short description (for meta description)" rows={3} />
              </Form.Item>

              <Collapse ghost defaultActiveKey={['seo']} style={{ marginBottom: 16 }}>
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
                    extra="Title for search engines (50-60 chars)"
                  >
                    <Input placeholder="Enter SEO title" maxLength={70} showCount />
                  </Form.Item>

                  <Form.Item 
                    label="Meta Description" 
                    name="metaDescription"
                    extra="Description for search results (150-160 chars)"
                  >
                    <Input.TextArea 
                      rows={3}
                      placeholder="Enter SEO description"
                      maxLength={160}
                      showCount
                    />
                  </Form.Item>

                  <Form.Item 
                    label="Meta Keywords" 
                    name="metaKeywords"
                    extra="Separate with commas"
                  >
                    <Input placeholder="Enter keywords" />
                  </Form.Item>

                  <Form.Item 
                    label="Schema Markup (JSON-LD)" 
                    name="metaSchema"
                    extra="Optional structured data"
                  >
                    <Input.TextArea 
                      rows={4}
                      placeholder='{"@context":"https://schema.org","@type":"Service",...}'
                    />
                  </Form.Item>
                </Panel>
              </Collapse>

              {/* Top Section */}
              <Form.Item label="Top Section">
                <UploadField
                  name={["topSection", "backgroundImage"]}
                  label="Background Image"
                  formType="page"
                />
                <Form.Item label="Heading" name={["topSection", "heading"]}>
                  <Input placeholder="Enter top section heading" />
                </Form.Item>
                <Form.Item label="Description">
                  <TiptapEditor 
                    content={editorContents.topSectionDescription}
                    onChange={(content) => handleEditorChange(content, "topSectionDescription")}
                    height="150px"
                  />
                </Form.Item>
              </Form.Item>

              {/* Middle Section */}
              <Form.Item label="Middle Section">
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
                  formType="page"
                />
                <UploadField
                  name={["middleSection", "image2"]}
                  label="Image 2"
                  formType="page"
                />
                <Form.Item label="Description 2">
                  <TiptapEditor 
                    content={editorContents.middleSectionDescription2}
                    onChange={(content) => handleEditorChange(content, "middleSectionDescription2")}
                    height="150px"
                  />
                </Form.Item>
              </Form.Item>
            </Col>

            {/* Right Column: CTAs */}
            <Col span={12}>
              {/* CTA 1 */}
              <Form.Item label="Call to Action 1">
                <Form.Item label="Heading" name={["cta1", "heading"]}>
                  <Input placeholder="Enter CTA 1 heading" />
                </Form.Item>
                <Form.Item label="Description">
                  <TiptapEditor 
                    content={editorContents.cta1Description}
                    onChange={(content) => handleEditorChange(content, "cta1Description")}
                    height="150px"
                  />
                </Form.Item>
              </Form.Item>

              {/* CTA 2 */}
              <Form.Item label="Call to Action 2">
                <Form.Item label="Heading" name={["cta2", "heading"]}>
                  <Input placeholder="Enter CTA 2 heading" />
                </Form.Item>
                <Form.Item label="Description">
                  <TiptapEditor 
                    content={editorContents.cta2Description}
                    onChange={(content) => handleEditorChange(content, "cta2Description")}
                    height="150px"
                  />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* ORIGINAL SUBCATEGORY MODAL (UNCHANGED) */}
      <Modal
        title={
          <div>
            {editingSubCat ? "✏️ Edit Sub Category" : "➕ Add Sub Category"}
            <div style={{ fontSize: '14px', fontWeight: 'normal', color: '#666', marginTop: '4px' }}>
              Complete all sections including SEO for better search rankings
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setExpandedPanels(['seo']);
        }}
        onOk={handleOk}
        okText="Save"
        width={900}
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Form layout="vertical" form={form}>
          <Collapse activeKey={expandedPanels} onChange={setExpandedPanels} ghost>
            {/* Basic Info Panel */}
            <Panel header="Basic Information" key="basic">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter sub category name" }]}
                extra="This will be the main title of your sub-category page"
              >
                <Input placeholder="Enter sub category name (e.g., SEO Services, E-commerce Development)" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="digital-marketing">Digital Marketing</Option>
                  <Option value="web-development">Web Development</Option>
                  <Option value="app-development">App Development</Option>
                </Select>
              </Form.Item>

              <UploadField name="icon" label="Icon" required />
            </Panel>

            {/* Top Section Panel */}
            <Panel header="Top Section (Hero)" key="topSection">
              <UploadField name={["topSection", "backgroundImage"]} label="Background Image" />
              <Form.Item label="Heading" name={["topSection", "heading"]}>
                <Input placeholder="Enter top section heading" />
              </Form.Item>
              <Form.Item label="Description" name={["topSection", "description"]}>
                <Input.TextArea
                  placeholder="Enter top section description"
                  rows={4}
                  maxLength={300}
                  showCount
                />
              </Form.Item>
            </Panel>

            {/* Middle Section Panel */}
            <Panel header="Middle Section" key="middleSection">
              <Form.Item label="Description 1" name={["middleSection", "description1"]}>
                <Input.TextArea placeholder="Enter first description" rows={4} />
              </Form.Item>
              <UploadField name={["middleSection", "image1"]} label="Image 1" />
              <UploadField name={["middleSection", "image2"]} label="Image 2" />
              <Form.Item label="Description 2" name={["middleSection", "description2"]}>
                <Input.TextArea placeholder="Enter second description" rows={4} />
              </Form.Item>
            </Panel>

            {/* Keywords Section Panel */}
            <Panel header="Keywords Section" key="keywordsSection">
              <Form.Item label="Heading" name={["keywordsSection", "heading"]}>
                <Input placeholder="Enter keywords section heading" />
              </Form.Item>
              <Form.Item label="Description" name={["keywordsSection", "description"]}>
                <Input.TextArea placeholder="Enter keywords section description" rows={4} />
              </Form.Item>

              <Form.Item label="Keywords">
                <Form.List name={["keywordsSection", "keywords"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                          <Form.Item {...restField} name={name} rules={[{ required: true, message: "Enter a keyword" }]}>
                            <Input placeholder="Keyword (e.g., SEO, Digital Marketing)" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Keyword
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Related Headings">
                <Form.List name={["keywordsSection", "relatedHeading"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                          <Form.Item {...restField} name={name} rules={[{ required: true, message: "Enter a related heading" }]}>
                            <Input placeholder="Related Heading" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Related Heading
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Related Descriptions">
                <Form.List name={["keywordsSection", "relatedDescription"]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                          <Form.Item {...restField} name={name} rules={[{ required: true, message: "Enter a related description" }]}>
                            <Input.TextArea placeholder="Related Description" rows={2} />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Related Description
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Panel>

            {/* CTA Sections Panel */}
            <Panel header="Call to Action Sections" key="ctaSections">
              <Form.Item label="CTA 1 Heading" name={["cta1", "heading"]}>
                <Input placeholder="Enter CTA 1 heading" />
              </Form.Item>
              <Form.Item label="CTA 1 Description" name={["cta1", "description"]}>
                <Input.TextArea placeholder="Enter CTA 1 description" rows={4} />
              </Form.Item>

              <Form.Item label="CTA 2 Heading" name={["cta2", "heading"]}>
                <Input placeholder="Enter CTA 2 heading" />
              </Form.Item>
              <Form.Item label="CTA 2 Description" name={["cta2", "description"]}>
                <Input.TextArea placeholder="Enter CTA 2 description" rows={4} />
              </Form.Item>
            </Panel>

            {/* ✅ SEO Panel (Model ke hisab se) */}
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
                name={["seo", "metaTitle"]}
                extra="Title for search engines (recommended: 50-60 characters)"
              >
                <Input
                  placeholder="Enter SEO title for this sub-category"
                  maxLength={70}
                  showCount
                />
              </Form.Item>

              <Form.Item
                label="Meta Description"
                name={["seo", "metaDescription"]}
                extra="Description for search results (recommended: 150-160 characters)"
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter SEO description for this sub-category"
                  maxLength={160}
                  showCount
                />
              </Form.Item>

              <Form.Item
                label="Meta Keywords"
                name={["seo", "metaKeywords"]}
                extra="Separate with commas (e.g., keyword1, keyword2, keyword3)"
              >
                <Input
                  placeholder="Enter SEO keywords"
                />
              </Form.Item>

              <Form.Item
                label="Schema Markup (JSON-LD)"
                name={["seo", "schemaMarkup"]}
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
        </Form>
      </Modal>
    </Card>
  );
}
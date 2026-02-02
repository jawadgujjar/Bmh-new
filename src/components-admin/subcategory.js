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

  // NEW: Handle Page Creation
  const handlePageCreate = async () => {
    try {
      const values = await pageForm.validateFields();

      const res = await fetch("/api/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        message.success("Page created successfully!");

        // Close modal and redirect to pages page
        setIsPageModalOpen(false);
        pageForm.resetFields();
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
    pageForm.setFieldsValue({
      subcategory: subCategory._id, // Auto-populate subcategory ID
    });
    setIsPageModalOpen(true);
  };

  // Table Columns (Updated with Add Page button)
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

      {/* NEW: PAGE CREATION MODAL */}
      <Modal
        title={`Add Page for ${selectedSubCategory?.name || "SubCategory"}`}
        open={isPageModalOpen}
        onCancel={() => {
          setIsPageModalOpen(false);
          setSelectedSubCategory(null);
          pageForm.resetFields();
        }}
        onOk={handlePageCreate}
        okText="Create Page"
        width={800}
      >
        <Form layout="vertical" form={pageForm}>
          {/* Title Field */}
          <Form.Item
            label="Page Title"
            name="title"
            rules={[{ required: true, message: "Please enter page title" }]}
          >
            <Input placeholder="Enter page title" />
          </Form.Item>

          {/* SubCategory ID (Auto-populated, read-only) */}
          <Form.Item
            label="SubCategory"
            name="subcategory"
            rules={[{ required: true, message: "SubCategory is required" }]}
          >
            <Input
              disabled
              value={selectedSubCategory?.name}
              addonBefore="ID:"
              addonAfter={selectedSubCategory?.name}
            />
          </Form.Item>

          {/* Page Description */}
          <Form.Item label="Page Description" name="subcatpagedescr">
            <Input.TextArea placeholder="Enter page description" rows={4} />
          </Form.Item>

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
            <Form.Item label="Description" name={["topSection", "description"]}>
              <Input.TextArea
                placeholder="Enter top section description"
                rows={3}
              />
            </Form.Item>
          </Form.Item>

          {/* Middle Section */}
          <Form.Item label="Middle Section">
            <Form.Item
              label="Description 1"
              name={["middleSection", "description1"]}
            >
              <Input.TextArea placeholder="Enter first description" rows={3} />
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
            <Form.Item
              label="Description 2"
              name={["middleSection", "description2"]}
            >
              <Input.TextArea placeholder="Enter second description" rows={3} />
            </Form.Item>
          </Form.Item>

          {/* CTA 1 */}
          <Form.Item label="Call to Action 1">
            <Form.Item label="Heading" name={["cta1", "heading"]}>
              <Input placeholder="Enter CTA 1 heading" />
            </Form.Item>
            <Form.Item label="Description" name={["cta1", "description"]}>
              <Input.TextArea placeholder="Enter CTA 1 description" rows={3} />
            </Form.Item>
          </Form.Item>

          {/* CTA 2 */}
          <Form.Item label="Call to Action 2">
            <Form.Item label="Heading" name={["cta2", "heading"]}>
              <Input placeholder="Enter CTA 2 heading" />
            </Form.Item>
            <Form.Item label="Description" name={["cta2", "description"]}>
              <Input.TextArea placeholder="Enter CTA 2 description" rows={3} />
            </Form.Item>
          </Form.Item>
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
          {/* Basic Fields */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter sub category name" },
            ]}
          >
            <Input placeholder="Enter sub category name" />
          </Form.Item>
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

          {/* Top Section */}
          <Form.Item label="Top Section">
            <UploadField
              name={["topSection", "backgroundImage"]}
              label="Background Image"
            />
            <Form.Item label="Heading" name={["topSection", "heading"]}>
              <Input placeholder="Enter top section heading" />
            </Form.Item>
            <Form.Item label="Description" name={["topSection", "description"]}>
              <Input.TextArea
                placeholder="Enter top section description"
                rows={4}
              />
            </Form.Item>
          </Form.Item>

          {/* Middle Section */}
          <Form.Item label="Middle Section">
            <Form.Item
              label="Description 1"
              name={["middleSection", "description1"]}
            >
              <Input.TextArea placeholder="Enter first description" rows={4} />
            </Form.Item>
            <UploadField name={["middleSection", "image1"]} label="Image 1" />
            <UploadField name={["middleSection", "image2"]} label="Image 2" />
            <Form.Item
              label="Description 2"
              name={["middleSection", "description2"]}
            >
              <Input.TextArea placeholder="Enter second description" rows={4} />
            </Form.Item>
          </Form.Item>

          {/* Keywords Section */}
          <Form.Item label="Keywords Section">
            <Form.Item label="Heading" name={["keywordsSection", "heading"]}>
              <Input placeholder="Enter keywords section heading" />
            </Form.Item>
            <Form.Item
              label="Description"
              name={["keywordsSection", "description"]}
            >
              <Input.TextArea
                placeholder="Enter keywords section description"
                rows={4}
              />
            </Form.Item>

            <Form.Item label="Keywords">
              <Form.List name={["keywordsSection", "keywords"]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[
                            { required: true, message: "Enter a keyword" },
                          ]}
                        >
                          <Input placeholder="Keyword" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
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
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[
                            {
                              required: true,
                              message: "Enter a related heading",
                            },
                          ]}
                        >
                          <Input placeholder="Related Heading" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
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
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[
                            {
                              required: true,
                              message: "Enter a related description",
                            },
                          ]}
                        >
                          <Input placeholder="Related Description" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Related Description
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Form.Item>
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
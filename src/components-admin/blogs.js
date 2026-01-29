"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import {
  Table as AntTable,
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
  ConfigProvider,
  Tooltip,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  HighlightOutlined,
  TableOutlined,
  InsertRowLeftOutlined,
  ClearOutlined,
} from "@ant-design/icons";

// Dynamically import TipTap to avoid SSR
import dynamic from 'next/dynamic';

// TipTap Editor (Client-side only) - WITH FIXES
const TipTapEditor = dynamic(() => import('./TipTapEditor').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div style={{
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      minHeight: '400px',
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

const { Title } = Typography;
const { Option } = Select;

// ============ Main BlogAdmin Component ============
export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [mounted, setMounted] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const modalOpenedRef = useRef(false);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs", { cache: "no-store" });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      message.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Slug generator - IMPROVED
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

  // Save blog
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // ✅ FIX: Ensure slug doesn't have /blogs/ prefix
      let slug = values.slug;
      if (slug.startsWith('/')) {
        slug = slug.substring(1);
      }
      if (slug.startsWith('blogs/')) {
        slug = slug.substring(6);
      }
      
      const finalValues = {
        ...values,
        slug: slug,
        fullContent: editorContent
      };

      console.log("Saving blog:", finalValues);

      let url = "/api/blogs";
      let method = "POST";

      if (editingBlog) {
        url = `/api/blogs/${editingBlog._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalValues),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      if (data.blog || data._id || data.success) {
        message.success(editingBlog ? "Blog updated successfully!" : "Blog added successfully!");
        handleModalClose();
        fetchBlogs();
      } else {
        message.error(data.error || data.message || "Save failed");
      }
    } catch (err) {
      console.error(err);
      message.error(err.message || "Validation failed");
    }
  };

  // Delete blog
  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`/api/blogs/${_id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success || data.message) {
        message.success("Blog deleted successfully!");
        fetchBlogs();
      } else {
        message.error(data.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Delete error");
    }
  };

  // Modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    form.resetFields();
    setEditorContent("");
    setFormKey(prev => prev + 1);
    modalOpenedRef.current = false;
  };

  // Edit blog function
  const handleEdit = async (record) => {
    console.log("Editing blog data:", record);
    
    if (isModalOpen) {
      handleModalClose();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setEditingBlog(record);
    setFormKey(prev => prev + 1);
    setIsModalOpen(true);
    
    setTimeout(() => {
      // ✅ FIX: Ensure slug doesn't have /blogs/ prefix when editing
      let slug = record.slug || "";
      if (slug.startsWith('/')) {
        slug = slug.substring(1);
      }
      if (slug.startsWith('blogs/')) {
        slug = slug.substring(6);
      }
      
      form.setFieldsValue({
        title: record.title || "",
        slug: slug,
        category: record.category || "tech",
        description: record.description || "",
        fullContent: record.fullContent || "",
        tableOfContents: record.tableOfContents || []
      });
      
      setEditorContent(record.fullContent || "");
      modalOpenedRef.current = true;
    }, 300);
  };

  // Add new blog
  const handleAddNew = () => {
    handleModalClose();
    setTimeout(() => {
      setEditingBlog(null);
      setIsModalOpen(true);
      setFormKey(prev => prev + 1);
      
      setTimeout(() => {
        form.setFieldsValue({
          title: "",
          slug: "",
          category: "tech",
          description: "",
          fullContent: "",
          tableOfContents: []
        });
        setEditorContent("");
      }, 100);
    }, 100);
  };

  // Handle editor content change
  const handleEditorChange = (content) => {
    setEditorContent(content);
    form.setFieldsValue({ fullContent: content });
  };

  // Table columns
  const columns = [
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      render: (text) => <b>{text}</b> 
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    { 
      title: "URL", 
      dataIndex: "slug", 
      key: "slug",
      render: (slug) => (
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>yourdomain.com/</div>
          <div style={{ fontWeight: '500' }}>{slug}</div>
        </div>
      )
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            type="text"
            title="Edit Blog"
          />
          <Popconfirm 
            title="Are you sure to delete this blog?" 
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              type="text"
              title="Delete Blog"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!mounted) {
    return (
      <Card 
        variant="outlined" 
        style={{ 
          borderRadius: 12,
          padding: '40px',
          textAlign: 'center'
        }}
      >
        <Title level={4}>Loading Blog Manager...</Title>
      </Card>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
        },
        components: {
          Card: {
            paddingLG: 24,
          },
        },
      }}
    >
      <Card 
        variant="outlined" 
        style={{ 
          borderRadius: 12,
          border: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%', 
          marginBottom: 24 
        }}>
          <Title level={3} style={{ margin: 0 }}>📝 Blog Manager</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            size="middle"
          >
            Add Blog
          </Button>
        </div>

        <AntTable 
          columns={columns} 
          dataSource={blogs} 
          rowKey="_id" 
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} blogs`
          }}
        />

        <Modal
          title={editingBlog ? `Edit Blog: ${editingBlog.title}` : "Add New Blog"}
          open={isModalOpen}
          onCancel={handleModalClose}
          onOk={handleOk}
          width={900}
          style={{ top: 20 }}
          okText={editingBlog ? "Update Blog" : "Save Blog"}
          cancelText="Cancel"
          okButtonProps={{
            size: 'middle',
          }}
          cancelButtonProps={{
            size: 'middle',
          }}
          styles={{ 
            body: { 
              maxHeight: "70vh", 
              overflowY: "auto",
              paddingRight: '8px'
            } 
          }}
          destroyOnClose={true}
          forceRender={true}
        >
          <Form 
            key={formKey}
            form={form} 
            layout="vertical" 
            preserve={false}
            initialValues={{
              title: "",
              slug: "",
              category: "tech",
              description: "",
              fullContent: "",
              tableOfContents: []
            }}
          >
            <Form.Item 
              label="Title" 
              name="title" 
              rules={[{ 
                required: true, 
                message: 'Please enter blog title' 
              }]}
            >
              <Input 
                placeholder="Enter blog title"
                onChange={(e) => {
                  const slug = generateSlug(e.target.value);
                  form.setFieldsValue({ slug });
                }} 
                size="middle"
              />
            </Form.Item>

            <Form.Item 
              label="URL Slug" 
              name="slug" 
              rules={[{ 
                required: true, 
                message: 'Please enter URL slug',
                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: 'Only lowercase letters, numbers, and hyphens allowed'
              }]}
              extra="This will be your direct URL: yourdomain.com/your-slug"
            >
              <Input 
                placeholder="your-slug" 
                size="middle"
                addonBefore="https://yourdomain.com/"
              />
            </Form.Item>

            <Form.Item 
              label="Category" 
              name="category" 
              rules={[{ 
                required: true, 
                message: 'Please select category' 
              }]}
            >
              <Select 
                placeholder="Select Category"
                size="middle"
              >
                <Option value="tech">Technology</Option>
                <Option value="business">Business</Option>
                <Option value="seo">SEO</Option>
                <Option value="marketing">Marketing</Option>
                <Option value="health">Health</Option>
                <Option value="education">Education</Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Description" 
              name="description" 
              rules={[{ 
                required: true, 
                message: 'Please enter description' 
              }]}
            >
              <Input.TextArea 
                rows={3} 
                placeholder="Short description of the blog (max 200 characters)"
                maxLength={200}
                showCount
                size="middle"
              />
            </Form.Item>

            <Form.Item
              label="Full Content"
              name="fullContent"
              rules={[{ 
                required: true, 
                message: "Full content is required" 
              }]}
              extra="Tip: Select text and apply formatting. Clear formatting with Clear button."
            >
              <div style={{ marginBottom: '16px' }}>
                <TipTapEditor 
                  content={editorContent}
                  onChange={handleEditorChange}
                />
              </div>
            </Form.Item>

            <Form.Item label="Table of Contents (Optional)">
              <Form.List name="tableOfContents">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...rest }) => (
                      <div 
                        key={key} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          marginBottom: 12,
                          gap: 12
                        }}
                      >
                        <Form.Item 
                          {...rest} 
                          name={[name, "title"]} 
                          rules={[{ 
                            required: false, 
                            message: 'Enter heading title' 
                          }]}
                          style={{ 
                            flex: 1, 
                            marginBottom: 0 
                          }}
                        >
                          <Input 
                            placeholder="Heading Title" 
                            size="middle"
                          />
                        </Form.Item>
                        <Button 
                          type="text" 
                          danger 
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                          size="middle"
                        />
                      </div>
                    ))}
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block
                      icon={<PlusOutlined />}
                      size="middle"
                    >
                      Add TOC Heading
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </ConfigProvider>
  );
}

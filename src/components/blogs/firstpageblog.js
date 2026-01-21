'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Button, List, Tag } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from '../../styles/blogs/firstpageblog.module.css';

const { Search } = Input;

const FirstPageBlog = () => {
  const router = useRouter();

  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const ORANGE_COLOR = '#FD7E14';
  const ORANGE_LIGHT = '#FFA94D';

  // ================= FETCH BLOGS =================
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');

        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await res.json();

        // ensure array
        const blogsArray = Array.isArray(data) ? data : [];

        setBlogPosts(blogsArray);

        // extract categories
        const categoryMap = {};
        blogsArray.forEach((blog) => {
          if (blog?.category) {
            categoryMap[blog.category] =
              (categoryMap[blog.category] || 0) + 1;
          }
        });

        const categoryArray = Object.keys(categoryMap).map((cat) => ({
          name: cat,
          count: categoryMap[cat],
        }));

        setCategories(categoryArray);
      } catch (error) {
        console.error('Blog API error:', error);
        setBlogPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (post) => {
    if (!post?.slug) return;
    router.push(`/blogs/${post.slug}`);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <p style={{ padding: 40, textAlign: 'center' }}>
        Loading blogs...
      </p>
    );
  }

  return (
    <div className={styles.antdBlogContainer}>
      <Row gutter={[40, 0]}>

        {/* ================= LEFT COLUMN ================= */}
        <Col xs={24} md={16} lg={17}>
          <h2 className={styles.sectionTitle}>Recent Posts</h2>

          {/* ===== NO BLOGS FOUND ===== */}
          {blogPosts.length === 0 ? (
            <Card
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                borderRadius: 12,
              }}
            >
              <h3 style={{ color: ORANGE_COLOR }}>
                No blogs found 😕
              </h3>
              <p>
                Abhi koi blog publish nahi hua.
                Thora baad check karein.
              </p>
            </Card>
          ) : (
            blogPosts.map((post) => (
              <Card
                key={post?._id || post?.slug}
                className={styles.blogCard}
                style={{
                  marginBottom: 24,
                  borderRadius: 12,
                }}
              >
                {/* META */}
                <div className={styles.cardMeta}>
                  <Tag
                    style={{
                      backgroundColor: ORANGE_COLOR,
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    {post?.category || 'Uncategorized'}
                  </Tag>

                  <span className={styles.postDate}>
                    <CalendarOutlined />{' '}
                    {post?.date
                      ? new Date(post.date).toLocaleDateString()
                      : 'No date'}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  className={styles.postTitle}
                  onClick={() => handleReadMore(post)}
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {post?.title || 'Untitled Blog'}
                </h3>

                {/* DESCRIPTION */}
                <p className={styles.postDescription}>
                  {post?.description || 'No description available.'}
                </p>

                {/* BUTTON */}
                <Button
                  type="primary"
                  onClick={() => handleReadMore(post)}
                  style={{
                    backgroundColor: ORANGE_COLOR,
                    borderColor: ORANGE_COLOR,
                  }}
                >
                  Read Full Article
                </Button>
              </Card>
            ))
          )}
        </Col>

        {/* ================= RIGHT SIDEBAR ================= */}
        <Col xs={24} md={8} lg={7}>

          {/* SEARCH */}
          <Card
            title={<span style={{ color: ORANGE_COLOR }}>Search Blog</span>}
            style={{ marginBottom: 24 }}
          >
            <Search
              placeholder="Search articles..."
              allowClear
              enterButton={
                <div
                  style={{
                    backgroundColor: ORANGE_COLOR,
                    color: '#fff',
                    padding: '0 14px',
                  }}
                >
                  <SearchOutlined />
                </div>
              }
            />
          </Card>

          {/* CATEGORIES */}
          <Card
            title={<span style={{ color: ORANGE_COLOR }}>Categories</span>}
          >
            {categories.length === 0 ? (
              <p style={{ textAlign: 'center' }}>
                No categories
              </p>
            ) : (
              <List
                dataSource={categories}
                renderItem={(item) => (
                  <List.Item style={{ cursor: 'pointer' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <span>{item.name}</span>
                      <Tag
                        style={{
                          backgroundColor: ORANGE_LIGHT,
                          border: 'none',
                        }}
                      >
                        {item.count}
                      </Tag>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>

        </Col>
      </Row>
    </div>
  );
};

export default FirstPageBlog;

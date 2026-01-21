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

  // ✅ FETCH BLOGS + CATEGORIES
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();

        // blogs
        setBlogPosts(data);

        // categories extract
        const categoryMap = {};
        data.forEach(blog => {
          categoryMap[blog.category] =
            (categoryMap[blog.category] || 0) + 1;
        });

        const categoryArray = Object.keys(categoryMap).map(cat => ({
          name: cat,
          count: categoryMap[cat],
        }));

        setCategories(categoryArray);
      } catch (err) {
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (post) => {
    router.push(`/blogs/${post.slug}`);
  };

  if (loading) return <p style={{ padding: 40 }}>Loading blogs...</p>;

  return (
    <div className={styles.antdBlogContainer}>
      <Row gutter={[40, 0]}>

        {/* ================= LEFT COLUMN ================= */}
        <Col xs={24} md={16} lg={17}>
          <h2 className={styles.sectionTitle}>Recent Posts</h2>

          {blogPosts.map((post) => (
            <Card
              key={post._id}
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
                  {post.category}
                </Tag>

                <span className={styles.postDate}>
                  <CalendarOutlined />{' '}
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>

              {/* TITLE */}
              <h3
                className={styles.postTitle}
                onClick={() => handleReadMore(post)}
                onMouseEnter={(e) =>
                  (e.target.style.color = ORANGE_COLOR)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = '#000')
                }
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
              >
                {post.title}
              </h3>

              {/* DESCRIPTION */}
              <p className={styles.postDescription}>
                {post.description}
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
          ))}
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
          </Card>

        </Col>
      </Row>
    </div>
  );
};

export default FirstPageBlog;

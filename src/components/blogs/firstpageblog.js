'use client';

import React, { useEffect, useState, Suspense } from 'react'; // Suspense add kiya Next.js requirements ke liye
import { Row, Col, Card, Input, Button, List, Tag, Spin } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams add kiya
import styles from '../../styles/blogs/firstpageblog.module.css';
import MainpageForm from './mainpageform';

const { Search } = Input;

// Search params read karne ke liye logic
const BlogListContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const ORANGE_COLOR = "#FD7E14";

  // URL se search query uthana (Jab detail page se wapas aayein)
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
    } else {
      setSearchTerm(""); // Agar query nahi hai toh search clear kar dein
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        const blogsArray = Array.isArray(data) ? data : [];
        setBlogPosts(blogsArray);

        const categoryMap = {};
        blogsArray.forEach((blog) => {
          if (blog?.category) {
            categoryMap[blog.category] = (categoryMap[blog.category] || 0) + 1;
          }
        });

        const categoryArray = Object.keys(categoryMap).map((cat) => ({
          name: cat,
          count: categoryMap[cat],
        }));
        setCategories(categoryArray);
      } catch (error) {
        console.error("Blog API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogPosts.filter((post) => {
    const title = post?.title?.toLowerCase() || "";
    const description = post?.description?.toLowerCase() || "";
    const category = post?.category?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || description.includes(search) || category.includes(search);
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    // URL ko bhi update kar dein taake search bookmarkable ho jaye
    router.push(`/blogs?search=${value}`);
  };

  const handleReadMore = (post) => post?.slug && router.push(`/blogs/${post.slug}`);
  const handleCategoryClick = (category) => handleSearch(category);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
        <Spin size="large" />
        <p style={{ marginTop: 20 }}>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className={styles.antdBlogContainer}>
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16} xl={16}>
          <h2 className={styles.sectionTitle}>
            {searchTerm ? `Results for: ${searchTerm}` : "Recent Posts"}
          </h2>

          {filteredBlogs.length === 0 ? (
            <Card style={{ textAlign: "center", padding: "50px 20px", borderRadius: 12 }}>
              <h3 style={{ color: ORANGE_COLOR }}>No blogs found 😕</h3>
              <Button onClick={() => handleSearch("")}>Clear Search</Button>
            </Card>
          ) : (
            filteredBlogs.map((post) => (
              <Card
                key={post?._id || post?.slug}
                hoverable
                className={styles.blogCard}
                style={{ marginBottom: 32, borderRadius: 12, overflow: "hidden" }}
                cover={
                  <div onClick={() => handleReadMore(post)} className={styles.responsiveImageWrapper}>
                    <img src={post?.image || "/images/hero.jpg"} alt={post?.title} className={styles.blogMainImage} />
                  </div>
                }
              >
                <div className={styles.cardMeta}>
                  <Tag color={ORANGE_COLOR}>{post?.category || "Uncategorized"}</Tag>
                  <span className={styles.postDate}>
                    <CalendarOutlined style={{ marginRight: 5 }} />
                    {post?.date ? new Date(post.date).toLocaleDateString() : "No date"}
                  </span>
                </div>
                <h3 className={styles.postTitle} onClick={() => handleReadMore(post)}>{post?.title}</h3>
                <p className={styles.postDescription}>{post?.description}</p>
                <Button 
                  type="primary" 
                  onClick={() => handleReadMore(post)} 
                  style={{ backgroundColor: ORANGE_COLOR, borderColor: ORANGE_COLOR }}
                >
                  Read Full Article
                </Button>
              </Card>
            ))
          )}
        </Col>

        <Col xs={24} lg={8} xl={8}>
          <div className={styles.sidebarWrapper}>
            <Card title={<span style={{ color: ORANGE_COLOR }}>Search Blog</span>} style={{ marginBottom: 24, borderRadius: 12 }}>
              <Search
                placeholder="Search articles..."
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                enterButton={<Button type="primary" icon={<SearchOutlined />} style={{ backgroundColor: ORANGE_COLOR, borderColor: ORANGE_COLOR }}>Search</Button>}
              />
            </Card>

            <Card title={<span style={{ color: ORANGE_COLOR }}>Categories</span>} style={{ marginBottom: 24, borderRadius: 12 }}>
              <List
                dataSource={categories}
                renderItem={(item) => (
                  <List.Item className={styles.categoryItem} onClick={() => handleCategoryClick(item.name)}>
                    <div className={styles.categoryLink} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span className={styles.categoryName}>{item.name}</span>
                      <Tag className={styles.categoryCount}>{item.count}</Tag>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
            <MainpageForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Next.js mein useSearchParams ko hamesha Suspense mein wrap karna chahiye
export default function FirstPageBlog() {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <BlogListContent />
    </Suspense>
  );
}
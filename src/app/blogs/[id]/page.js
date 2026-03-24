'use client';
import React, { useEffect, useState } from 'react';
import { Card, Breadcrumb, Button, Tag, Input, List } from 'antd';
import { HomeOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import styles from '../[id]/blog-detail.module.css';
import MainpageForm from '@/components/blogs/mainpageform';
import SEO from '@/components/seo/seo';

// Function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

// Function to create slug from text
const slugify = (text) => {
  const cleanText = stripHtmlTags(text);
  return cleanText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const { Search } = Input;

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [loading, setLoading] = useState(true);
  
  // States for categories
  const [categories, setCategories] = useState([]);

  const ORANGE_COLOR = '#FD7E14';
  const ORANGE_LIGHT = '#FFA94D';

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        
        const blogsArray = Array.isArray(data) ? data : [];

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
        console.error('Categories fetch error:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();

        console.log('Blog data received:', data);

        // Extract headings from content to create Table of Contents
        let toc = [];
        let contentWithIds = data.fullContent;
        let count = 0;
        
        // Find all h2, h3, h4 headings and add IDs to them
        contentWithIds = data.fullContent.replace(
          /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
          (match, level, attrs, text) => {
            const cleanText = stripHtmlTags(text);
            // Create ID from heading text
            const headingId = `${slugify(cleanText)}-${count}`;
            
            console.log(`Found heading ${level}: ${cleanText} -> ID: ${headingId}`);
            
            // Add to TOC
            toc.push({ 
              id: headingId, 
              title: cleanText, 
              level: Number(level) 
            });
            
            count++;
            
            // Return heading with ID attribute
            if (attrs.includes('id=')) {
              // If heading already has ID, keep it
              return match;
            } else {
              // Add ID to heading
              return `<h${level} id="${headingId}"${attrs}>${text}</h${level}>`;
            }
          }
        );
        
        console.log('Generated TOC items:', toc);
        
        // Filter out any empty titles
        toc = toc.filter(item => item.title && item.title.trim() !== '');
        
        setTocItems(toc);
        setPost({ ...data, fullContent: contentWithIds });
        
      } catch (err) {
        console.error('Error fetching blog:', err);
        router.replace('/blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  // Setup intersection observer for active section highlighting
  useEffect(() => {
    if (!post || !tocItems.length) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0.1 }
    );

    // Observe all headings that have IDs
    setTimeout(() => {
      document.querySelectorAll('h2[id], h3[id], h4[id]').forEach((el) => {
        observer.observe(el);
      });
    }, 500); // Small delay to ensure DOM is ready

    return () => observer.disconnect();
  }, [post, tocItems]);

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const yOffset = -headerHeight - 20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/blogs?category=${encodeURIComponent(category)}`);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      router.push(`/blogs?search=${encodeURIComponent(value)}`);
    }
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <p>Loading article...</p>
    </div>
  );

  if (!post) return null;

  const linkStyle = { color: '#fff', cursor: 'pointer' };
  const handleMouseEnter = (e) => (e.target.style.color = ORANGE_COLOR);
  const handleMouseLeave = (e) => (e.target.style.color = '#fff');

  return (
    <>
      {/* ✅ SEO */}
      {post.seo && <SEO seo={post.seo} />}

      <div className={styles.blogHeader}>
        <div className={styles.headerContent}>
          <Breadcrumb
            style={{ marginBottom: '10px' }}
            separator={<span style={{ color: '#fff' }}>/</span>}
            items={[
              {
                title: (
                  <span
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => router.push('/')}
                  >
                    <HomeOutlined /> Home
                  </span>
                ),
              },
              {
                title: (
                  <span
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => router.push('/blogs')}
                  >
                    Blog
                  </span>
                ),
              },
              { title: <span style={{ color: '#fff' }}>{post.title}</span> },
            ]}
          />

          <div className={styles.headerMeta}>
            <Tag style={{ backgroundColor: ORANGE_COLOR, color: '#fff', border: 'none' }}>
              {post.category}
            </Tag>
            <span className={styles.headerDate}>
              <CalendarOutlined /> {new Date(post.date).toDateString()}
            </span>
          </div>

          <h1 className={styles.headerTitle}>{post.title}</h1>
          <p className={styles.headerDescription}>{post.description}</p>
        </div>
      </div>

      <div className={styles.mainPageContainer}>
        <div className={styles.layoutGrid}>
          <div className={styles.leftArea}>
            {/* Table of Contents - Will show if there are headings */}
            {tocItems.length > 0 && (
              <Card className={styles.tocCard}>
                <h3>Table of Contents</h3>
                {tocItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`${styles.tocItem} ${
                      activeSection === item.id ? styles.activeTocItem : ''
                    }`}
                    style={{ 
                      paddingLeft: (item.level - 2) * 20,
                      cursor: 'pointer',
                      marginBottom: '8px',
                      color: activeSection === item.id ? ORANGE_COLOR : 'inherit',
                      fontWeight: activeSection === item.id ? 'bold' : 'normal'
                    }}
                  >
                    {index + 1}. {item.title}
                  </div>
                ))}
              </Card>
            )}

            {/* Full Article Content */}
            <Card className={styles.fullArticleCard}>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
              />
              <Button
                type="primary"
                onClick={() => router.push('/blogs')}
                style={{ backgroundColor: ORANGE_COLOR, marginTop: '20px' }}
              >
                Back to Blogs
              </Button>
            </Card>
          </div>

          <div className={styles.stickyFormWrapper}>
            {/* Search Card */}
            <Card
              title={<span style={{ color: ORANGE_COLOR }}>Search Blog</span>}
              style={{ marginBottom: 24 }}
            >
              <Search
                placeholder="Search articles..."
                allowClear
                onSearch={handleSearch}
                enterButton={
                  <Button 
                    type="primary" 
                    icon={<SearchOutlined />}
                    style={{ 
                      backgroundColor: ORANGE_COLOR,
                      borderColor: ORANGE_COLOR,
                    }}
                  >
                    Search
                  </Button>
                }
              />
            </Card>

            {/* Categories Card */}
            <Card
              title={<span style={{ color: ORANGE_COLOR }}>Categories</span>}
              style={{ marginBottom: 24 }}
            >
              {categories.length === 0 ? (
                <p style={{ textAlign: 'center' }}>
                  No categories
                </p>
              ) : (
                <List
                  dataSource={categories}
                  renderItem={(item) => (
                    <List.Item 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleCategoryClick(item.name)}
                    >
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
                            color: '#000',
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

            {/* Mainpage Form */}
            <MainpageForm />
          </div>
        </div>
      </div>
    </>
  );
}
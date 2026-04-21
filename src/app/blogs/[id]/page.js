'use client';
import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Input, List, Spin } from 'antd';
import { HomeOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import styles from '../[id]/blog-detail.module.css';
import MainpageForm from '@/components/blogs/mainpageform';
import SEO from '@/components/seo/seo';

const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

const slugify = (text) => {
  const cleanText = stripHtmlTags(text);
  return cleanText.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
};

const { Search } = Input;

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const ORANGE_COLOR = '#FD7E14';
  const ORANGE_LIGHT = '#FFA94D';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        const blogsArray = Array.isArray(data) ? data : [];
        const categoryMap = {};
        blogsArray.forEach((blog) => {
          if (blog?.category) categoryMap[blog.category] = (categoryMap[blog.category] || 0) + 1;
        });
        setCategories(Object.keys(categoryMap).map(cat => ({ name: cat, count: categoryMap[cat] })));
      } catch (error) { console.error(error); }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const rawData = await res.json();
        const data = Array.isArray(rawData) ? rawData[0] : rawData;

        let toc = [];
        let count = 0;
        let contentWithIds = data.fullContent.replace(
          /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
          (match, level, attrs, text) => {
            const cleanText = stripHtmlTags(text);
            const headingId = `${slugify(cleanText)}-${count}`;
            toc.push({ id: headingId, title: cleanText, level: Number(level) });
            count++;
            return attrs.includes('id=') ? match : `<h${level} id="${headingId}"${attrs}>${text}</h${level}>`;
          }
        );

        setTocItems(toc.filter(item => item.title));
        setPost({ ...data, fullContent: contentWithIds });
      } catch (err) { router.replace('/blogs'); }
      finally { setLoading(false); }
    };
    fetchBlog();
  }, [id, router]);

  useEffect(() => {
    if (!post || !tocItems.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-100px 0px -70% 0px', threshold: 0.1 });
    document.querySelectorAll('h2[id], h3[id], h4[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post, tocItems]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (loading) return <div className={styles.loadingContainer}><Spin size="large" /></div>;
  if (!post) return null;

  const headerImage = post.image || '/images/hero.jpg';

  return (
    <>
      {post.seo && <SEO seo={post.seo} />}

      {/* ✅ Black overlay (linear-gradient) removed — pure image dikhegi */}
      <div
        className={styles.blogHeader}
        style={{
          backgroundImage: `url("${headerImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={styles.headerContent}>
          <div className={styles.headerMeta}>
            <Tag style={{ backgroundColor: ORANGE_COLOR, color: '#fff', border: 'none' }}>{post.category}</Tag>
            <span className={styles.headerDate}><CalendarOutlined /> {new Date(post.date).toDateString()}</span>
          </div>
          <h1 className={styles.headerTitle}>{post.title}</h1>
          <p className={styles.headerDescription}>{post.description}</p>
        </div>
      </div>

      <div className={styles.mainPageContainer}>
        <div className={styles.layoutGrid}>
          <div className={styles.leftArea}>
            {tocItems.length > 0 && (
              <Card className={styles.tocCard}>
                <h3>Table of Contents</h3>
                {tocItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`${styles.tocItem} ${activeSection === item.id ? styles.activeTocItem : ''}`}
                    style={{
                      paddingLeft: (item.level - 2) * 20,
                      cursor: 'pointer',
                      marginBottom: '8px',
                      color: activeSection === item.id ? ORANGE_COLOR : 'inherit'
                    }}
                  >
                    {index + 1}. {item.title}
                  </div>
                ))}
              </Card>
            )}
            <Card className={styles.fullArticleCard}>
              <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: post.fullContent }} />
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
            <Card title={<span style={{ color: ORANGE_COLOR }}>Search Blog</span>} style={{ marginBottom: 24 }}>
              <Search
                placeholder="Search articles..."
                allowClear
                // Direct main page par search query bhej raha hai
                onSearch={(v) => v && router.push(`/blogs?search=${encodeURIComponent(v)}`)}
                enterButton={
                  <Button style={{ backgroundColor: ORANGE_COLOR, borderColor: ORANGE_COLOR, color: '#fff' }}>
                    Search
                  </Button>
                }
              />
            </Card>

            <Card title={<span style={{ color: ORANGE_COLOR }}>Categories</span>} style={{ marginBottom: 24 }}>
              <List
                dataSource={categories}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: 'pointer' }}
                    // Jab category click ho toh main page par search query ki tarah jaye
                    onClick={() => router.push(`/blogs?search=${encodeURIComponent(item.name)}`)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>{item.name}</span>
                      <Tag style={{ backgroundColor: ORANGE_LIGHT, border: 'none', color: '#000' }}>{item.count}</Tag>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
            <MainpageForm />
          </div>
        </div>
      </div>
    </>
  );
}
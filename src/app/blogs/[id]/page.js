'use client';
import React, { useEffect, useState } from 'react';
import { Card, Breadcrumb, Button, Tag } from 'antd';
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import styles from '../[id]/blog-detail.module.css';
import MainpageForm from '@/components/blogs/mainpageform';

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [loading, setLoading] = useState(true);

  const ORANGE_COLOR = '#FD7E14';

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();

        const toc = [];
        let count = 0;
        const updatedContent = data.fullContent.replace(
          /<h([2-4])>(.*?)<\/h\1>/g,
          (match, level, text) => {
            const headingId = `${slugify(text)}-${count++}`;
            toc.push({ id: headingId, title: text, level: Number(level) });
            return `<h${level} id="${headingId}">${text}</h${level}>`;
          }
        );

        setPost({ ...data, fullContent: updatedContent });
        setTocItems(toc);
      } catch (err) {
        console.error(err);
        router.replace('/blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-120px 0px -40% 0px', threshold: 0.3 }
    );

    document.querySelectorAll('h2[id], h3[id], h4[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            <Tag style={{ backgroundColor: ORANGE_COLOR, color: '#fff' }}>
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
            {tocItems.length > 0 && (
              <Card className={styles.tocCard}>
                <h3>Table of Contents</h3>
                {tocItems.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`${styles.tocItem} ${activeSection === item.id ? styles.activeTocItem : ''}`}
                    style={{ paddingLeft: (item.level - 2) * 16 }}
                  >
                    {i + 1}. {item.title}
                  </div>
                ))}
              </Card>
            )}

            <Card className={styles.fullArticleCard}>
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
              />
              <Button
                type="primary"
                onClick={() => router.push('/blogs')}
                style={{ backgroundColor: ORANGE_COLOR }}
              >
                Back to Blogs
              </Button>
            </Card>
          </div>

          <div className={styles.stickyFormWrapper}>
            <MainpageForm />
          </div>
        </div>
      </div>
    </>
  );
}

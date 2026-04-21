'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Breadcrumb, Button, Tag, Form, Input, Spin } from 'antd';
import { HomeOutlined, LeftOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../styles/blogs/mainpageblog.module.css';

const MainPageBlog = () => {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef(null);
  const formRef = useRef(null);

  const defaultHeaderImage = '/images/hero.jpg';

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        // params.id mein "custom-stickers-printing-guide" aa raha hai
        const response = await fetch(`/api/blogs/${params.id}`); 
        const data = await response.json();
        
        if (data && (Array.isArray(data) ? data.length > 0 : data)) {
          // ✅ FIX: Agar data array hai to pehla element [0] lo, warna direct data
          const finalData = Array.isArray(data) ? data[0] : data;
          
          setPost(finalData);
          setTocItems(finalData.tableOfContents || []);
        } else {
          router.push('/blogs');
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchBlogPost();
    }
  }, [params, router]);

  // Table of Contents Highlighting
  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    const headings = document.querySelectorAll('h2[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [post]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const onQuoteFormSubmit = (values) => {
    console.log('Form submitted:', values);
    alert('Thank you! We will contact you shortly.');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Spin size="large" />
        <p style={{ marginTop: 20 }}>Loading Article...</p>
      </div>
    );
  }

  if (!post) return <div style={{ textAlign: 'center', marginTop: 50 }}>Post not found</div>;

  // ✅ Ab image sahi se link hogi kyunki humne array se object nikal liya hai
  const headerImage = post.image || defaultHeaderImage;

  return (
    <>
      {/* Blog Header with Background Image */}
      <div 
        className={styles.blogHeader}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${headerImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 10%'
        }}
      >
        <div className={styles.headerContent}>
          <Breadcrumb
            style={{ marginBottom: '20px' }}
            items={[
              { title: <span onClick={() => router.push('/')} style={{ color: '#ccc', cursor: 'pointer' }}><HomeOutlined /> Home</span> },
              { title: <span onClick={() => router.push('/blogs')} style={{ color: '#ccc', cursor: 'pointer' }}>Blog</span> },
              { title: <span style={{ color: '#fff' }}>{post.title}</span> },
            ]}
          />

          <Button 
            type="link" 
            icon={<LeftOutlined />} 
            onClick={() => router.push('/blogs')}
            style={{ color: '#FD7E14', padding: 0, marginBottom: '10px' }}
          >
            Back to Articles
          </Button>

          <div style={{ marginBottom: '15px' }}>
            <Tag color="#FD7E14">{post.category}</Tag>
            <span style={{ color: '#fff', marginLeft: '10px' }}>
              <CalendarOutlined /> {new Date(post.date).toLocaleDateString()}
            </span>
          </div>

          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '15px' }}>{post.title}</h1>
          <p style={{ color: '#eee', fontSize: '1.1rem', maxWidth: '800px' }}>{post.description}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className={styles.mainPageContainer} style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <Row gutter={[32, 32]}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            {tocItems.length > 0 && (
              <Card className={styles.tocCard} style={{ marginBottom: '30px', borderRadius: '8px' }}>
                <h3 style={{ borderBottom: '2px solid #FD7E14', display: 'inline-block', marginBottom: '20px' }}>Table of Contents</h3>
                <div className={styles.tocList}>
                  {tocItems.map((item, index) => (
                    <div 
                      key={item._id || index}
                      className={`${styles.tocItem} ${activeSection === item.id ? styles.activeTocItem : ''}`}
                      onClick={() => scrollToSection(item.id)}
                      style={{ cursor: 'pointer', padding: '8px 0', fontSize: '16px' }}
                    >
                      <strong style={{ color: '#FD7E14', marginRight: '10px' }}>{index + 1}.</strong>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Card className={styles.fullArticleCard} style={{ borderRadius: '8px' }}>
              <div 
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
              />
            </Card>
          </Col>

          {/* Right Column: Sticky Form */}
          <Col xs={24} lg={8}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <Card 
                title={<h3 style={{ margin: 0, textAlign: 'center' }}>Get a Free Quote</h3>}
                style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <Form layout="vertical" onFinish={onQuoteFormSubmit}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please enter name' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
                  </Form.Item>
                  <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input prefix={<MailOutlined />} placeholder="Email Address" size="large" />
                  </Form.Item>
                  <Form.Item name="phone" rules={[{ required: true }]}>
                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" size="large" />
                  </Form.Item>
                  <Form.Item name="message">
                    <Input.TextArea placeholder="How can we help you?" rows={4} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block size="large" style={{ backgroundColor: '#FD7E14', borderColor: '#FD7E14', height: '50px', fontSize: '18px' }}>
                    Send Inquiry
                  </Button>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MainPageBlog;
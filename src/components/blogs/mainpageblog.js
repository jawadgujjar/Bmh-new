'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Breadcrumb, Button, Tag, Form, Input } from 'antd';
import { HomeOutlined, LeftOutlined, CalendarOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../styles/blogs/mainpageblog.module.css';

const MainPageBlog = () => {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [tocItems, setTocItems] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef(null);
  const formRef = useRef(null);
  
  const ORANGE_COLOR = '#FD7E14';

  // Blog data with header images
  const allBlogPosts = {
    'ultimate-tron-casinos-guide': {
      id: 1,
      title: "Ultimate Tron Casinos Guide: Who Should Use Tron",
      slug: "ultimate-tron-casinos-guide",
      description: "The frontier of online gambling, Tron Casinos manifests outstanding features as a modern ecosystem.",
      category: "Cryptocurrency",
      date: "Jan. 15, 2024",
      headerImage: '/images/blog-headers/tron-casinos.jpg',
      tableOfContents: [
        { id: 'intro-tron-casinos', title: 'Introduction to Tron Casinos' },
        { id: 'why-choose-tron', title: 'Why Choose Tron Casinos?' },
        { id: 'top-tron-casinos', title: 'Top Tron Casinos in 2024' },
        { id: 'getting-started', title: 'How to Get Started' },
        { id: 'conclusion', title: 'Conclusion' }
      ],
      fullContent: `
        <h2 id="intro-tron-casinos">Introduction to Tron Casinos</h2>
        <p>The integration of Tron (TRX) cryptocurrency has revolutionized how players approach online gaming, offering unprecedented advantages in terms of speed, security, and transparency.</p>
        
        <h2 id="why-choose-tron">Why Choose Tron Casinos?</h2>
        <ul>
          <li>Lightning-fast transactions</li>
          <li>Low transaction fees</li>
          <li>Enhanced security and anonymity</li>
          <li>Provably fair gaming</li>
          <li>Global accessibility</li>
        </ul>
        
        <h2 id="top-tron-casinos">Top Tron Casinos in 2024</h2>
        <p>Here are the leading Tron casinos that have proven their reliability...</p>
        <p>Content continues here...</p>
        <p>More detailed information about each casino...</p>
        <p>Features and benefits of each platform...</p>
        <p>User reviews and ratings...</p>
        
        <h2 id="getting-started">How to Get Started</h2>
        <p>To begin playing at Tron casinos, follow these simple steps...</p>
        <p>Step-by-step guide for beginners...</p>
        <p>Tips for successful registration...</p>
        
        <h2 id="conclusion">Conclusion</h2>
        <p>Tron casinos represent the future of online gambling with their innovative approach to cryptocurrency integration.</p>
        <p>Final thoughts and recommendations...</p>
      `
    },
    'low-cost-business-license-uae': {
      id: 4,
      title: "Low-Cost Business License in the UAE: Complete Guide",
      slug: "low-cost-business-license-uae",
      description: "Learn how to set up a business in UAE with affordable license options and strategic free zones.",
      category: "Business",
      date: "Feb. 1, 2024",
      headerImage: '/images/blog-headers/uae-business.jpg',
      tableOfContents: [
        { id: 'what-makes-low-cost', title: 'What Makes A Business License "Low-Cost" In The UAE?' },
        { id: 'choose-right-zone', title: 'How To Choose The Right Free Zone Or License Package' },
        { id: 'top-10-licenses', title: 'Top 10 Low-Cost Business Licenses In The UAE' },
        { id: 'fujairah-license', title: 'Fujairah Creative City License – AED 6,000' },
        { id: 'whats-included', title: 'What Is Included In A Low-Cost License Package?' },
        { id: 'how-to-start', title: 'How To Get Started With A Low-Cost Business License' },
        { id: 'faqs', title: 'Quick FAQs' }
      ],
      fullContent: `
        <h2 id="what-makes-low-cost">What Makes A Business License "Low-Cost" In The UAE?</h2>
        <p>The United Arab Emirates (UAE) has emerged as a world-class hub for entrepreneurs, freelancers, and start-ups. Its zero income tax, strategic location, and wide array of free zones make it one of the most attractive destinations for setting up new businesses.</p>
        <p>However, the assumption that launching a company in the UAE requires a massive budget holds many new business owners back from getting started. The good news? You can now establish your business with surprisingly affordable options.</p>
        
        <h2 id="choose-right-zone">How To Choose The Right Free Zone Or License Package In The UAE</h2>
        <p>Choosing the right free zone depends on several factors including your business activity, budget, and future expansion plans. Consider these key aspects:</p>
        <ul>
          <li>Business Activity Permissions</li>
          <li>Office Space Requirements</li>
          <li>Visa Allocation</li>
          <li>Renewal Costs</li>
          <li>Location and Accessibility</li>
        </ul>
        
        <h2 id="top-10-licenses">Top 10 Low-Cost Business Licenses In The UAE</h2>
        <p>Here are the most affordable business license options available across various UAE free zones:</p>
        <ol>
          <li>Ajman Free Zone - Starting from AED 8,000</li>
          <li>RAK Free Trade Zone - Starting from AED 7,500</li>
          <li>Sharjah Publishing City - Starting from AED 9,000</li>
          <li>Umm Al Quwain - Starting from AED 7,800</li>
          <li>Dubai South - Starting from AED 10,000</li>
        </ol>
        
        <h2 id="fujairah-license">Fujairah Creative City License – AED 6,000</h2>
        <p>Fujairah Creative City offers one of the most competitive pricing structures in the UAE with licenses starting from just AED 6,000. This includes:</p>
        <ul>
          <li>Business License Registration</li>
          <li>One-year License Validity</li>
          <li>Access to Business Support Services</li>
          <li>Online Company Management Portal</li>
        </ul>
        
        <h2 id="whats-included">What Is Included In A Low-Cost License Package?</h2>
        <p>A typical low-cost business license package in the UAE includes:</p>
        <ul>
          <li>Initial Business License</li>
          <li>Registration with Free Zone Authority</li>
          <li>Company Establishment Card</li>
          <li>Basic Administrative Support</li>
          <li>Access to Free Zone Facilities</li>
        </ul>
        
        <h2 id="how-to-start">How To Get Started With A Low-Cost Business License In The UAE</h2>
        <p>Follow these steps to establish your business in the UAE:</p>
        <ol>
          <li>Choose Your Business Activity</li>
          <li>Select the Appropriate Free Zone</li>
          <li>Prepare Required Documents</li>
          <li>Submit Application Online</li>
          <li>Make Payment</li>
          <li>Receive Your License</li>
        </ol>
        
        <h2 id="faqs">Quick FAQs</h2>
        <p><strong>Q: How long does it take to get a business license?</strong><br>
        A: Typically 3-7 working days for most free zones.</p>
        
        <p><strong>Q: Can I upgrade my license later?</strong><br>
        A: Yes, most free zones allow license upgrades as your business grows.</p>
        
        <p><strong>Q: Is office space mandatory?</strong><br>
        A: Many free zones offer flexi-desk or virtual office options to reduce costs.</p>
      `
    },
    'best-crypto-casinos-2024': {
      id: 2,
      title: "Best Crypto Casinos in 2024",
      slug: "best-crypto-casinos-2024",
      description: "Discover the top cryptocurrency casinos offering secure transactions, fast payouts, and exclusive bonuses.",
      category: "Online Gambling",
      date: "Jan 10, 2024",
      headerImage: '/images/blog-headers/crypto-casinos.jpg',  
      tableOfContents: [
        { id: 'crypto-casinos-overview', title: 'Top Crypto Casinos Overview' },
        { id: 'selection-criteria', title: 'Our Selection Criteria' },
        { id: 'top-5-casinos', title: 'Top 5 Crypto Casinos' },
        { id: 'bonuses-promotions', title: 'Bonuses and Promotions' },
        { id: 'security-considerations', title: 'Security Considerations' }
      ],
      fullContent: `
        <h2 id="crypto-casinos-overview">Top Crypto Casinos Overview</h2>
        <p>As we enter 2024, the landscape of cryptocurrency casinos continues to evolve with new features and improved security measures.</p>
        
        <h2 id="selection-criteria">Our Selection Criteria</h2>
        <p>We evaluated casinos based on several key factors...</p>
        
        <h2 id="top-5-casinos">Top 5 Crypto Casinos</h2>
        <p>Detailed reviews of each top-performing casino...</p>
        
        <h2 id="bonuses-promotions">Bonuses and Promotions</h2>
        <p>Exclusive offers available for crypto users...</p>
        
        <h2 id="security-considerations">Security Considerations</h2>
        <p>How to ensure your funds and data remain secure...</p>
      `
    }
  };

  // Default header image if not specified
  const defaultHeaderImage = '../../../public/images/hero.jpg';

  useEffect(() => {
    if (params && params.id) {
      const postSlug = params.id;
      
      if (allBlogPosts[postSlug]) {
        const currentPost = allBlogPosts[postSlug];
        setPost(currentPost);
        setTocItems(currentPost.tableOfContents || []);
      } else {
        router.push('/blogs');
      }
    }
  }, [params, router]);

  useEffect(() => {
    // Intersection Observer for active TOC section highlighting
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

    // Observe all h2 elements
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const onQuoteFormSubmit = (values) => {
    console.log('Form values:', values);
    // Handle form submission here
    alert('Thank you for your inquiry! We will contact you shortly.');
  };

  if (!post) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading article...</p>
      </div>
    );
  }

  const handleBack = () => {
    router.push('/blogs');
  };

  const headerImage = post.headerImage || defaultHeaderImage;

  return (
    <>
      {/* Header with Background Image */}
      <div 
        className={styles.blogHeader}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${headerImage})`,
        }}
      >
        <div className={styles.headerContent}>
          {/* Breadcrumbs on top of header */}
          <div className={styles.headerBreadcrumbs}>
            <Breadcrumb
              items={[
                {
                  title: <span onClick={() => router.push('/')} className={styles.breadcrumbLink}><HomeOutlined /> Home</span>,
                },
                {
                  title: <span onClick={() => router.push('/blogs')} className={styles.breadcrumbLink}>Blog</span>,
                },
                {
                  title: <span className={styles.currentPage}>{post.title}</span>,
                },
              ]}
            />
          </div>

          {/* Back Button */}
          <div className={styles.headerBackButton}>
            <Button 
              type="text" 
              icon={<LeftOutlined />}
              onClick={handleBack}
              className={styles.backBtn}
            >
              Back to Articles
            </Button>
          </div>

          {/* Article Meta in Header */}
          <div className={styles.headerMeta}>
            <Tag 
              className={styles.headerCategory}
            >
              {post.category}
            </Tag>
            <span className={styles.headerDate}>
              <CalendarOutlined /> {post.date}
            </span>
          </div>

          {/* Article Title in Header */}
          <h1 className={styles.headerTitle}>{post.title}</h1>
          
          {/* Article Description in Header */}
          <p className={styles.headerDescription}>{post.description}</p>
        </div>
      </div>

      {/* Main Content with Table of Contents and Form */}
      <div className={styles.mainPageContainer}>
        <Row gutter={[32, 32]}>
          {/* Left Column: Table of Contents and Article Content */}
          <Col xs={24} lg={16}>
            {/* Table of Contents Card */}
            {tocItems.length > 0 && (
              <Card className={styles.tocCard}>
                <h3 className={styles.tocTitle}>Table of Contents</h3>
                <div className={styles.tocList}>
                  {tocItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`${styles.tocItem} ${activeSection === item.id ? styles.activeTocItem : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span className={styles.tocNumber}>{index + 1}.</span>
                      <span className={styles.tocText}>{item.title}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Article Content Card */}
            <Card className={styles.fullArticleCard} ref={contentRef}>
              <div 
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: post.fullContent }}
              />

              <div className={styles.articleFooter}>
                <Button 
                  type="primary" 
                  onClick={handleBack}
                  className={styles.backToArticlesBtn}
                >
                  Back to All Articles
                </Button>
              </div>
            </Card>
          </Col>

          {/* Right Column: Sticky Quote Form */}
          <Col xs={24} lg={8}>
            <div className={styles.stickyFormContainer} ref={formRef}>
              <Card className={styles.quoteFormCard}>
                <h3 className={styles.formTitle}>Get a Free Quote</h3>
                <p className={styles.formDescription}>
                  Interested in starting your business in UAE? Get a personalized quote today!
                </p>
                
                <Form
                  layout="vertical"
                  onFinish={onQuoteFormSubmit}
                  className={styles.quoteForm}
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      placeholder="Full Name" 
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input 
                      prefix={<MailOutlined />} 
                      placeholder="Email Address" 
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input 
                      prefix={<PhoneOutlined />} 
                      placeholder="Phone Number" 
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="businessType"
                    rules={[{ required: true, message: 'Please select business type' }]}
                  >
                    <Input 
                      placeholder="Type of Business" 
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item
                    name="message"
                  >
                    <Input.TextArea 
                      placeholder="Additional Requirements" 
                      rows={4}
                      size="large"
                    />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      block
                      size="large"
                      className={styles.submitBtn}
                    >
                      Get Free Quote
                    </Button>
                  </Form.Item>
                </Form>
                
                <div className={styles.formNote}>
                  <p>We'll contact you within 24 hours with a customized quote based on your requirements.</p>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MainPageBlog;

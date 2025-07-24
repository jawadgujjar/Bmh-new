import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { FaCaretDown } from "react-icons/fa6";
import styles from '../../styles/services.module.css';

const Features = () => {
    return (
        <div className={styles.featuresContainer}>
            <div>
                <p className={styles.howText}>Services We <span className={styles.spann}>Offer?</span></p>
                <p className={styles.additionalText}>See how we can help your business grow</p>
                <div>
                    <Button className={styles.discoverButton}>Discover Our Services</Button>
                </div>
                <FaCaretDown className={styles.iconDown} />
            </div>
            
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <Card className={styles.antCards} title="Brand Marketing" bordered={false}>
                        Our company specializes in brand marketing services, helping businesses build a strong and memorable brand identity. We create compelling brand strategies, develop consistent messaging, and enhance customer engagement to boost recognition, foster loyalty, and differentiate you from competitors. Let us elevate your brand and drive your business success.
                        <p className={styles.learnmore}><Link href="/brandmarketingpage">Learn more</Link></p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card className={styles.antCards} title="SEO" bordered={false}>
                        Our company offers expert SEO services to improve your online visibility and drive organic traffic to your website. We optimize your site's content, structure, and keywords to enhance search engine rankings, attract more potential customers, and increase your business's online presence. Let us help you achieve better search engine performance and grow your digital footprint.
                        <p className={styles.learnmore}><Link href="/seopage">Learn more</Link></p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card className={styles.antCards} title="E-Commerce Specialization" bordered={false}>
                        Our company provides specialized e-commerce services to enhance your online store's performance. We offer tailored solutions for platform development, user experience optimization, and digital marketing strategies to drive sales and growth. Let us help you create a seamless, engaging shopping experience and maximize your e-commerce success.
                        <p className={styles.learnmore}><Link href="/ecommercepage">Learn more</Link></p>
                    </Card>
                </Col>
            </Row>

            {/* Second Row */}
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <Card className={styles.antCards} title="Digital Marketing" bordered={false}>
                        Our company offers specialized digital marketing services to elevate your online presence and drive growth. We provide customized strategies for content creation, social media management, and search engine optimization to enhance your brand's visibility and engagement. Let us help you craft compelling digital campaigns and optimize your online performance to achieve your marketing goals.
                        <p className={styles.learnmore}>
                            <Link href="/digitalmarketingpage">Learn more</Link>
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Card className={styles.antCards} title="Website Development" bordered={false}>
                        Our company offers professional web development services to create and maintain high-quality, responsive websites. We design and build custom sites that enhance user experience, optimize performance, and align with your business goals. Let us bring your online vision to life and ensure your website stands out and functions seamlessly.
                        <p className={styles.learnmore}><Link href="/webdevelopmentpage">Learn more</Link></p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Features;
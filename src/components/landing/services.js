import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { FaCaretDown } from "react-icons/fa6";
import styles from '../../styles/services.module.css';

const Services = () => {
    const services = [
        {
            title: "Full Stack Development",
            image: "../images/fullstack.jpg", // Replace with your actual image path
            description: "We provide end-to-end web development solutions covering front-end, back-end, and database management for seamless digital experiences.",
            link: "/fullstack"
        },
        {
            title: "Search Engine Optimization",
            image: "../images/seo.jpg", // Replace with your actual image path
            description: "Boost your online visibility with our comprehensive SEO strategies that drive organic traffic and improve search rankings.",
            link: "/seo"
        },
        {
            title: "Google Ads",
            image: "../images/google ads.jpg", // Replace with your actual image path
            description: "Maximize your advertising ROI with our expert Google Ads management and optimization services.",
            link: "/google-ads"
        },
        {
            title: "Brand Marketing",
            image: "../images/brand marketing.jpg", // Replace with your actual image path
            description: "Build a strong brand identity with our strategic marketing solutions that resonate with your target audience.",
            link: "/brand-marketing"
        },
        {
            title: "E-Commerce Specialization",
            image: "../images/ecommerce.avif", // Replace with your actual image path
            description: "Transform your online store with our specialized e-commerce solutions designed to increase conversions and sales.",
            link: "/ecommerce"
        },
        {
            title: "Website Development",
            image: "../images/web.jpg", // Replace with your actual image path
            description: "Get custom, responsive websites that deliver exceptional user experiences and drive business growth.",
            link: "/web-development"
        }
    ];

    return (
        <div className={styles.servicesContainer}>
            <div className={styles.headerSection}>
                <h1 className={styles.mainTitle}>Services We <span className={styles.highlight}>Offer?</span></h1>
                <p className={styles.subTitle}>See how we can help your business grow</p>
                {/* <Button className={styles.ctaButton}>Discover Our Services</Button> */}
                <FaCaretDown className={styles.scrollIndicator} />
            </div>
            
            <Row gutter={[24, 24]} justify="center">
                {services.map((service, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={8}>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardImage}>
                                <img src={service.image} alt={service.title} />
                                <div className={styles.cardOverlay}>
                                    <p className={styles.cardDescription}>{service.description}</p>
                                    <Link href={service.link}>
                                        <Button className={styles.viewButton}>View More</Button>
                                    </Link>
                                </div>
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className={styles.divider}></div>
        </div>
    );
};

export default Services;
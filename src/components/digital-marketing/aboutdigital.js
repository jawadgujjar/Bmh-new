import React from 'react';
import styles from '../../styles/digital-marketing/aboutdigital.module.css'; // Using CSS Modules
import { Row, Col } from 'antd';
import Image from 'next/image'; // Using Next.js Image component

function Aboutdigital() {
    return (
        <div className={styles.aboutdigitalMain}>
            <Row justify="center">
                <Col
                    xs={18}   // Full width on extra small screens
                    sm={18}   // Full width on small screens
                    md={12}   // Half width on medium screens
                    lg={10}   // Slightly narrower on large screens
                    xl={10}   // Slightly narrower on extra large screens
                >
                    <p className={styles.provenTextDigital}>
                        Digital Marketing Agency for Startups in the USA
                    </p>
                    {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
                    <p className={styles.allTextDigital}>
                        Brand Marketing Hub is a results-focused digital marketing agency for startups helping businesses across the USA grow visibility, acquire customers, and scale with confidence. We work with startups and small businesses that need clear strategy, measurable performance, and marketing systems built for real growth. Our approach combines experience, data, and execution to deliver custom digital marketing solutions that align with business goals, not vanity metrics.
                        In a highly competitive US market, startups cannot afford generic marketing. They need a partner that understands audience behavior, search intent, and performance-driven growth. Brand Marketing Hub operates as a performance based marketing agency, helping brands build authority, generate demand, and convert traffic into revenue through focused digital strategies.
                    </p>
                    {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
                </Col>
                <Col
                    xs={22}   // Full width on extra small screens
                    sm={22}   // Full width on small screens
                    md={10}   // Half width on medium screens
                    lg={10}   // Slightly narrower on large screens
                    xl={10}   // Slightly narrower on extra large screens
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/aboutdigital.svg"
                            alt="about-digital"
                            width={500}
                            height={400}
                            layout="responsive"
                            quality={100}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Aboutdigital;
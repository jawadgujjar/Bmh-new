import React from 'react';
import styles from '../../styles/digital-marketing/whydigital.module.css'; // Using CSS Modules
import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import Image from 'next/image'; // Using Next.js Image component

function Whydigital() {
    return (
        <div className={styles.aboutdigitalMain}>
            <Row justify="center">
                <Col
                    xs={22}   // Full width on extra small screens
                    sm={22}   // Full width on small screens
                    md={10}   // Half width on medium screens
                    lg={10}   // Slightly narrower on large screens
                    xl={10}   // Slightly narrower on extra large screens
                >
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/whydigital.svg"
                            alt="about-digital"
                            width={500}
                            height={400}
                            layout="responsive"
                            quality={100}
                        />
                    </div>
                </Col>
                <Col
                    xs={18}   // Full width on extra small screens
                    sm={18}   // Full width on small screens
                    md={12}   // Half width on medium screens
                    lg={10}   // Slightly narrower on large screens
                    xl={10}   // Slightly narrower on extra large screens
                >
                    <p className={styles.provenTextDigital}>
                        A Top Digital Marketing Agency USA Startups Can Rely On
                    </p>
                    {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
                    <p className={styles.allTextDigital}>
                        Finding the right marketing partner is one of the most important decisions a startup can make. Brand Marketing Hub is trusted by founders and small business owners because we focus on outcomes, not assumptions. As a top digital marketing agency USA businesses choose for sustainable growth, we bring clarity to digital marketing by aligning strategy with execution.
                        We operate as a digital marketing consultancy as much as a service provider. That means we guide businesses on what channels matter, how budgets should be allocated, and how success should be measured. Our strategies are built for the US market, taking into account competition, customer expectations, and industry benchmarks.
                        Transparency, accountability, and long-term thinking define how we work. Every campaign is designed to support business growth, not just short-term visibility.
                    </p>
                    {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
                </Col>
            </Row>
            <div className={styles.callactionButton}>
                <Link href="/getaquote" passHref>
                    <Button className={styles.proposalButton}>UNLOCK YOUR FRANCHISE'S POTENTIAL</Button>
                </Link>
            </div>
        </div>
    );
}

export default Whydigital;
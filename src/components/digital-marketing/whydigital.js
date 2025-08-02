import React from 'react';
import styles from '../../styles/digital-marketing/whydigital.module.css'; // Using CSS Modules
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
                        Proven Digital Marketing Strategies for Franchise Success
                    </p>
                    <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p>
                    <p className={styles.allTextDigital}>
                        With an integrated, multi-channel approach, Thrive Internet Marketing Agency ensures the enterprise marketing plan seamlessly aligns with individual franchisees across locations – launching a robust, optimized campaign poised for success at all levels.</p>
                    <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p>
                </Col>
            </Row>
            <div className={styles.callactionButton}>         
                <Button className={styles.proposalButton}>UNLOCK YOUR FRANCHISE'S POTENTIAL</Button>
            </div>
        </div>
    );
}

export default Whydigital;
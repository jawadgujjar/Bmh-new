import React from 'react';
import styles from '../../styles/landing/webcontent.module.css';
import { Row, Col } from 'antd';
import Image from 'next/image';

function Webcontent1() {
    return (
        <div className={styles.aboutdigitalMainweb}>
            <Row justify="center" align="middle" gutter={[40, 0]}>
                {/* IMAGE COLUMN */}
                <Col xs={22} sm={22} md={10} lg={10} xl={10}>
                    <div className={styles.imageContainerweb}>
                        <Image
                            src="/images/fullstack.jpg"
                            alt="about-digital"
                            fill
                            className={styles.imageweb}
                            quality={90}
                            priority
                        />
                    </div>
                </Col>

                {/* CONTENT COLUMN */}
                <Col xs={22} sm={22} md={12} lg={10} xl={10}>
                    <p className={styles.provenTextDigitalweb}>
                        A Small Business Branding Agency That Truly Understands You
                    </p>

                    <p className={styles.allTextDigitalweb}>
                        Small businesses need branding that is simple, affordable, and effective.
                        As a small business branding agency, Brand Marketing Hub focuses on practical
                        solutions that help you grow step by step. We do not overcomplicate the process
                        or use confusing language. We help small businesses create a strong foundation
                        that supports future growth. Our branding strategies are designed to work today
                        and still make sense tomorrow as your business expands.
                    </p>
                </Col>
            </Row>
        </div>
    );
}

export default Webcontent1;

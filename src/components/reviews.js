import React from 'react';
import styles from "../styles/reviews.module.css";
import { Col, Row } from 'antd';
import Image from 'next/image';

function Reviews() {
    return (
        <Row className={styles.reviewImages} justify="center">
            <Col xs={12} sm={12} md={8} lg={6} className={styles.reviewImageCol}>
                <Image 
                    className={styles.reviewImageSize} 
                    alt='google badge' 
                    src='/images/googlebadge.svg'
                    width={192} // 12rem = 192px (assuming 1rem = 16px)
                    height={100} // adjust as needed
                />
            </Col>
            <Col xs={12} sm={12} md={8} lg={6} className={styles.reviewImageCol}>
                <Image 
                    className={styles.reviewImageSize} 
                    alt='facebook badge' 
                    src='/images/fbbadge.svg'
                    width={192}
                    height={100}
                />
            </Col>
            <Col xs={12} sm={12} md={8} lg={6} className={styles.reviewImageCol}>
                <Image 
                    className={styles.reviewImageSize} 
                    alt='clutch badge' 
                    src='/images/clutchbadge.svg'
                    width={192}
                    height={100}
                />
            </Col>
            <Col xs={12} sm={12} md={8} lg={6} className={styles.reviewImageCol}>
                <Image 
                    className={styles.reviewImageSize} 
                    alt='indeed badge' 
                    src='/images/indeedbadge.svg'
                    width={192}
                    height={100}
                />
            </Col>
        </Row>
    );
}

export default Reviews;
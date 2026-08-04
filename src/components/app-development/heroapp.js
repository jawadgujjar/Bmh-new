import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../styles/app-development/heroapp.module.css';
import {
    DesktopOutlined,
    MobileOutlined,
    GlobalOutlined,
    SafetyOutlined,
    ArrowRightOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

function Heroapp1() {
    return (
        <div className={styles.backheroDigital}>
            <div className={styles.heroContainer}>
                {/* Left Content Section */}
                <div className={styles.mainHerodigital}>
                    <div className={styles.topBadge}>
                        <span>✦ CUSTOM APP DEVELOPMENT SERVICES</span>
                    </div>

                    <h1 className={styles.heroFirstText}>
                        Custom Application Development — <span className={styles.highlightText}>Brand Marketing Hub</span>
                    </h1>

                    <p className={styles.growText}>
                        Brand Marketing Hub delivers custoEarly-stage companies don't need a bigger agency. They need the right one. As a dedicated digital marketing agency for startups, BMH works with bootstrapped brands and funded teams that need fast traction, low customer acquisition costs, and a marketing partner who understands the pressure of proving ROI before the next funding round.
                        
                    </p>

                    <div className={styles.buttonGroup}>
                        <Link href="/getaquote" passHref>
                            <Button className={styles.proposalButton}>
                                Get Your Free Proposal <ArrowRightOutlined />
                            </Button>
                        </Link>
                        <Link href="/process" passHref>
                            <Button className={styles.processButton}>
                                See Our Process
                            </Button>
                        </Link>
                    </div>

                    <div className={styles.trustBadges}>
                        <span className={styles.trustItem}><CheckCircleOutlined /> US-Based Team</span>
                        <span className={styles.trustItem}><CheckCircleOutlined /> On-Time Delivery</span>
                        <span className={styles.trustItem}><CheckCircleOutlined /> SLA-Backed Support</span>
                    </div>
                </div>

                {/* Right Cards Grid Section */}
                <div className={styles.heroCardsGrid}>
                    <div className={styles.serviceCard}>
                        <div className={styles.cardIcon}><DesktopOutlined /></div>
                        <h3>Web Applications</h3>
                        <p>Scalable & Secure</p>
                    </div>

                    <div className={styles.serviceCard}>
                        <div className={styles.cardIcon}><MobileOutlined /></div>
                        <h3>Mobile Apps</h3>
                        <p>iOS & Android</p>
                    </div>

                    <div className={styles.serviceCard}>
                        <div className={styles.cardIcon}><GlobalOutlined /></div>
                        <h3>Cross Platform</h3>
                        <p>One Codebase</p>
                    </div>

                    <div className={styles.serviceCard}>
                        <div className={styles.cardIcon}><SafetyOutlined /></div>
                        <h3>Enterprise Grade</h3>
                        <p>Security First</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Heroapp1;
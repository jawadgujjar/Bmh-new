import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../../styles/digital-marketing/sub-category-digital/subdigitalhero.module.css';
import Image from 'next/image';
import { ArrowRightOutlined, StarFilled } from '@ant-design/icons';

function SubHeroDigitalMarketing({ 
    backgroundImage = "/images/hero.jpg", 
    heading = "SEO Company Services",
    description = "Drive more traffic, boost your search engine rankings, and grow your business online with our expert SEO strategies tailored to your industry and audience.",
    renderHtml = false
}) {
    return (
        <section className={styles.backheroDigital}>
            <div className={styles.container}>
                <div className={styles.heroGrid}>
                    {/* Left Column: Content */}
                    <div className={styles.mainHerodigital}>
                        <div className={styles.badgeTag}>
                            <span className={styles.badgeDot}></span> {heading}
                        </div>
                        
                        <h1 className={styles.heroFirstText}>{heading}</h1>
                        
                        {/* Description with HTML support */}
                        <div className={styles.growText}>
                            {renderHtml ? (
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            ) : (
                                <p className={styles.herodes}>{description}</p>
                            )}
                        </div>
                        
                        <div className={styles.formDigital}>
                            <Link href="/getaquote" passHref legacyBehavior>
                                <Button className={styles.proposalButton}>
                                    Start Your Project <ArrowRightOutlined />
                                </Button>
                            </Link>
                            <Link href="/portfolio" passHref legacyBehavior>
                                <Button className={styles.secondaryButton}>
                                    View Our Portfolio
                                </Button>
                            </Link>
                        </div>

                        {/* Social proof section */}
                        <div className={styles.socialProof}>
                            <div className={styles.avatarGroup}>
                                <span className={`${styles.avatar} ${styles.av1}`}>A</span>
                                <span className={`${styles.avatar} ${styles.av2}`}>B</span>
                                <span className={`${styles.avatar} ${styles.av3}`}>C</span>
                                <span className={`${styles.avatar} ${styles.av4}`}>D</span>
                            </div>
                            <div className={styles.ratingInfo}>
                                <div className={styles.stars}>
                                    <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
                                </div>
                                <span className={styles.ratingText}>500+ businesses served coast to coast</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean Image */}
                    <div className={styles.heroImageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={backgroundImage}
                                alt={heading}
                                fill
                                style={{ objectFit: 'cover' }}
                                quality={100}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SubHeroDigitalMarketing;
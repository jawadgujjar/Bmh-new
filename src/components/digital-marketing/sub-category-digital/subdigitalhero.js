import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from '../../../styles/digital-marketing/sub-category-digital/subdigitalhero.module.css';
import Image from 'next/image';

function SubHeroDigitalMarketing({ 
  backgroundImage = "/images/hero.jpg", 
  heading = "SEO Company Services",
  description = "Drive more traffic, boost your search engine rankings, and grow your business online with our expert SEO strategies tailored to your industry and audience.",
  renderHtml = false
}) {
    return (
        <div className={styles.backheroDigital}>
            <div className={styles.backgroundImage}>
                <Image
                    src={backgroundImage}
                    alt={heading}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>

            <div className={styles.mainHerodigital}>
                <h1 className={styles.heroFirstText}>{heading}</h1>
                
                {/* Description with HTML support */}
                <div className={styles.growText}>
                    {renderHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    ) : (
                        <p>{description}</p>
                    )}
                </div>
                
                <div className={styles.formDigital}>
                    <Link href="/getaquote" passHref>
                        <Button className={styles.proposalButton}>Get My Free SEO Proposal</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SubHeroDigitalMarketing;
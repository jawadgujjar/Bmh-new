"use client";
import { useRouter } from 'next/navigation';
import { TiSocialFacebook, TiSocialYoutubeCircular } from 'react-icons/ti';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { Button, Modal, Row, Col } from 'antd';
import styles from '../../styles/portfoliomodal.module.css';
import { useEffect, useState } from 'react';

const PortfolioModal1 = ({ isVisible, onClose, url }) => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isMobile = windowSize.width <= 768;

  return (
    <Modal
      title="Website Preview"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      width={isMobile ? '95%' : Math.min(windowSize.width * 0.8, 900)}
      className={styles.modalContainer}
      style={{ 
        position: 'fixed',
        top: '80px', // Adjusted to appear below navbar
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1001,
        padding: 0,
        margin: 0
      }}
      bodyStyle={{
        padding: 0,
        height: isMobile ? 'calc(100vh - 100px)' : 'calc(100vh - 120px)',
        maxHeight: '800px',
        overflow: 'hidden'
      }}
    >
      <Row gutter={0} className={styles.modalRow}>
        <Col xs={24} md={16} className={styles.websiteCol}>
          <div className={styles.websitePreviewContainer}>
            <iframe 
              src={url}
              className={styles.websiteIframe}
              title="Website Preview"
              sandbox="allow-same-origin allow-scripts"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </Col>
        
        <Col xs={24} md={8} className={styles.contactCol}>
          <div className={styles.portfolioModalFooter}>
            <div className={styles.allLogosContact}>
              <a href="#" className={styles.socialLink}><TiSocialFacebook /></a>
              <a href="#" className={styles.socialLink}><RiTwitterXFill /></a>
              <a href="#" className={styles.socialLink}><FaLinkedinIn /></a>
              <a href="#" className={styles.socialLink}><TiSocialYoutubeCircular /></a>
              <a href="#" className={styles.socialLink}><AiFillInstagram /></a>
            </div>

            <div className={styles.contactInfo}>
              <p className={styles.fontsizeCall}>
                <span className={styles.callusText}>Call Us</span> at
                <a href="tel:+1234567890" className={styles.phoneLink}>
                  +123-456-7890
                </a>
              </p>
              <Button
                type="primary"
                className={styles.discoverButton1}
                onClick={() => router.push('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default PortfolioModal1;
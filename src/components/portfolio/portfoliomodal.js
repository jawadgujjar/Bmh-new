"use client";
import { useRouter } from 'next/navigation';
import { TiSocialFacebook, TiSocialYoutubeCircular } from 'react-icons/ti';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import styles from '../../styles/portfoliomodal.module.css';

const PortfolioModal1 = ({ isVisible, onClose, images }) => {
  const router = useRouter();

  return (
    <Modal
      title="Portfolio Images"
      open={isVisible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className={styles.modalContainer}
    >
      <div className={styles.portfolioModalBody}>
        <div className={styles.portfolioModalImages}>
          {images.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <Image
                src={image}
                alt={`Modal Image ${index + 1}`}
                className={styles.portfolioModalImage}
                width={400}
                height={300}
                layout="responsive"
              />
            </div>
          ))}
        </div>

        <div className={styles.portfolioModalFooter}>
          <div className={styles.allLogosContact}>
            <div className={styles.divLogos}><TiSocialFacebook /></div>
            <div className={styles.divLogos}><RiTwitterXFill /></div>
            <div className={styles.divLogos}><FaLinkedinIn /></div>
            <div className={styles.divLogos}><TiSocialYoutubeCircular /></div>
            <div className={styles.divLogos}><AiFillInstagram /></div>
            {/* REMOVE FaThreads — it doesn’t exist */}
          </div>

          <div className={styles.fontsizeCall}>
            <p>
              <span className={styles.callusText}>Call Us</span> at
              <a href="tel:+1234567890" className={styles.phoneLink}>
                +123-456-7890
              </a>
            </p>
          </div>

          <div>
            <Button
              className={styles.discoverButton1}
              onClick={() => router.push('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PortfolioModal1;

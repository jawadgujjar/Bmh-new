"use client";
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Avatar, Rate, Modal } from 'antd'; // Modal add kiya
import { CheckCircleFilled } from '@ant-design/icons';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from '../../styles/carousel.module.css';

const carouselItems = [
  {
    name: "olive",
    review: "Deuxième session réussie pour moi et mon collègue, toujours aussi bien organisé pour Budapest, la clinique parfaite, le personnel au petits soins, on ne pense pas qu'il y aurait autant de confort. Je recommande vivement l'expérience pour tous ceux qui hésitent encore."
  },
  {
    name: "Francis Hughes",
    review: "I cannot recommend the team at HairPalace enough... they really went above and beyond, and made me feel exceptionally comfortable. Big thanks to the doctors and the coordinators for making this a smooth journey."
  },
  {
    name: "Mainsail WebDesign",
    review: "We just signed up for the service and so far so good. I like that they don't stop improving and there seem to be a lot of options. It will take time to figure it all out, but the support has been top-notch."
  }
];

const Carousel = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null); // Modal data state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showModal = (item) => {
    setSelectedReview(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderItems = () => (
    carouselItems.map((item, index) => (
      <div className={styles.carouselItemContent} key={index}>
        <div className={styles.carouselCard}>
          <div className={styles.cardHeader}>
            <Avatar className={styles.avatarReview}>
              {item.name.charAt(0).toUpperCase()}
            </Avatar>
            <h5 className={styles.name}>{item.name}</h5>
          </div>

          <div className={styles.ratingLine}>
            <Rate disabled defaultValue={5} className={styles.ratingStars} style={{ color: '#ffb400' }} />
            <span className={styles.blueTick}>
              <CheckCircleFilled />
            </span>
          </div>

          <p className={styles.review}>{item.review}</p>
          
          <span className={styles.readMore} onClick={() => showModal(item)}>
            Read more
          </span>
        </div>
      </div>
    ))
  );

  if (!isClient) return null;

  return (
    <div className={styles.customerDiv}>
      <h1 className={styles.customers}><span className={styles.blackText}>What Our </span> Clients Say</h1>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <AliceCarousel
            mouseTracking
            items={renderItems()}
            responsive={{ 0: { items: 1 }, 768: { items: 2 }, 1024: { items: 3 } }}
            autoPlay
            autoPlayInterval={3000}
            infinite
            disableButtonsControls
            disableDotsControls
          />
        </div>
      </div>

      {/* --- Review Modal --- */}
      <Modal
        title="Full Review"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className={styles.reviewModal}
      >
        {selectedReview && (
          <div style={{ textAlign: 'left', padding: '10px' }}>
            <div className={styles.cardHeader}>
              <Avatar className={styles.avatarReview}>
                {selectedReview.name.charAt(0).toUpperCase()}
              </Avatar>
              <h5 className={styles.name}>{selectedReview.name}</h5>
            </div>
            <div className={styles.ratingLine}>
                <Rate disabled defaultValue={5} className={styles.ratingStars} style={{ color: '#ffb400' }} />
                <span className={styles.blueTick}><CheckCircleFilled /></span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
              {selectedReview.review}
            </p>
          </div>
        )}
      </Modal>

      <div className={styles.divider}></div>
    </div>
  );
};

export default Carousel;
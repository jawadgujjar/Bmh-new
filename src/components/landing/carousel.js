"use client";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Avatar, Rate, Modal } from "antd"; 
import { CheckCircleFilled } from "@ant-design/icons";
import "react-alice-carousel/lib/alice-carousel.css";
import styles from "../../styles/carousel.module.css";

const carouselItems = [
  {
    name: "Marcus Vance",
    review: "Our Google Merchant Center feed was a mess with constant policy disapproval errors, and we were losing serious e-commerce revenue. The team at Brand Marketing Hub sorted out the technical data issues within two weeks. Our product visibility in the US market is now back on track. Extremely professional and direct communication.",
  },
  {
    name: "Sarah Jenkins ",
    review: "We hired Brand Marketing Hub to handle our site migration and fix our drop in organic rankings. They didn't just give us generic advice; they delivered a solid technical audit and fixed our crawl budget issues. Our organic traffic is up by 40% over the last two quarters. Highly competent team.",
  },
  {
    name: "David K.",
    review: "Finding a marketing partner that understands B2B search intent is rare. Most agencies just chase empty traffic numbers. Brand Marketing Hub built a content and search strategy that targets high-value buyers. The quality of inbound leads coming through our landing pages has completely shifted.",
  },
   {
    name: "Elena Rostova",
    review: " Working with Brand Marketing Hub has been a smooth experience. They took over our entire digital footprint, from search optimization to targeted ad spend. What I appreciate most is their transparent reporting—no vanity metrics or fluff, just clear data showing our monthly growth and ROI.",
  },
   {
    name: "Robert Lawson",
    review: "As a manufacturing business, we needed our website to establish industry authority. They helped us restructure our site architecture and clean up our technical SEO. The workflow is very structured, and they always deliver on deadlines without needing constant follow-ups.",
  },
   {
    name: "Chloe Miller",
    review: "Our old website was slow, outdated, and failing to convert mobile traffic. Brand Marketing Hub completely redesigned and rebuilt our platform from scratch. They didn't just build a pretty site; they focused heavily on clean code, fast loading speeds, and an intuitive user flow. The new platform handles our traffic spikes smoothly and has significantly improved our user engagement metrics.",
  },
   {
    name: "Jonathan Cruz",
    review: "Our field operations team needed a custom mobile tracking app that could sync with our central database in real time. Brand Marketing Hub built a highly stable cross-platform application that completely streamlined our workflow. The backend integration is flawless, and the application handles offline data storage without any glitches. Excellent technical execution.",
  },
];

const Carousel = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
[]
  const showModal = (item) => {
    setSelectedReview(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderItems = () =>
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
            <Rate
              disabled
              defaultValue={5}
              style={{ color: "#ffb400", fontSize: "14px" }}
            />
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
    ));

  if (!isClient) return null;

  return (
    <div className={styles.customerDiv}>
      <h1 className={styles.customers}>
        <span className={styles.blackText}>What Our </span> Clients Say
      </h1>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <AliceCarousel
            mouseTracking
            items={renderItems()}
            responsive={{
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 3 },
            }}
            autoPlay
            autoPlayInterval={3000}
            infinite
            disableButtonsControls
            disableDotsControls
          />
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className={styles.reviewModal}
      >
        {selectedReview && (
          <div style={{ textAlign: "left", padding: "10px" }}>
            <div className={styles.cardHeader}>
              <Avatar className={styles.avatarReview}>
                {selectedReview.name.charAt(0).toUpperCase()}
              </Avatar>
              <h5 className={styles.name}>{selectedReview.name}</h5>
            </div>
            <div className={styles.ratingLine}>
              <Rate
                disabled
                defaultValue={5}
                style={{ color: "#ffb400", fontSize: "14px" }}
              />
              <span className={styles.blueTick}>
                <CheckCircleFilled />
              </span>
            </div>
            {/* Class apply kar di gai hai readability fix karne ke liye */}
            <p className={styles.modalReviewText}>
              {selectedReview.review}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Carousel;
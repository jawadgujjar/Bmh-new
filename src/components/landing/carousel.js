import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Card, Avatar } from 'antd';
import { Rate } from 'antd';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from '../../styles/carousel.module.css';

// Carousel items
const carouselItems = [
  {
    img: "/images/download.jpg",
    name: "John Wick",
    occupation: "Broker – About Roatan Real Estate",
    review: "“Thrive exceeded our expectations in every way. They are honest, reliable, and handle all needs quickly. They deliver on their promises without any fuss.”"
  },
  {
    img: "/images/download.jpg",
    name: "ACP",
    occupation: "Practice Manager – PARC Urology",
    review: "“Thrive is incredible. They helped us grow our business so much that our biggest challenge now is managing the overflow. We're exactly where we wanted to be, thanks to them.”"
  },
  {
    img: "/images/download.jpg",
    name: "NINI",
    occupation: "CEO – Accurate Leak and Line",
    review: "“Working with Thrive has been a pleasure. Their dedication, exceptional support, and attention to our needs make us excited for a long-term partnership.”"
  }
];

const Carousel = () => {
  const carouselRef = React.useRef(null);

  // Render carousel items
  const renderItems = () => (
    carouselItems.map((item, index) => (
      <div className={styles.carouselItemContent} key={index}>
        <Card className={styles.carouselCard}>
          <Avatar className={styles.avatarReview} src={item.img} />
          <h5 className={styles.name}>{item.name}</h5>
          <p className={styles.occupation}>{item.occupation}</p>
          <Rate disabled defaultValue={5} className={styles.rating} />
          <p className={styles.review}>{item.review}</p>
        </Card>
      </div>
    ))
  );

  return (
    <div className={styles.customerDiv}>
      <h1 className={styles.customers}>What Our Clients Say</h1>
      <p className={styles.customer}>Real stories from clients showcasing our exceptional service and results.</p>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          <AliceCarousel
            ref={carouselRef}
            items={renderItems()}
            responsive={{
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 3 },
            }}
            controlsStrategy="alternate"
            autoPlay
            autoPlayInterval={4000}
            infinite
            disableButtonsControls={true}  // This removes navigation arrows
            disableDotsControls={true}     // This removes dots navigation
          />
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default Carousel;
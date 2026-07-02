import React from "react";
import styles from "../../styles/digital-marketing/aboutdigital.module.css"; // Using CSS Modules
import { Row, Col } from "antd";
import Image from "next/image"; // Using Next.js Image component

function Aboutdigital() {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center" gutter={[24, 24]}>
        <Col
          xs={18} // Full width on extra small screens
          sm={18} // Full width on small screens
          md={12} // Half width on medium screens
          lg={10} // Slightly narrower on large screens
          xl={10} // Slightly narrower on extra large screens
        >
          <div className={styles.para}>
            <p className={styles.provenTextDigital}>
              Built for Startups. Focused on Growth That Holds.
            </p>
            {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
            <div className={styles.allTextDigital}>
              <p>
                Early-stage companies don't need a bigger agency. They need the right one. As a dedicated digital marketing agency for startups, BMH works with bootstrapped brands and funded teams that need fast traction, low customer acquisition costs, and a marketing partner who understands the pressure of proving ROI before the next funding round.
              </p>
              <p>
                We skip the fluff and get straight to what drives growth. Our agile execution model means your campaigns are live fast, optimized faster, and always tied to real numbers.
              </p>

              <ul>
                <li>Strategies built around your CAC targets and growth timeline</li>
                <li>Multi-channel customer acquisition from day one</li>
                <li>Scalable marketing frameworks that grow as your company grows</li>
              </ul>

              <p>
                Want to see what your growth potential looks like? Our international SEO services are a strong starting point for startups targeting global reach.
              </p>
            </div>
          </div>
          {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
        </Col>
        <Col
          xs={22} // Full width on extra small screens
          sm={22} // Full width on small screens
          md={10} // Half width on medium screens
          lg={10} // Slightly narrower on large screens
          xl={10} // Slightly narrower on extra large screens
        >
          <div className={styles.imageContainer}>
            <Image
              src="/images/digital-marketing/Digital Marketing Agency for Startups.webp"
              alt="about-digital"
              width={500}
              height={450}
              layout="responsive"
              quality={100}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Aboutdigital;

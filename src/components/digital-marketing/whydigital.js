import React from "react";
import styles from "../../styles/digital-marketing/whydigital.module.css"; // Using CSS Modules
import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image"; // Using Next.js Image component

function Whydigital() {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center" gutter={[24, 24]}>
        <Col
          xs={22} // Full width on extra small screens
          sm={22} // Full width on small screens
          md={10} // Half width on medium screens
          lg={10} // Slightly narrower on large screens
          xl={10} // Slightly narrower on extra large screens
        >
          <div className={styles.imageContainer}>
            <Image
              src="/images/digital-marketing/Digital Marketing Agency USA Startups Can Rely On.webp"
              alt="about-digital"
              width={500}
              height={450}
              layout="responsive"
              quality={100}
            />
          </div>
        </Col>
        <Col
          xs={18} // Full width on extra small screens
          sm={18} // Full width on small screens
          md={12} // Half width on medium screens
          lg={10} // Slightly narrower on large screens
          xl={10} // Slightly narrower on extra large screens
        >
          <div className={styles.para}>
            <p className={styles.provenTextDigital}>
              Why Startups Across the USA Choose BMH Over Bigger Agencies
            </p>
            {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
            <p className={styles.allTextDigital}>
              Big agencies take big retainers and assign you to a junior team. BMH gives every client a senior-level strategy from the first call. We are recognized as one of the top digital marketing company in USA because we treat startup budgets with the same seriousness as enterprise spend — just with faster decisions and zero bureaucracy.
              Our team brings fractional CMO capabilities to brands that are not ready for a full-time hire. You get the strategic depth of a seasoned digital marketing consultancy combined with the execution speed of a hands-on specialized team.

            </p>
          </div>
          {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
        </Col>
      </Row>
      <div className={styles.callactionButton}>
        <Link href="/getaquote" passHref>
          <Button className={styles.proposalButton}>
              See What Sets BMH Apart  → 
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Whydigital;

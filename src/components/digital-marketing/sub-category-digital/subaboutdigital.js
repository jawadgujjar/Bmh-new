import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subaboutdigital.module.css";
import { Row, Col } from "antd";
import Image from "next/image";

function SubAboutdigital({
  heading = "About This Service",
  description1 = "No about description", // Main description
  image1 = "/default-image.jpg", // First image from database
}) {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center">
        <Col
          xs={18}
          sm={18}
          md={12}
          lg={10}
          xl={10}
        >
          {/* <p className={styles.provenTextDigital}>{heading || description1}</p>  */}
          <p className={styles.allTextDigital}>{description1}</p>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={10}
          lg={10}
          xl={10}
        >
          <div className={styles.imageContainer}>
            <div>
              <Image
                src={image1}
                alt="image-1"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SubAboutdigital;
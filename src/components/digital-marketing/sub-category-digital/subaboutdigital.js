import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subaboutdigital.module.css";
import { Row, Col } from "antd";
import Image from "next/image";

function SubAboutdigital({
  heading = "About This Service",
  description1 = "No about description", // Main description
  image1 = "/default-image.jpg", // First image from database
  image2 = "/default-image2.jpg", // Second image from database
  description2 = "", // Second description
  renderHtml = false
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
          {/* Heading */}
          <h2 className={styles.provenTextDigital}>{heading}</h2> 
          
          {/* First Description with HTML support */}
          <div className={styles.allTextDigital}>
            {renderHtml ? (
              <div dangerouslySetInnerHTML={{ __html: description1 }} />
            ) : (
              <p>{description1}</p>
            )}
          </div>
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
      
      {/* Second Description (if available) */}
      {description2 && (
        <Row justify="center" style={{ marginTop: "40px" }}>
          <Col xs={22} sm={22} md={20} lg={20} xl={20}>
            <div className={styles.allTextDigital}>
              {renderHtml ? (
                <div dangerouslySetInnerHTML={{ __html: description2 }} />
              ) : (
                <p>{description2}</p>
              )}
            </div>
          </Col>
        </Row>
      )}
      
      {/* Second Image (if available) */}
      {image2 && (
        <Row justify="center" style={{ marginTop: "30px" }}>
          <Col xs={22} sm={22} md={10} lg={10} xl={10}>
            <div className={styles.imageContainer}>
              <div>
                <Image
                  src={image2}
                  alt="image-2"
                  width={500}
                  height={400}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default SubAboutdigital;
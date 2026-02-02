import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subwhydigital.module.css";
import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";

function SubWhydigital({
  heading = "Why Choose Us",
  description = "No why choose description", // Should be middleSection.description1
  description2 = "", // Should be middleSection.description2
  conclusion = "",
  image1 = "/default-image.jpg", // middleSection.image1
  image2 = "/default-image2.jpg", // middleSection.image2
  buttonText = "Learn More",
  renderHtml = false
}) {
  return (
    <div className={styles.aboutdigitalMain}>
      {/* Heading Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{heading}</h2>
      </div>
      
      <Row justify="center" align="middle" gutter={[30, 30]}>
        {/* First Description Column */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.descriptionColumn}>
            <div className={styles.allTextDigital}>
              {renderHtml && description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <p>{description}</p>
              )}
            </div>
          </div>
        </Col>
        
        {/* First Image Column */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainer}>
            <div>
              <Image
                src={image1}
                alt="why-digital-1"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </div>
        </Col>
      </Row>
      
      <Row justify="center" align="middle" gutter={[30, 30]} style={{ marginTop: "40px" }}>
        {/* Second Image Column */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.imageContainer}>
            <div>
              <Image
                src={image2}
                alt="why-digital-2"
                width={500}
                height={400}
                layout="responsive"
                quality={100}
              />
            </div>
          </div>
        </Col>
        
        {/* Second Description Column */}
        <Col xs={22} sm={22} md={10} lg={10} xl={10}>
          <div className={styles.descriptionColumn}>
            {description2 && (
              <div className={styles.allTextDigital}>
                {renderHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: description2 }} />
                ) : (
                  <p>{description2}</p>
                )}
              </div>
            )}
            
            {/* Conclusion (if available) */}
            {conclusion && (
              <div className={styles.conclusionText}>
                {renderHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: conclusion }} />
                ) : (
                  <p>{conclusion}</p>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
      
      {/* Button Section */}
      <div className={styles.callactionButton}>
        <Link href="/getaquote" passHref>
          <Button className={styles.proposalButton}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}

export default SubWhydigital;
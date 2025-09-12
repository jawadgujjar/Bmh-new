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
  image2 = "/default-image.jpg", // middleSection.image2
  buttonText = "Learn More",
}) {
  return (
    <div className={styles.aboutdigitalMain}>
      <Row justify="center">
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
        <Col
          xs={18}
          sm={18}
          md={12}
          lg={10}
          xl={10}
        >
          {description2 && <p className={styles.allTextDigital}>{description2}</p>}
          {/* {conclusion && <p className={styles.allTextDigital}>{conclusion}</p>} */}
        </Col>
      </Row>
      <div className={styles.callactionButton}>
        <Link href="/getaquote" passHref>
          <Button className={styles.proposalButton}>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}

export default SubWhydigital;
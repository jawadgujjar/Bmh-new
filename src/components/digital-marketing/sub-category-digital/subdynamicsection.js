import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subdynamicsection.module.css";
import Link from "next/link";
import { Row, Col, Button } from "antd";
import Image from "next/image";

function SubDynamicSection({
  layoutType = "description-only",
  heading = "",
  description = "",
  image = "",
  cta = null,
  index = 0
}) {
  
  // Render description with HTML support
  const renderDescription = () => {
    if (!description) return null;
    
    return (
      <div className={styles.descriptionContent}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
  };

  // Render CTA button if available
  const renderCTA = () => {
    if (!cta?.ctaId) return null;
    
    // You can access cta.ctaId data here (populated from backend)
    // For now using buttonVariant from ctaRef
    return (
      <div className={styles.ctaContainer}>
        <Link href={cta.ctaId?.link || "/getaquote"} passHref>
          <Button 
            className={`${styles.dynamicCtaButton} ${styles[cta.buttonVariant || 'primary']}`}
          >
            {cta.ctaId?.text || "Learn More"}
          </Button>
        </Link>
      </div>
    );
  };

  // Image layout component
  const renderImageLayout = (imagePosition) => {
    const isImageLeft = imagePosition === "left";
    
    return (
      <Row justify="center" align="middle" gutter={[30, 30]} className={styles.dynamicSection}>
        {heading && (
          <Col span={24}>
            <h2 className={styles.sectionHeading}>{heading}</h2>
          </Col>
        )}
        
        {isImageLeft ? (
          <>
            {/* Image Left */}
            <Col xs={22} sm={22} md={10} lg={10} xl={10}>
              <div className={styles.imageContainer}>
                <Image
                  src={image || "/default-image.jpg"}
                  alt={heading || "Section image"}
                  width={500}
                  height={400}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </Col>
            
            {/* Description Right */}
            <Col xs={22} sm={22} md={10} lg={10} xl={10}>
              <div className={styles.contentContainer}>
                {renderDescription()}
                {renderCTA()}
              </div>
            </Col>
          </>
        ) : (
          <>
            {/* Description Left */}
            <Col xs={22} sm={22} md={10} lg={10} xl={10}>
              <div className={styles.contentContainer}>
                {renderDescription()}
                {renderCTA()}
              </div>
            </Col>
            
            {/* Image Right */}
            <Col xs={22} sm={22} md={10} lg={10} xl={10}>
              <div className={styles.imageContainer}>
                <Image
                  src={image || "/default-image.jpg"}
                  alt={heading || "Section image"}
                  width={500}
                  height={400}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </Col>
          </>
        )}
      </Row>
    );
  };

  // Description only layout
  const renderDescriptionOnly = () => {
    return (
      <Row justify="center" className={styles.dynamicSection}>
        <Col xs={22} sm={22} md={16} lg={14} xl={12}>
          {heading && <h2 className={styles.sectionHeading}>{heading}</h2>}
          {renderDescription()}
          {renderCTA()}
        </Col>
      </Row>
    );
  };

  // Main render based on layout type
  const renderSection = () => {
    switch(layoutType) {
      case "image-left":
        return renderImageLayout("left");
      case "image-right":
        return renderImageLayout("right");
      case "description-only":
      default:
        return renderDescriptionOnly();
    }
  };

  return (
    <div className={`${styles.sectionWrapper} ${styles[`layout-${layoutType}`]}`}>
      {renderSection()}
    </div>
  );
}

export default SubDynamicSection;
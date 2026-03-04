import React from "react";
import styles from "../../../styles/digital-marketing/sub-category-digital/subaboutdigital.module.css";
import { Row, Col, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

function SubAboutdigital({
  layoutType = "image-right",
  heading = "About This Service",
  description1 = "No about description",
  image1 = "",
  image2 = "",
  description2 = "",
  cta = null,
  renderHtml = false
}) {
  
  // Determine if this is description-only layout
  const isDescriptionOnly = layoutType === "description-only";
  
  // Determine image position for image layouts
  const isImageLeft = layoutType === "image-left";
  
  // Render CTA button - UPDATED to match DescriptionAndFormSection style
  const renderCTA = () => {
    if (!cta?.ctaId) return null;
    
    // API se button text
    const buttonText = cta.ctaId?.buttonText || cta.ctaId?.title || cta.ctaId?.text || cta.ctaId?.name || "Learn More";
    const buttonLink = cta.ctaId?.buttonLink || cta.ctaId?.link || cta.ctaId?.url || "/getaquote";
    
    return (
      <div className={styles.ctaWrapper}>
        <div className={styles.ctaGradient}>
          {/* Animated Line */}
          <div className={styles.animatedLine}></div>
          
          <div className={styles.titleWrapper}>
            <span className={styles.circle}></span>
            <h2 className={styles.ctaMainTitle}>
              {cta.ctaId?.title || "Take Your Business to Next Level"}
            </h2>
            <span className={styles.circle}></span>
          </div>

          <p className={styles.ctaDescription}>
            {cta.ctaId?.description || "Get started with our professional services today"}
          </p>
          
          <Link href={buttonLink} passHref legacyBehavior>
            <Button className={styles.ctaButton}>
              {buttonText}
              <span className={styles.arrowIcon}>→</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.aboutdigitalMain}>
      {/* Main section with heading and description */}
      <div className={styles.container}>
        <Row justify="center" align="middle" gutter={[30, 30]}>
          {/* Heading */}
          <Col xs={24} md={22} lg={20}>
            <div className={styles.headingWrapper}>
              <h2 className={styles.provenTextDigital}>{heading}</h2>
            </div>
          </Col>
          
          {isDescriptionOnly ? (
            // Description Only Layout
            <Col xs={24} md={20} lg={16}>
              <div className={styles.allTextDigital}>
                {renderHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: description1 }} />
                ) : (
                  <p>{description1}</p>
                )}
              </div>
            </Col>
          ) : isImageLeft ? (
            // Image Left, Description Right
            <>
              {image1 && (
                <Col xs={24} md={11}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={image1}
                      alt={heading}
                      width={500}
                      height={400}
                      layout="responsive"
                      quality={100}
                    />
                  </div>
                </Col>
              )}
              
              <Col xs={24} md={11}>
                <div className={styles.allTextDigital}>
                  {renderHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: description1 }} />
                  ) : (
                    <p>{description1}</p>
                  )}
                </div>
              </Col>
            </>
          ) : (
            // Image Right, Description Left
            <>
              <Col xs={24} md={11}>
                <div className={styles.allTextDigital}>
                  {renderHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: description1 }} />
                  ) : (
                    <p>{description1}</p>
                  )}
                </div>
              </Col>
              
              {image1 && (
                <Col xs={24} md={11}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={image1}
                      alt={heading}
                      width={500}
                      height={400}
                      layout="responsive"
                      quality={100}
                    />
                  </div>
                </Col>
              )}
            </>
          )}
        </Row>
        
        {/* Second Description */}
        {description2 && !isDescriptionOnly && (
          <Row justify="center" style={{ marginTop: "40px" }}>
            <Col xs={24} md={22} lg={20}>
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
        
        {/* Second Image */}
        {image2 && !isDescriptionOnly && (
          <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={11}>
              <div className={styles.imageContainer}>
                <Image
                  src={image2}
                  alt="image-2"
                  width={500}
                  height={400}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </Col>
          </Row>
        )}
      </div>

      {/* CTA Section */}
      {renderCTA()}
    </div>
  );
}

export default SubAboutdigital;
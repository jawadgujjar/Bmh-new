"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/webdevelopment.module.css";
import { 
  FaBullseye, 
  FaCode, 
  FaRocket, 
  FaHeadset, 
  FaShieldAlt, 
  FaChartLine, 
  FaGlobe, 
  FaCheckCircle, 
  FaUsers, 
  FaAward 
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Webdevelopment1 = () => {
  return (
    <div className={styles.mainWrapper}>
      
      {/* ================= SECTION 1 ================= */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <div className={styles.badgeTag}>
              <FaCode className={styles.badgeIcon} /> CUSTOM WEBSITE DEVELOPMENT
            </div>
            <h2>
              Company That Builds <br />
              Websites With a <span className={styles.span}>Purpose</span>
            </h2>
            <p className={styles.sectionParagraph}>
              Your website is not a digital brochure. It is the most active salesperson your business has — working around the clock, making first impressions, qualifying leads, and converting visitors into customers. In today's digital-first market, that distinction matters more than ever.
              <br /><br />
              As a <a href="https://brandmarketinghub.com/full-stack-development-services" style={{ color: '#FF8400', textDecoration: 'none', fontWeight: 600 }}>full stack development services</a> team, we build websites that are visually strong, technically reliable, and built to perform under real business conditions.
              <br /><br />
              We don't sell templates dressed up as custom work. Every project starts with your business goals, your audience, and the outcomes you need. From there, we build — thoughtfully, precisely, and with a long-term view of what your digital presence needs to do for you.
            </p>

            <div className={styles.inlineCardsGrid}>
              <div className={styles.smallCard}>
                <div className={styles.iconWrapperSmall}><FaBullseye className={styles.infoIconSmall} /></div>
                <h4>Strategic Approach</h4>
                <p>We align your website with your business goals and audience.</p>
              </div>
              <div className={styles.smallCard}>
                <div className={styles.iconWrapperSmall}><FaCode className={styles.infoIconSmall} /></div>
                <h4>Custom Built</h4>
                <p>No templates. Every website is designed and developed from scratch.</p>
              </div>
              <div className={styles.smallCard}>
                <div className={styles.iconWrapperSmall}><FaRocket className={styles.infoIconSmall} /></div>
                <h4>Performance Focused</h4>
                <p>Fast, secure, and optimized to perform under real business conditions.</p>
              </div>
              <div className={styles.smallCard}>
                <div className={styles.iconWrapperSmall}><FaHeadset className={styles.infoIconSmall} /></div>
                <h4>Reliable Support</h4>
                <p>Long term support and partnership you can count on.</p>
              </div>
            </div>

            <div className={styles.ctaButtonWrapperLeft}>
              <Link href="/getaquote" className={styles.ctaButton}>
                Let's Build Your Website <FiArrowRight />
              </Link>
            </div>
          </div>
          
          <div className={styles.imageContentColumn}>
            <div className={styles.imageWrapperMain}>
              <Image
                src="/images/web-development/Professional Website Development Company in USA.webp"
                alt="Web development services"
                width={560}
                height={400}
                className={styles.image}
                quality={100}
                priority
              />
              {/* Perfectly inline stats row with completely removed background */}
              <div className={styles.statsInlineRow}>
                <div className={styles.statBoxItem}>
                  <FaUsers className={styles.statIconItem} />
                  <div>
                    <span className={styles.statNumItem}>100+</span>
                    <span className={styles.statTextItem}>Happy Clients</span>
                  </div>
                </div>
                <div className={styles.statDividerLine}></div>
                <div className={styles.statBoxItem}>
                  <FaAward className={styles.statIconItem} />
                  <div>
                    <span className={styles.statNumItem}>11+</span>
                    <span className={styles.statTextItem}>Years Experience</span>
                  </div>
                </div>
                <div className={styles.statDividerLine}></div>
                <div className={styles.statBoxItem}>
                  <FaRocket className={styles.statIconItem} />
                  <div>
                    <span className={styles.statNumItem}>300+</span>
                    <span className={styles.statTextItem}>Projects Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION 2 ================= */}
      <section className={styles.alternateSection}>
        <div className={styles.containerReverse}>
          <div className={styles.textContent}>
            <div className={styles.badgeTag}>
              <FaShieldAlt className={styles.badgeIcon} /> BUILT AROUND YOU
            </div>
            <h2>
              What Makes a Website Truly Custom — And <span className={styles.span}>Why It Matters</span>
            </h2>
            
            <div className={styles.checkPointList}>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <p>Custom website development closes that gap. When your site is built around your actual workflows, your actual customer journey, and your actual brand identity, every element has a reason to exist.</p>
              </div>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <p><a href="https://brandmarketinghub.com/front-end-development-services" style={{ color: '#FF8400', textDecoration: 'none', fontWeight: 600 }}>Front end web development services</a> at Brand Marketing Hub focus on creating interfaces that are not just attractive but intuitive, fast, and aligned with how your target audience thinks.</p>
              </div>
              <div className={styles.checkItem}>
                <FaCheckCircle className={styles.checkIcon} />
                <p>A custom-built website also gives you ownership. You are not locked into platform limitations or theme developer schedules. You own the code, the architecture, and the direction.</p>
              </div>
            </div>

            <div className={styles.ctaButtons}>
              <Link href="/getaquote" className={styles.ctaButton}>
                Let's Build a Website That Works for You <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className={styles.imageContentColumn}>
            <div className={styles.imageWrapperMain}>
              <Image
                src="/images/web-development/Custom Website Development Built Around Real Business Needs.webp"
                alt="Web development services"
                width={560}
                height={400}
                className={styles.imageTall}
                quality={100}
              />
              <div className={styles.verticalCardsGridOverlap}>
                <div className={styles.vertCard}>
                  <div className={styles.iconWrapper}><FaBullseye className={styles.infoIcon} /></div>
                  <h4>Built Around Your Goals</h4>
                  <p>Designed to match your workflow, audience, and business objectives.</p>
                </div>
                <div className={styles.vertCard}>
                  <div className={styles.iconWrapper}><FaCode className={styles.infoIcon} /></div>
                  <h4>Clean, Scalable Code</h4>
                  <p>Future-ready development with performance and scalability in mind.</p>
                </div>
                <div className={styles.vertCard}>
                  <div className={styles.iconWrapper}><FaShieldAlt className={styles.infoIcon} /></div>
                  <h4>Full Ownership & Flexibility</h4>
                  <p>You own your site, your data, and your digital infrastructure.</p>
                </div>
                <div className={styles.vertCard}>
                  <div className={styles.iconWrapper}><FaChartLine className={styles.infoIcon} /></div>
                  <h4>Stronger Results, Long-Term Growth</h4>
                  <p>Custom websites convert better and grow with your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION 3 ================= */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.imageContentColumn}>
            <div className={styles.imageWrapperMain}>
              <Image
                src="/images/web-development/Why Brand Marketing Hub.webp"
                alt="Digital agency services"
                width={520}
                height={380}
                className={styles.image}
                quality={100}
              />
            </div>
          </div>

          <div className={styles.textContent}>
            <div className={styles.badgeTag}>
              <FaGlobe className={styles.badgeIcon} /> NATIONWIDE SERVICE
            </div>
            <h2>
              Serving USA Businesses Nationwide — <span className={styles.span}>Coast to Coast</span>
            </h2>
            <p className={styles.sectionParagraph}>
              Whether you are a startup in Austin, a professional services firm in New York, or a growing e-commerce brand in Los Angeles, Brand Marketing Hub operates as a trusted website development company in USA with the capability to serve businesses nationwide. As a responsive website development company, our development standards are aligned with Google's Core Web Vitals benchmarks, ADA accessibility requirements, and US market performance expectations.
              <br /><br />
              We build websites that rank, convert, and hold up technically — because a beautiful website that nobody finds or loads slowly on a mobile connection is not doing its job.
            </p>
          </div>
        </div>

        {/* Bottom Grid for Section 3 */}
        <div className={styles.bottomInfoGridSection}>
          <div className={styles.bottomCol}>
            <div className={styles.iconWrapperSmall}><FaGlobe className={styles.infoIconSmall} /></div>
            <p className={styles.infoTextSmall}>Nationwide Coverage</p>
            <p className={styles.infoText1Small}>Proudly serving businesses in all 50 states.</p>
          </div>
          <div className={styles.bottomCol}>
            <div className={styles.iconWrapperSmall}><FaShieldAlt className={styles.infoIconSmall} /></div>
            <p className={styles.infoTextSmall}>US-Based Standards</p>
            <p className={styles.infoText1Small}>We follow highest development & security standards in the USA.</p>
          </div>
          <div className={styles.bottomCol}>
            <div className={styles.iconWrapperSmall}><FaHeadset className={styles.infoIconSmall} /></div>
            <p className={styles.infoTextSmall}>Clear & Reliable Communication</p>
            <p className={styles.infoText1Small}>Stay connected with real-time updates and transparent collaboration.</p>
          </div>
          <div className={styles.bottomCol}>
            <div className={styles.iconWrapperSmall}><FaRocket className={styles.infoIconSmall} /></div>
            <p className={styles.infoTextSmall}>On-Time, Every Time</p>
            <p className={styles.infoText1Small}>We respect deadlines and deliver results that keep your business moving.</p>
          </div>

          {/* Action Callout Box */}
          <div className={styles.actionCalloutBox}>
            <div className={styles.calloutHeader}>
              <div className={styles.iconWrapperSmallOrange}><FaRocket className={styles.infoIconWhite} /></div>
              <div>
                <p className={styles.calloutTitle}>Let's Build Something</p>
                <p className={styles.calloutSub}>Great Together</p>
              </div>
            </div>
            <p className={styles.calloutDesc}>No matter where you're located, we're ready to bring your vision to life.</p>
            <Link href="/getaquote" className={styles.ctaButtonFull}>
              Get Started Today <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Webdevelopment1;

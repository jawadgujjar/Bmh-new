import React from 'react';
import Icon from '@mdi/react';
import { 
    mdiCogOutline, 
    mdiCheckCircle, 
    mdiTarget, 
    mdiCodeTags, 
    mdiShieldCheckOutline 
} from '@mdi/js';
import styles from '../../styles/web-development/builtaround.module.css';

export default function Builtaround1() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Left Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.badge}>
            <Icon path={mdiCogOutline} size={0.7} className={styles.badgeIcon} /> 
            BUILT AROUND YOU
          </div>

          <h2 className={styles.mainTitle}>
            What Makes a Website Truly Custom — And <span className={styles.highlight}>Why It Matters</span>
          </h2>

          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              Most US businesses outgrow their website before they realize it. A template built for a general use case cannot reflect the specific way your business operates, the customers you serve, or the specific conversions you need to drive.
            </p>

            <p className={styles.description}>
              In a market where American consumers make snap judgments about brand credibility based on website quality, that gap between what your website is and what your business needs it to be costs you leads, credibility, and revenue every single day.
            </p>
          </div>

          {/* Bullet/Check Points */}
          <div className={styles.checkPointsList}>
            <div className={styles.checkItem}>
              <div className={styles.checkIconBox}>
                <Icon path={mdiCheckCircle} size={0.9} className={styles.checkIcon} />
              </div>
              <p className={styles.checkText}>
                <strong>Custom website development closes that gap.</strong> When your site is built around your actual workflows, your actual customer journey, and your actual brand identity, every element has a reason to exist.
              </p>
            </div>

            <div className={styles.checkItem}>
              <div className={styles.checkIconBox}>
                <Icon path={mdiCheckCircle} size={0.9} className={styles.checkIcon} />
              </div>
              <p className={styles.checkText}>
                At Brand Marketing Hub, our <a href="https://brandmarketinghub.com/full-stack-development-services" className={styles.inlineLink}><b>front end and web development services</b></a> focus on exactly this — creating interfaces that are not just attractive but intuitive, fast, and aligned with how your target audience thinks and behaves online.
              </p>
            </div>

            <div className={styles.checkItem}>
              <div className={styles.checkIconBox}>
                <Icon path={mdiCheckCircle} size={0.9} className={styles.checkIcon} />
              </div>
              <p className={styles.checkText}>
                A custom-built website also gives you ownership. You are not locked into a platform’s limitations, a theme developer’s update schedule, or a page builder’s structural constraints. You own the code, the architecture, and the direction, and that ownership compounds in value as your business grows.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className={styles.ctaWrapper}>
            <a href="/getaquote" className={styles.ctaButton}>
              Let's Build a Website That Works for You <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>

        {/* Right Visual & Cards Area */}
        <div className={styles.visualArea}>
          <div className={styles.visualWrapper}>
            <img 
              src="/images/web-development/Web/web.webp" 
              alt="Laptop showing custom web solutions" 
              className={styles.heroImage}
            />
            
            {/* 3 Cards Grid at the bottom of the image */}
            <div className={styles.cardsGrid}>
              
              <div className={styles.featureCard}>
                <div className={styles.cardIconBox}>
                  <Icon path={mdiTarget} size={1} className={styles.cardIcon} />
                </div>
                <h3 className={styles.cardTitle}>1. Built Around Your Goals</h3>
                <p className={styles.cardText}>Every website is strategically designed around your business objectives, target audience, and long-term growth plans—not generic templates.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.cardIconBox}>
                  <Icon path={mdiCodeTags} size={1} className={styles.cardIcon} />
                </div>
                <h3 className={styles.cardTitle}>2. Clean, Scalable Code</h3>
                <p className={styles.cardText}>We develop fast, secure, and scalable websites using clean code, making future updates and business expansion simple.</p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.cardIconBox}>
                  <Icon path={mdiShieldCheckOutline} size={1} className={styles.cardIcon} />
                </div>
                <h3 className={styles.cardTitle}>3. Full Ownership & Flexibility</h3>
                <p className={styles.cardText}>You own your website, code, and data. There are no platform restrictions, giving you complete control over future development.</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
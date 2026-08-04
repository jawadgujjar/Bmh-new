import React from 'react';
import Icon from '@mdi/react';
import { 
    mdiMapMarkerOutline, 
    mdiEarth, 
    mdiShieldCheckOutline, 
    mdiHeadset, 
    mdiRocketLaunch, 
    mdiEmailNewsletter
} from '@mdi/js';
import styles from '../../styles/web-development/coast.module.css';

export default function Coast1() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Left Side: Image + Map Badge */}
        <div className={styles.visualArea}>
          <div className={styles.imageFrame}>
            <img 
              src="/images/web-development/Web/Professional Website Development Company in USA.webp" 
              alt="Person working on computer in an office" 
              className={styles.heroImage}
            />
            <div className={styles.mapIconWrapper}>
                <img src="/images/web-development/Web/Professional Website Development Company in USA.webp" alt="USA Map" className={styles.usaMap} />
            </div>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.badge}>
            <Icon path={mdiMapMarkerOutline} size={0.8} className={styles.badgeIcon} /> 
            NATIONWIDE SERVICE
          </div>

          <h1 className={styles.mainTitle}>
            Serving USA Businesses Nationwide — <span className={styles.highlight}>Coast to Coast</span>
          </h1>

          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              Whether you are a startup in Austin, a professional services firm in New York, or a growing e-commerce brand in Los Angeles, Brand Marketing Hub operates as a trusted website development company in USA with the capability to serve businesses nationwide.
            </p>

            <p className={styles.description}>
              As a responsive website development company, our development standards are aligned with Google's 2026 Core Web Vitals benchmarks, ADA accessibility requirements, and the performance expectations of the US market.
            </p>

            <p className={styles.description}>
              We build websites that rank, convert, and hold up technically — because a beautiful website that nobody finds or that loads slowly on a 4G connection is not doing its job.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Feature Cards Row */}
      <div className={styles.bottomRow}>
        <div className={styles.container}>
            <div className={styles.featuresGrid}>
                
                <div className={styles.featureItem}>
                    <div className={styles.featureIconBox}>
                        <Icon path={mdiEarth} size={1.2} className={styles.fIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>Nationwide Coverage</h4>
                      <p className={styles.featureText}>Proudly serving businesses in all 50 states.</p>
                    </div>
                </div>

                <div className={styles.featureItem}>
                     <div className={styles.featureIconBox}>
                        <Icon path={mdiShieldCheckOutline} size={1.2} className={styles.fIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>US-Based Standards</h4>
                      <p className={styles.featureText}>We follow the highest development & security standards in the USA.</p>
                    </div>
                </div>

                <div className={styles.featureItem}>
                     <div className={styles.featureIconBox}>
                        <Icon path={mdiHeadset} size={1.2} className={styles.fIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>Clear & Reliable Communication</h4>
                      <p className={styles.featureText}>Stay connected with real-time updates and transparent collaboration.</p>
                    </div>
                </div>

                <div className={styles.featureItem}>
                     <div className={styles.featureIconBox}>
                        <Icon path={mdiRocketLaunch} size={1.2} className={styles.fIcon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>On-Time, Every Time</h4>
                      <p className={styles.featureText}>We respect deadlines and deliver results that keep your business moving.</p>
                    </div>
                </div>

                {/* CTA Card with /getaquote link */}
                <a href="/getaquote" className={styles.ctaCard}>
                    <div className={styles.ctaContent}>
                        <div className={styles.ctaIconBox}>
                            <Icon path={mdiEmailNewsletter} size={1} className={styles.ctaIcon} />
                        </div>
                        <h4 className={styles.ctaTitle}>Let's Build Something Great Together</h4>
                        <p className={styles.ctaText}>No matter where you're located, we're ready to bring your vision to life.</p>
                        <span className={styles.ctaLink}>
                            Get Started Today <span className={styles.arrow}>→</span>
                        </span>
                    </div>
                </a>

            </div>
        </div>
      </div>
    </section>
  );
}
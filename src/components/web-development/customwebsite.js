import React from 'react';
import Icon from '@mdi/react';
import { 
    mdiCogOutline, 
    mdiTarget, 
    mdiCodeTags, 
    mdiRocketLaunchOutline, 
    mdiHeadset,
    mdiAccountGroup,
    mdiTrophy,
    mdiRocket
} from '@mdi/js';
import styles from '../../styles/web-development/customwebsite.module.css';

export default function Customwebsite1() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        
        {/* Left Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.badge}>
            <Icon path={mdiCogOutline} size={0.7} className={styles.badgeIcon} /> 
            CUSTOM WEBSITE DEVELOPMENT COMPANY
          </div>

          <h1 className={styles.mainTitle}>
            That Builds Websites With a <span className={styles.highlight}>Purpose</span>
          </h1>

          <div className={styles.descriptionBlock}>
            <p className={styles.description}>
              Your website is not a digital brochure. It is the most active salesperson your business has — working around the clock, making first impressions, qualifying leads, and converting visitors into customers. For US-based businesses competing in one of the most digital-savvy markets in the world, that distinction matters more than ever in 2026. A <a href="https://brandmarketinghub.com/full-stack-development-services" className={styles.inlineLink}><b>full stack development services</b></a> team backs every project we take on, which means the websites we build are not just visually strong — they are architecturally sound, technically reliable, and built to perform under real American business conditions.
            </p>

            <p className={styles.description}>
              As a custom website development company, we do not sell templates dressed up as custom work. Every project starts with your business goals, your audience, and the outcomes you need. From there, we build — thoughtfully, precisely, and with a long-term view of what your digital presence needs to do for you.
            </p>
          </div>

          {/* Features Row */}
          <div className={styles.featuresRow}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Icon path={mdiTarget} size={0.9} className={styles.fIcon} />
              </div>
              <h3 className={styles.featureTitle}>Strategic Approach</h3>
              <p className={styles.featureText}>We align your website with your business goals and audience.</p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Icon path={mdiCodeTags} size={0.9} className={styles.fIcon} />
              </div>
              <h3 className={styles.featureTitle}>Custom Built</h3>
              <p className={styles.featureText}>No templates. Every website is designed and developed from scratch.</p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Icon path={mdiRocketLaunchOutline} size={0.9} className={styles.fIcon} />
              </div>
              <h3 className={styles.featureTitle}>Performance Focused</h3>
              <p className={styles.featureText}>Fast, secure, and optimized to perform under real business conditions.</p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Icon path={mdiHeadset} size={0.9} className={styles.fIcon} />
              </div>
              <h3 className={styles.featureTitle}>Reliable Support</h3>
              <p className={styles.featureText}>Long term support and partnership you can count on.</p>
            </div>
          </div>

          {/* CTA Button converted to Link */}
          <div className={styles.ctaWrapper}>
            <a href="/getaquote" className={styles.ctaButton}>
              Let's Build Your Website <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>

        {/* Right Visual Area (Image + Integrated Stats) */}
        <div className={styles.visualArea}>
          <div className={styles.visualWrapper}>
            <img 
              src="/images/web-development/Web/web Dev.webp" 
              alt="Team working on web development" 
              className={styles.heroImage}
            />
            
            {/* Integrated Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statIconBox}>
                    <Icon path={mdiAccountGroup} size={0.9} className={styles.statIcon} />
                </div>
                <div>
                  <h4 className={styles.statNumber}>100+</h4>
                  <p className={styles.statLabel}>Happy Clients</p>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                 <div className={styles.statIconBox}>
                    <Icon path={mdiTrophy} size={0.9} className={styles.statIcon} />
                 </div>
                <div>
                  <h4 className={styles.statNumber}>11+</h4>
                  <p className={styles.statLabel}>Years Experience</p>
                </div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={styles.statIconBox}>
                    <Icon path={mdiRocket} size={0.9} className={styles.statIcon} />
                </div>
                <div>
                  <h4 className={styles.statNumber}>300+</h4>
                  <p className={styles.statLabel}>Projects Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
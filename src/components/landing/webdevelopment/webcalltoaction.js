import React from 'react';
import styles from '../../../styles/landing/webdevelopment/webcalltoaction.module.css';

function WebCalltoaction() {
  return (
    <div className={styles.container}>
      {/* Background Balls */}
      <div className={styles.backgroundBalls}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.ball}></div>
        ))}
      </div>
      
      <div className={styles.process}>
        <h2 className={styles.processTitle}>How Our Web & App Development Process Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <button className={styles.stepButton}>01 Ideation & Planning</button>
            <p className={styles.stepDescription}>
              Share your vision, goals, and functionality requirements for both web and mobile platforms to kickstart the process.
            </p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>02 Design & Development</button>
            <p className={styles.stepDescription}>
              We design and develop responsive websites and intuitive mobile apps that are fast, scalable, and tailored to your industry needs.
            </p>
          </div>
          <div className={styles.arrow}>&rarr;</div>
          <div className={styles.step}>
            <button className={styles.stepButton}>03 Launch & Delivery</button>
            <p className={styles.stepDescription}>
              After rigorous testing, we ensure smooth deployment of your website and app, delivering on time and with full support.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.webDevSection}>
        <h2 className={styles.webDevTitle}>Web & App Development Solutions That Drive Growth</h2>
        <p className={styles.webDevSubtitle}>
          From idea to execution, we build modern websites and mobile applications that are fast, user-friendly, 
          and designed to scale with your business. Let’s transform your vision into reality with innovative digital solutions.
        </p>
        <button className={styles.getStartedButton}>Schedule a Meeting</button>
      </div>
    </div>
  );
}

export default WebCalltoaction;

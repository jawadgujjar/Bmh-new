import React from 'react';
import styles from '../../styles/alicecarousel.module.css'; 
import { useSpring, animated } from '@react-spring/web';

// Import your logos here
import logo1 from '../../../public/images/google.png';
import logo2 from '../../../public/images/gucci.png';
import logo3 from '../../../public/images/insta.png';
import logo4 from '../../../public/images/nike.png';
import logo5 from '../../../public/images/pintrest.png';
import logo6 from '../../../public/images/twitter.png';

const Alice = () => {
  const props = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 20000 }, // Duration in milliseconds
    reset: true,
    loop: true, // Makes the animation loop indefinitely
  });

  return (
    <div className={styles.trusted}> 
      <h2 className={styles.trustedtext}><span className={styles.span} >Trusted </span> by companies like</h2>
      <div className={styles.scrollingText}>
        <animated.div className={styles.scrollAnimation} style={props}>
          <img src={logo1.src} alt="Brand Logo 1" className={styles.logo} />
          <img src={logo2.src} alt="Brand Logo 2" className={styles.logo} />
          <img src={logo3.src} alt="Brand Logo 3" className={styles.logo} />
          <img src={logo4.src} alt="Brand Logo 4" className={styles.logo} />
          <img src={logo5.src} alt="Brand Logo 5" className={styles.logo} />
          <img src={logo6.src} alt="Brand Logo 6" className={styles.logo} />
          <img src={logo1.src} alt="Brand Logo 1" className={styles.logo} />
          <img src={logo2.src} alt="Brand Logo 2" className={styles.logo} />
          <img src={logo3.src} alt="Brand Logo 3" className={styles.logo} />
          <img src={logo4.src} alt="Brand Logo 4" className={styles.logo} />
          <img src={logo5.src} alt="Brand Logo 5" className={styles.logo} />
          <img src={logo6.src} alt="Brand Logo 6" className={styles.logo} />
        </animated.div>
      </div>
    </div>
  );
};

export default Alice;

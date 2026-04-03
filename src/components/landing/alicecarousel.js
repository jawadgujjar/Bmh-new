import React from "react";
import styles from "../../styles/alicecarousel.module.css";

// Logo Imports
import logo1 from "../../../public/images/icons/Icon1.png";
import logo2 from "../../../public/images/icons/icon2.png";
import logo3 from "../../../public/images/icons/icon3.png";
import logo4 from "../../../public/images/icons/icon4.png";
import logo5 from "../../../public/images/icons/icon5.png";
import logo6 from "../../../public/images/icons/icon6.png";
import logo7 from "../../../public/images/icons/icon7.png";


const Alice = () => {
  // Array of all logos
  const brandLogos = [logo1, logo2, logo3, logo4, logo5, logo6,logo7];

  return (
    <div className={styles.trusted}>
      <h2 className={styles.trustedtext}>
        <span className={styles.span}>Trusted </span> by companies like
      </h2>

      <div className={styles.scrollingText}>
        <div className={styles.scrollAnimation}>
          {/* Mapping the logos twice to create a seamless infinite loop */}
          {brandLogos.map((logo, index) => (
            <img
              key={`logo-a-${index}`}
              src={logo.src}
              alt={`Brand ${index + 1}`}
              className={styles.logo}
            />
          ))}
          {/* Duplicate set starts here */}
          {brandLogos.map((logo, index) => (
            <img
              key={`logo-b-${index}`}
              src={logo.src}
              alt={`Brand ${index + 1} Duplicate`}
              className={styles.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alice;

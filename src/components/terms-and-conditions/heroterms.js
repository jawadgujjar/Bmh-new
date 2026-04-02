import React from "react";
import { Button } from "antd";
import Link from "next/link";
import styles from "../../styles/landing/herogetaquote/herogetaquote.module.css";
import Image from "next/image";

function HeroTerms() {
  return (
    <div className={styles.backheroDigital}>
      <div className={styles.backgroundImage}>
        <Image
          src="/images/hero.jpg"
          alt="Digital Marketing Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className={styles.mainHerodigital}>
        <h1 className={styles.heroFirstText}>Terms And Conditions</h1>
      </div>
    </div>
  );
}

export default HeroTerms;

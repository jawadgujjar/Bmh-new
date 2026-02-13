import React from "react";
import { Button } from "antd";
import Link from "next/link";
import styles from "../../styles/web-development/heroweb.module.css";
import Image from "next/image";

function Heroweb1() {
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
        <p className={styles.heroFirstText}>
          Trusted Web Development Company in the USA
        </p>
        <p className={styles.growText}>
          As a growing web development company usa, Brand Marketing Hub is
          committed to building trust through quality work and clear
          communication. We focus on long-term partnerships rather than one-time
          projects. Our experience across different industries allows us to
          adapt strategies while maintaining consistent standards. We approach
          every project with responsibility, attention to detail, and respect
          for user expectations. That mindset helps us deliver solutions that
          feel reliable, professional, and aligned with EEAT principles.
        </p>
        <div className={styles.formDigital}>
          <Link href="/getaquote" passHref>
            <Button className={styles.proposalButton}>
              Get My Free Proposal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Heroweb1;

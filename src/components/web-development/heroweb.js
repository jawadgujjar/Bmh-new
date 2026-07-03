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
          src="/images/banner.webp"
          alt="Digital Marketing Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className={styles.mainHerodigital}>
        <h1 className={styles.heroFirstText}>
          Custom Website Development Company — Brand Marketing Hub
        </h1>
        <p className={styles.growText}>
          Brand Marketing Hub is a custom website development company in the USA. We build responsive, results-driven websites — from redesigns to full-stack builds that grow your business.
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

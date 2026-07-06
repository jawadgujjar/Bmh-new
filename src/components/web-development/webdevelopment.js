"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/webdevelopment.module.css";
import { FaFire } from "react-icons/fa";

const Webdevelopment1 = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>Custom Website Development </span>{" "}
            Company That Builds Websites With a Purpose

          </h2>
          <h3>
            Your website is not a digital brochure. It is the most active salesperson your business has — working around the clock, making first impressions, qualifying leads, and converting visitors into customers. For US-based businesses competing in one of the most digital-savvy markets in the world, that distinction matters more than ever in 2026. A {' '}
            <a
              href="https://brandmarketinghub.com/full-stack-development-services"
              style={{ color: '#FF8400', textDecoration: 'none' }}
            >
              full stack development services
            </a>{' '}
            team backs every project we take on, which means the websites we build are not just visually strong — they are architecturally sound, technically reliable, and built to perform under real American business conditions.
            <br /><br />
            As a custom website development company, we do not sell templates dressed up as custom work. Every project starts with your business goals, your audience, and the outcomes you need. From there, we build — thoughtfully, precisely, and with a long-term view of what your digital presence needs to do for you.
          </h3>
        </div>
        <div className={styles.imageContent}>
          <Image
            src="/images/web-development/Professional Website Development Company in USA.webp"
            alt="Web development services"
            width={500}
            height={450}
            className={styles.image}
            quality={100}
            priority
          />
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Real Business Growth</p>
          <p className={styles.infoText1}>
            We focus on what actually works, helping your business get more visibility, better leads, and steady growth without wasting time on things that don’t matter.
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Always Here for You</p>
          <p className={styles.infoText1}>
            You won’t be left waiting or guessing. We stay in touch, respond quickly, and make sure you always know what’s happening with your marketing.
          </p>
        </div>
        <div className={styles.infoColumn}>
          <div className={styles.iconWrapper}>
            <FaFire className={styles.infoIcon} />
          </div>
          <p className={styles.infoText}>Built Around You</p>
          <p className={styles.infoText1}>
            We don’t follow fixed templates. Everything we do is based on your business, your audience, and what will genuinely work for you.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>
            <span className={styles.span}>  </span>{" "}
            What Makes a Website Truly Custom — And Why It Matters
          </h2>
          <h3>
            Most US businesses outgrow their website before they realize it. A template built for a general use case cannot reflect the specific way your business operates, the specific customers you serve, or the specific conversions you need to drive. In a market where American consumers make snap judgments about brand credibility based on website quality, that gap between what your website is and what your business needs it to be costs you leads, credibility, and revenue every single day.
            <br /><br />
            Custom website development closes that gap. When your site is built around your actual workflows, your actual customer journey, and your actual brand identity, every element has a reason to exist. {' '}
            <a
              href="https://brandmarketinghub.com/front-end-development-services"
              style={{ color: '#FF8400', textDecoration: 'none' }}
            >
              Front end web development services
            </a>{' '}
            at Brand Marketing Hub focus on exactly this — creating interfaces that are not just attractive but intuitive, fast, and aligned with how your target audience thinks and behaves online.
            <br /><br />
            A custom-built website also gives you ownership. You are not locked into a platform's limitations, a theme developer's update schedule, or a page builder's structural constraints. You own the code, the architecture, and the direction and that ownership compounds in value as your business grows.
          </h3>
        </div>
        <div className={styles.imageContent}>
          <Image
            src="/images/web-development/Custom Website Development Built Around Real Business Needs.webp"
            alt="Web development services"
            width={500}
            height={450}
            className={styles.image}
            quality={100}
          />
        </div>
      </div>

      <div style={{ textAlign: "left", padding: "3%" }}>
        <h2>
          <span className={styles.span}>The Web Development Consultant  </span> US Businesses Keep Coming Back To
        </h2>
        <p>
          Choosing a web development consultant is not just about finding someone who can write code. It's about finding a partner who understands your business well enough to make decisions that serve your goals — not just decisions that are technically correct.
          That is exactly the standard Brand Marketing Hub holds itself to. Every engagement starts with discovery. We ask the questions that matter: Who are your customers? What do you need them to do on your website? What does success look like in six months? What has not worked before and why? That discovery process shapes everything that follows — the architecture, the design, the content structure, and the technical decisions that bring it all together.
          Our clients are US-based businesses that take their digital presence seriously. They range from professional service firms and healthcare providers to e-commerce brands and SaaS startups — all of them with one thing in common: they have outgrown DIY solutions, they understand that good development is an investment, and they want a team that is accountable for results — not just deliverables.

        </p>
      </div>

      <div className={styles.point}>
        <div className={styles.imageContent1}>
          <Image
            src="/images/web-development/Why Brand Marketing Hub.webp"
            alt="Digital agency services"
            width={500}
            height={450}
            className={styles.image}
            quality={100}
          />
        </div>
        <div className={styles.pointsList}>
          <p className={styles.pointsTextx}>
            Serving USA Businesses Nationwide — Coast to Coast
          </p>
          <p>
            Whether you are a startup in Austin, a professional services firm in New York, or a growing e-commerce brand in Los Angeles, Brand Marketing Hub operates as a trusted website development company in USA with the capability to serve businesses nationwide. As a responsive website development company, our development standards are aligned with Google's 2026 Core Web Vitals benchmarks, ADA accessibility requirements, and the performance expectations of the US market.
            We build websites that rank, convert, and hold up technically — because a beautiful website that nobody finds or that loads slowly on a 4G connection is not doing its job.

          </p>
          <div className={styles.ctaButtons}>
            <Link href="/getaquote" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Webdevelopment1;
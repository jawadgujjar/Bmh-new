'use client';
import { useState } from 'react';
import styles from '../../styles/landing/faqs.module.css';
import styless from '../../styles/digital-marketing/whydigital.module.css'; // Using CSS Modules
import Link from 'next/link';
import { Row, Col, Button } from 'antd';
import Image from 'next/image'; // Using Next.js Image component

function FAQdigital() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How much does a digital marketing agency charge in the USA?",
            answer: "In the USA, digital marketing agency pricing varies based on services, business size, and goals. On average, small businesses and startups can expect to pay between $1,500 to $5,000 per month for ongoing digital marketing services. More comprehensive strategies that include SEO, paid advertising, and social media management typically range from $5,000 to $15,000 per month. Enterprise-level or highly competitive campaigns can exceed this range. Many agencies also offer project-based pricing, which usually starts from $3,000 to $10,000 depending on scope."
        },
        {
            question: "Can a digital marketing agency be a startup?",
            answer: "Yes, a digital marketing agency can absolutely be a startup in the USA. In fact, many successful marketing agencies started as small teams or solo consultancies. Startups often choose newer agencies because they offer flexibility, focused attention, and performance-driven strategies. What matters most in the US market is not how old the agency is, but its experience, results, and understanding of customer behavior. A startup digital marketing agency with proven expertise and clear strategy can compete effectively with established firms."
        },
        {
            question: "What is the 70 20 10 rule in digital marketing?",
            answer: "The 70 20 10 rule in digital marketing is a strategic framework used by many US-based marketers to balance risk and innovation. It suggests allocating 70% of the marketing budget to proven strategies that consistently deliver results, 20% to new or growing channels that show potential, and 10% to experimental tactics that test innovative ideas. This approach helps businesses in the USA maintain stable performance while continuously exploring new growth opportunities without risking the entire budget."
        },
        {
            question: "What are the Big 4 agencies in marketing?",
            answer: "In the USA, the term “Big 4” in marketing typically refers to the largest global advertising and marketing holding companies. These are WPP, Omnicom Group, Publicis Groupe, and Interpublic Group (IPG). These companies manage multiple well-known agencies and serve global brands with large-scale budgets. While they dominate enterprise-level marketing, they are usually not the best fit for startups or small businesses due to high costs and complex structures."
        },
        {
            question: "What is the average marketing cost for a small business in the USA?",
            answer: "The average small business in the USA spends around 7% to 10% of its annual revenue on marketing. For many small businesses, this translates to $2,000 to $10,000 per month, depending on growth goals and competition. Startups and early-stage businesses often begin with smaller budgets and scale as they see results. The key in the US market is spending strategically on channels that deliver measurable return rather than spreading budgets too thin."
        }

    ];

    return (
        <div>
            <div className={styless.aboutdigitalMain}>
                <Row justify="center">
                    <Col
                        xs={22}   // Full width on extra small screens
                        sm={22}   // Full width on small screens
                        md={10}   // Half width on medium screens
                        lg={10}   // Slightly narrower on large screens
                        xl={10}   // Slightly narrower on extra large screens
                    >
                        <div className={styless.imageContainer}>
                            <Image
                                src="/images/whydigital.svg"
                                alt="about-digital"
                                width={500}
                                height={400}
                                layout="responsive"
                                quality={100}
                            />
                        </div>
                    </Col>
                    <Col
                        xs={18}   // Full width on extra small screens
                        sm={18}   // Full width on small screens
                        md={12}   // Half width on medium screens
                        lg={10}   // Slightly narrower on large screens
                        xl={10}   // Slightly narrower on extra large screens
                    >
                        <p className={styless.provenTextDigital}>
                            Supporting Startups and Small Businesses Across the USA
                        </p>
                        {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
                        <p className={styless.allTextDigital}>
                            Brand Marketing Hub proudly works with startups and small businesses across the USA. Whether you are launching a new venture or scaling an existing business, our digital marketing solutions are designed to support your growth journey. We understand the pressure to move fast while building something that lasts.
                            As a digital marketing agency for small business success, we focus on creating systems that deliver consistent results over time. Our strategies are built to grow with you, adapting to changes in market demand and business goals.


                        </p>
                        {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
                    </Col>
                </Row>
                {/* <div className={styless.callactionButton}>
                <Link href="/getaquote" passHref>
                    <Button className={styless.proposalButton}>UNLOCK YOUR FRANCHISE'S POTENTIAL</Button>
                </Link>
            </div> */}
            </div>
            <div className={styless.aboutdigitalMain}>
                <Row justify="center">

                    <Col
                        xs={18}   // Full width on extra small screens
                        sm={18}   // Full width on small screens
                        md={12}   // Half width on medium screens
                        lg={10}   // Slightly narrower on large screens
                        xl={10}   // Slightly narrower on extra large screens
                    >
                        <p className={styless.provenTextDigital}>
                            Grow with Brand Marketing Hub
                        </p>
                        {/* <p className={styles.allTextDigital}>Convey <span className={styles.specialText}>a unified brand message </span>and <span className={styles.specialText}>drive consistent leads</span> across locations with franchise digital marketing.</p> */}
                        <p className={styless.allTextDigital}>
                            If you are looking for a digital marketing agency for startups that understands the US market and delivers measurable outcomes, Brand Marketing Hub is ready to help. From strategic guidance to hands-on execution, we provide the expertise and support needed to grow confidently in a competitive digital landscape.
                            Work with Brand Marketing Hub and partner with a top digital marketing agency USA startups and small businesses trust for clarity, performance, and sustainable growth.


                        </p>
                        {/* <p className={styles.allTextDigital}>Partner with Thrive today to get a holistic, full-service approach to all your digital marketing needs.
                    </p> */}
                    </Col>
                    <Col
                        xs={22}   // Full width on extra small screens
                        sm={22}   // Full width on small screens
                        md={10}   // Half width on medium screens
                        lg={10}   // Slightly narrower on large screens
                        xl={10}   // Slightly narrower on extra large screens
                    >
                        <div className={styless.imageContainer}>
                            <Image
                                src="/images/whydigital.svg"
                                alt="about-digital"
                                width={500}
                                height={400}
                                layout="responsive"
                                quality={100}
                            />
                        </div>
                    </Col>
                </Row>
                {/* <div className={styless.callactionButton}>
                <Link href="/getaquote" passHref>
                    <Button className={styless.proposalButton}>UNLOCK YOUR FRANCHISE'S POTENTIAL</Button>
                </Link>
            </div> */}
            </div>
            <div className={styles.faqContainer}>
                <div className={styles.faqHeader}>
                    <h1><span className={styles.frequently}>Frequently</span> Asked Questions</h1>
                    <p>Find answers to common questions about our products and services</p>
                </div>

                <div className={styles.faqList}>
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                        >
                            <div
                                className={styles.faqQuestion}
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3>{faq.question}</h3>
                                <span className={styles.faqIcon}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <div className={styles.faqAnswer}>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.faqContact}>
                    <h2>Still have questions?</h2>
                    <p>
                        Contact us directly at <a href="mailto:support@example.com">support@example.com</a>
                        or call <a href="tel:+18132140535">(813) 214-0535</a>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default FAQdigital;

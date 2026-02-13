"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '../../styles/faqswebdevelopment.module.css';

const Faqwebdevelopment1 = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How much does it cost to pay someone to build my website?",
            answer: "The cost of building a website in the USA varies depending on complexity, design, and functionality. A simple small business website can cost around $1,500 – $5,000, while a custom or e-commerce website can range from $5,000 – $25,000 or more. Professional agencies, like Brand Marketing Hub, offer solutions tailored to your needs, ensuring quality, performance, and scalability."
        },
        {
            question: "Can AI redesign an existing website?",
            answer: "Yes, AI tools can help analyze website structure, suggest design improvements, and even generate layouts. However, AI cannot fully replace human expertise. A professional website redesign service combines AI recommendations with human creativity, technical knowledge, and user-experience optimization to deliver a website that is visually appealing, functional, and aligned with business goals."
        },
        {
            question: "What are the key elements of a successful website?",
            answer: "Key elements include User Experience (UX): Intuitive design and easy navigation. Responsive Design: Compatibility across devices and screen sizes. SEO Optimization: Effective use of keywords and meta tags. Performance: Fast loading times and reliable functionality. Security: Measures like HTTPS and data protection."
        },
        {
            question: "How do I choose the right content management system (CMS) for my website?",
            answer: "Choose a CMS based on your specific needs, such as: Ease of Use: For non-technical users, consider user-friendly options like WordPress or Squarespace. Functionality: Ensure the CMS supports the features you need, like e-commerce or blogging. Customization: Check for flexibility in design and plugins. Support and Community: Look for a CMS with good support and an active user community."
        },
        {
            question: "How can I ensure my website is secure?",
            answer: "Ensure website security by: Using HTTPS: Encrypt data transmitted between the server and users. Regular Updates: Keep software, plugins, and frameworks updated. Implementing Security Measures: Use firewalls, secure login protocols, and regular security audits. Backups: Regularly back up your website data to recover from potential breaches or data loss."
        }
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className={styles.faqSection}>
            <div className={styles.faqContainer}>
                <div className={styles.faqColumns}>
                    <div className={styles.faqHeadingCol}>
                        <h2 className={styles.faqTitle}>FAQs</h2>
                        <p className={styles.frequently}>
                            <span className={styles.span}>Frequently</span> Asked Questions
                        </p>
                        <p className={styles.faqSubtitle}>Discover FAQs, Your Key to Clarity</p>
                    </div>
                    
                    <div className={styles.faqQuestionsCol}>
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
                                onClick={() => toggleAnswer(index)}
                            >
                                <div className={styles.faqQuestion}>
                                    {faq.question}
                                    <span className={styles.faqToggleIcon}>
                                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                                    </span>
                                </div>
                                {openIndex === index && (
                                    <div className={styles.faqAnswer}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faqwebdevelopment1;
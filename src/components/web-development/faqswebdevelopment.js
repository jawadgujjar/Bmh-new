"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '../../styles/faqswebdevelopment.module.css';

const Faqwebdevelopment1 = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
    {
        question: "What is the difference between a template and a custom website?",
        answer: "A template is pre-made, hard to customize, and often suffers from slow loading speeds due to bloated code. A custom website is built entirely from scratch to match your specific business goals, workflow, and unique brand identity. It grants you 100% code ownership, robust security, and super-fast loading times that a generic template simply cannot deliver."
    },
    {
        question: "How long does it take to build a custom website?",
        answer: "The project timeline depends entirely on the overall scope, features, and specific requirements of your business. A standard custom website build or a comprehensive design overhaul typically takes anywhere from 4 to 8 weeks to complete. For highly complex projects featuring custom back-end integrations or advanced applications, it may take 10 to 12+ weeks."
    },
    {
        question: "Which CMS platform do you use for website development?",
        answer: "We do not rely on a single tool; instead, we recommend the platform that best fits your actual content workflows and business needs. Our team specializes in developing custom solutions across modern platforms like WordPress, Webflow, Sanity, and Contentful. We configure your CMS to be incredibly user-friendly so your team can easily update content without needing a developer."
    },
    {
        question: "Will our website be mobile-friendly and optimized for SEO?",
        answer: "Yes, every single website we build is 100% mobile-responsive and engineered to perform flawlessly across all screen sizes. We optimize the underlying code to strictly align with Google’s Core Web Vitals and modern SEO benchmarks. This ensures your website ranks much higher on search engines and effectively turns organic traffic into paying customers."
    },
    {
        question: "Do you provide ongoing maintenance and support after the launch?",
        answer: "Yes, we provide continuous post-launch support to keep your digital asset secure, optimized, and fully operational. Our Website Management Services cover proactive security monitoring, performance optimization, and seamless content updates as your business grows. We also deliver clear, jargon-free monthly reports so you can easily track your site's performance."
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
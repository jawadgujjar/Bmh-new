"use client";

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from '../../styles/faqswebdevelopment.module.css';

const Faqwebdevelopment1 = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is the difference between front-end and back-end development?",
            answer: "Front-end Development: Focuses on the visual and interactive aspects of a website that users see and interact with directly. It involves technologies like HTML, CSS, and JavaScript to create layouts, design, and user interfaces. Back-end Development: Deals with the server-side functionality of a website, including databases, server logic, and application performance. It involves programming languages like PHP, Python, Ruby, and frameworks like Node.js or Django to manage data and server interactions."
        },
        {
            question: "How long does it take to develop a website?",
            answer: "The timeline for website development varies based on factors such as complexity, design requirements, features, and the development team's expertise. A basic website might take a few weeks, while a more complex site with custom features could take several months. Planning and clear communication can help in setting realistic timelines."
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
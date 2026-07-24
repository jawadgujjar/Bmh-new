import React from 'react';
import styles from '../../styles/about-us/trust.module.css';

function Trust() {
    const trustItems = [
        {
            title: "Real Contracts, Clear Scope",
            description: "Every engagement starts with a written agreement outlining deliverables, timelines, and cost — no hidden terms.",
            icon: "📄"
        },
        {
            title: "Direct Access to Your Team",
            description: "You'll know exactly who's working on your project and how to reach them, not just a generic support inbox.",
            icon: "👥"
        },
        {
            title: "Your Data Stays Yours",
            description: "We don't share client data, credentials, or account access with third parties without explicit consent.",
            icon: "🛡️"
        },
        {
            title: "Honest Reporting",
            description: "If a campaign or project underperforms, we tell you directly and explain why — not just when results are good.",
            icon: "📊"
        }
    ];
    
    return (
        <section className={styles.trustSection}>
            <div className={styles.container}>
                {/* Header Section */}
                <div className={styles.headerWrapper}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        TRUST & TRANSPARENCY
                    </div>
                    <h2 className={styles.heading}>How We Earn Your Trust</h2>
                </div>

                {/* 2x2 Grid Cards */}
                <div className={styles.gridContainer}>
                    {trustItems.map((item, index) => (
                        <div key={index} className={styles.trustCard}>
                            <div className={styles.iconBox}>{item.icon}</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Trust;
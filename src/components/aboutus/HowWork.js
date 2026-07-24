import React from 'react';
import Image from 'next/image';
import styles from '../../styles/about-us/howwork.module.css';

function HowWork() {
    const steps = [
        { number: "1", title: "Research & Strategy" },
        { number: "2", title: "Plan & Execute" },
        { number: "3", title: "Clear Communication" },
        { number: "4", title: "Ongoing Support" }
    ];

    return (
        <section className={styles.howWorkSection}>
            <div className={styles.container}>
                {/* Left Column: Content & Steps */}
                <div className={styles.leftColumn}>
                    <div className={styles.label}>
                        <span className={styles.line}></span>
                        HOW WE WORK
                    </div>
                    <h2 className={styles.heading}>
                        Strategy First, Then <br />
                        Execution
                    </h2>
                    <p className={styles.description}>
                        We start every project with research and strategy, not guesswork. Our teams plan first, then execute — keeping clients updated with clear communication and honest reporting throughout.
                    </p>
                    <p className={styles.descriptionSecondary}>
                        We also stay involved after the project is delivered, providing ongoing support and improvements as your business grows.
                    </p>

                    {/* Steps List */}
                    <div className={styles.stepsList}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.stepItem}>
                                <span className={styles.stepNumber}>{step.number}</span>
                                <span className={styles.stepTitle}>{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Image */}
                <div className={styles.rightColumn}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/About-Us-Page/how-work.webp" 
                            alt="Team collaborating on project"
                            width={550}
                            height={450}
                            objectFit="cover"
                            className={styles.workImage}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowWork;
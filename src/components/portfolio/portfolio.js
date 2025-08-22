"use client";
import Link from 'next/link';
import styles from '../../styles/portfolio.module.css';

const PortfolioCard = ({ previewUrl, title, description, projectLink }) => {
    return (
        <Link href={projectLink} className={styles.portfolioCardLink}>
            <div className={styles.portfolioCard}>
                <div className={styles.portfolioCardInner}>
                    <div className={styles.portfolioCardImageWrapper}>
                        <div className={styles.portfolioCardHoverPreview}>
                            <iframe
                                src={previewUrl}
                                className={styles.websitePreviewFrame}
                                title={`${title} preview`}
                                loading="lazy"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        </div>
                    </div>
                    <div className={styles.portfolioCardContent}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className={styles.viewProjectBtn}>
                            View Project Details
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Portfolio = () => {
    const cardsData = [
        {
            previewUrl: 'https://bmh.vercel.app/',
            title: 'BMH',
            description: 'Landing page preview.',
            projectLink: '/portfolio/portfolio-bmh'
        },
        {
            previewUrl: 'https://sireprinting.com/',
            title: 'Sire Printing',
            description: 'Landing page preview.',
            projectLink: '/portfolio-sire-printing'
        }
    ];

    return (
        <div className={styles.portfolioWrapper}>
            {cardsData.map((card, index) => (
                <PortfolioCard
                    key={index}
                    previewUrl={card.previewUrl}
                    title={card.title}
                    description={card.description}
                    projectLink={card.projectLink}
                />
            ))}
        </div>
    );
};

export default Portfolio;
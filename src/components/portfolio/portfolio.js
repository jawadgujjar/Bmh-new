"use client";
import { useState } from 'react';
import styles from '../../styles/portfolio.module.css';
import PortfolioModal1 from '../portfolio/portfoliomodal';

const PortfolioCard = ({ previewUrl, title, description, onClick }) => {
    return (
        <div className={styles.portfolioCard} onClick={onClick}>
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
                </div>
            </div>
        </div>
    );
};

const Portfolio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    const handleCardClick = (url) => {
        setModalUrl(url);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cardsData = [
        {
            previewUrl: 'https://bmh.vercel.app/',
            title: 'BMH',
            description: 'Landing page preview.',
            fullUrl: 'https://bmh.vercel.app/'
        },
        {
            previewUrl: 'https://sireprinting.com/',
            title: 'Sire Printing',
            description: 'Landing page preview.',
            fullUrl: 'https://sireprinting.com/'
        }
    ];

    return (
        <>
            <div className={styles.portfolioWrapper}>
                {cardsData.map((card, index) => (
                    <PortfolioCard
                        key={index}
                        previewUrl={card.previewUrl}
                        title={card.title}
                        description={card.description}
                        onClick={() => handleCardClick(card.fullUrl)}
                    />
                ))}
            </div>
            <PortfolioModal1
                isVisible={isModalOpen}
                onClose={handleCloseModal}
                url={modalUrl}
            />
        </>
    );
};

export default Portfolio;

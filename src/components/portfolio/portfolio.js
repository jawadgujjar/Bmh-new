"use client";
import { useState } from 'react';
import styles from '../../styles/portfolio.module.css';
import PortfolioModal1 from '../portfolio/portfoliomodal';

const PortfolioCard = ({ previewImage, title, description, onClick }) => {
    return (
        <div className={styles.portfolioCard} onClick={onClick}>
            <div className={styles.portfolioCardInner}>
                <div className={styles.portfolioCardImageWrapper}>
                    <div className={styles.portfolioCardHoverPreview}>
                        <img 
                            src={previewImage} 
                            alt={`${title} preview`}    
                            className={styles.portfolioPreviewImage} 
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
    const [modalImages, setModalImages] = useState([]);

    const handleCardClick = (images) => {
        setModalImages(images);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cardsData = [
        // Example data
        {
            previewImage: '/images/largecard.jpeg',
            title: 'Apple Website',
            description: 'Apples official website showcasing their products.',
            images: [
                '/images/largecard.jpeg',
                '/images/largecard.jpeg',
                '/images/largecard.jpeg',
            ],
        }, 
        {
            previewImage: '/images/largecard.jpeg',
            title: 'Apple Website',
            description: 'Apples official website showcasing their products.',
            images: [
                '/images/largecard.jpeg',
                '/images/largecard.jpeg',
                '/images/largecard.jpeg',
            ],
        }, 
        // Add more cards as needed
    ];

    return (
        <>
            <div className={styles.portfolioWrapper}>
                {cardsData.map((card, index) => (
                    <PortfolioCard
                        key={index}
                        previewImage={card.previewImage}
                        title={card.title}
                        description={card.description}
                        onClick={() => handleCardClick(card.images)}
                    />
                ))}
            </div>
            <PortfolioModal1
                isVisible={isModalOpen}
                onClose={handleCloseModal}
                images={modalImages}
            />
        </>
    );
};

export default Portfolio;
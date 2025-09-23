"use client";
import Link from 'next/link';
import styles from '../../styles/portfolio.module.css';

const PortfolioCard = ({ previewUrl, title, description, item }) => {
  // Derive a slug from the title for the dynamic route
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

  return (
    <Link href={`/portfolio/${slug}`} className={styles.portfolioCardLink} data-item={JSON.stringify(item)}>
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

const Portfolio = ({ activeCategory, portfolioData }) => {
  // Filter based on attached keyword
  const filteredData = portfolioData.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.keyword === activeCategory; // Exact match with keyword
  });

  return (
    <div className={styles.portfolioWrapper}>
      {filteredData.map((item, index) => (
        <PortfolioCard
          key={index}
          previewUrl={item.portfolioPage?.header?.image || ''}
          title={item.portfolioPage?.header?.title || 'Untitled'}
          description={item.portfolioPage?.header?.description || ''}
          item={item} // Pass the full item for dynamic routing
        />
      ))}
    </div>
  );
};

export default Portfolio;

// components/faqspage/faqsection.js
'use client';
import { useState } from 'react';

export default function FaqSection({ heading, description, faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Heading ko split karke "Frequently" ko orange karna hai
  const headingWords = heading.split(' ');
  const firstWord = headingWords[0];
  const restHeading = headingWords.slice(1).join(' ');

  return (
    <>
      <style jsx>{`
        .faqContainer {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #333;
          background-color: #ffffff;
        }

        .faqHeader {
          text-align: center;
          margin-bottom: 40px;
        }

        .faqHeader h1 {
          font-size: 2.5rem;
          color: #000000;
          margin-bottom: 10px;
        }

        .faqHeader p {
          font-size: 1.1rem;
          color: #666;
        }

        .faqList {
          margin-bottom: 40px;
        }

        .faqItem {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          background-color: #ffffff;
        }

        .frequently {
          color: #FD7E14;
        }

        .faqItem.active {
          border-color: #FD7E14;
          box-shadow: 0 4px 6px rgba(253, 126, 20, 0.1);
        }

        .faqQuestion {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          cursor: pointer;
          background-color: #f8f8f8;
          transition: background-color 0.2s ease;
        }

        .faqQuestion:hover {
          background-color: #f0f0f0;
        }

        .faqQuestion h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #000000;
        }

        .faqIcon {
          font-size: 1.5rem;
          font-weight: 300;
          color: #FD7E14;
        }

        .faqAnswer {
          padding: 0;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faqItem.active .faqAnswer {
          padding: 20px;
          max-height: 500px;
          background-color: #ffffff;
        }

        .faqAnswer p {
          margin: 0;
          line-height: 1.6;
          color: #333;
        }

        .faqContact {
          text-align: center;
          padding: 30px;
          background-color: #f8f8f8;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-top: 30px;
        }

        .faqContact h2 {
          margin: 0 0 15px 0;
          color: #000000;
        }

        .faqContact p {
          margin: 0;
          color: #666;
        }

        .faqContact a {
          color: #FD7E14;
          text-decoration: none;
          font-weight: 500;
        }

        .faqContact a:hover {
          text-decoration: underline;
          color: #e56700;
        }

        .noFaqsMessage {
          text-align: center;
          padding: 40px;
          background-color: #f8f8f8;
          border-radius: 8px;
          margin: 20px 0;
          border: 2px dashed #FD7E14;
        }

        .noFaqsMessage p {
          color: #666;
          font-size: 1.2rem;
          margin: 0 0 10px 0;
        }

        .noFaqsMessage .icon {
          font-size: 3rem;
          margin-bottom: 15px;
          color: #FD7E14;
        }

        @media (max-width: 768px) {
          .faqContainer {
            padding: 20px 15px;
          }

          .faqHeader h1 {
            font-size: 2rem;
          }

          .faqQuestion {
            padding: 15px;
          }

          .faqQuestion h3 {
            font-size: 1rem;
            padding-right: 20px;
          }

          .faqItem.active .faqAnswer {
            padding: 15px;
          }
        }
      `}</style>

      <div className="faqContainer">
        <div className="faqHeader">
          <h1>
            <span className="frequently">{firstWord}</span>{' '}
            {restHeading}
          </h1>
          <p>{description}</p>
        </div>

        {faqs && faqs.length > 0 ? (
          <>
            <div className="faqList">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faqItem ${activeIndex === index ? 'active' : ''}`}
                >
                  <div 
                    className="faqQuestion"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="faqIcon">
                      {activeIndex === index ? '−' : '+'}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="faqAnswer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="noFaqsMessage">
            <div className="icon">❓</div>
            <p>No FAQs Found</p>
            <p style={{ fontSize: '1rem', color: '#999' }}>
              Check back later for frequently asked questions about this service
            </p>
          </div>
        )}

        <div className="faqContact">
          <h2>Still have questions?</h2>
          <p>
            Contact us directly at <a href="mailto:hello@brandmarketinghub.com">hello@brandmarketinghub.com</a> 
            or call <a href="tel:+18132140535">(813) 214-0535</a>
          </p>
        </div>
      </div>
    </>
  );
}
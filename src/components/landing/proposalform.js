import React from 'react';
import styles from '../../styles/proposalform.module.css';

function ProposalForm() {
    return (
        <div className={styles.mainProposalform}>
            <div>
                <p className={styles.getProposalText}>Get My <span className={styles.freeText}>FREE Digital Marketing Proposal</span></p>
            </div>
            <div className={styles.centerProposalform}>
                <div className={styles.contactContainerProposal}>
                    <form className={styles.contactForm} action="#" method="post">
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" required></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProposalForm;
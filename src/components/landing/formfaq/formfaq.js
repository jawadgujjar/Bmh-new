import { Row, Col } from 'antd';
import FAQ from '../faqs';
import Form1 from '../getaquote';
import styles from '../../../styles/landing/faqform/faqform.module.css';

export default function Faqform() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        {/* align="top" zaroori hai taaki height mismatch na ho */}
        <Row   align="top">
          
          {/* FAQ Column (50%) */}
          <Col xs={24} md={12} lg={12}>
            <div className={styles.faqWrapper}>
              <FAQ />
            </div>
          </Col>

          {/* Form Column (50%) */}
          <Col xs={24} md={12} lg={12}>
            <div className={styles.formWrapper}>
              <Form1 />
            </div>
          </Col>

        </Row>
      </div>
    </section>
  );
}
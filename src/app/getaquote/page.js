import FAQ from '@/components/landing/faqs';
import Form1 from '@/components/landing/getaquote';
import { Row, Col } from 'antd';


export default function getaquotePage() {
  return (
    <main style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh',marginTop:'6rem' }}>
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={12}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Form1 />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <FAQ />
          </div>
        </Col>
      </Row>
    </main>
  );
}
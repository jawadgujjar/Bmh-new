import FAQ from '@/components/landing/faqs';
import Form1 from '@/components/landing/getaquote';
import Getaquotefaq from '@/components/landing/getaquotefaq';
import Herogetaquote1 from '@/components/landing/herogetaquote/herogetaquote';
import { Row, Col } from 'antd';

// ✅ 1. SEO aur Canonical URL Configuration
export const metadata = {
  title: 'Get a Quote | Brand Marketing Hub',
  description: 'Request a free quote for digital marketing, web development, and app development services.',
  alternates: {
    canonical: 'https://brandmarketinghub.com/getaquote',
  },
};

// 2. Main Page Component
export default function getaquotePage() {
  return (
    <main>
      <Herogetaquote1 />
      <Row gutter={[32, 32]} justify="center" style={{ margin: '20px 0' }}>
        <Col xs={24} md={12}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Form1 />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Getaquotefaq />
          </div>
        </Col>
      </Row>
    </main>
  );
}
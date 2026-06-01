export default function robots() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandmarketinghub.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/', 
        '/api/', 
        '/admin/', 
        '/dashboard/'
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
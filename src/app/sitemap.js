export default async function sitemap() {
 
  const isLocal = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

   
  const BASE_URL = isLocal ? 'http://localhost:3000' : 'https://brandmarketinghub.com';

 
  const staticPages = [
    { url: BASE_URL, lastModified: new Date('2026-05-24'), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/aboutus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contactus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/digitalmarketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/webdevelopment`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/appdevelopment`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  let dynamicPages = [];
  let dynamicPosts = [];

 
  try {
   
    const pagesEndpoint = isLocal 
      ? 'http://localhost:3000/api/subcategories' 
      : 'https://api.brandmarketinghub.com/pages';
    
    const pagesResponse = await fetch(pagesEndpoint, {
      next: { revalidate: 3600 }, // 1 Hour Next.js Cache
    });

    if (pagesResponse.ok) {
      const pagesData = await pagesResponse.json();
      const pagesArray = Array.isArray(pagesData) ? pagesData : (pagesData.data || []);
      
      // ✅ Fixed: Variable mapping hamesha 'pagesArray' par honi chahiye data formatting crash se bachne ke liye
      dynamicPages = pagesArray
        .filter((page) => page && page.slug)
        .map((page) => ({
          url: `${BASE_URL}/${page.slug}`,
          lastModified: new Date(page.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.9,
        }));
    }
  } catch (error) {
    console.log('Sitemap subcategories fetch skipped or domain offline in this environment.');
  }

  // 4. Dynamic Blog Posts Fetch Engine
  try {
    // Smart Routing: Local par local API route chalega, VPS par live subdomain call hoga
    const postsEndpoint = isLocal 
      ? 'http://localhost:3000/api/blogs' 
      : 'https://api.brandmarketinghub.com/posts';

    const postsResponse = await fetch(postsEndpoint, {
      next: { revalidate: 3600 }, // 1 Hour Next.js Cache
    });

    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      const postsArray = Array.isArray(postsData) ? postsData : (postsData.data || []);

      // ✅ Fixed: Variable mapping hamesha 'postsArray' par honi chahiye data formatting crash se bachne ke liye
      dynamicPosts = postsArray
        .filter((post) => post && post.slug)
        .map((post) => ({
          url: `${BASE_URL}/blogs/${post.slug}`,
          lastModified: new Date(post.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.log('Sitemap posts fetch skipped or domain offline in this environment.');
  }

 
  return [
    ...staticPages,
    ...dynamicPages,
    ...dynamicPosts,
  ];
}
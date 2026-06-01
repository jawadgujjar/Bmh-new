export default async function sitemap() {
  const isLocal = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  
  // Vercel deployment host handler
  const currentHost = typeof process !== 'undefined' && process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://bmh-new.vercel.app';

  const BASE_URL = isLocal ? 'http://localhost:3000' : 'https://brandmarketinghub.com';

  // 1. Core Static Pages Array
  const staticPages = [
    { url: BASE_URL, lastModified: new Date('2026-05-24'), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/aboutus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contactus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/digitalmarketing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/webdevelopment`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/appdevelopment`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/getaquote`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }, 
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  let dynamicRoutes = [];
  let portfolioRoutes = [];
  let blogPosts = [];

  // Helper code for slug generation matching your component file logic exactly
  const slugify = (str = "") =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  // Universal Bulletproof Network Requester
  const fetchData = async (vpsUrl, localPath) => {
    try {
      let res = await fetch(vpsUrl, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) {
        const fallback = isLocal ? `http://localhost:3000${localPath}` : `${currentHost}${localPath}`;
        res = await fetch(fallback, { next: { revalidate: 3600 } });
      }
      if (res.ok) {
        const parsed = await res.json();
        return parsed?.success ? parsed.data : (parsed.data || parsed);
      }
    } catch (e) {
      try {
        const absoluteRes = await fetch(`https://bmh-new.vercel.app${localPath}`, { next: { revalidate: 3600 } });
        if (absoluteRes.ok) {
          const parsedAbsolute = await absoluteRes.json();
          return parsedAbsolute?.success ? parsedAbsolute.data : (parsedAbsolute.data || parsedAbsolute);
        }
      } catch (err) {
        console.log(`Fetch processing closed for path: ${localPath}`);
      }
    }
    return null;
  };

  // ========================================================
  // 2. Subcategory Pages Engine (Format: domain/subcategory/pagename)
  // ========================================================
  const pagesData = await fetchData('https://api.brandmarketinghub.com/pages', '/api/page'); 
  
  if (pagesData && Array.isArray(pagesData)) {
    pagesData.forEach((pageItem) => {
      if (pageItem && pageItem.slug && pageItem.category) {
        const subcategoryFolder = pageItem.category.trim(); 
        const pageSlug = pageItem.slug.trim();             

        dynamicRoutes.push({
          url: `${BASE_URL}/${subcategoryFolder}/${pageSlug}`,
          lastModified: new Date(pageItem.updatedAt || pageItem.createdAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });
  }

  // ========================================================
  // 3. Portfolio Nested Engine (Category & Deep Slugs Mapping)
  // ========================================================
  // Targeting your portfolio route file data pipeline
  const portfolioData = await fetchData('https://api.brandmarketinghub.com/portfolio', '/api/portfolio');
  
  if (portfolioData && Array.isArray(portfolioData)) {
    portfolioData.forEach((item) => {
      if (item && item.keyword) {
        const categorySlug = slugify(item.keyword);

        // A. Add Category Page itself: domain/portfolio/[category]
        portfolioRoutes.push({
          url: `${BASE_URL}/portfolio/${categorySlug}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });

        // B. Add Nested Slugs Project Pages: domain/portfolio/[category]/[slug]
        const websitesArray = item.websites || [];
        if (Array.isArray(websitesArray)) {
          websitesArray.forEach((site) => {
            const projectTitle = site?.portfolioPage?.header?.title;
            if (projectTitle) {
              const projectSlug = slugify(projectTitle);
              
              portfolioRoutes.push({
                url: `${BASE_URL}/portfolio/${categorySlug}/${projectSlug}`,
                lastModified: new Date(item.updatedAt || Date.now()),
                changeFrequency: 'monthly',
                priority: 0.7,
              });
            }
          });
        }
      }
    });
  }

  // ========================================================
  // 4. Blogs Dynamic Engine
  // ========================================================
  const blogsData = await fetchData('https://api.brandmarketinghub.com/posts', '/api/blogs');
  if (blogsData && Array.isArray(blogsData)) {
    blogPosts = blogsData
      .filter((post) => post && post.slug)
      .map((post) => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.updatedAt || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
  }

  // 5. Final Output Compilation
  return [
    ...staticPages,
    ...dynamicRoutes,
    ...portfolioRoutes,
    ...blogPosts,
  ];
}
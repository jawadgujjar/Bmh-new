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
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/getaquote`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }, 
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  let dynamicRoutes = [];
  let portfolioRoutes = [];
  let blogPosts = [];

  // Helper code for slug generation matching your component file logic exactly
  const slugify = (str = "") => {
    if (typeof str !== 'string') return "";
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };

  // Universal Network Requester for APIs
  const fetchData = async (vpsUrl, localPath) => {
    try {
      const primaryUrl = isLocal ? `http://localhost:3000${localPath}` : vpsUrl;
      let res = await fetch(primaryUrl, { next: { revalidate: 60 } });
      
      if (!res.ok) {
        res = await fetch(`${currentHost}${localPath}`, { next: { revalidate: 60 } });
      }

      if (res.ok) {
        const parsed = await res.json();
        return parsed?.success ? parsed.data : (parsed.data || parsed);
      }
    } catch (e) {
      try {
        const secureFallback = `https://bmh-new.vercel.app${localPath}`;
        const altRes = await fetch(secureFallback, { next: { revalidate: 60 } });
        if (altRes.ok) {
          const altParsed = await altRes.json();
          return altParsed?.success ? altParsed.data : (altParsed.data || altParsed);
        }
      } catch (err) {
        console.log(`Failed fetching sitemap route data for: ${localPath}`);
      }
    }
    return null;
  };

  // Sets to handle duplicate entries smoothly
  const uniqueCategories = new Set();
  const uniqueSubcategories = new Set();

  // ========================================================
  // 2. Main Categories Initialization (Fallback Guard Layer)
  // ========================================================
  const masterCategories = [
    "digital-marketing",
    "web-development",
    "app-development"
  ];

  masterCategories.forEach((catSlug) => {
    if (!uniqueCategories.has(catSlug)) {
      uniqueCategories.add(catSlug);
      dynamicRoutes.push({
        url: `${BASE_URL}/${catSlug}`,
        lastModified: new Date('2026-05-24'),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  });

  // ========================================================
  // 3. Subcategory & Parent Category Dynamic Fetch Engine
  // ========================================================
  const subcategoryData = await fetchData('https://api.brandmarketinghub.com/subcategories', '/api/subcategories');

  if (subcategoryData && Array.isArray(subcategoryData)) {
    subcategoryData.forEach((subItem) => {
      if (subItem) {
        
        // --- A. Dynamic Parent Categories Process ---
        let rawCategory = subItem.category;
        if (typeof rawCategory === 'object' && rawCategory !== null) {
          rawCategory = rawCategory.title || rawCategory.name || rawCategory.slug;
        }
        
        if (rawCategory) {
          const catSlug = slugify(String(rawCategory).trim());
          if (catSlug && !uniqueCategories.has(catSlug)) {
            uniqueCategories.add(catSlug);
            dynamicRoutes.push({
              url: `${BASE_URL}/${catSlug}`,
              lastModified: new Date(subItem.updatedAt || subItem.createdAt || Date.now()),
              changeFrequency: 'weekly',
              priority: 0.9,
            });
          }
        }

        // --- B. Subcategories Process ---
        let subName = subItem.slug || subItem.title || subItem.name;
        const subSlug = slugify(String(subName).trim());

        if (subSlug && !uniqueSubcategories.has(subSlug)) {
          uniqueSubcategories.add(subSlug);
          dynamicRoutes.push({
            url: `${BASE_URL}/${subSlug}`,
            lastModified: new Date(subItem.updatedAt || subItem.createdAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    });
  }

  // ========================================================
  // 4. Dynamic Pages Engine (Child inner pages handler)
  // ========================================================
  const pagesData = await fetchData('https://api.brandmarketinghub.com/pages', '/api/page'); 
  
  if (pagesData && Array.isArray(pagesData)) {
    pagesData.forEach((pageItem) => {
      if (pageItem && pageItem.slug) {
        
        let rawSubCategory = pageItem.subCategory || pageItem.subcategory || pageItem.sub_category || pageItem.category;
        if (typeof rawSubCategory === 'object' && rawSubCategory !== null) {
          rawSubCategory = rawSubCategory.slug || rawSubCategory.title || rawSubCategory.name;
        }
        
        const subcategoryFolder = rawSubCategory ? slugify(String(rawSubCategory).trim()) : ''; 
        const pageSlug = slugify(String(pageItem.slug).trim());             

        if (subcategoryFolder) {
          if (!uniqueSubcategories.has(subcategoryFolder)) {
            uniqueSubcategories.add(subcategoryFolder);
            dynamicRoutes.push({
              url: `${BASE_URL}/${subcategoryFolder}`,
              lastModified: new Date(pageItem.updatedAt || pageItem.createdAt || Date.now()),
              changeFrequency: 'weekly',
              priority: 0.8,
            });
          }

          dynamicRoutes.push({
            url: `${BASE_URL}/${subcategoryFolder}/${pageSlug}`,
            lastModified: new Date(pageItem.updatedAt || pageItem.createdAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    });
  }

  // ========================================================
  // 5. Portfolio Nested Engine
  // ========================================================
  const portfolioData = await fetchData('https://api.brandmarketinghub.com/portfolio', '/api/portfolio');
  
  if (portfolioData && Array.isArray(portfolioData)) {
    portfolioData.forEach((item) => {
      if (item && item.keyword) {
        const categorySlug = slugify(item.keyword);

        portfolioRoutes.push({
          url: `${BASE_URL}/portfolio/${categorySlug}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });

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
  // 6. Blogs Dynamic Engine
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

  // 7. Final Output Compilation
  return [
    ...staticPages,
    ...dynamicRoutes,
    ...portfolioRoutes,
    ...blogPosts,
  ];
}
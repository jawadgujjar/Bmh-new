"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import {
  CiMobile3,
  CiMenuFries,
  CiGlobe,
  CiCamera,
  CiBullhorn,
  CiSearch,
} from "react-icons/ci";
import { FaWhatsapp, FaArrowRight, FaCode } from "react-icons/fa";
import {
  IoCloseOutline,
  IoChevronDown,
  IoChevronForward,
} from "react-icons/io5";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [menuData, setMenuData] = useState({ subcategories: {}, allPages: {} });
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allSearchableContent, setAllSearchableContent] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsSearching(true);
      const categories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];
      try {
        // Fetch subcategories
        const subResults = await Promise.all(
          categories.map((cat) =>
            fetch(`/api/subcategories?category=${cat}`).then((res) =>
              res.json()
            )
          )
        );
        const tempSubcats = {};
        const pagePromises = [];

        subResults.forEach((json, index) => {
          const subs = Array.isArray(json) ? json : json.data || [];
          tempSubcats[categories[index]] = subs;
          subs.forEach((sub) => {
            pagePromises.push(
              fetch(`/api/page?subcategory=${sub._id}`)
                .then((res) => res.json())
                .then((pJson) => ({ id: sub._id, data: pJson?.data || [] }))
            );
          });
        });
        
        const allPageResults = await Promise.all(pagePromises);
        const tempPages = allPageResults.reduce((acc, curr) => {
          acc[curr.id] = curr.data;
          return acc;
        }, {});

        // Fetch Blogs with full content
        let blogsData = [];
        try {
          const blogsRes = await fetch("/api/blogs");
          const blogsJson = await blogsRes.json();
          blogsData = Array.isArray(blogsJson) ? blogsJson : blogsJson?.data || [];
          
          // Fetch full content for each blog
          for (let i = 0; i < blogsData.length; i++) {
            try {
              const blogDetailRes = await fetch(`/api/blogs/${blogsData[i].slug || blogsData[i]._id}`);
              const blogDetail = await blogDetailRes.json();
              const blogContent = blogDetail?.data || blogDetail;
              blogsData[i].fullContent = blogContent?.content || blogContent?.body || blogContent?.description || "";
              blogsData[i].fullExcerpt = blogContent?.excerpt || blogContent?.description || "";
            } catch (e) {
              blogsData[i].fullContent = blogsData[i].content || blogsData[i].description || "";
              blogsData[i].fullExcerpt = blogsData[i].excerpt || blogsData[i].description || "";
            }
          }
        } catch (e) {
          console.error("Error fetching blogs:", e);
        }

        // Fetch Portfolio with full content
        let portfolioData = [];
        try {
          const portfolioRes = await fetch("/api/portfolio");
          const portfolioJson = await portfolioRes.json();
          portfolioData = Array.isArray(portfolioJson) ? portfolioJson : portfolioJson?.data || [];
          
          // Fetch full content for each portfolio item
          for (let i = 0; i < portfolioData.length; i++) {
            try {
              const portfolioDetailRes = await fetch(`/api/portfolio/${portfolioData[i].slug || portfolioData[i]._id}`);
              const portfolioDetail = await portfolioDetailRes.json();
              const portfolioContent = portfolioDetail?.data || portfolioDetail;
              portfolioData[i].fullContent = portfolioContent?.content || portfolioContent?.description || "";
              portfolioData[i].fullExcerpt = portfolioContent?.excerpt || portfolioContent?.description || "";
              portfolioData[i].fullDescription = portfolioContent?.description || "";
            } catch (e) {
              portfolioData[i].fullContent = portfolioData[i].content || portfolioData[i].description || "";
              portfolioData[i].fullExcerpt = portfolioData[i].excerpt || portfolioData[i].description || "";
              portfolioData[i].fullDescription = portfolioData[i].description || "";
            }
          }
        } catch (e) {
          console.error("Error fetching portfolio:", e);
        }

        // Fetch full page content for each page
        const fullPageContent = {};
        for (const [catKey, subs] of Object.entries(tempSubcats)) {
          for (const sub of subs) {
            const pages = tempPages[sub._id] || [];
            for (const page of pages) {
              try {
                const pageRes = await fetch(`/api/page/${page._id}`);
                const pageData = await pageRes.json();
                const pageContent = pageData?.data || pageData;
                fullPageContent[page._id] = {
                  content: pageContent?.content || pageContent?.description || pageContent?.body || "",
                  excerpt: pageContent?.excerpt || pageContent?.description || "",
                  description: pageContent?.description || "",
                };
              } catch (e) {
                fullPageContent[page._id] = {
                  content: page.description || page.excerpt || "",
                  excerpt: page.excerpt || "",
                  description: page.description || "",
                };
              }
            }
          }
        }

        // Build searchable content index
        const content = [];

        // Add main menu items
        content.push(
          { title: "Digital Marketing", path: "/digital-marketing", type: "Service", parent: "Home", content: "digital marketing seo social media ppc email marketing content marketing" },
          { title: "Web Development", path: "/web-development", type: "Service", parent: "Home", content: "web development website design frontend backend full stack react nextjs" },
          { title: "App Development", path: "/app-development", type: "Service", parent: "Home", content: "app development mobile app ios android react native flutter" },
          { title: "Portfolio", path: "/portfolio", type: "Portfolio", parent: "Home", content: "portfolio projects work samples case studies" }
        );

        // Add subcategories and their pages with full content
        for (const [catKey, subs] of Object.entries(tempSubcats)) {
          const catName = catKey === "digital-marketing" ? "Digital Marketing" : catKey === "web-development" ? "Web Development" : "App Development";
          for (const sub of subs) {
            // Add subcategory
            content.push({
              title: sub.name,
              path: `/${sub.slug}`,
              type: "Category",
              parent: catName,
              excerpt: sub.description || "",
              content: sub.description || sub.keywords || "",
            });
            
            const pages = tempPages[sub._id] || [];
            for (const page of pages) {
              const fullContent = fullPageContent[page._id] || {};
              content.push({
                title: page.title,
                path: `/${sub.slug}/${page.slug}`,
                type: "Page",
                parent: sub.name,
                category: catName,
                excerpt: page.excerpt || fullContent.excerpt || "",
                content: fullContent.content || page.content || page.description || "",
              });
            }
          }
        }

        // Add Blogs with FULL CONTENT
        for (const blog of blogsData) {
          content.push({
            title: blog.title,
            path: `/blogs/${blog.slug || blog._id}`,
            type: "Blog",
            parent: "Blogs",
            excerpt: blog.fullExcerpt || blog.excerpt || (blog.fullContent?.substring(0, 200) || ""),
            content: blog.fullContent || blog.content || blog.description || "",
          });
        }

        // Add Portfolio Items with FULL CONTENT
        for (const item of portfolioData) {
          content.push({
            title: item.title,
            path: `/portfolio/${item.slug || item._id}`,
            type: "Portfolio",
            parent: "Portfolio",
            category: item.category || "",
            excerpt: item.fullExcerpt || item.excerpt || (item.fullContent?.substring(0, 200) || ""),
            content: item.fullContent || item.content || item.description || "",
            description: item.fullDescription || item.description || "",
          });
        }

        setAllSearchableContent(content);
        setMenuData({ subcategories: tempSubcats, allPages: tempPages });
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    };
    fetchAllData();
  }, []);

  // Handle search - searches through titles, excerpts, and FULL CONTENT
  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = allSearchableContent.filter((item) => {
      if (!item) return false;
      
      const title = item.title ? item.title.toLowerCase() : "";
      const parent = item.parent ? item.parent.toLowerCase() : "";
      const category = item.category ? item.category.toLowerCase() : "";
      const excerpt = item.excerpt ? item.excerpt.toLowerCase() : "";
      const content = item.content ? item.content.toLowerCase() : "";
      const description = item.description ? item.description.toLowerCase() : "";
      
      return (
        title.includes(term) ||
        parent.includes(term) ||
        category.includes(term) ||
        excerpt.includes(term) ||
        content.includes(term) ||
        description.includes(term)
      );
    });
    
    // Sort by relevance
    const sorted = results.sort((a, b) => {
      const aTitle = a.title ? a.title.toLowerCase() : "";
      const bTitle = b.title ? b.title.toLowerCase() : "";
      const termLower = term;
      
      const aExact = aTitle === termLower ? 1 : 0;
      const bExact = bTitle === termLower ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;
      
      const aTitleMatch = aTitle.includes(termLower) ? 1 : 0;
      const bTitleMatch = bTitle.includes(termLower) ? 1 : 0;
      if (aTitleMatch !== bTitleMatch) return bTitleMatch - aTitleMatch;
      
      return 0;
    });
    
    setSearchResults(sorted.slice(0, 12));
  }, [searchTerm, allSearchableContent]);

  const menuItems = [
    {
      title: "Digital Marketing",
      path: "/digital-marketing",
      key: "digital-marketing",
      icon: <CiBullhorn size={18} />,
      description: "Grow your brand online",
    },
    {
      title: "Web Development",
      path: "/web-development",
      key: "web-development",
      icon: <FaCode size={18} />,
      description: "Modern web solutions",
    },
    {
      title: "App Development",
      path: "/app-development",
      key: "app-development",
      icon: <CiMobile3 size={18} />,
      description: "Native & cross-platform apps",
    },
  ];

  const handleMegaEnter = (key) => {
    if (!isMobile) setActiveMega(key);
  };

  const handleMegaLeave = () => {
    if (!isMobile) setActiveMega(null);
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setSearchTerm("");
    setSearchResults([]);
    document.body.style.overflow = "hidden";
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
    document.body.style.overflow = "";
  };

  const handleResultClick = () => {
    handleSearchClose();
    if (isOpen) setIsOpen(false);
  };

  const getResultIcon = (type) => {
    switch (type) {
      case "Service": return <CiBullhorn size={16} />;
      case "Category": return <CiGlobe size={16} />;
      case "Page": return <FaCode size={16} />;
      case "Portfolio": return <CiCamera size={16} />;
      case "Blog": return <CiGlobe size={16} />;
      default: return <CiGlobe size={16} />;
    }
  };

  const highlightText = (text, term) => {
    if (!text || !term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} className={styles.highlight}>{part}</mark> : part
    );
  };

  // Function to get excerpt with search term highlighted
  const getHighlightedExcerpt = (item, term) => {
    const contentToSearch = (item.content || item.excerpt || item.description || "").toLowerCase();
    const termLower = term.toLowerCase();
    const index = contentToSearch.indexOf(termLower);
    
    if (index === -1) {
      const excerpt = (item.excerpt || item.content || item.description || "").substring(0, 120);
      return highlightText(excerpt, term);
    }
    
    const start = Math.max(0, index - 40);
    const end = Math.min(contentToSearch.length, index + termLower.length + 80);
    let excerpt = (item.content || item.excerpt || item.description || "").substring(start, end);
    if (start > 0) excerpt = "..." + excerpt;
    if (end < (item.content || "").length) excerpt = excerpt + "...";
    
    return highlightText(excerpt, term);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoLink}>
            <img src="/bmhlogo.svg" className={styles.logo} alt="Brand Marketing Hub" />
          </Link>

          <div className={styles.navLinks}>
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={`${styles.navItem} ${activeMega === item.key ? styles.active : ""}`}
                onMouseEnter={() => handleMegaEnter(item.key)}
                onMouseLeave={handleMegaLeave}
              >
                <Link href={item.path} className={styles.mainLink}>
                  {item.icon}
                  <span>{item.title}</span>
                  <IoChevronDown size={12} className={styles.chevron} />
                </Link>

                <div className={styles.megaMenu}>
                  <div className={styles.megaContainer}>
                    <div className={styles.megaHeader}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.megaInner}>
                      {menuData.subcategories[item.key]?.map((sub) => (
                        <div key={sub._id} className={styles.megaCol}>
                          <Link href={`/${sub.slug}`} className={styles.megaColHeader}>
                            {sub.icon && <img src={sub.icon} alt={sub.name} width={20} height={20} className={styles.subIcon} />}
                            <h6>{sub.name}</h6>
                          </Link>
                          <div className={styles.megaLinks}>
                            {menuData.allPages[sub._id]?.slice(0, 5).map((page) => (
                              <Link key={page._id} href={`/${sub.slug}/${page.slug}`}>
                                <span>{page.title}</span>
                                <FaArrowRight size={8} />
                              </Link>
                            ))}
                            {menuData.allPages[sub._id]?.length > 5 && (
                              <Link href={`/${sub.slug}`} className={styles.viewAll}>
                                View All <IoChevronForward size={10} />
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/portfolio" className={styles.mainLink}>
              <CiCamera size={18} />
              <span>Portfolio</span>
            </Link>
          </div>

          <div className={styles.actions}>
            <button className={styles.searchBtn} onClick={handleSearchOpen}>
              <CiSearch size={20} />
            </button>

            <a href="tel:+18132140535" className={styles.phoneLink}>
              <CiMobile3 size={20} />
              <div className={styles.phoneInfo}>
                <span>(813) 214-0535</span>
                <small>24/7 Support</small>
              </div>
            </a>
            <Link href="/getaquote">
              <Button className={styles.ctaBtn}>
                Quote <FaArrowRight size={10} />
              </Button>
            </Link>
            <a href="https://wa.me/18132140535" className={styles.whatsappBtn} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={18} />
            </a>

            <button className={styles.mobileToggle} onClick={() => setIsOpen(true)}>
              <CiMenuFries size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <>
          <div className={styles.searchOverlay} onClick={handleSearchClose} />
          <div className={styles.searchModal}>
            <div className={styles.searchHeader}>
              <CiSearch size={22} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search services,blogs, pages,"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className={styles.searchInput}
              />
              {isSearching && <div className={styles.searchSpinner}></div>}
              <button onClick={handleSearchClose} className={styles.searchCloseBtn}>
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className={styles.searchResults}>
              {searchTerm && searchTerm.length > 0 && (
                <>
                  {searchResults.length === 0 ? (
                    <div className={styles.noResults}>
                      <p>No results found for "<strong>{searchTerm}</strong>"</p>
                      <small>Try searching with different keywords</small>
                    </div>
                  ) : (
                    <>
                      <div className={styles.resultsCount}>
                        Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                      </div>
                      {searchResults.map((result, idx) => (
                        <Link
                          key={idx}
                          href={result.path}
                          onClick={handleResultClick}
                          className={styles.resultItem}
                        >
                          <div className={styles.resultIcon}>
                            {getResultIcon(result.type)}
                          </div>
                          <div className={styles.resultContent}>
                            <div className={styles.resultTitle}>
                              {highlightText(result.title, searchTerm)}
                            </div>
                            <div className={styles.resultMeta}>
                              <span className={`${styles.resultType} ${styles[result.type?.toLowerCase()]}`}>
                                {result.type || "Page"}
                              </span>
                              {result.parent && result.parent !== "Home" && (
                                <>
                                  <span className={styles.resultSeparator}>•</span>
                                  <span>{result.parent}</span>
                                </>
                              )}
                              {result.category && (
                                <>
                                  <span className={styles.resultSeparator}>•</span>
                                  <span>{result.category}</span>
                                </>
                              )}
                            </div>
                            <div className={styles.resultExcerpt}>
                              {getHighlightedExcerpt(result, searchTerm)}
                            </div>
                          </div>
                          <IoChevronForward size={14} className={styles.resultArrow} />
                        </Link>
                      ))}
                    </>
                  )}
                </>
              )}
              {(!searchTerm || searchTerm.length === 0) && (
                <div className={styles.searchSuggestions}>
                  <p>Popular searches:</p>
                  <div className={styles.suggestionChips}>
                    <button onClick={() => setSearchTerm("SEO")}>SEO</button>
                    <button onClick={() => setSearchTerm("Web Development")}>Web Development</button>
                    <button onClick={() => setSearchTerm("Mobile App")}>Mobile App</button>
                    <button onClick={() => setSearchTerm("Blog")}>Blog</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* MOBILE DRAWER */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <img src="/bmhlogo.svg" alt="Logo" width="100" />
          <IoCloseOutline size={28} onClick={() => setIsOpen(false)} className={styles.closeBtn} />
        </div>
        <div className={styles.drawerBody}>
          {menuItems.map((item) => (
            <div key={item.key} className={styles.drawerItem}>
              <Link href={item.path} onClick={() => setIsOpen(false)} className={styles.drawerMainLink}>
                {item.icon}
                <span>{item.title}</span>
                <IoChevronForward size={14} />
              </Link>
              {menuData.subcategories[item.key]?.length > 0 && (
                <div className={styles.drawerSubmenu}>
                  {menuData.subcategories[item.key]?.map((sub) => (
                    <div key={sub._id} className={styles.drawerSubItem}>
                      <Link href={`/${sub.slug}`} onClick={() => setIsOpen(false)} className={styles.drawerSubHeader}>
                        {sub.icon && <img src={sub.icon} alt={sub.name} width={16} height={16} className={styles.drawerSubIcon} />}
                        <span>{sub.name}</span>
                      </Link>
                      {menuData.allPages[sub._id]?.slice(0, 3).map((page) => (
                        <Link key={page._id} href={`/${sub.slug}/${page.slug}`} onClick={() => setIsOpen(false)} className={styles.drawerPageLink}>
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className={styles.drawerMainLink}>
            <CiCamera size={18} />
            <span>Portfolio</span>
            <IoChevronForward size={14} />
          </Link>
          <hr className={styles.drawerDivider} />
          <Link href="/getaquote" onClick={() => setIsOpen(false)}>
            <Button className={styles.drawerCtaBtn}>
              Get a Quote <FaArrowRight size={12} />
            </Button>
          </Link>
          <div className={styles.drawerContact}>
            <a href="tel:+18132140535"><CiMobile3 size={16} /> Call Now</a>
            <a href="https://wa.me/18132140535" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={16} /> WhatsApp</a>
          </div>
        </div>
      </div>

      {isOpen && <div className={styles.drawerOverlay} onClick={() => setIsOpen(false)} />}
    </>
  );
}

export default NavbarBmh;
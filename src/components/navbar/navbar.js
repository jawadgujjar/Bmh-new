"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { CiMobile3 } from "react-icons/ci";
import { FaBullhorn, FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const pathname = usePathname();
  const router = useRouter();
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [subcategories, setSubcategories] = useState({
    "digital-marketing": [],
    "web-development": [],
    "app-development": [],
  });
  const [loading, setLoading] = useState({
    "digital-marketing": true,
    "web-development": true,
    "app-development": true,
  });
  const [fetchAttempts, setFetchAttempts] = useState({
    "digital-marketing": 0,
    "web-development": 0,
    "app-development": 0,
  });

  // ── New states for pages ───────────────────────────────
  const [pagesBySub, setPagesBySub] = useState({});
  const [pagesLoading, setPagesLoading] = useState({});

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setExpanded(false);
    setActiveDropdown(null);
  };

  const handleCategoryClick = (mainPath, e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(mainPath);
    setExpanded(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async (category) => {
      if (fetchAttempts[category] > 0) return;

      try {
        setLoading((prev) => ({ ...prev, [category]: true }));
        const response = await fetch(
          `/api/subcategories?category=${category}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) throw new Error(`API ${response.status}`);

        const data = await response.json();
        const subcats = Array.isArray(data) ? data : data.data || [];

        setSubcategories((prev) => ({
          ...prev,
          [category]: subcats.map((item) => ({
            ...item,
            slug: item.slug || generateSlug(item.name || "unnamed"),
            icon: item.icon || "/images/placeholder-icon.png",
            // Store category info for routing
            categoryPath: getCategoryPath(category),
            categoryName: getCategoryName(category),
          })),
        }));
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [category]: false }));
        setFetchAttempts((prev) => ({
          ...prev,
          [category]: prev[category] + 1,
        }));
      }
    };

    ["digital-marketing", "web-development", "app-development"].forEach(
      fetchSubcategories,
    );
  }, [fetchAttempts]);

  // Helper functions to get category info
  const getCategoryPath = (categoryKey) => {
    switch (categoryKey) {
      case "digital-marketing":
        return "digitalmarketing";
      case "web-development":
        return "webdevelopment";
      case "app-development":
        return "appdevelopment";
      default:
        return "digitalmarketing";
    }
  };

  const getCategoryName = (categoryKey) => {
    switch (categoryKey) {
      case "digital-marketing":
        return "Digital Marketing";
      case "web-development":
        return "Web Development";
      case "app-development":
        return "App Development";
      default:
        return "Digital Marketing";
    }
  };

  // Fetch pages when subcategory becomes visible (on hover)
  const fetchPages = async (subcategoryId, cacheKey) => {
    if (!subcategoryId || pagesBySub[cacheKey]) return;

    try {
      setPagesLoading((prev) => ({ ...prev, [cacheKey]: true }));
      const res = await fetch(`/api/page?subcategory=${subcategoryId}`);

      console.log(
        `Fetching pages for subcategory: ${subcategoryId}, cacheKey: ${cacheKey}`,
      );

      if (!res.ok) {
        console.error(`Pages fetch failed: ${res.status}`);
        throw new Error("Pages fetch failed");
      }

      const data = await res.json();

      // Handle different response formats
      let pagesArray = [];
      if (Array.isArray(data)) {
        pagesArray = data;
      } else if (data && typeof data === "object") {
        pagesArray = [data];
      }

      setPagesBySub((prev) => ({
        ...prev,
        [cacheKey]: pagesArray,
      }));
    } catch (err) {
      console.error("Pages fetch error:", err);
      setPagesBySub((prev) => ({
        ...prev,
        [cacheKey]: [],
      }));
    } finally {
      setPagesLoading((prev) => ({ ...prev, [cacheKey]: false }));
    }
  };

  const generateSlug = (name) => {
    if (!name) return "default-slug";
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const categoryConfig = [
    {
      title: "DIGITAL MARKETING",
      id: "digital-marketing-dropdown",
      mainPath: "/digitalmarketing",
      mainIcon: <FaBullhorn className={styles.icon} />,
      mainName: "Digital Marketing",
      categoryKey: "digital-marketing",
    },
    {
      title: "WEB DEVELOPMENT",
      id: "web-development-dropdown",
      mainPath: "/webdevelopment",
      mainIcon: <FaLaptopCode className={styles.icon} />,
      mainName: "Website Design",
      categoryKey: "web-development",
    },
    {
      title: "APP DEVELOPMENT",
      id: "app-development-dropdown",
      mainPath: "/appdevelopment",
      mainIcon: <FaMobileAlt className={styles.icon} />,
      mainName: "Mobile Application Development",
      categoryKey: "app-development",
    },
  ];

  return (
    <Navbar
      ref={navbarRef}
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`${styles.mainNavbar} ${scrolled ? styles.scrolled : ""}`}
      collapseOnSelect
    >
      <Container fluid className={styles.mainContainer}>
        <Navbar.Brand
          as={Link}
          href="/"
          onClick={handleNavClick}
          className={styles.mainBrand}
        >
          <img
            src="/bmhlogo.svg"
            className={styles.mainLogo}
            alt="Brand Marketing Hub Logo"
          />
        </Navbar.Brand>

        <div className={styles.changeNavbarNav}>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.customToggle}
            aria-label="Toggle navigation"
          />
        </div>

        <Navbar.Collapse id="basic-navbar-nav" className={styles.mainCollapse}>
          <Nav className={`${styles.mainNav} ms-auto`}>
            {categoryConfig.map((category) => {
              const categorySubcategories =
                subcategories[category.categoryKey] || [];

              return (
                <NavDropdown
                  key={category.id}
                  title={
                    <Link
                      href={category.mainPath}
                      onClick={(e) => handleCategoryClick(category.mainPath, e)}
                      className={styles.mainLink}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {category.title}
                    </Link>
                  }
                  id={category.id}
                  className={styles.customDropdown}
                  show={activeDropdown === category.id}
                  onMouseEnter={() => {
                    setActiveDropdown(category.id);
                    // Pre-fetch pages
                    categorySubcategories.forEach((sub) => {
                      const cacheKey = `${category.categoryKey}-${sub._id || sub.slug}`;
                      if (
                        sub._id &&
                        !pagesBySub[cacheKey] &&
                        !pagesLoading[cacheKey]
                      ) {
                        fetchPages(sub._id, cacheKey);
                      }
                    });
                  }}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onToggle={() => {}}
                >
                  {loading[category.categoryKey] ? (
                    <NavDropdown.Item className={styles.navDropdownItem}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 15px",
                        }}
                      >
                        <div
                          className="spinner-border spinner-border-sm text-primary me-2"
                          style={{ width: "12px", height: "12px" }}
                        />
                        <span style={{ fontSize: "14px" }}>Loading...</span>
                      </div>
                    </NavDropdown.Item>
                  ) : categorySubcategories.length === 0 ? (
                    <NavDropdown.Item
                      className={styles.navDropdownItem}
                      disabled
                    >
                      <span style={{ fontSize: "14px", color: "#666" }}>
                        No subcategories
                      </span>
                    </NavDropdown.Item>
                  ) : (
                    categorySubcategories.map((sub) => {
                      const cacheKey = `${category.categoryKey}-${sub._id || sub.slug}`;
                      const pages = pagesBySub[cacheKey] || [];
                      const isLoadingPages = pagesLoading[cacheKey];
                      const hasPages = pages.length > 0;

                      return (
                        <div
                          key={sub._id || sub.slug}
                          className={styles.subcategoryContainer}
                        >
                          {/* Subcategory Link - GOES TO /sub-slug */}
                          <NavDropdown.Item
                            as={Link}
                            // SUB CATEGORY LINK: /seo (without category)
                            href={`/${sub.slug}`}
                            onClick={handleNavClick}
                            className={`${styles.navDropdownItem} ${styles.subcategoryItem}`}
                            onMouseEnter={() => {
                              if (
                                sub._id &&
                                !pagesBySub[cacheKey] &&
                                !pagesLoading[cacheKey]
                              ) {
                                fetchPages(sub._id, cacheKey);
                              }
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              minWidth: "220px",
                              padding: "10px 15px",
                              borderBottom: hasPages
                                ? "1px solid #eee"
                                : "none",
                              fontWeight: "500",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                              }}
                            >
                              <img
                                src={sub.icon}
                                alt={sub.name}
                                style={{
                                  width: 24,
                                  height: 24,
                                  marginRight: 12,
                                  borderRadius: "4px",
                                  objectFit: "cover",
                                }}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/placeholder-icon.png";
                                  e.currentTarget.onerror = null;
                                }}
                              />
                              <span
                                style={{
                                  color: "#333",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                }}
                              >
                                {sub.name}
                              </span>
                            </div>
                            {isLoadingPages && (
                              <div
                                className="spinner-border spinner-border-sm text-secondary ms-2"
                                style={{ width: "12px", height: "12px" }}
                              />
                            )}
                            {hasPages && !isLoadingPages && (
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "#007bff",
                                  background: "#e7f1ff",
                                  padding: "2px 6px",
                                  borderRadius: "10px",
                                  fontWeight: "500",
                                }}
                              >
                                {pages.length}
                              </span>
                            )}
                          </NavDropdown.Item>

                          {/* Pages under this subcategory */}
                          {isLoadingPages ? (
                            <div className={styles.pageItemsContainer}>
                              <div
                                className={styles.pageItem}
                                style={{ padding: "8px 15px 8px 40px" }}
                              >
                                <small style={{ color: "#666" }}>
                                  Loading services...
                                </small>
                              </div>
                            </div>
                          ) : hasPages ? (
                            <div className={styles.pageItemsContainer}>
                              {pages.map((page) => (
                                <NavDropdown.Item
                                  key={page._id}
                                  as={Link}
                                  // PAGE LINK: /seo/my-sample-page (without category)
                                  href={`/${sub.slug}/${page.slug}`}
                                  onClick={handleNavClick}
                                  className={styles.pageItem}
                                  style={{
                                    padding: "8px 15px 8px 40px",
                                    fontSize: "13px",
                                    color: "#555",
                                    borderLeft: "2px solid #ddd",
                                    marginLeft: "20px",
                                    marginRight: "10px",
                                    borderRadius: "0 4px 4px 0",
                                    transition: "all 0.2s",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#007bff",
                                        marginRight: "8px",
                                        fontSize: "14px",
                                      }}
                                    >
                                      ›
                                    </span>
                                    <span
                                      style={{
                                        whiteSpace: "normal",
                                        lineHeight: "1.4",
                                      }}
                                    >
                                      {page.title}
                                    </span>
                                  </div>
                                </NavDropdown.Item>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  )}
                </NavDropdown>
              );
            })}

            <Nav.Link
              as={Link}
              href="/portfolio"
              onClick={handleNavClick}
              className={styles.mainLink}
              active={pathname === "/portfolio"}
            >
              Portfolio
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/blogs"
              onClick={handleNavClick}
              className={styles.mainLink}
              active={pathname === "/blogs"}
            >
              Blogs
            </Nav.Link>

            <Link href="/getaquote" passHref>
              <Button
                variant="primary"
                className={styles.quoteButton}
                onClick={handleNavClick}
              >
                Get a Quote
              </Button>
            </Link>

            <a
              href="tel:+1234567890"
              className={styles.phoneNumberDiv}
              onClick={() => setExpanded(false)}
            >
              <CiMobile3 className={styles.mobileIcon} />
              <div className={styles.textPhone}>
                <p>+123-456-7890</p>
                <p>Speak With Expert</p>
              </div>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBmh;

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { CiMobile3 } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [pagesBySub, setPagesBySub] = useState({});
  const timeoutRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        expanded
      ) {
        setExpanded(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  useEffect(() => {
    const fetchCats = async () => {
      const keys = ["digital-marketing", "web-development", "app-development"];
      const dataObj = {};
      for (const key of keys) {
        try {
          const res = await fetch(`/api/subcategories?category=${key}`);
          const data = await res.json();
          dataObj[key] = Array.isArray(data) ? data : data.data || [];
        } catch (e) {
          console.error(e);
        }
      }
      setSubcategories(dataObj);
    };
    fetchCats();
  }, []);

  const prefetchPages = useCallback(
    async (subId) => {
      if (!subId || pagesBySub[subId]) return;
      try {
        const res = await fetch(`/api/page?subcategory=${subId}`);
        const data = await res.json();
        setPagesBySub((prev) => ({
          ...prev,
          [subId]: Array.isArray(data) ? data : data.data ? [data.data] : [],
        }));
      } catch (e) {
        console.error(e);
      }
    },
    [pagesBySub],
  );

  const handleOpen = (id) => {
    if (window.innerWidth < 992) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleClose = () => {
    if (window.innerWidth < 992) return;
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const closeMenu = () => {
    setExpanded(false);
    setActiveDropdown(null);
  };

  // Fixed: Toggle Logic for Mobile
  const toggleSubMenu = (id, e) => {
    if (window.innerWidth >= 992) return;
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const categoryConfig = [
    {
      title: "Digital Marketing",
      id: "dm",
      path: "/digitalmarketing",
      key: "digital-marketing",
    },
    {
      title: "Web Development",
      id: "wd",
      path: "/webdevelopment",
      key: "web-development",
    },
    {
      title: "App Development",
      id: "ad",
      path: "/appdevelopment",
      key: "app-development",
    },
  ];

  return (
    <Navbar
      ref={navbarRef}
      expand="lg"
      fixed="top"
      expanded={expanded}
      className={`${styles.mainNavbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <Container fluid className={styles.navContainer}>
        <div className={styles.navLeft}>
          <Navbar.Brand as={Link} href="/" onClick={closeMenu}>
            <img src="/bmhlogo.svg" className={styles.logo} alt="Logo" />
          </Navbar.Brand>
        </div>

        {/* Custom Toggle Button with Animation */}
        <button
          className={`${styles.customToggle} ${expanded ? styles.open : ""}`}
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Navbar.Collapse id="nav-menu" className={styles.navCollapse}>
          <div className={styles.navCenter}>
            <Nav className={styles.centerLinks}>
              {categoryConfig.map((cat) => (
                <div
                  key={cat.id}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => handleOpen(cat.id)}
                  onMouseLeave={handleClose}
                >
                  <div
                    className={styles.navLinkWrapper}
                    onClick={(e) => toggleSubMenu(cat.id, e)}
                  >
                    <Link
                      href={cat.path}
                      className={styles.navLink}
                      onClick={(e) => {
                        if (window.innerWidth < 992) {
                          // On mobile, first click opens dropdown
                          e.preventDefault();
                        } else {
                          closeMenu();
                        }
                      }}
                    >
                      {cat.title}
                    </Link>
                    <FaChevronRight
                      className={`${styles.mobileArrow} ${activeDropdown === cat.id ? styles.arrowRotate : ""}`}
                      size={12}
                    />
                  </div>

                  {activeDropdown === cat.id && (
                    <div className={styles.customDropdownMenu}>
                      <div className={styles.dropdownFlex}>
                        {subcategories[cat.key]?.map((sub) => (
                          <div
                            key={sub._id}
                            className={styles.subCol}
                            onMouseEnter={() => prefetchPages(sub._id)}
                          >
                            <Link
                              href={`/${sub.slug}`}
                              className={styles.subTitle}
                              onClick={closeMenu}
                            >
                              {sub.name} <FaChevronRight size={10} />
                            </Link>
                            {pagesBySub[sub._id]?.map((p) => (
                              <Link
                                key={p._id}
                                href={`/${sub.slug}/${p.slug}`}
                                className={styles.pageLink}
                                onClick={closeMenu}
                              >
                                {p.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.navItemWrapper}>
                <Link
                  href="/portfolio"
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  Portfolio
                </Link>
              </div>
            </Nav>
          </div>

          <div className={styles.navRight}>
            <div className={styles.actionSection}>
              <a
                href="tel:+1234567890"
                className={styles.phoneBox}
                onClick={closeMenu}
              >
                <CiMobile3 size={24} color="#ffa500" />
                <div className={styles.phoneText}>
                  <span>+123-456-7890</span>
                  <small>Speak with Expert</small>
                </div>
              </a>
              <Link href="/getaquote" onClick={closeMenu}>
                <Button className={styles.quoteBtn}>Get a Quote</Button>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBmh;

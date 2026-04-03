"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { CiMobile3 } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [subcategories, setSubcategories] = useState({});
  const [allPages, setAllPages] = useState({});
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Data fetching logic
  useEffect(() => {
    const fetchFullMenu = async () => {
      const categories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];
      const catData = {};
      const pageData = {};

      for (const catKey of categories) {
        try {
          const res = await fetch(`/api/subcategories?category=${catKey}`);
          const json = await res.json();
          const subs = Array.isArray(json) ? json : json.data || [];

          if (subs.length > 0) {
            catData[catKey] = subs;
            for (const sub of subs) {
              const pRes = await fetch(`/api/page?subcategory=${sub._id}`);
              const pJson = await pRes.json();
              pageData[sub._id] = pJson?.data || [];
            }
          }
        } catch (e) {
          console.error(`Error loading ${catKey}:`, e);
        }
      }
      setSubcategories(catData);
      setAllPages(pageData);
    };
    fetchFullMenu();
  }, []);

  const handleOpen = (id, key) => {
    if (window.innerWidth < 992) return;
    if (subcategories[key]?.length > 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(id);
    }
  };

  const handleClose = () => {
    if (window.innerWidth < 992) return;
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const closeMenu = () => {
    setExpanded(false);
    setActiveDropdown(null);
  };

  const menuItems = [
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
      expand="lg"
      fixed="top"
      expanded={expanded}
      className={`${styles.mainNavbar} ${scrolled ? styles.scrolled : ""}`}
    >
      <Container fluid className={styles.navContainer}>
        <Navbar.Brand as={Link} href="/" onClick={closeMenu}>
          <img src="/bmhlogo.svg" className={styles.logo} alt="Logo" />
        </Navbar.Brand>

        <button
          className={`${styles.customToggle} ${expanded ? styles.open : ""}`}
          onClick={() => setExpanded(!expanded)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Navbar.Collapse id="nav-menu" className={styles.navCollapse}>
          <div className={styles.navCenter}>
            <Nav className={styles.centerLinks}>
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={styles.navItemWrapper}
                  onMouseEnter={() => handleOpen(item.id, item.key)}
                  onMouseLeave={handleClose}
                >
                  <Link
                    href={item.path}
                    className={styles.navLink}
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>

                  {activeDropdown === item.id &&
                    subcategories[item.key]?.length > 0 && (
                      <div className={styles.customDropdownMenu}>
                        {subcategories[item.key].map((sub) => (
                          <div key={sub._id} className={styles.subCol}>
                            <Link
                              href={`/${sub.slug}`}
                              className={styles.subTitle}
                              onClick={closeMenu}
                            >
                              {sub.icon && (
                                <img
                                  src={sub.icon}
                                  className={styles.categoryIcon}
                                  alt=""
                                />
                              )}
                              <span>{sub.name}</span>
                            </Link>

                            {/* Pages as a List */}
                            <ul className={styles.pagesList}>
                              {allPages[sub._id]?.map((page) => (
                                <li
                                  key={page._id}
                                  className={styles.pageListItem}
                                >
                                  <Link
                                    href={`/${sub.slug}/${page.slug}`}
                                    className={styles.pageLink}
                                    onClick={closeMenu}
                                  >
                                    {page.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
              <a href="tel:+18132140535" className={styles.phoneBox}>
                <CiMobile3 size={24} color="#ffa500" />
                <div className={styles.phoneText}>
                  <span>(813) 214-0535</span>
                  <small>Speak with Expert</small>
                </div>
              </a>
              <a
                href="https://wa.me/18132140535"
                target="_blank"
                className={styles.whatsappBox}
              >
                <FaWhatsapp size={24} color="#25D366" />
              </a>
              <Link href="/getaquote">
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

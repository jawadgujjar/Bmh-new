"use client";

import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiWorld } from "react-icons/bi";
import { GiPublicSpeaker } from "react-icons/gi";
import { HiDeviceMobile, HiSearch } from "react-icons/hi";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldScroll = scrollY > 50;
      console.log(`ScrollY: ${scrollY}, isScrolled: ${shouldScroll}`);
      setIsScrolled(shouldScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside search handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchBar = document.getElementById("search-bar");
      const searchIcon = document.getElementById("search-icon");
      if (
        searchBar &&
        !searchBar.contains(event.target) &&
        searchIcon &&
        !searchIcon.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (path) => {
    router.push(path);
    window.scrollTo(0, 0);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`${styles.customNavbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      <Container fluid className={styles.containerSize}>
        <Navbar.Brand>
          <Link href="/" onClick={() => handleNavClick("/")}>
            <img
              className={styles.logoWidth}
              src="/bmhlogo.svg"
              alt="Brand Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className={styles.navbarToggle}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton className={styles.offcanvasHeader}>
            <Offcanvas.Title
              id="offcanvasNavbarLabel"
              className={styles.offcanvasTitle}
            >
              Brand Marketing Hub
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasBody}>
            <Nav className={`${styles.navLinks}`}>
              <Link
                href="/home"
                className={styles.navLink}
                onClick={() => handleNavClick("/home")}
              >
                Home
              </Link>

              <NavDropdown
                title="Digital Marketing"
                className={styles.navDropdown}
                renderMenuOnMount={true}
              >
                <NavDropdown.ItemText>
                  <Container fluid>
                    <Row className={`g-3 ${styles.serviceTab}`}>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <div className={styles.imageH6}>
                          <GiPublicSpeaker />
                          <Link
                            href="/digital-marketing"
                            className={styles.dropdownLinks}
                          >
                            Digital Marketing
                          </Link>
                        </div>
                        <br />
                        <Link
                          href="/seocompany"
                          className={styles.originalDropdownItem}
                        >
                          • SEO Company
                        </Link>
                        <Link
                          href="/localseo"
                          className={styles.originalDropdownItem}
                        >
                          • Local SEO
                        </Link>
                      </Col>

                      <Col xs={12} sm={6} md={4} lg={3}>
                        <div className={styles.imageH6}>
                          <BiWorld />
                          <p className={styles.dropdownLinks}>
                            Web Development
                          </p>
                        </div>
                        <br />
                        <Link
                          href="/webdevelopmentpage"
                          className={styles.originalDropdownItem}
                        >
                          Website Design
                        </Link>
                      </Col>

                      <Col xs={12} sm={6} md={4} lg={3}>
                        <div className={styles.imageH6}>
                          <HiDeviceMobile />
                          <p className={styles.dropdownLinks}>
                            App Development
                          </p>
                        </div>
                        <br />
                        <Link
                          href="/appdevelopment"
                          className={styles.originalDropdownItem}
                        >
                          App Development
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown.ItemText>
              </NavDropdown>

              <Link
                href="/contact"
                className={styles.navLink}
                onClick={() => handleNavClick("/contact")}
              >
                Web Development
              </Link>

              <Link
                href="/portfolio"
                className={styles.navLink}
                onClick={() => handleNavClick("/portfolio")}
              >
                Portfolio
              </Link>

              <div className={styles.phoneContainer}>
                <a href="tel:+1234567890" className={styles.phoneLink}>
                  +123-456-7890
                </a>
              </div>

              <div className={styles.searchContainer}>
                <HiSearch
                  id="search-icon"
                  className={styles.searchIcon}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                />
                <div
                  id="search-bar"
                  className={`${styles.searchBar} ${
                    isSearchOpen ? styles.show : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                  />
                </div>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarBmh;

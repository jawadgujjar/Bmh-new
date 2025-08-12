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
import { HiDeviceMobile, HiSearch, HiPhone } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldScroll = scrollY > 50;
      setIsScrolled(shouldScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                href="/"
                className={styles.navLink}
                onClick={() => handleNavClick("/")}
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
                            href="/digitalmarketing"
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
                        <Link href="/webdevelopment" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <BiWorld />
                            <p className={styles.dropdownLinks}>
                              Web Development
                            </p>
                          </div>
                        </Link>
                        <br />
                        <Link
                          href="/webdevelopmentpage"
                          className={styles.originalDropdownItem}
                        >
                          Website Design
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <Link href="/appdevelopment" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <HiDeviceMobile />
                            <p className={styles.dropdownLinks}>
                              App Development
                            </p>
                          </div>
                        </Link>
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

              <NavDropdown
                title="Web Development"
                className={styles.navDropdown}
                renderMenuOnMount={true}
              >
                <NavDropdown.ItemText>
                  <Container fluid>
                    <Row className={`g-3 ${styles.serviceTab}`}>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <div className={styles.imageH6}>
                          <BiWorld />
                          <Link
                            href="/webdevelopment"
                            className={styles.dropdownLinks}
                          >
                            Web Development
                          </Link>
                        </div>
                        <br />
                        <Link
                          href="/webdesign"
                          className={styles.originalDropdownItem}
                        >
                          • Web Design
                        </Link>
                        <Link
                          href="/ecommerce"
                          className={styles.originalDropdownItem}
                        >
                          • E-commerce Solutions
                        </Link>
                        <Link
                          href="/cms"
                          className={styles.originalDropdownItem}
                        >
                          • CMS Development
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <Link href="/digitalmarketing" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <GiPublicSpeaker />
                            <p className={styles.dropdownLinks}>
                              Digital Marketing
                            </p>
                          </div>
                        </Link>
                        <br />
                        <Link
                          href="/seo"
                          className={styles.originalDropdownItem}
                        >
                          SEO Services
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <Link href="/appdevelopment" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <HiDeviceMobile />
                            <p className={styles.dropdownLinks}>
                              App Development
                            </p>
                          </div>
                        </Link>
                        <br />
                        <Link
                          href="/mobileapps"
                          className={styles.originalDropdownItem}
                        >
                          Mobile Applications
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown.ItemText>
              </NavDropdown>

              <NavDropdown
                title="App Development"
                className={styles.navDropdown}
                renderMenuOnMount={true}
              >
                <NavDropdown.ItemText>
                  <Container fluid>
                    <Row className={`g-3 ${styles.serviceTab}`}>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <div className={styles.imageH6}>
                          <HiDeviceMobile />
                          <Link
                            href="/appdevelopment"
                            className={styles.dropdownLinks}
                          >
                            App Development
                          </Link>
                        </div>
                        <br />
                        <Link
                          href="/iosdevelopment"
                          className={styles.originalDropdownItem}
                        >
                          • iOS Development
                        </Link>
                        <Link
                          href="/androiddevelopment"
                          className={styles.originalDropdownItem}
                        >
                          • Android Development
                        </Link>
                        <Link
                          href="/hybridapps"
                          className={styles.originalDropdownItem}
                        >
                          • Hybrid Apps
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <Link href="/webdevelopment" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <BiWorld />
                            <p className={styles.dropdownLinks}>
                              Web Development
                            </p>
                          </div>
                        </Link>
                        <br />
                        <Link
                          href="/responsiveweb"
                          className={styles.originalDropdownItem}
                        >
                          Responsive Web Design
                        </Link>
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <Link href="/digitalmarketing" passHref>
                          <div
                            className={styles.imageH6}
                            style={{ cursor: "pointer" }}
                          >
                            <GiPublicSpeaker />
                            <p className={styles.dropdownLinks}>
                              Digital Marketing
                            </p>
                          </div>
                        </Link>
                        <br />
                        <Link
                          href="/socialmediamarketing"
                          className={styles.originalDropdownItem}
                        >
                          Social Media Marketing
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown.ItemText>
              </NavDropdown>

              <Link
                href="/portfolio"
                className={styles.navLink}
                onClick={() => handleNavClick("/portfolio")}
              >
                Portfolio
              </Link>

              <a href="https://wa.me/1234567890" className={styles.whatsappButton}>
                WhatsApp Now <FaWhatsapp />
              </a>
              <Link
                href="/get-a-quote"
                className={styles.quoteButton}
                onClick={() => handleNavClick("/get-a-quote")}
              >
                Get Free Quote <HiPhone />
              </Link>

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
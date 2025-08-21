"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { 
  CiMobile3,  
  CiShoppingCart, 
  CiSettings 
} from "react-icons/ci";
import { 
  FiSearch, 
  FiMapPin, 
  FiUserCheck, 
  FiSmile, 
  FiShare2,
  FiGlobe,
  FiLayers
} from "react-icons/fi";
import { FaBullhorn,FaLaptopCode,FaMobileAlt } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
    setExpanded(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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

  const handleDropdownToggle = (dropdownId, isOpen) => {
    if (isOpen) {
      setActiveDropdown(dropdownId);
    } else {
      setActiveDropdown(null);
    }
  };

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
            <NavDropdown
              title={<span className={styles.mainLink}>DIGITAL MARKETING</span>}
              id="digital-marketing-dropdown"
              className={styles.customDropdown}
              show={activeDropdown === 'digital-marketing-dropdown'}
              onToggle={(isOpen) => handleDropdownToggle('digital-marketing-dropdown', isOpen)}
            >
              <NavDropdown.Item
                as={Link}
                href="/digitalmarketing"
                onClick={handleNavClick}
                className={styles.navDropdownItemfirst}
              >
                <FaBullhorn className={styles.icon} /> Digital Marketing
              
              </NavDropdown.Item>
              <div className={styles.orangeUnderline}></div>

              <NavDropdown.Item
                as={Link}
                href="/digitalmarketing/seocompany"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiSearch className={styles.icon} /> SEO Company
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                href="/localseo"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiMapPin className={styles.icon} /> Local SEO
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                href="/hireseoconsultant"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiUserCheck className={styles.icon} /> Hire SEO Consultant
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                href="/dentalseo"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiSmile className={styles.icon} /> Dental SEO Company
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                href="/socialmediamarketing"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiShare2 className={styles.icon} /> Cosmetics SEO Company
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className={styles.mainLink}>WEB DEVELOPMENT</span>}
              id="web-development-dropdown"
              className={styles.customDropdown}
              show={activeDropdown === 'web-development-dropdown'}
              onToggle={(isOpen) => handleDropdownToggle('web-development-dropdown', isOpen)}
            >
              <NavDropdown.Item
                as={Link}
                href="/webdevelopment"
                onClick={handleNavClick}
                className={styles.navDropdownItemfirst}
              >
                <FaLaptopCode className={styles.icon} /> Website Design
                
              </NavDropdown.Item>
              <div className={styles.orangeUnderline}></div>
              <NavDropdown.Item
                as={Link}
                href="/ecommercedevelopment"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <CiShoppingCart className={styles.icon} /> E-commerce Development
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/custom-software"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <CiSettings className={styles.icon} /> Custom Software
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={<span className={styles.mainLink}>APP DEVELOPMENT</span>}
              id="app-development-dropdown"
              className={styles.customDropdown}
              show={activeDropdown === 'app-development-dropdown'}
              onToggle={(isOpen) => handleDropdownToggle('app-development-dropdown', isOpen)}
            >
              <NavDropdown.Item
                as={Link}
                href="/appdevelopment"
                onClick={handleNavClick}
                className={styles.navDropdownItemfirst}
              >
                <FaMobileAlt  className={styles.icon} /> Mobile App Development
              </NavDropdown.Item>
              <div className={styles.orangeUnderline}></div>
              <NavDropdown.Item
                as={Link}
                href="/web-app-development"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiGlobe className={styles.icon} /> Web App Development
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                href="/hybrid-app-development"
                onClick={handleNavClick}
                className={styles.navDropdownItem}
              >
                <FiLayers className={styles.icon} /> Hybrid App Development
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              as={Link}
              href="/portfolio"
              onClick={handleNavClick}
              className={styles.mainLink}
              active={pathname === "/portfolio"}
            >
              Portfolio
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
                <p>Speak With an Expert</p>
              </div>
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBmh;
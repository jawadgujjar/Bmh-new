"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import {
  CiMobile3,
  CiShoppingCart,
  CiSettings,
} from "react-icons/ci";
import {
  FiSearch,
  FiMapPin,
  FiUserCheck,
  FiSmile,
  FiShare2,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";
import { FaBullhorn, FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

function NavbarBmh() {
  const pathname = usePathname();
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

  const handleNavClick = () => {
    window.scrollTo(0, 0);
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

  useEffect(() => {
    const fetchSubcategories = async (category) => {
      try {
        setLoading((prev) => ({ ...prev, [category]: true }));
        console.log(`Fetching subcategories for ${category}...`);
        const response = await fetch(`/api/subcategories?category=${category}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API response not ok: ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();
        console.log(`Raw API response for ${category}:`, data);

        // Ensure data is an array
        const subcategoriesData = Array.isArray(data) ? data : (data.data || [data]);
        console.log(`Processed subcategories for ${category}:`, subcategoriesData);

        // Use API data with fallback slugs if missing
        setSubcategories((prev) => ({
          ...prev,
          [category]: subcategoriesData.length > 0
            ? subcategoriesData.map((item) => ({
                ...item,
                slug: item.slug || generateSlug(item.name || "unnamed"),
                icon: item.icon || "FaBullhorn",
              }))
            : [
                { _id: "1", name: "SEO Company", icon: "FiSearch", slug: "seocompany", category: "digital-marketing" },
                { _id: "2", name: "Local SEO", icon: "FiMapPin", slug: "localseo", category: "digital-marketing" },
                { _id: "3", name: "Hire SEO Consultant", icon: "FiUserCheck", slug: "hireseoconsultant", category: "digital-marketing" },
                { _id: "4", name: "Dental SEO Company", icon: "FiSmile", slug: "dentalseo", category: "digital-marketing" },
                { _id: "5", name: "Cosmetics SEO Company", icon: "FiShare2", slug: "cosmeticsseo", category: "digital-marketing" },
                { _id: "6", name: "SEO Services", icon: "FiSearch", slug: "seo-services", category: "digital-marketing" },
                { _id: "6", name: "Website Design", icon: "FaLaptopCode", slug: "webdevelopment", category: "web-development" },
                { _id: "7", name: "E-commerce Development", icon: "CiShoppingCart", slug: "ecommercedevelopment", category: "web-development" },
                { _id: "8", name: "Custom Software", icon: "CiSettings", slug: "custom-software", category: "web-development" },
                { _id: "9", name: "Mobile Application Development", icon: "FaMobileAlt", slug: "mobile-application-development", category: "app-development" },
                { _id: "10", name: "Web App Development", icon: "FiGlobe", slug: "web-app-development", category: "app-development" },
                { _id: "11", name: "Hybrid App Development", icon: "FiLayers", slug: "hybrid-app-development", category: "app-development" },
              ].filter((item) => item.category === category),
        }));
      } catch (error) {
        console.error(`Error fetching ${category} subcategories:`, error);
        const fallbackSubcategories = {
          "digital-marketing": [
            { _id: "1", name: "SEO Company", icon: "FiSearch", slug: "seocompany", category: "digital-marketing" },
            { _id: "2", name: "Local SEO", icon: "FiMapPin", slug: "localseo", category: "digital-marketing" },
            { _id: "3", name: "Hire SEO Consultant", icon: "FiUserCheck", slug: "hireseoconsultant", category: "digital-marketing" },
            { _id: "4", name: "Dental SEO Company", icon: "FiSmile", slug: "dentalseo", category: "digital-marketing" },
            { _id: "5", name: "Cosmetics SEO Company", icon: "FiShare2", slug: "cosmeticsseo", category: "digital-marketing" },
            { _id: "6", name: "SEO Services", icon: "FiSearch", slug: "seo-services", category: "digital-marketing" },
          ],
          "web-development": [
            { _id: "6", name: "Website Design", icon: "FaLaptopCode", slug: "webdevelopment", category: "web-development" },
            { _id: "7", name: "E-commerce Development", icon: "CiShoppingCart", slug: "ecommercedevelopment", category: "web-development" },
            { _id: "8", name: "Custom Software", icon: "CiSettings", slug: "custom-software", category: "web-development" },
          ],
          "app-development": [
            { _id: "9", name: "Mobile Application Development", icon: "FaMobileAlt", slug: "mobile-application-development", category: "app-development" },
            { _id: "10", name: "Web App Development", icon: "FiGlobe", slug: "web-app-development", category: "app-development" },
            { _id: "11", name: "Hybrid App Development", icon: "FiLayers", slug: "hybrid-app-development", category: "app-development" },
          ],
        };
        setSubcategories((prev) => ({
          ...prev,
          [category]: fallbackSubcategories[category] || [],
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [category]: false }));
      }
    };

    ["digital-marketing", "web-development", "app-development"].forEach(fetchSubcategories);
  }, []);

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

  const handleDropdownToggle = (dropdownId, isOpen) => {
    setActiveDropdown(isOpen ? dropdownId : null);
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      FiSearch: <FiSearch className={styles.icon} />,
      FiMapPin: <FiMapPin className={styles.icon} />,
      FiUserCheck: <FiUserCheck className={styles.icon} />,
      FiSmile: <FiSmile className={styles.icon} />,
      FiShare2: <FiShare2 className={styles.icon} />,
      FaBullhorn: <FaBullhorn className={styles.icon} />,
      FaLaptopCode: <FaLaptopCode className={styles.icon} />,
      CiShoppingCart: <CiShoppingCart className={styles.icon} />,
      CiSettings: <CiSettings className={styles.icon} />,
      FaMobileAlt: <FaMobileAlt className={styles.icon} />,
      FiGlobe: <FiGlobe className={styles.icon} />,
      FiLayers: <FiLayers className={styles.icon} />,
    };
    return iconMap[iconName] || <FaBullhorn className={styles.icon} />;
  };

  const categoryConfig = [
    {
      title: "DIGITAL MARKETING",
      id: "digital-marketing-dropdown",
      path: "digitalmarketing",
      mainIcon: <FaBullhorn className={styles.icon} />,
      mainName: "Digital Marketing",
      categoryKey: "digital-marketing",
    },
    {
      title: "WEB DEVELOPMENT",
      id: "web-development-dropdown",
      path: "webdevelopment",
      mainIcon: <FaLaptopCode className={styles.icon} />,
      mainName: "Website Design",
      categoryKey: "web-development",
    },
    {
      title: "APP DEVELOPMENT",
      id: "app-development-dropdown",
      path: "appdevelopment",
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
              const categorySubcategories = subcategories[category.categoryKey] || [];
              console.log(`Rendering ${category.title} with subcategories:`, categorySubcategories);

              return (
                <NavDropdown
                  key={category.id}
                  title={<span className={styles.mainLink}>{category.title}</span>}
                  id={category.id}
                  className={styles.customDropdown}
                  show={activeDropdown === category.id}
                  onToggle={(isOpen) => handleDropdownToggle(category.id, isOpen)}
                >
                  <NavDropdown.Item
                    as={Link}
                    href={`/${category.path}`}
                    onClick={handleNavClick}
                    className={styles.navDropdownItemfirst}
                  >
                    {category.mainIcon} {category.mainName}
                  </NavDropdown.Item>
                  <div className={styles.orangeUnderline}></div>

                  {loading[category.categoryKey] ? (
                    <NavDropdown.Item className={styles.navDropdownItem}>
                      Loading...
                    </NavDropdown.Item>
                  ) : categorySubcategories.length === 0 ? (
                    <NavDropdown.Item className={styles.navDropdownItem}>
                      No subcategories available
                    </NavDropdown.Item>
                  ) : (
                    categorySubcategories.map((subcategory) => (
                      console.log(`Generating link for ${subcategory.name} with slug: ${subcategory.slug}`),
                      <NavDropdown.Item
                        key={subcategory._id || subcategory.name}
                        as={Link}
                        href={`/${category.path}/${subcategory.slug}`}
                        onClick={(e) => {
                          handleNavClick();
                          console.log(`Navigating to /${category.path}/${subcategory.slug}`);
                        }}
                        className={styles.navDropdownItem}
                      >
                        {getIconComponent(subcategory.icon)} {subcategory.name}
                      </NavDropdown.Item>
                    ))
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
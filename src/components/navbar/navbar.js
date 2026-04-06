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
    const fetchMenu = async () => {
      const categories = [
        "digital-marketing",
        "web-development",
        "app-development",
      ];
      try {
        const subResults = await Promise.all(
          categories.map((cat) =>
            fetch(`/api/subcategories?category=${cat}`).then((res) =>
              res.json(),
            ),
          ),
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
                .then((pJson) => ({ id: sub._id, data: pJson?.data || [] })),
            );
          });
        });
        const allPageResults = await Promise.all(pagePromises);
        const tempPages = allPageResults.reduce((acc, curr) => {
          acc[curr.id] = curr.data;
          return acc;
        }, {});
        setMenuData({ subcategories: tempSubcats, allPages: tempPages });
      } catch (e) {
        console.error(e);
      }
    };
    fetchMenu();
  }, []);

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

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          {/* LOGO */}
          <Link href="/" className={styles.logoLink}>
            <img
              src="/bmhlogo.svg"
              className={styles.logo}
              alt="Brand Marketing Hub"
            />
          </Link>

          {/* DESKTOP LINKS */}
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

                {/* MEGA MENU - with clickable subcategories */}
                <div className={styles.megaMenu}>
                  <div className={styles.megaContainer}>
                    <div className={styles.megaHeader}>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.megaInner}>
                      {menuData.subcategories[item.key]?.map((sub) => (
                        <div key={sub._id} className={styles.megaCol}>
                          {/* Subcategory name clickable - goes to subcategory page */}
                          <Link
                            href={`/${sub.slug}`}
                            className={styles.megaColHeader}
                          >
                            {sub.icon && (
                              <img
                                src={sub.icon}
                                alt={sub.name}
                                width={20}
                                height={20}
                                className={styles.subIcon}
                              />
                            )}
                            <h6>{sub.name}</h6>
                          </Link>
                          <div className={styles.megaLinks}>
                            {menuData.allPages[sub._id]
                              ?.slice(0, 5)
                              .map((page) => (
                                <Link
                                  key={page._id}
                                  href={`/${sub.slug}/${page.slug}`}
                                >
                                  <span>{page.title}</span>
                                  <FaArrowRight size={8} />
                                </Link>
                              ))}
                            {menuData.allPages[sub._id]?.length > 5 && (
                              <Link
                                href={`/${sub.slug}`}
                                className={styles.viewAll}
                              >
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

          {/* RIGHT ACTIONS */}
          <div className={styles.actions}>
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
            <a
              href="https://wa.me/18132140535"
              className={styles.whatsappBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={18} />
            </a>

            {/* MOBILE TOGGLE */}
            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(true)}
            >
              <CiMenuFries size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER - with clickable subcategories */}
      <div
        className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ""}`}
      >
        <div className={styles.drawerHeader}>
          <img src="/bmhlogo.svg" alt="Logo" width="100" />
          <IoCloseOutline
            size={28}
            onClick={() => setIsOpen(false)}
            className={styles.closeBtn}
          />
        </div>
        <div className={styles.drawerBody}>
          {menuItems.map((item) => (
            <div key={item.key} className={styles.drawerItem}>
              <Link
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={styles.drawerMainLink}
              >
                {item.icon}
                <span>{item.title}</span>
                <IoChevronForward size={14} />
              </Link>
              {menuData.subcategories[item.key]?.length > 0 && (
                <div className={styles.drawerSubmenu}>
                  {menuData.subcategories[item.key]?.map((sub) => (
                    <div key={sub._id} className={styles.drawerSubItem}>
                      {/* Subcategory name clickable - goes to subcategory page */}
                      <Link
                        href={`/${item.key}/${sub.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={styles.drawerSubHeader}
                      >
                        {sub.icon && (
                          <img
                            src={sub.icon}
                            alt={sub.name}
                            width={16}
                            height={16}
                            className={styles.drawerSubIcon}
                          />
                        )}
                        <span>{sub.name}</span>
                      </Link>
                      {menuData.allPages[sub._id]?.slice(0, 3).map((page) => (
                        <Link
                          key={page._id}
                          href={`/${sub.slug}/${page.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={styles.drawerPageLink}
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className={styles.drawerMainLink}
          >
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
            <a href="tel:+18132140535">
              <CiMobile3 size={16} />
              Call Now
            </a>
            <a
              href="https://wa.me/18132140535"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default NavbarBmh;

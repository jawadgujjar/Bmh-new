"use client";
import { useEffect, useState } from "react";
import styles from "../styles/admin/sidebar/sidebar.module.css";

export default function AdminSidebar({ active, setActive }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    const sessionActive = sessionStorage.getItem("isSessionActive");

    // 1. Agar session active nahi hai (Tab close karke dobara khola) 
    // Ya phir 24 ghante guzar chuke hain
    if (!userData || !sessionActive) {
      handleLogout();
      return;
    }

    if (loginTimestamp) {
      const currentTime = new Date().getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000; // 24 Hours logic

      if (currentTime - parseInt(loginTimestamp) > oneDayInMs) {
        handleLogout();
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    // Sab kuch clear karein
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("loginTimestamp");
    sessionStorage.removeItem("isSessionActive");
    
    setIsLoggedIn(false);
    window.location.reload(); // Page reload karke login par bhej dega
  };

  if (!isLoggedIn) return null;

  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "sub-category", label: "Sub-Category" },
    { id: "pages", label: "Pages" },
    { id: "portfolio", label: "Portfolio" },
    { id: "getaquote", label: "Get a Quote" },
    { id: "selectedpages", label: "Select Category Pages" },
    { id: "calltoactionquote", label: "Call-to-Action Quote" },
    { id: "blogs", label: "Blogs" },
    { id: "ctas", label: "Call-To-Actions" },
    { id: "newsletter", label: "Newsletter" },
    { id: "contactus", label: "Contact Us" }
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li
            key={link.id}
            className={`${styles.navItem} ${active === link.id ? styles.active : ""}`}
            onClick={() => setActive(link.id)}
          >
            {link.label}
          </li>
        ))}
        <li>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
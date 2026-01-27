"use client";
import { useEffect, useState } from "react";
import styles from "../styles/admin/sidebar/sidebar.module.css";

export default function AdminSidebar({ active, setActive }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.reload();
  };

  if (!isLoggedIn) return null;

  const links = [
    { id: "dashboard", label: "Dashboard" },
    { id: "sub-category", label: "Sub-Category" },
    { id: "portfolio", label: "Portfolio" },
    { id: "getaquote", label: "Get a Quote" },
    { id: "calltoactionquote", label: "Call-to-Action Quote" },
    { id: "blogs", label: "Blogs" },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      <ul className={styles.navList}>
        {links.map(link => (
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

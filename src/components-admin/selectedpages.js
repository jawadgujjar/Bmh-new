"use client";

import { useEffect, useState } from "react";
import "../styles/admin/selectedadminpages.css";

const CATEGORIES = ["digital-marketing", "web-development", "app-development"];

export default function SelectedCategoryPagesAdmin() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPages = async (category) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/page?category=${category}`);
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelected = async (category) => {
    try {
      const res = await fetch(`/api/selected-pages?category=${category}`);
      const data = await res.json();
      setSelected(data.map((p) => p._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPages(activeCategory);
    fetchSelected(activeCategory);
  }, [activeCategory]);

  const togglePage = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const saveSelection = async () => {
    setSaving(true);
    try {
      await fetch("/api/selected-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: activeCategory, pages: selected }),
      });
      alert("Selected pages saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving pages");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Select Pages for a Category</h1>

      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="pages-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="page-card animate-pulse bg-gray-100"
              ></div>
            ))
          : pages.map((page) => (
              <label key={page._id} className="page-card">
                <input
                  type="checkbox"
                  checked={selected.includes(page._id)}
                  onChange={() => togglePage(page._id)}
                />
                <div>
                  <p className="page-title">{page.title}</p>
                  <p className="page-slug">/{page.slug}</p>
                </div>
              </label>
            ))}
      </div>

      <button
        onClick={saveSelection}
        disabled={saving}
        className="save-button"
      >
        {saving ? "Saving..." : "Save Selected Pages"}
      </button>
    </div>
  );
}

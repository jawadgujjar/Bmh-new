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
  const [error, setError] = useState(null);

  const fetchPages = async (category) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching pages for category: ${category}`);
      const res = await fetch(`/api/page?category=${category}`);
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const response = await res.json();
      console.log('API Response data:', response);
      
      // Handle the response structure - it has a 'data' property containing the array
      if (response && response.success && Array.isArray(response.data)) {
        console.log(`Found ${response.data.length} pages`);
        setPages(response.data);
      } 
      // Fallback: if response itself is an array
      else if (Array.isArray(response)) {
        setPages(response);
      }
      // If response has a different structure with pages array
      else if (response && Array.isArray(response.pages)) {
        setPages(response.pages);
      }
      else {
        console.log('Unexpected response structure:', response);
        setPages([]);
      }
    } catch (err) {
      console.error('Error fetching pages:', err);
      setError(err.message);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelected = async (category) => {
    try {
      console.log(`Fetching selected pages for category: ${category}`);
      const res = await fetch(`/api/selected-pages?category=${category}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Selected pages response:', data);
      
      // Handle selected pages response - adjust based on your API structure
      if (Array.isArray(data)) {
        setSelected(data.map((p) => p._id));
      } else if (data && data.success && Array.isArray(data.data)) {
        setSelected(data.data.map((p) => p._id));
      } else {
        setSelected([]);
      }
    } catch (err) {
      console.error('Error fetching selected pages:', err);
      setSelected([]);
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
    setError(null);
    try {
      const res = await fetch("/api/selected-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: activeCategory, pages: selected }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const response = await res.json();
      console.log('Save response:', response);
      
      alert("Selected pages saved successfully");
    } catch (err) {
      console.error(err);
      setError(err.message);
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

      {error && (
        <div className="error-message" style={{color: 'red', padding: '10px', margin: '10px 0', background: '#ffeeee', borderRadius: '4px'}}>
          Error: {error}
        </div>
      )}

      <div className="pages-grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="page-card animate-pulse bg-gray-100"
              style={{height: '80px', borderRadius: '8px'}}
            ></div>
          ))
        ) : pages.length === 0 ? (
          <div className="no-pages-message" style={{padding: '40px', textAlign: 'center', gridColumn: '1 / -1'}}>
            <p style={{fontSize: '18px', marginBottom: '10px'}}>No pages found for {activeCategory.replace("-", " ")} category</p>
            <p style={{fontSize: '14px', color: '#666'}}>Check console for API response details</p>
            <button 
              onClick={() => {
                fetchPages(activeCategory);
                fetchSelected(activeCategory);
              }}
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Refresh
            </button>
          </div>
        ) : (
          pages.map((page) => (
            <label key={page._id} className="page-card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={selected.includes(page._id)}
                onChange={() => togglePage(page._id)}
                style={{width: '18px', height: '18px'}}
              />
              <div>
                <p className="page-title" style={{fontWeight: 'bold', marginBottom: '4px'}}>{page.title}</p>
                <p className="page-slug" style={{color: '#666', fontSize: '14px'}}>/{page.slug}</p>
                {page.category && (
                  <p style={{color: '#999', fontSize: '12px', marginTop: '4px'}}>Category: {page.category}</p>
                )}
              </div>
            </label>
          ))
        )}
      </div>

      <button
        onClick={saveSelection}
        disabled={saving || loading}
        className="save-button"
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: saving || loading ? 'not-allowed' : 'pointer',
          opacity: saving || loading ? 0.7 : 1
        }}
      >
        {saving ? "Saving..." : "Save Selected Pages"}
      </button>
    </div>
  );
}
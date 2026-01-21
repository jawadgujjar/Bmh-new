// src/app/blogs/page.js
import React from 'react';
import FirstPageBlog from '@/components/blogs/firstpageblog';
import '../blogs/blogs.css';

const BlogsPage = () => {
  return (
    <div className="blogs-page-wrapper">
      
      {/* Header with Background Image */}
      <header className="blogs-header">
        <div className="header-overlay">
          <h1 className="header-title">Blogs</h1>
          <nav className="breadcrumb">
            <span>Home › Blogs</span>
          </nav>
        </div>
      </header>
      
      {/* Main Content - 2 Columns */}
      <main className="blogs-main-content">
        <FirstPageBlog />
      </main>
      
    </div>
  );
};

export default BlogsPage;
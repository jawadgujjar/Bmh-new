"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  if (pathname === '/' || pathname.startsWith('/admin')) return null;

  const pathSegments = pathname.split('/').filter((path) => path);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container-main">
      <div className="container-fluid px-md-5">
        <ol className="breadcrumb-list-custom">
          <li>
            <Link href="/" className="b-link">
              <Home size={14} className="me-1" />
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const title = segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <li key={href} className="d-flex align-items-center">
                <ChevronRight size={14} className="mx-2 separator" />
                {isLast ? (
                  <span className="b-current">{title}</span>
                ) : (
                  <Link href={href} className="b-link">{title}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
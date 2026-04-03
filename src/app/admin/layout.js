"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components-admin/sidebar";
import Dashboard from "@/components-admin/dashboard";
import SubCategory from "@/components-admin/subcategory";
import Portfolio from "@/components-admin/portfolio";
import GetaQuote from "@/components-admin/getaquote";
import CallToActionQuote from "@/components-admin/calltoactionquote";
import Pages from "@/components-admin/pages";
 import SelectedCategoryPagesAdmin from "@/components-admin/selectedpages";
import CTAManagement from "@/components-admin/calltoactions";

// ✅ NEW IMPORT
import NewsletterAdmin from "@/components-admin/newsletter";
import ContactAdmin from "@/components-admin/contactus";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const router = useRouter();

  // Prevent SSR issue
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth check
  useEffect(() => {
    if (!mounted) return;

    const userData = localStorage.getItem("userData");

    if (!userData) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [mounted, router]);

  if (!mounted || !isAuthenticated) return null;

  // ✅ MAIN SWITCH
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;

      case "ctas":
        return <CTAManagement />;

      case "sub-category":
        return <SubCategory />;

      case "pages":
        return <Pages />;

      case "portfolio":
        return <Portfolio />;

      case "getaquote":
        return <GetaQuote />;

      case "blogs":
        return <BlogAdmin />;

      case "selectedpages":
        return <SelectedCategoryPagesAdmin />;

      case "calltoactionquote":
        return <CallToActionQuote />;

      // ✅ NEW (IMPORTANT)
      case "newsletter":
        return <NewsletterAdmin />;
      case "contactus":
        return <ContactAdmin />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <AdminSidebar
        active={activeComponent}
        setActive={setActiveComponent}
      />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {renderComponent()}
      </main>
    </div>
  );
}
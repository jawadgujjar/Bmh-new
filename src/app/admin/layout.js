"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Result } from "antd"; // Professional lock screen ke liye

import AdminSidebar from "@/components-admin/sidebar";
import Dashboard from "@/components-admin/dashboard";
import SubCategory from "@/components-admin/subcategory";
import Portfolio from "@/components-admin/portfolio";
import GetaQuote from "@/components-admin/getaquote";
import CallToActionQuote from "@/components-admin/calltoactionquote";
import Pages from "@/components-admin/pages";
import SelectedCategoryPagesAdmin from "@/components-admin/selectedpages";
import CTAManagement from "@/components-admin/calltoactions";
import NewsletterAdmin from "@/components-admin/newsletter";
import ContactAdmin from "@/components-admin/contactus";
import BlogAdmin from "@/components-admin/blogs";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem("userData");
    const role = localStorage.getItem("role");

    if (!userData) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, [router]);

  if (!mounted || !isAuthenticated) return null;

  // ✅ MAIN RENDER LOGIC WITH LOCKS
  const renderComponent = () => {
    // 🔒 Digital Marketing ke liye restricted components ki list
    const restrictedKeys = [
      "getaquote", 
      "calltoactionquote", 
      "newsletter", 
      "contactus"
    ];

    // Check agar user digital marketing hai aur restricted component open kar raha hai
    if (userRole === "digital-marketing" && restrictedKeys.includes(activeComponent)) {
      return (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "80vh" 
        }}>
          <Result
            status="403"
            title="Access Restricted"
            subTitle="You didn't have access to this component. Please contact the Admin for permission."
          />
        </div>
      );
    }

    // Components Switch
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
        role={userRole} // Sidebar ko role pass kar rahe hain
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "20px", background: "#f0f2f5" }}>
        {renderComponent()}
      </main>
    </div>
  );
}
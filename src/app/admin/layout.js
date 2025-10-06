"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components-admin/sidebar";
import Dashboard from "@/components-admin/dashboard";
import SubCategory from "@/components-admin/subcategory";
import Portfolio from "@/components-admin/portfolio";
import GetaQuote from "@/components-admin/getaquote";
import CallToActionQuote from "@/components-admin/calltoactionquote";

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      router.push("/auth/login"); // redirect if not logged in
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "sub-category":
        return <SubCategory />;
      case "portfolio":
        return <Portfolio />;
      case "getaquote":
        return <GetaQuote />;
      case "calltoactionquote":
        return <CallToActionQuote />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) return null; // wait for auth check

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar active={activeComponent} setActive={setActiveComponent} />
      <main style={{ flex: 1, padding: "20px" }}>
        {renderComponent()}
      </main>
    </div>
  );
}

"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavbarBmh from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Breadcrumbs from "@/components/breadcrumbs"; // Import added

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // Home page check
  const isHomePage = pathname === "/";

  return (
    <SessionProvider>
      <div className="site-wrapper" style={{ position: "relative" }}>
        {!isAdminRoute && <NavbarBmh />}

        <Breadcrumbs />

        <main>{children}</main>

        {!isAdminRoute && <Footer />}
      </div>
    </SessionProvider>
  );
}

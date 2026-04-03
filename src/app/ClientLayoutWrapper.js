"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
 import Breadcrumbs from "src/components/breadcrumbs";
import Footer from "src/components/footer/footer";
import NavbarBmh from "src/components/navbar/navbar";

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

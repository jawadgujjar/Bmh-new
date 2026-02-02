"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavbarBmh from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <SessionProvider>
      <div className="site-wrapper">
        {!isAdminRoute && <NavbarBmh />}

        <main>{children}</main>

        {!isAdminRoute && <Footer />}
      </div>
    </SessionProvider>
  );
}

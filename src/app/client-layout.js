"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBmh from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <SessionProvider>
      {!isAdminRoute && <NavbarBmh />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </SessionProvider>
  );
}

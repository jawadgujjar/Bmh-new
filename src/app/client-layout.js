"use client";

import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBmh from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavbarBmh />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

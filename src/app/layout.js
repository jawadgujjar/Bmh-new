"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'antd/dist/reset.css'; // Ant Design v5
import "./globals.css";
import NavbarBmh from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // check if it's admin route
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          {/* Show Navbar/Footer only if not in admin */}
          {!isAdminRoute && <NavbarBmh />}

          <main>{children}</main>

          {!isAdminRoute && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}

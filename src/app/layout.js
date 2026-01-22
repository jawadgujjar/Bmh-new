"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>

          {/* 👇 SITE WRAPPER YAHAN */}
          <div className="site-wrapper">

            {!isAdminRoute && <NavbarBmh />}

            <main>{children}</main>

            {!isAdminRoute && <Footer />}

          </div>

        </SessionProvider>
      </body>
    </html>
  );
}

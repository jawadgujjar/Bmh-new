<<<<<<< HEAD
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export const dynamic = "force-dynamic";
=======
// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
>>>>>>> f6fcbec61738d4d9eb862aee864f6359b6d66b74

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Brand Marketing Hub",
    template: "%s | BMH App Name",
  },
  description: "BMH main application",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
=======
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientLayout>{children}</ClientLayout>
>>>>>>> f6fcbec61738d4d9eb862aee864f6359b6d66b74
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import Script from "next/script"; // 1. Script import kiya

export const dynamic = "force-dynamic";

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
    default: "Luxury Digital Branding & Marketing Solutions in USA | BMH",
    template: "%s | BMH App Name",
  },
  description: "Transform your business with premium digital branding and marketing solutions in the USA. Stand out, attract clients, and grow with BMH. Get started now.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/BMG_Favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

        {/* 2. Tawk.to Live Chat Script yahan add kiya */}
        <Script id="tawk-chat-script" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69e8e04312cc6f1c3c72338e/1jmqqo2sp';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
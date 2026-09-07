/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Stop the browser from MIME-sniffing a response away from the declared type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow the site being embedded in iframes (clickjacking protection)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Only send the origin (not the full path) as referrer to other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful browser features by default
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Force HTTPS for 2 years (safe: the site is served over HTTPS in production)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  // Don't advertise the framework
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/digital-marketing",
        destination: "/digitalmarketing",
      },
      {
        source: "/web-development",
        destination: "/webdevelopment",
      },
      {
        source: "/app-development",
        destination: "/appdevelopment",
      },
    ];
  },
};

export default nextConfig;

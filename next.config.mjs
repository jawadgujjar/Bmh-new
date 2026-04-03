/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
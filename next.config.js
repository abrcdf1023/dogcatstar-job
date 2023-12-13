/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
      },
    ],
    deviceSizes: [600, 900, 1200],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;

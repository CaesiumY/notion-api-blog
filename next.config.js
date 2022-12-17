/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["s3.us-west-2.amazonaws.com", "www.notion.so"],
    // for free plan of vercel, can't use next/image optimization anymore
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? "/portfolio-apps/news-app" : undefined,
  basePath: isProd ? "/portfolio-apps/news-app" : undefined,
};

module.exports = nextConfig;

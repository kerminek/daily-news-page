/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? "/portfolio-apps/news-app" : undefined,
  basePath: isProd ? "/portfolio-apps/news-app" : undefined,
};

module.exports = nextConfig;

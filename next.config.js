/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_NOTEHUB_TOKEN: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
};

module.exports = nextConfig;

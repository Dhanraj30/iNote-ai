/** @type {import('next').NextConfig} */
//const path = require('path');
const nextConfig = {
 
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
 
};

module.exports = nextConfig;

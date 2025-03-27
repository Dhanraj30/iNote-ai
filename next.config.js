/** @type {import('next').NextConfig} */
//const path = require('path');
const nextConfig = {
 
  images: {
    domains: ['uopuugowtrffvweopnkw.supabase.co'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
 
};

module.exports = nextConfig;

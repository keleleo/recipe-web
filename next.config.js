/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL:process.env.API_URL
  }
}

module.exports = nextConfig

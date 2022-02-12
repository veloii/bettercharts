/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

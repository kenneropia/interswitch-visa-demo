/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: [
        "localhost:3000",
        "centinelapistag.cardinalcommerce.com",
        process.env.BASE_URL,
      ],
      allowedOrigins: [
        "http://localhost:3000",
        "centinelapistag.cardinalcommerce.com",
        process.env.BASE_URL,
      ],
    },
  },
};

module.exports = nextConfig;

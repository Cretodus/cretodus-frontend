/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: { loader: "akamai", path: "" },
  trailingSlash: true,
  assetPrefix: isProd ? "https://cretodus.0xwa.run" : "",
};

module.exports = nextConfig;

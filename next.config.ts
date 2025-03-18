import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";
const nextConfig: NextConfig = withNextIntl()({
  /* config options here */
});
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

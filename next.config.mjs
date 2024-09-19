/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("fs", "path");
    }
    return config;
  },
};

export default nextConfig;

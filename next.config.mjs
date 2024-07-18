import createNextIntlPlugin from "next-intl/plugin";

const intlPlugin = createNextIntlPlugin("./src/shared/config/intl.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config;
  },
  output: 'standalone'
};

export default  intlPlugin(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=9999999999, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["skillslash-cdn.s3.ap-south-1.amazonaws.com"],
  },

  swcMinify: true,
};

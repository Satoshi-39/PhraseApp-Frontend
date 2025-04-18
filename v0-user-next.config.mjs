/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['13.230.194.92'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://13.230.194.92:8080/:path*',
      },
    ];
  },
  // スタンドアロンモードを有効化
  output: 'standalone',
};

export default nextConfig;

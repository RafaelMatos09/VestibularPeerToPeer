/** @type {import('next').NextConfig} */
const apiDevUrl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:58323';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiDevUrl.replace(/\/$/, '')}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

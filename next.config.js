/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/auth',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig

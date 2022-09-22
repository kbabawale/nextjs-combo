/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {

  },
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_API: "http://localhost:3000",
    ENCRYPT_KEY: "234ritvm99fnn4",
    GOOGLE_API_KEY: 'AIzaSyDjOseVQob-SjgVHeb0sewGxHt48bYCCxY',
    CLOUDINARY_CLOUD_NAME: 'dwkuefera',
    CLOUDINARY_UPLOAD_PRESET: 'storedash_preset',
    CLOUDINARY_API_SECRET: 'GWiAFayDPsO8M3jamnDpfO7BAWw',
    CLOUDINARY_API_KEY: '258959376588171'
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

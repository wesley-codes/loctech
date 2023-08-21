/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs:true
  },
  images: {
    domains: ["loctech-web-app-sandy.vercel.app", "res.cloudinary.com", "loctech-web-app.vercel.app", "a6e8z9v6.stackpathcdn.com","raw.githubusercontent.com" ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/wesley-codes/test-blogposts/main/images/**',
      },
    ],
  },
};
const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)

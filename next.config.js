/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        REDIRECT_URI: process.env.REDIRECT_URI,
    },
    images: {
        domains: ['i.scdn.co'],
    },
}

module.exports = nextConfig

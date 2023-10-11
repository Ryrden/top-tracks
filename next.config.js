/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        REDIRECT_URI: process.env.REDIRECT_URI,
    },
    images: {
        domains: ['i.scdn.co'],
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://top-tracks-spotify.vercel.app/' : 'http://localhost:5000'
}

module.exports = nextConfig
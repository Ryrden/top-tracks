/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        REDIRECT_URI: process.env.REDIRECT_URI,
        PORT: process.env.PORT,
        ENV: process.env.ENV,
    },
    images: {
        domains: ['i.scdn.co'],
    },
    assetPrefix: process.env.ENV === 'production' ? 'https://top-tracks-spotify.vercel.app/' : `http://localhost:${process.env.PORT || 3000}`
}

module.exports = nextConfig
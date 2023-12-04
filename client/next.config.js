/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "res.cloudinary.com"
            },
           
        ]
    }
}

module.exports = nextConfig

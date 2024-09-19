/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"imgs.search.brave.com"
            },
            {
                protocol:"https",   
                hostname:"writelatex.s3.amazonaws.com"
            }

        ]
    },
};

export default nextConfig;

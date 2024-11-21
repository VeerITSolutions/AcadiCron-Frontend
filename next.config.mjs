/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname], // Dynamically extract the hostname
    },
};

export default nextConfig;

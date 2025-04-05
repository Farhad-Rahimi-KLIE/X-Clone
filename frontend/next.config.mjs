/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '8000', // Specify the port if needed
              pathname: '/**', // Allow all paths
            },
          ],
      },
};

export default nextConfig;

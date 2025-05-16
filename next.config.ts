
import type {NextConfig} from 'next';

// Define and export the i18n configuration separately
// export const i18n = {
//   locales: ['en', 'hi', 'kn'],
//   defaultLocale: 'en',
// };

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // i18n: i18n, // Removed i18n block
};

export default nextConfig;

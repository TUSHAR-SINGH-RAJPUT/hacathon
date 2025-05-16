
import type {NextConfig} from 'next';

// Define and export the i18n configuration separately
export const i18n = {
  locales: ['en', 'hi', 'kn'],
  defaultLocale: 'en',
};

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
  // This i18n block in nextConfig is primarily for Next.js's internal routing
  // if you were using the Pages Router or certain built-in i18n routing features
  // that rely on it. For App Router, we often manage locales via directory structure
  // and middleware, but having it here can be useful for other tools or consistency.
  // The key is that our application code will import the `i18n` const we defined above.
  i18n: i18n, 
};

export default nextConfig;

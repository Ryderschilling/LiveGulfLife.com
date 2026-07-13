/** @type {import('next').NextConfig} */

// The WP Engine origin URL — change this to the internal WP Engine URL
// (e.g., gulflifeconcierge.wpengine.com) once DNS is switched to Vercel.
// During development / before DNS switch, you can leave this as livegulflife.com.
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://livegulflife.com';

const nextConfig = {
  // Allow images from the WordPress origin
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'livegulflife.com',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return {
      // These paths are handled by Next.js — no proxy needed
      // Everything else falls through to WordPress/Streamline
      fallback: [
        {
          source: '/:path*',
          destination: `${WORDPRESS_URL}/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;

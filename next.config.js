/** @type {import('next').NextConfig} */

// The WordPress / Streamline origin that still serves the 64 property pages,
// the /wp-content/ media library, and the Streamline booking paths.
//
// IMPORTANT: this must be the host's own internal hostname (something like
// gulflifeconcierge.wpengine.com), never livegulflife.com. livegulflife.com now
// resolves to Vercel, so pointing this back at the public domain makes Vercel
// proxy to itself: every unmatched path 508s with INFINITE_LOOP and every
// wp-content image dies in a redirect loop.
//
// Set it in Vercel: Project Settings, Environment Variables, WORDPRESS_URL.
function resolveWpOrigin(value) {
  const raw = (value || '').trim();
  if (!raw) return null;

  let host;
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch (e) {
    return null;
  }

  // Never proxy to ourselves.
  const self = ['livegulflife.com', 'www.livegulflife.com'];
  if (self.indexOf(host) !== -1) return null;
  if (host.endsWith('.vercel.app')) return null;

  return raw.replace(/\/+$/, '');
}

const WORDPRESS_URL = resolveWpOrigin(process.env.WORDPRESS_URL);

if (!WORDPRESS_URL) {
  console.warn(
    '[gulf-life] WORDPRESS_URL is not set to a valid WordPress origin. ' +
      'Property pages and /wp-content/ assets will 404 instead of proxying. ' +
      'This is intentional: it prevents the 508 INFINITE_LOOP.'
  );
}

const nextConfig = {
  images: {
    remotePatterns: WORDPRESS_URL
      ? [
          {
            protocol: 'https',
            hostname: new URL(WORDPRESS_URL).hostname,
            pathname: '/**',
          },
        ]
      : [],
  },

  async rewrites() {
    // fallback runs only for paths Next.js does not already handle.
    // With no valid origin we return nothing, so those paths render our own
    // 404 instead of looping forever.
    if (!WORDPRESS_URL) return { fallback: [] };

    return {
      fallback: [
        {
          source: '/:path*',
          destination: WORDPRESS_URL + '/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

// Mirror of lib/wp-origin.ts. next.config.js is CommonJS and cannot import the
// TypeScript module, so the guard is duplicated here on purpose.
//
// WORDPRESS_URL must be the host's own hostname (something like
// gulflifeconcierge.wpengine.com or wp.livegulflife.com), never the public
// domain. livegulflife.com resolves to Vercel, so pointing this back at it makes
// Vercel proxy to itself and every request dies with 508 INFINITE_LOOP.
function resolveWpOrigin(value) {
  const raw = (value || '').trim();
  if (!raw) return null;

  let host;
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch (e) {
    return null;
  }

  if (host === 'livegulflife.com' || host === 'www.livegulflife.com') return null;
  if (host.endsWith('.vercel.app')) return null;

  return raw.replace(/\/+$/, '');
}

const WORDPRESS_URL = resolveWpOrigin(process.env.WORDPRESS_URL);

if (!WORDPRESS_URL) {
  console.warn(
    '[gulf-life] WORDPRESS_URL is not set to a valid WordPress origin. ' +
      'Property pages and WordPress assets will show the branded 404 instead of ' +
      'proxying. This is intentional: it prevents the 508 INFINITE_LOOP.'
  );
}

// Everything WordPress and Streamline still own is proxied by app/[...wp]/route.ts,
// which spoofs the Host header so WordPress renders as livegulflife.com. Edge
// rewrites cannot set a Host header, which is why none are configured here: an
// origin that canonical-redirects would bounce the browser and restart the loop.

const nextConfig = {
  // WordPress and Streamline URLs end in a slash. Let both forms through
  // untouched instead of bouncing every property page and booking POST
  // through a 308.
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [],
  },

  // No rewrites: the proxy route above handles every WordPress path.
};

module.exports = nextConfig;

// The public domain guests actually type. WordPress is asked to render as if it
// were being served from here, which keeps every link, canonical and asset URL
// pointing at livegulflife.com instead of leaking the host's internal name.
export const PUBLIC_HOST = 'livegulflife.com'

// The WordPress / Streamline origin that still serves the 64 property pages and
// the media library.
//
// This must be the host's own hostname (something like gulflifeconcierge.wpengine.com
// or wp.livegulflife.com), never the public domain. livegulflife.com resolves to
// Vercel, so pointing this back at it makes Vercel proxy to itself and every request
// dies with 508 INFINITE_LOOP.
export function resolveWpOrigin(value?: string | null): string | null {
  const raw = (value || '').trim()
  if (!raw) return null

  let host: string
  try {
    host = new URL(raw).hostname.toLowerCase()
  } catch {
    return null
  }

  if (host === PUBLIC_HOST || host === `www.${PUBLIC_HOST}`) return null
  if (host.endsWith('.vercel.app')) return null

  return raw.replace(/\/+$/, '')
}

export const WP_ORIGIN = resolveWpOrigin(process.env.WORDPRESS_URL)

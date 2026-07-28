import { NextRequest } from 'next/server'
import { WP_ORIGIN } from '@/lib/wp-origin'
import {
  fetchFromWordPress,
  sanitizeBody,
  buildResponseHeaders,
  notFoundPage,
} from '@/lib/wp-proxy'

// Node runtime so the Host header can be set on the outgoing request. The web
// fetch() API forbids it, and the Host spoof is what stops WordPress from
// canonical-redirecting back to livegulflife.com and restarting the loop.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Content types whose bodies get URL cleanup before being sent to the browser.
const TEXTUAL = /^(text\/|application\/(json|javascript|xml|xhtml|rss|ld\+json))/i

// Static WordPress files. No cookies in, no cookies out, cached hard at the CDN
// so repeat traffic never touches this function.
const STATIC_PREFIXES = ['/wp-content/', '/wp-includes/']
const STATIC_CACHE = 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400'

function isStatic(pathname: string) {
  return STATIC_PREFIXES.some((p) => pathname.startsWith(p))
}

// Only the headers WordPress actually needs for an asset request.
function assetHeaders(source: Headers) {
  const out = new Headers()
  for (const name of ['accept', 'accept-language', 'user-agent']) {
    const v = source.get(name)
    if (v) out.set(name, v)
  }
  return out
}

async function proxy(request: NextRequest) {
  if (!WP_ORIGIN) return notFoundPage()

  const url = new URL(request.url)
  const pathWithQuery = url.pathname + url.search
  const asset = isStatic(url.pathname)

  let body: Buffer | undefined
  if (request.method === 'POST') {
    body = Buffer.from(await request.arrayBuffer())
  }

  let res
  try {
    res = await fetchFromWordPress(pathWithQuery, {
      method: request.method,
      headers: asset ? assetHeaders(request.headers) : request.headers,
      body,
    })
  } catch {
    return notFoundPage()
  }

  if (!res) return notFoundPage()
  if (res.status === 404) return notFoundPage()

  const headers = buildResponseHeaders(res.headers)

  if (asset) {
    headers.delete('set-cookie')
    headers.set('cache-control', STATIC_CACHE)
  }

  const contentType = headers.get('content-type') || ''

  if (TEXTUAL.test(contentType)) {
    const cleaned = sanitizeBody(res.body.toString('utf8'))
    return new Response(cleaned, { status: res.status, headers })
  }

  return new Response(new Uint8Array(res.body), { status: res.status, headers })
}

export async function GET(request: NextRequest) {
  return proxy(request)
}

export async function HEAD(request: NextRequest) {
  return proxy(request)
}

export async function POST(request: NextRequest) {
  return proxy(request)
}

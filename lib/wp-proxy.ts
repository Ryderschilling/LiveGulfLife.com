import https from 'node:https'
import http from 'node:http'
import { PUBLIC_HOST, WP_ORIGIN } from './wp-origin'

const IS_IP = /^\d{1,3}(?:\.\d{1,3}){3}$/

type OriginResponse = {
  status: number
  headers: Record<string, string | string[] | undefined>
  body: Buffer
}

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'content-encoding',
  'content-length',
  'strict-transport-security',
  'alt-svc',
])

// Headers worth passing to WordPress. Anything else is noise or dangerous.
const FORWARD_REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'cookie',
  'referer',
  'user-agent',
]

function singleRequest(
  target: URL,
  method: string,
  headers: Record<string, string>,
  body?: Buffer
): Promise<OriginResponse> {
  const isHttps = target.protocol === 'https:'
  const agent = isHttps ? https : http

  return new Promise((resolve, reject) => {
    const req = agent.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (isHttps ? 443 : 80),
        path: target.pathname + target.search,
        method,
        headers,
        // TLS is negotiated against the real origin hostname even though the
        // Host header claims to be livegulflife.com. When the origin is given as
        // a bare IP there is no name to present, and the certificate the host
        // actually holds is the public domain, so use that for SNI instead.
        servername: isHttps
          ? (IS_IP.test(target.hostname) ? PUBLIC_HOST : target.hostname)
          : undefined,
        timeout: 20000,
      } as https.RequestOptions,
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (c) => chunks.push(c as Buffer))
        res.on('end', () =>
          resolve({
            status: res.statusCode || 502,
            headers: res.headers as Record<string, string | string[] | undefined>,
            body: Buffer.concat(chunks),
          })
        )
      }
    )

    req.on('timeout', () => req.destroy(new Error('origin timeout')))
    req.on('error', reject)
    if (body && body.length) req.write(body)
    req.end()
  })
}

/**
 * Fetch a path from the WordPress origin while telling it that it is
 * livegulflife.com. That stops WordPress canonical-redirecting back to the
 * public domain, which is what would restart the infinite loop.
 *
 * Any redirect that points back at the public domain or at the origin itself is
 * resolved server-side so the browser never sees it.
 */
export async function fetchFromWordPress(
  pathWithQuery: string,
  init: { method?: string; headers?: Headers; body?: Buffer } = {}
): Promise<OriginResponse | null> {
  if (!WP_ORIGIN) return null

  const origin = new URL(WP_ORIGIN)
  const method = (init.method || 'GET').toUpperCase()

  const headers: Record<string, string> = {
    host: PUBLIC_HOST,
    'x-forwarded-host': PUBLIC_HOST,
    'x-forwarded-proto': 'https',
    // Ask for uncompressed bytes so the HTML can be inspected without gunzipping.
    'accept-encoding': 'identity',
  }

  if (init.headers) {
    for (const name of FORWARD_REQUEST_HEADERS) {
      const v = init.headers.get(name)
      if (v) headers[name] = v
    }
  }
  if (!headers['user-agent']) {
    headers['user-agent'] =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
  if (init.body && init.body.length) {
    headers['content-length'] = String(init.body.length)
  }

  let target = new URL(pathWithQuery, origin)
  target.protocol = origin.protocol
  target.host = origin.host

  const internalHosts = new Set([
    PUBLIC_HOST,
    `www.${PUBLIC_HOST}`,
    origin.hostname.toLowerCase(),
  ])

  let res = await singleRequest(target, method, headers, init.body)

  // Resolve internal redirects ourselves instead of handing them to the browser.
  for (let hop = 0; hop < 4; hop++) {
    if (res.status < 300 || res.status > 399) break

    const loc = res.headers['location']
    const locStr = Array.isArray(loc) ? loc[0] : loc
    if (!locStr) break

    let next: URL
    try {
      next = new URL(locStr, target)
    } catch {
      break
    }

    if (!internalHosts.has(next.hostname.toLowerCase())) break

    next.protocol = origin.protocol
    next.host = origin.host
    target = next
    res = await singleRequest(target, 'GET', headers)
  }

  return res
}

/**
 * Rewrite anything in a text response that would break the padlock or leak the
 * origin hostname:
 *  - http://livegulflife.com  ->  https://livegulflife.com   (mixed content)
 *  - the origin hostname      ->  livegulflife.com           (hostname leak)
 */
export function sanitizeBody(text: string): string {
  let out = text

  if (WP_ORIGIN) {
    const originHost = new URL(WP_ORIGIN).host // includes port when present
    out = out
      .split(`https://${originHost}`)
      .join(`https://${PUBLIC_HOST}`)
      .split(`http://${originHost}`)
      .join(`https://${PUBLIC_HOST}`)
      .split(`//${originHost}`)
      .join(`//${PUBLIC_HOST}`)
  }

  out = out
    .split(`http://${PUBLIC_HOST}`)
    .join(`https://${PUBLIC_HOST}`)
    .split(`http://www.${PUBLIC_HOST}`)
    .join(`https://www.${PUBLIC_HOST}`)

  return out
}

export function buildResponseHeaders(
  originHeaders: Record<string, string | string[] | undefined>
): Headers {
  const headers = new Headers()

  for (const [key, value] of Object.entries(originHeaders)) {
    const k = key.toLowerCase()
    if (HOP_BY_HOP.has(k)) continue
    if (value === undefined) continue

    if (k === 'set-cookie') {
      const cookies = Array.isArray(value) ? value : [value]
      for (const c of cookies) {
        // Keep sessions on the public domain so Streamline carts survive.
        headers.append('set-cookie', c.replace(/;\s*Domain=[^;]*/gi, ''))
      }
      continue
    }

    headers.set(k, Array.isArray(value) ? value.join(', ') : value)
  }

  return headers
}

const SHELL = (title: string, heading: string, body: string, cta: string) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} | Gulf Life Concierge</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#2B354E;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
       text-align:center;padding:24px}
  .box{max-width:540px}
  h1{font-size:30px;font-weight:600;margin:0 0 16px;letter-spacing:.01em;line-height:1.25}
  p{font-size:16px;line-height:1.75;color:rgba(255,255,255,.75);margin:0 0 30px}
  a.btn{display:inline-block;background:#AB9055;color:#fff;text-decoration:none;
        padding:15px 30px;letter-spacing:.12em;font-size:13px;text-transform:uppercase}
  a.tel{color:#c9a96e;text-decoration:none;font-weight:600}
</style></head>
<body><div class="box">
  <h1>${heading}</h1>
  <p>${body}</p>
  ${cta}
</div></body></html>`

const CALL_CTA = `<a class="btn" href="/contact-us">Contact Us</a>`

export function notFoundPage() {
  return new Response(
    SHELL(
      'Page Not Found',
      'We could not find that page',
      'Our site is being updated and some rental pages have moved. Call us at <a class="tel" href="tel:+18508427619">(850) 842-7619</a> and we will find you the right home today.',
      CALL_CTA
    ),
    { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } }
  )
}

export function unavailablePage() {
  return new Response(
    SHELL(
      'Booking Search',
      'Our booking search is being updated',
      'We are moving to a new site and rental search is back shortly. Call us at <a class="tel" href="tel:+18508427619">(850) 842-7619</a> and we will find you the right home today.',
      CALL_CTA
    ),
    {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': '3600',
      },
    }
  )
}

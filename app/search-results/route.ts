import { NextRequest, NextResponse } from 'next/server'

// Same guard as next.config.js: never proxy to the public domain, because the
// public domain now points at Vercel and the request would come straight back
// here, forever (Vercel kills it with 508 INFINITE_LOOP).
function resolveWpOrigin(value?: string | null): string | null {
  const raw = (value || '').trim()
  if (!raw) return null

  let host: string
  try {
    host = new URL(raw).hostname.toLowerCase()
  } catch {
    return null
  }

  if (host === 'livegulflife.com' || host === 'www.livegulflife.com') return null
  if (host.endsWith('.vercel.app')) return null

  return raw.replace(/\/+$/, '')
}

const WP_BASE = resolveWpOrigin(process.env.WORDPRESS_URL)

// Shown only while WORDPRESS_URL is unset. Better than a raw 508 for a guest
// who is trying to book.
function unavailable() {
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Booking Search | Gulf Life Concierge</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:#2B354E;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
       text-align:center;padding:24px}
  .box{max-width:520px}
  h1{font-size:28px;font-weight:600;margin:0 0 16px;letter-spacing:.01em}
  p{font-size:16px;line-height:1.7;color:rgba(255,255,255,.75);margin:0 0 28px}
  a.btn{display:inline-block;background:#AB9055;color:#fff;text-decoration:none;
        padding:14px 28px;letter-spacing:.12em;font-size:13px;text-transform:uppercase}
  a.tel{color:#c9a96e;text-decoration:none;font-weight:600}
</style></head>
<body><div class="box">
  <h1>Our booking search is being updated</h1>
  <p>We are moving to a new site and rental search is back shortly.
     Call us at <a class="tel" href="tel:+18508427619">(850) 842-7619</a>
     and we will find you the right home today.</p>
  <a class="btn" href="/contact-us">Contact Us</a>
</div></body></html>`

  return new NextResponse(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Retry-After': '3600',
    },
  })
}

export async function GET(request: NextRequest) {
  if (!WP_BASE) return unavailable()

  const url = new URL(request.url)

  const areaId = url.searchParams.get('area_id') || ''
  const beds   = url.searchParams.get('beds')    || ''

  // Fetch the WP search results page, passing all params so WP can filter.
  const wpUrl = `${WP_BASE}/search-results/?${url.searchParams.toString()}`

  try {
    const wpResponse = await fetch(wpUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      cache: 'no-store',
      redirect: 'follow',
    })

    let html = await wpResponse.text()

    // Rewrite any absolute links back to the WP origin so the browser stays on
    // livegulflife.com and keeps going through this proxy.
    const originHost = new URL(WP_BASE).origin
    html = html.split(originHost).join('')

    // Inject the filter-init script. Runs in the browser after Streamline loads,
    // sets the location + bedrooms selects the way Angular ng-model expects,
    // then clicks UPDATE to fire the real search.
    const initScript = `
<script>
(function() {
  var AREA_ID = '${areaId}';
  var BEDS    = '${beds}';

  function setSelectAngular(el, value) {
    el.value = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function clickUpdate() {
    var btn = document.querySelector('button[type="submit"]');
    if (btn) btn.click();
  }

  function applyFilters(attempts) {
    var locSelect  = document.getElementById('resortpro_sw_area');
    var bedsSelect = document.getElementById('streamlinecore_sw_bedrooms_number');

    if (!locSelect || !bedsSelect) {
      if (attempts > 0) setTimeout(function() { applyFilters(attempts - 1); }, 250);
      return;
    }

    if (AREA_ID) setSelectAngular(locSelect,  AREA_ID);
    if (BEDS)    setSelectAngular(bedsSelect, BEDS);

    setTimeout(clickUpdate, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { applyFilters(20); });
  } else {
    applyFilters(20);
  }
})();
</script>`

    html = html.replace('</body>', initScript + '\n</body>')

    return new NextResponse(html, {
      status: wpResponse.status,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch {
    return unavailable()
  }
}

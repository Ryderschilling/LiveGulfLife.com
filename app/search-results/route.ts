import { NextRequest, NextResponse } from 'next/server'

const WP_BASE = process.env.WORDPRESS_URL || 'https://livegulflife.com'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const areaId = url.searchParams.get('area_id') || ''
  const beds   = url.searchParams.get('beds')    || ''
  const sd     = url.searchParams.get('sd')      || ''
  const ed     = url.searchParams.get('ed')      || ''

  // Fetch the WP search results page — pass all params so WP can do any server-side filtering
  const wpUrl = `${WP_BASE}/search-results/?${url.searchParams.toString()}`

  try {
    const wpResponse = await fetch(wpUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      cache: 'no-store',
    })

    let html = await wpResponse.text()

    // ── Inject filter-init script ─────────────────────────────────────────────
    // Runs in the browser after Streamline loads.
    // Sets the location + bedrooms selects in a way Angular's ng-model picks up,
    // then clicks the UPDATE button to trigger the actual search.
    const initScript = `
<script>
(function() {
  var AREA_ID = '${areaId}';
  var BEDS    = '${beds}';

  function setSelectAngular(el, value) {
    // Setting .value + dispatching 'change' is what Angular's ng-model listens for
    el.value = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    // Also fire 'input' for safety
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function clickUpdate() {
    // The UPDATE button on the Streamline search bar is type="submit"
    var btn = document.querySelector('button[type="submit"]');
    if (btn) btn.click();
  }

  function applyFilters(attempts) {
    var locSelect  = document.getElementById('resortpro_sw_area');
    var bedsSelect = document.getElementById('streamlinecore_sw_bedrooms_number');

    // Retry until Streamline has mounted its selects
    if (!locSelect || !bedsSelect) {
      if (attempts > 0) setTimeout(function() { applyFilters(attempts - 1); }, 250);
      return;
    }

    if (AREA_ID) setSelectAngular(locSelect,  AREA_ID);
    if (BEDS)    setSelectAngular(bedsSelect, BEDS);

    // Give Angular time to run its digest cycle, then fire UPDATE
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
    // If server-side fetch fails, fall back to a direct redirect to WP
    return NextResponse.redirect(wpUrl)
  }
}

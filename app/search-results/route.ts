import { NextRequest } from 'next/server'
import { WP_ORIGIN } from '@/lib/wp-origin'
import {
  fetchFromWordPress,
  sanitizeBody,
  buildResponseHeaders,
  unavailablePage,
} from '@/lib/wp-proxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Runs in the browser once Streamline has mounted. Sets the location and
// bedrooms selects the way Angular ng-model expects, then clicks UPDATE.
function initScript(areaId: string, beds: string) {
  return `
<script>
(function() {
  var AREA_ID = ${JSON.stringify(areaId)};
  var BEDS    = ${JSON.stringify(beds)};

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
}

export async function GET(request: NextRequest) {
  if (!WP_ORIGIN) return unavailablePage()

  const url = new URL(request.url)
  const areaId = url.searchParams.get('area_id') || ''
  const beds = url.searchParams.get('beds') || ''

  let res
  try {
    res = await fetchFromWordPress(`/search-results/?${url.searchParams.toString()}`, {
      method: 'GET',
      headers: request.headers,
    })
  } catch {
    return unavailablePage()
  }

  if (!res || res.status >= 500) return unavailablePage()

  const headers = buildResponseHeaders(res.headers)
  let html = sanitizeBody(res.body.toString('utf8'))
  html = html.replace('</body>', initScript(areaId, beds) + '\n</body>')

  headers.set('Content-Type', 'text/html; charset=utf-8')
  return new Response(html, { status: res.status, headers })
}

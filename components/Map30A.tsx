'use client'

import { useEffect, useRef, useState } from 'react'

const WP = 'https://livegulflife.com'
const UP = `${WP}/wp-content/uploads/2025/11`

const LOCATIONS = [
  { id: 'grayton',   label: 'Grayton Beach',    tag: 'Beachfront',      properties: 6, href: `${WP}/search-results/?location=Grayton+Beach` },
  { id: 'seaside',   label: 'Seaside',           tag: 'Family Favorites',properties: 5, href: `${WP}/search-results/?location=Seaside` },
  { id: 'watercolor',label: 'WaterColor',        tag: 'Resort Style',    properties: 4, href: `${WP}/search-results/?location=WaterColor` },
  { id: 'watersound',label: 'Watersound Beach',  tag: 'Private Pools',   properties: 8, href: `${WP}/search-results/?location=Watersound` },
  { id: 'rosemary',  label: 'Rosemary Beach',    tag: 'Premium Estates', properties: 5, href: `${WP}/search-results/?location=Rosemary+Beach` },
]

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < bp)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [bp])
  return isMobile
}

export default function Map30A() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef  = useRef<any>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'; link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    if (!document.getElementById('gl-map-css')) {
      const style = document.createElement('style')
      style.id = 'gl-map-css'
      style.textContent = `
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom {
          border: none !important; border-radius: 8px !important;
          overflow: hidden !important; box-shadow: 0 2px 12px rgba(0,0,0,0.10) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(255,255,255,0.95) !important; color: #2B354E !important;
          font-weight: 700 !important; border: none !important;
          border-bottom: 1px solid rgba(43,53,78,0.08) !important;
          width: 28px !important; height: 28px !important;
          line-height: 28px !important; font-size: 16px !important;
          transition: color 0.15s !important;
        }
        .leaflet-control-zoom a:hover { color: #AB9055 !important; }
        .leaflet-control-zoom-in  { border-radius: 8px 8px 0 0 !important; }
        .leaflet-control-zoom-out { border-radius: 0 0 8px 8px !important; }
        .leaflet-tile-pane { filter: grayscale(1) contrast(1.08) brightness(0.96) !important; }
      `
      document.head.appendChild(style)
    }

    import('leaflet').then(({ default: L }) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return
      const map = L.map(mapContainerRef.current, {
        center: [30.30, -86.07], zoom: 11,
        zoomControl: true, scrollWheelZoom: false,
        dragging: true, attributionControl: false,
      })
      mapInstanceRef.current = map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd', maxZoom: 19, minZoom: 9,
      }).addTo(map)
      const corridor = L.latLngBounds([[30.268, -86.19], [30.34, -85.94]])
      map.fitBounds(corridor, { padding: [32, 60] })
    })

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null }
    }
  }, [])

  return (
    <section style={{ background: '#F7F4EE', padding: isMobile ? '56px 0 48px' : '88px 0 72px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '48px' }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '12px',
          }}>
            Where Would You Like To Stay?
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: isMobile ? '24px' : 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 300, color: '#1A1A1A',
          }}>
            Explore 30A
          </h2>
        </div>

        {/* Map */}
        <div style={{
          borderRadius: isMobile ? '12px' : '20px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(43,53,78,0.14)',
          border: '1px solid rgba(43,53,78,0.08)',
        }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: isMobile ? '300px' : '420px', display: 'block' }} />
        </div>

        {/* Location pills ─────────────────────────────────────────── */}
        {isMobile ? (
          /* Mobile: horizontal scroll strip */
          <div style={{ marginTop: '16px', position: 'relative' }}>
            {/* Right-edge fade hint */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 4,
              width: '56px', zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to right, transparent, #F7F4EE)',
            }} />
            <div style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch' as any,
              scrollbarWidth: 'none' as any,
              msOverflowStyle: 'none' as any,
              paddingBottom: '4px',
            }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              paddingRight: '56px',
              width: 'max-content',
            }}>
              {LOCATIONS.map(l => (
                <a
                  key={l.id}
                  href={l.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '4px',
                    padding: '14px 16px',
                    background: '#fff',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(43,53,78,0.07)',
                    width: '140px',
                    flexShrink: 0,
                  }}
                >
                  {/* Gold dot + count */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#AB9055', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'Outfit, sans-serif', fontSize: '13px',
                      fontWeight: 600, color: '#AB9055',
                    }}>
                      {l.properties} properties
                    </span>
                  </div>
                  {/* Location name */}
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2B354E',
                    lineHeight: 1.3,
                  }}>
                    {l.label}
                  </p>
                  {/* Tag */}
                  <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '11px',
                    color: 'rgba(43,53,78,0.45)', marginTop: '2px',
                  }}>
                    {l.tag}
                  </p>
                </a>
              ))}
            </div>
            </div>
          </div>
        ) : (
          /* Desktop: 5-col grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            marginTop: '20px',
          }}>
            {LOCATIONS.map(l => (
              <a
                key={l.id}
                href={l.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 18px', background: '#fff', borderRadius: '10px',
                  textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(43,53,78,0.06)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,53,78,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#AB9055', flexShrink: 0 }} />
                <div>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2B354E',
                  }}>
                    {l.label}
                  </p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px', color: '#AB9055', marginTop: '2px' }}>
                    {l.properties} properties
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

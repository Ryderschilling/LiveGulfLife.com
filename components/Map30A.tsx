'use client'

import { useEffect, useRef } from 'react'

const WP = 'https://livegulflife.com'
const UP = `${WP}/wp-content/uploads/2025/11`

const LOCATIONS = [
  {
    id: 'grayton',
    label: 'Grayton Beach',
    tag: 'Beachfront',
    properties: 6,
    href: `${WP}/search-results/?location=Grayton+Beach`,
    img: `${UP}/original_169210140_beach_front-e1764087084845.jpeg`,
  },
  {
    id: 'seaside',
    label: 'Seaside',
    tag: 'Family Favorites',
    properties: 5,
    href: `${WP}/search-results/?location=Seaside`,
    img: `${UP}/GLV_header_beachfront.jpeg`,
  },
  {
    id: 'watercolor',
    label: 'WaterColor',
    tag: 'Resort Style',
    properties: 4,
    href: `${WP}/search-results/?location=WaterColor`,
    img: `${UP}/original_169986477_resorts.jpeg`,
  },
  {
    id: 'watersound',
    label: 'Watersound Beach',
    tag: 'Private Pools',
    properties: 8,
    href: `${WP}/search-results/?location=Watersound`,
    img: `${UP}/original_169209707_private_pool-e1764190709180.jpeg`,
  },
  {
    id: 'rosemary',
    label: 'Rosemary Beach',
    tag: 'Premium Estates',
    properties: 5,
    href: `${WP}/search-results/?location=Rosemary+Beach`,
    img: `${UP}/original_169986477_resorts.jpeg`,
  },
]

export default function Map30A() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef  = useRef<any>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Inject Leaflet CSS once
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id   = 'leaflet-css'
      link.rel  = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Map UI styles only (no pins/markers needed)
    if (!document.getElementById('gl-map-css')) {
      const style = document.createElement('style')
      style.id = 'gl-map-css'
      style.textContent = `
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(255,255,255,0.95) !important;
          color: #2B354E !important;
          font-weight: 700 !important;
          border: none !important;
          border-bottom: 1px solid rgba(43,53,78,0.08) !important;
          width: 28px !important;
          height: 28px !important;
          line-height: 28px !important;
          font-size: 16px !important;
          transition: color 0.15s !important;
        }
        .leaflet-control-zoom a:hover { color: #AB9055 !important; }
        .leaflet-control-zoom-in  { border-radius: 8px 8px 0 0 !important; }
        .leaflet-control-zoom-out { border-radius: 0 0 8px 8px !important; }
        /* B&W tiles only — no markers to worry about */
        .leaflet-tile-pane { filter: grayscale(1) contrast(1.08) brightness(0.96) !important; }
      `
      document.head.appendChild(style)
    }

    import('leaflet').then(({ default: L }) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return

      const map = L.map(mapContainerRef.current, {
        center:             [30.30, -86.07],
        zoom:               11,
        zoomControl:        true,
        scrollWheelZoom:    false,
        dragging:           true,
        attributionControl: false,
      })

      mapInstanceRef.current = map

      // CartoDB Positron — clean B&W road map, free, no API key
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom:    19,
        minZoom:    9,
      }).addTo(map)

      // Frame the full 30A corridor
      const corridor = L.latLngBounds([
        [30.268, -86.19],  // SW corner (Grayton area)
        [30.34,  -85.94],  // NE corner (Rosemary area)
      ])
      map.fitBounds(corridor, { padding: [32, 60] })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <section style={{ background: '#F7F4EE', padding: '88px 0 72px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#AB9055', marginBottom: '14px',
          }}>
            Where Would You Like To Stay?
          </p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 300, color: '#1A1A1A',
          }}>
            Explore 30A
          </h2>
        </div>

        {/* Map — clean, no pins */}
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(43,53,78,0.14)',
          border: '1px solid rgba(43,53,78,0.08)',
        }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '420px', display: 'block' }} />
        </div>

        {/* Location cards */}
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
                padding: '14px 18px',
                background: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid rgba(43,53,78,0.06)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(43,53,78,0.12)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
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

      </div>
    </section>
  )
}

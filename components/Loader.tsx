'use client'

import { useEffect, useState } from 'react'

const LOGO = '/logo-white.svg'

export default function Loader() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1300)
    const t2 = setTimeout(() => setGone(true), 1850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#2B354E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.55s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <img
        src={LOGO}
        alt="Gulf Life Concierge"
        style={{
          height: '72px',
          width: 'auto',
          animation: 'loaderPulse 1.6s ease-in-out infinite',
        }}
      />
      {/* Progress bar */}
      <div
        style={{
          width: '180px',
          height: '2px',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '28px',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #c9a96e, #AB9055, #907240)',
            animation: 'loaderBar 1.4s ease-out forwards',
          }}
        />
      </div>
    </div>
  )
}

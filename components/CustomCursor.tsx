'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on true pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovering(!!el.closest('a, button, [role="button"], input, select, textarea, label'))
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [visible])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: hovering ? '44px' : '18px',
        height: hovering ? '44px' : '18px',
        borderRadius: '50%',
        background: hovering ? 'rgba(171,144,85,0.08)' : 'rgba(171,144,85,0.55)',
        border: '1.5px solid rgba(171,144,85,0.85)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 999998,
        transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease, opacity 0.3s ease',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function FloatingConcierge() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <a
      href="sms:8508427619"
      aria-label="Chat with us"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'linear-gradient(135deg, #c9a96e 0%, #AB9055 55%, #907240 100%)',
        color: '#fff',
        borderRadius: '100px',
        padding: '14px 20px',
        textDecoration: 'none',
        boxShadow: '0 8px 32px rgba(171,144,85,0.5), 0 2px 8px rgba(0,0,0,0.15)',
        transition: 'opacity 0.4s ease, transform 0.4s ease, padding 0.25s ease, box-shadow 0.2s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
      }}
      onMouseDown={e => {
        const t = e.currentTarget
        t.style.transform = 'scale(0.97)'
        t.style.boxShadow = '0 4px 16px rgba(171,144,85,0.4)'
      }}
      onMouseUp={e => {
        const t = e.currentTarget
        t.style.transform = 'scale(1)'
        t.style.boxShadow = '0 8px 32px rgba(171,144,85,0.5)'
      }}
    >
      {/* Message icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>

      <span
        style={{
          maxWidth: expanded ? '120px' : '0px',
          overflow: 'hidden',
          transition: 'max-width 0.25s ease',
          display: 'inline-block',
        }}
      >
        CHAT WITH US
      </span>
    </a>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [target, duration, started])
  return count
}

interface Stat {
  prefix?: string
  value: number
  suffix: string
  label: string
}

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, 2000, started)
  return (
    <div style={{ textAlign: 'center', padding: '0 16px' }}>
      <div
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(40px, 5vw, 60px)',
          fontWeight: 300,
          color: '#2B354E',
          lineHeight: 1,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}
      >
        {stat.prefix ?? ''}{count}{stat.suffix}
      </div>
      <div
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#AB9055',
        }}
      >
        {stat.label}
      </div>
    </div>
  )
}

const STATS: Stat[] = [
  { value: 100, suffix: '+', label: 'Five-Star Reviews' },
  { value: 40, suffix: '+', label: 'Gulf Coast Properties' },
  { value: 0, suffix: '', label: 'Hidden Fees' },
  { value: 24, suffix: '/7', label: 'Guest Support' },
]

export default function StatCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: '#fff',
        padding: '64px 40px',
        borderTop: '1px solid #f0ede8',
        borderBottom: '1px solid #f0ede8',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              borderRight: i < STATS.length - 1 ? '1px solid #f0ede8' : 'none',
            }}
          >
            <StatItem stat={s} started={started} />
          </div>
        ))}
      </div>
    </div>
  )
}

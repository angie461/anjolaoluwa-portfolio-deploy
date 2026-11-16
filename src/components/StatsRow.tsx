import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../data/siteConfig'

// Splits a value such as "$10K+" into "$", 10 and "K+", so only the number changes while counting.
function parseStat(value: string) {
  const match = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const decimals = digits.split('.')[1]?.length ?? 0
  return { prefix, suffix, target: Number(digits.replace(/,/g, '')), decimals, grouped: digits.includes(',') }
}

// The page HTML always contains the final value (what search engines read). After the page loads,
// the number is reset to 0 and counts up once when the row scrolls into view.
// Visitors who prefer reduced motion just see the final value.
function StatNumber({ value, start }: { value: string; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const stat = parseStat(value)

  useEffect(() => {
    const el = ref.current
    if (!el || !stat) return
    const format = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals, useGrouping: stat.grouped })
    if (reduceMotion) { el.textContent = format(stat.target); return }
    if (!start) { el.textContent = format(0); return }
    const controls = animate(0, stat.target, { duration: 1.8, ease: 'easeOut', onUpdate: n => { el.textContent = format(n) } })
    return () => controls.stop()
  }, [start, reduceMotion, stat?.target, stat?.decimals, stat?.grouped]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!stat) return <span className="stat-value">{value}</span>
  return <span className="stat-value">
    {stat.prefix && <span className="stat-symbol">{stat.prefix}</span>}
    {/* suppressHydrationWarning: the years figure can differ between build time and the visitor's year; the effect corrects it. */}
    <span ref={ref} suppressHydrationWarning>{value.slice(stat.prefix.length, value.length - stat.suffix.length)}</span>
    {stat.suffix && <span className="stat-symbol">{stat.suffix}</span>}
  </span>
}

export function StatsRow() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  if (!siteConfig.stats.length) return null
  return <section ref={ref} className="stats section-wrap" aria-label="Experience and results">
    <dl className="stats-grid">
      {siteConfig.stats.map(stat => <div className="stat-item" key={stat.label}>
        <dt className="stat-label">{stat.label}</dt>
        <dd><StatNumber value={stat.value} start={inView} /></dd>
      </div>)}
    </dl>
  </section>
}

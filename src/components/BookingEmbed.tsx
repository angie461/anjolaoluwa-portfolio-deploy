import { useEffect } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

// Google Calendar booking page. Hidden until siteConfig.bookingUrl is set.
export function BookingEmbed() {
  useEffect(() => {
    if (window.location.hash !== '#book') return
    const timer = window.setTimeout(() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    return () => window.clearTimeout(timer)
  }, [])
  if (!siteConfig.bookingUrl) return null
  return <section id="book" className="section-wrap booking-section">
    <div className="booking-head">
      <div><p className="eyebrow">BOOK A CALL</p><h2>Prefer to talk it through? <em>Pick a time.</em></h2></div>
      <a className="inline-link" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Open in a new tab <ArrowUpRight size={15} /></a>
    </div>
    <iframe className="booking-frame" src={siteConfig.bookingUrl} title={`Book a call with ${siteConfig.name}`} loading="lazy" />
  </section>
}

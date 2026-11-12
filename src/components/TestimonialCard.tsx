import type { Testimonial } from '../data/content'
import { YouTubeEmbed } from './YouTubeEmbed'

function Stars({ rating }: { rating: number }) {
  return <span className="review-stars" aria-label={`Rated ${rating.toFixed(1)} out of 5`}><span aria-hidden="true">★★★★★</span><b>{rating.toFixed(1)}</b></span>
}

// Written reviews show the client's words as text with the original Upwork screenshot underneath as proof.
// Reviews are quoted exactly as written by the client.
export function TestimonialCard({ item, compact = false }: { item: Testimonial; compact?: boolean }) {
  if (item.type === 'video') {
    return <article className="quote-card">
      {item.youtube ? <YouTubeEmbed url={item.youtube} title={`Video testimonial from ${item.name || 'a client'}`} /> : item.src ? <video src={item.src} muted={false} controls playsInline preload="metadata" poster={item.poster} aria-label="Client video testimonial" /> : null}
      <p>Video testimonial{item.name && ` · ${item.name}`}</p>
    </article>
  }
  return <article className={`quote-card review-card ${compact ? 'review-card-compact' : ''}`.trim()}>
    <div className="review-meta">{item.rating !== undefined && <Stars rating={item.rating} />}<span>{[item.source, item.period].filter(Boolean).join(' · ')}</span></div>
    {item.quote && <blockquote>“{item.quote}”</blockquote>}
    {item.name && <p className="review-project">{item.name}</p>}
    {!compact && item.proof && <a className="review-proof" href={item.proof} target="_blank" rel="noreferrer" aria-label={`Open the original ${item.source || ''} review screenshot`}>
      <img src={item.proof} alt={`Original ${item.source || 'client'} review: ${item.name || ''}`} loading="lazy" />
    </a>}
  </article>
}

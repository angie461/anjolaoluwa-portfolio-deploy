import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react'

export type MediaItem = { src: string; alt: string; kind?: 'image' | 'video'; poster?: string; muted?: boolean; fullVideoUrl?: string }

function FullVersionLink({ url, className }: { url?: string; className: string }) {
  if (!url) return null
  return <a className={className} href={url} target="_blank" rel="noreferrer" onClick={event => event.stopPropagation()}>Watch full version <ArrowUpRight size={14} /></a>
}

export function MediaGallery({ items, title = 'Project gallery' }: { items: MediaItem[]; title?: string }) {
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : items[active]
  const step = (direction: number) => setActive((active === null ? 0 : (active + direction + items.length) % items.length))
  useEffect(() => {
    if (active === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowLeft' && items.length > 1) setActive(current => ((current ?? 0) - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight' && items.length > 1) setActive(current => ((current ?? 0) + 1) % items.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, items.length])
  if (!items.length) return <div className="media-empty"><span>PROJECT MEDIA</span><p>Add screenshots or video to the project data to display them here.</p><small>Images keep their original proportions; dashboards are shown contained.</small></div>
  return <>
    <div className="media-gallery" role="group" aria-label={title}>{items.map((item, index) => item.kind === 'video' ? <div className="media-thumb" key={item.src}>
      <video src={item.src} poster={item.poster} controls playsInline preload="metadata" muted={item.muted ?? false} aria-label={item.alt} />
      <FullVersionLink url={item.fullVideoUrl} className="media-full-link" />
      <button className="media-expand" onClick={() => setActive(index)} aria-label={`Open ${item.alt} full screen`}><Maximize2 size={15} /> Expand</button>
    </div> : <button className="media-thumb" key={item.src} onClick={() => setActive(index)} aria-label={`Open ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy" /></button>)}</div>
    <AnimatePresence>{active !== null && current && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image viewer"><X /></button>{items.length > 1 && <><button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); step(-1) }} aria-label="Previous media"><ArrowLeft /></button><button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); step(1) }} aria-label="Next media"><ArrowRight /></button></>}
      {current.kind === 'video' ? <><video src={current.src} poster={current.poster} controls playsInline muted={current.muted ?? false} onClick={event => event.stopPropagation()} /><FullVersionLink url={current.fullVideoUrl} className="lightbox-full-link" /></> : <img src={current.src} alt={current.alt} onClick={event => event.stopPropagation()} />}
    </motion.div>}</AnimatePresence>
  </>
}

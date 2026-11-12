import { youtubeId } from '../data/videoLinks'

// Privacy-friendly YouTube player. Renders nothing until a valid YouTube link is supplied.
export function YouTubeEmbed({ url, title }: { url?: string; title: string }) {
  const id = youtubeId(url)
  if (!id) return null
  return <div className="youtube-embed">
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      title={title}
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
}

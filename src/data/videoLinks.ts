// One place for every portfolio video.
//
// clip    = the short 60–90 second file you exported, placed in public/projects/clips/
//           Type only the file name, e.g. 'crm-2024-12-05.mov'. Leave '' until the file is in that folder.
// youtube = the full-length Unlisted YouTube link, e.g. 'https://youtu.be/abc123XYZ_0'. Leave '' until uploaded.
//
// A video only appears on the site once its clip name is filled in.
// The testimonial has no clip: it is embedded straight from YouTube once its link is filled in.

export type VideoEntry = { clip: string; youtube: string }

export const siteVideos = {
  crmDec05: { clip: 'crm-2024-12-05.mov', youtube: 'https://youtu.be/wQjuuUSWW7c' },
  crmDec12: { clip: 'crm-2024-12-12.mov', youtube: 'https://youtu.be/e4onqA3Trq4' },
  crmJun28: { clip: 'crm-2025-06-28.mov', youtube: 'https://youtu.be/MS8SAbd2Ru0' },
  websiteWalkthrough: { clip: 'website-walkthrough.mov', youtube: 'https://youtu.be/S4jlYRTnmtQ' },
  clientTestimonial: { youtube: 'https://youtu.be/kZr9FmvLDVw' },
}

export function youtubeId(url: string | undefined): string | null {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/)
  return match?.[1] ?? null
}

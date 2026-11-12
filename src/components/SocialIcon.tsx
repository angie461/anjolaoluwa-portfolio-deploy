export type SocialNetwork = 'instagram' | 'facebook' | 'linkedin'

export function SocialIcon({ network, size = 16 }: { network: SocialNetwork; size?: number }) {
  if (network === 'facebook') return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.35 21v-8.18h2.75l.41-3.19h-3.16V7.6c0-.92.26-1.55 1.58-1.55h1.69V3.2c-.29-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.5-4.13 4.26v2.3H7.24v3.19h2.77V21h3.34Z" /></svg>
  if (network === 'linkedin') return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.2 3.5a1.95 1.95 0 1 0 0 3.9 1.95 1.95 0 0 0 0-3.9ZM3.55 9h3.3v11.4h-3.3V9Zm5.35 0h3.16v1.56h.05c.44-.83 1.52-1.7 3.12-1.7 3.34 0 3.96 2.2 3.96 5.06v6.48h-3.3v-5.75c0-1.37-.03-3.13-1.91-3.13s-2.2 1.49-2.2 3.03v5.85H8.9V9Z" /></svg>
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.6" r=".8" fill="currentColor" stroke="none" /></svg>
}

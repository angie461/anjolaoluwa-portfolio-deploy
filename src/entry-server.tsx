// Build-time entry used by scripts/prerender.mjs to turn each page into real HTML.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'

export { getRoutes, getRouteMeta, getIndexableRoutes, renderHeadTags, renderSitemap, renderLlmsTxt } from './seo/seo'

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App initialPath={path} />
      </MotionConfig>
    </StrictMode>,
  )
}

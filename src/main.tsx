import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { normalizePath } from './seo/seo'

const root = document.getElementById('root')!
const path = normalizePath(window.location.pathname)
const app = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App initialPath={path} />
    </MotionConfig>
  </StrictMode>
)

// Each page is prerendered at build time (scripts/prerender.mjs) and marked with data-route.
// If this HTML was made for this exact URL, React takes over the existing markup (hydration).
// Otherwise (404.html, or the dev server) it renders from scratch.
if (root.dataset.route === path && root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

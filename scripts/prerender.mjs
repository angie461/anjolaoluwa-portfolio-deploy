// Runs after `vite build` (see the "build" script in package.json).
// Turns every page into a real HTML file, so search engines and AI tools can read the content
// without running JavaScript, and so GitHub Pages serves each page with a normal 200 status:
//   dist/index.html, dist/about/index.html, dist/services/<slug>/index.html, ...
// Also writes dist/404.html (unknown URLs only), dist/sitemap.xml and dist/llms.txt.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--app-head--> marker or the empty <div id="root"></div>.')
}

const warnings = []
function page(route, outFile) {
  const meta = server.getRouteMeta(route)
  const n = [...meta.description].length
  if (route !== '/404' && (n < 150 || n > 160)) warnings.push(`${route}: meta description is ${n} characters (aim for 150–160)`)
  const html = template
    .replace('<!--app-head-->', server.renderHeadTags(meta))
    .replace('<div id="root"></div>', `<div id="root" data-route="${route}">${server.render(route)}</div>`)
  return fs.mkdir(path.dirname(outFile), { recursive: true }).then(() => fs.writeFile(outFile, html))
}

const routes = server.getRoutes()
for (const route of routes) {
  await page(route, route === '/' ? path.join(dist, 'index.html') : path.join(dist, ...route.split('/').filter(Boolean), 'index.html'))
}
await page('/404', path.join(dist, '404.html'))
await fs.writeFile(path.join(dist, 'sitemap.xml'), server.renderSitemap())
await fs.writeFile(path.join(dist, 'llms.txt'), server.renderLlmsTxt())

console.log(`Prerendered ${routes.length} pages + 404.html; wrote sitemap.xml (${server.getIndexableRoutes().length} URLs) and llms.txt.`)
for (const warning of warnings) console.warn(`  ⚠ ${warning}`)

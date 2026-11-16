// Everything search engines and AI tools read: the list of pages, each page's title, description,
// canonical URL, social tags and JSON-LD structured data, plus sitemap.xml and llms.txt.
// All of it is generated from the data files, so editing a service or review updates it everywhere.
import { siteConfig } from '../data/siteConfig'
import { platforms, processSteps, services, type Service } from '../data/content'
import { getPortfolioSamples } from '../data/portfolioSamples'
import { pageSeo, serviceSeo, type Faq } from '../data/seoContent'

const SITE = siteConfig.siteUrl
const OG_IMAGE = `${SITE}/profile.jpg`
const LOGO = `${SITE}/logo.jpg`

export type RouteMeta = {
  path: string
  title: string
  description: string
  canonical: string
  ogType: 'website' | 'profile'
  noindex: boolean
  jsonLd: Record<string, unknown>
}

export const normalizePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

// Canonical URLs end in "/" because each page is published as <path>/index.html.
export const absoluteUrl = (path: string) => (path === '/' ? `${SITE}/` : `${SITE}${path}/`)

const hasPortfolioSamples = (slug: string) => getPortfolioSamples(slug).some(group => group.items.length > 0)

/** Every page that is prerendered to its own HTML file. */
export function getRoutes(): string[] {
  return [
    '/', '/about', '/services', ...services.map(s => `/services/${s.slug}`),
    '/portfolio', ...services.map(s => `/portfolio/${s.slug}`),
    '/testimonials', '/contact',
  ]
}

/** Pages listed in the sitemap: every route except portfolio pages that have no samples yet. */
export function getIndexableRoutes(): string[] {
  return getRoutes().filter(path => !getRouteMeta(path).noindex)
}

/** The six FAQs on a service page: four built from content.ts plus two written in seoContent.ts. */
export function getServiceFaqs(service: Service): Faq[] {
  const list = (items: string[]) => items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items.join('')
  const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)
  return [
    { question: `What does your ${service.title.toLowerCase()} service include?`, answer: `${service.intro} It includes ${list(service.offers.map(lower))}.` },
    { question: `Which tools do you use for ${service.title.toLowerCase()}?`, answer: `I mainly work with ${list(service.tools)}, and I choose the platform that fits the job and works with the rest of your tools.` },
    ...(serviceSeo[service.slug]?.faqs ?? []),
    { question: `How does a ${service.title.toLowerCase()} project work?`, answer: `Every project follows four steps: ${list(processSteps.map(lower))}. I start by listening to how your business works, then build with care and clear communication.` },
    { question: 'How do I get started, and do you work with clients outside Nigeria?', answer: `Send a short description of your project through the contact form, by email or on WhatsApp, book a call, or hire me on Upwork. I am based in ${siteConfig.basedIn.country} and work remotely with businesses worldwide.` },
  ]
}

// ---------- JSON-LD ----------
// Business profiles (used for both the person and the business).
const sameAs = [siteConfig.linkedin, siteConfig.upwork, siteConfig.instagram, siteConfig.facebook, ...siteConfig.otherSocials.map(s => s.url)].filter(Boolean)
// The person also links to the personal profiles (not shown on the page).
const personSameAs = [...sameAs, siteConfig.personalInstagram, siteConfig.personalFacebook].filter(Boolean)
const phone = siteConfig.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1]
const ids = { person: `${SITE}/#person`, website: `${SITE}/#website`, business: `${SITE}/#business` }

const person = () => ({
  '@type': 'Person',
  '@id': ids.person,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  jobTitle: siteConfig.jobTitle,
  description: pageSeo.home.description,
  image: OG_IMAGE,
  url: absoluteUrl('/'),
  email: `mailto:${siteConfig.email}`,
  address: { '@type': 'PostalAddress', addressCountry: siteConfig.basedIn.countryCode },
  sameAs: personSameAs,
  knowsAbout: [...services.map(s => s.title), ...platforms],
})
const personRef = { '@id': ids.person }

const breadcrumbs = (trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'] as [string, string], ...trail].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absoluteUrl(path) })),
})

const serviceNode = (service: Service) => ({
  '@type': 'Service',
  '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
  name: service.title,
  serviceType: service.title,
  description: service.description,
  url: absoluteUrl(`/services/${service.slug}`),
  provider: personRef,
  areaServed: 'Worldwide',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: absoluteUrl('/contact') },
})

const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes })

// ---------- per-route meta ----------
export function getRouteMeta(rawPath: string): RouteMeta {
  const path = normalizePath(rawPath)
  const base = { path, canonical: absoluteUrl(path), ogType: 'website' as const, noindex: false }
  const [, section, slug] = path.split('/')

  if (path === '/') return {
    ...base, ...pageSeo.home,
    jsonLd: graph(
      person(),
      { '@type': 'WebSite', '@id': ids.website, name: siteConfig.name, alternateName: siteConfig.fullName, url: absoluteUrl('/'), description: siteConfig.description, inLanguage: 'en', publisher: personRef, about: personRef },
      {
        '@type': 'ProfessionalService',
        '@id': ids.business,
        name: `${siteConfig.name} | ${siteConfig.jobTitle}`,
        description: pageSeo.home.description,
        url: absoluteUrl('/'),
        image: OG_IMAGE,
        logo: LOGO,
        email: siteConfig.email,
        ...(phone ? { telephone: `+${phone}` } : {}),
        founder: personRef,
        employee: personRef,
        address: { '@type': 'PostalAddress', addressCountry: siteConfig.basedIn.countryCode },
        areaServed: 'Worldwide',
        knowsAbout: services.map(s => s.title),
        sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.description, url: absoluteUrl(`/services/${s.slug}`) } })),
        },
      },
    ),
  }

  if (path === '/about') return {
    ...base, ...pageSeo.about, ogType: 'profile',
    jsonLd: graph({ '@type': 'ProfilePage', url: base.canonical, name: pageSeo.about.title, mainEntity: person() }, breadcrumbs([['About', '/about']])),
  }

  if (path === '/services') return {
    ...base, ...pageSeo.services,
    jsonLd: graph(
      { '@type': 'ItemList', name: 'Services', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/services/${s.slug}`), name: s.title })) },
      breadcrumbs([['Services', '/services']]),
    ),
  }

  if (section === 'services' && slug) {
    const service = services.find(s => s.slug === slug)
    if (service) return {
      ...base,
      title: `${service.title} Services | ${siteConfig.name}`,
      description: serviceSeo[slug]?.description ?? service.description,
      jsonLd: graph(
        serviceNode(service),
        breadcrumbs([['Services', '/services'], [service.title, path]]),
        { '@type': 'FAQPage', mainEntity: getServiceFaqs(service).map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
        { '@type': 'Person', '@id': ids.person, name: siteConfig.name, url: absoluteUrl('/') },
      ),
    }
  }

  if (path === '/portfolio') return { ...base, ...pageSeo.portfolio, jsonLd: graph(breadcrumbs([['Portfolio', '/portfolio']])) }

  if (section === 'portfolio' && slug && path.split('/').length === 3) {
    const service = services.find(s => s.slug === slug)
    if (service) return {
      ...base,
      title: `${service.title} Portfolio | ${siteConfig.name}`,
      description: serviceSeo[slug]?.portfolioDescription ?? service.description,
      noindex: !hasPortfolioSamples(slug),
      jsonLd: graph(breadcrumbs([['Portfolio', '/portfolio'], [service.title, path]])),
    }
  }

  if (path === '/testimonials') return { ...base, ...pageSeo.testimonials, jsonLd: graph(breadcrumbs([['Testimonials', '/testimonials']])) }
  if (path === '/contact') return {
    ...base, ...pageSeo.contact,
    jsonLd: graph({ '@type': 'ContactPage', url: base.canonical, name: pageSeo.contact.title, about: personRef }, breadcrumbs([['Contact', '/contact']])),
  }

  // Unknown pages and unfinished case-study placeholders are kept out of search results.
  return { ...base, ...pageSeo.notFound, noindex: true, jsonLd: graph() }
}

// ---------- <head> tags ----------
const escapeHtml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const jsonForScript = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

/** The tags written into each prerendered page's <head>. */
export function renderHeadTags(meta: RouteMeta): string {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:alt" content="Portrait of ${escapeHtml(siteConfig.name)}" />`,
    '<meta property="og:locale" content="en_US" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ]
  if ((meta.jsonLd['@graph'] as unknown[] | undefined)?.length) tags.push(`<script type="application/ld+json" id="structured-data">${jsonForScript(meta.jsonLd)}</script>`)
  return tags.join('\n    ')
}

/** Keeps the <head> in step with the page when visitors move around without a full reload. */
export function applyHeadTags(meta: RouteMeta) {
  if (typeof document === 'undefined') return
  document.title = meta.title
  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector<HTMLElement>(selector)
    if (!el) { el = create(); document.head.appendChild(el) }
    el.setAttribute(attr, value)
  }
  const meta_ = (key: 'name' | 'property', name: string) => () => { const el = document.createElement('meta'); el.setAttribute(key, name); return el }
  set('meta[name="description"]', 'content', meta.description, meta_('name', 'description'))
  set('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large', meta_('name', 'robots'))
  set('link[rel="canonical"]', 'href', meta.canonical, () => { const el = document.createElement('link'); el.setAttribute('rel', 'canonical'); return el })
  for (const [prop, value] of [['og:type', meta.ogType], ['og:title', meta.title], ['og:description', meta.description], ['og:url', meta.canonical]] as const) set(`meta[property="${prop}"]`, 'content', value, meta_('property', prop))
  for (const [name, value] of [['twitter:title', meta.title], ['twitter:description', meta.description]] as const) set(`meta[name="${name}"]`, 'content', value, meta_('name', name))
  let script = document.getElementById('structured-data')
  if (!script) { script = document.createElement('script'); script.id = 'structured-data'; script.setAttribute('type', 'application/ld+json'); document.head.appendChild(script) }
  script.textContent = JSON.stringify(meta.jsonLd)
}

// ---------- sitemap.xml and llms.txt ----------
export function renderSitemap(): string {
  const urls = getIndexableRoutes().map(path => {
    const priority = path === '/' ? '1.0' : path.split('/').length === 2 ? '0.8' : '0.7'
    return `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <priority>${priority}</priority>\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function renderLlmsTxt(): string {
  const page = (path: string) => getRouteMeta(path)
  const line = (path: string, label?: string) => `- [${label ?? page(path).title}](${absoluteUrl(path)}): ${page(path).description}`
  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.name} (full name ${siteConfig.fullName}, also written ${siteConfig.alternateNames.filter(n => n !== siteConfig.fullName).join(', ')}) is a ${siteConfig.jobTitle.replace('&', 'and')} based in ${siteConfig.basedIn.country} who works remotely with businesses worldwide. She helps businesses simplify operations, connect their tools and turn more opportunities into growth through digital marketing, CRM and automation.`,
    '',
    `Platforms she works with: ${platforms.join(', ')}.`,
    '',
    'All portfolio samples on the site are real screenshots and recordings from client work, and client reviews are quoted exactly as written on Upwork.',
    '',
    '## Services',
    '',
    ...services.map(s => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description} Includes: ${s.offers.join('; ')}.`),
    '',
    '## Pages',
    '',
    line('/', 'Home'),
    line('/about', 'About'),
    line('/services', 'Services overview'),
    line('/portfolio', 'Portfolio'),
    ...services.filter(s => hasPortfolioSamples(s.slug)).map(s => line(`/portfolio/${s.slug}`, `${s.title} portfolio`)),
    line('/testimonials', 'Client reviews'),
    line('/contact', 'Contact and booking'),
    '',
    '## Contact',
    '',
    `- Email: ${siteConfig.email}`,
    ...(phone ? [`- WhatsApp: +${phone}`] : []),
    `- Contact form and call booking: ${absoluteUrl('/contact')}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    `- Upwork: ${siteConfig.upwork}`,
    `- Instagram: ${siteConfig.instagram}`,
    `- Facebook: ${siteConfig.facebook}`,
    '',
  ].join('\n')
}

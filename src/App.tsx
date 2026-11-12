import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import { motion } from 'framer-motion'
import { siteConfig } from './data/siteConfig'
import { platforms, services } from './data/content'
import { AboutPage, ContactPage, NotFound, PageShell, PortfolioPage, ServicesNavMenu, ServicesPage, TestimonialsPage } from './RoutePages'
import { getPortfolioSamples } from './data/portfolioSamples'
import { MediaGallery } from './components/MediaGallery'
import { SocialIcon } from './components/SocialIcon'
import { YouTubeEmbed } from './components/YouTubeEmbed'
import { siteVideos, youtubeId } from './data/videoLinks'
import {
  ArrowDown, ArrowUpRight, Menu, X, Mail, MessageCircle, Send,
  Sparkles, Quote, Layers3, Target, Zap, ShieldCheck, HeartHandshake,
} from 'lucide-react'

const values = [
  { icon: Target, title: 'Built around your needs', text: 'Every recommendation starts with your goals, your team and the way your business works.' },
  { icon: Layers3, title: 'Systems that connect', text: 'Your marketing, technology and customer experience should work together as one.' },
  { icon: ShieldCheck, title: 'Care in the details', text: 'Thoughtful setup, clear communication and dependable execution at every step.' },
  { icon: Zap, title: 'Practical progress', text: 'The focus stays on useful improvements your business can put to work.' },
]

const appear = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }
const featuredSamples = [getPortfolioSamples('crm-automation')[0]!, getPortfolioSamples('email-marketing')[0]!, getPortfolioSamples('integrations')[0]!]

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const closeMenu = () => setMenuOpen(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setFormError('This form is not connected to email delivery yet, so your message was not sent. Please contact me by email or WhatsApp below.')
  }

  return (
    <main id="home" className="site-shell">
      <header className="topbar">
        <nav className="nav-wrap" aria-label="Main navigation">
            <a href="/" className="brand" onClick={closeMenu}><img src="/logo.jpg" alt="Anjolaoluwa Adekola logo" /><span>Anjolaoluwa Adekola</span></a>
          <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {[['Home', '/'], ['About', '/about']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
            <ServicesNavMenu />
            {[['Portfolio', '/portfolio'], ['Testimonials', '/testimonials'], ['Contact', '/contact']].map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          </div>
          <a className="button button-small nav-cta" href="/contact">Let’s Work Together <ArrowUpRight size={16} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <section className="hero section-wrap">
        <div className="hero-glow" />
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={appear} transition={{ duration: .65, staggerChildren: .12 }}>
          <motion.p className="eyebrow" variants={appear}><span className="availability-dot" /> DIGITAL MARKETING · AUTOMATION · SYSTEMS</motion.p>
          <motion.p className="hero-name" variants={appear}>Anjolaoluwa Adekola <span>— Digital solutions professional</span></motion.p>
          <motion.h1 variants={appear}>Building smarter systems. Connecting technology. <em>Driving business growth.</em></motion.h1>
          <motion.p className="hero-intro" variants={appear}>I help businesses simplify operations, connect their tools and turn more opportunities into growth through digital marketing, CRM and automation.</motion.p>
          <motion.div className="hero-actions" variants={appear}><a href="/contact" className="button">Work With Me</a><a href="/portfolio" className="text-link">Explore My Work <ArrowDown size={16} /></a></motion.div>
          <motion.div className="hero-footnote" variants={appear}><span className="availability-status"><i aria-hidden="true" /><span>{siteConfig.availability}</span></span><span className="footnote-separator" /><span>Strategy <b>·</b> Technology <b>·</b> Growth</span></motion.div>
        </motion.div>
        <motion.div className="portrait-wrap" initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .22 }}>
          <div className="portrait-outline" /><div className="portrait-frame"><img src="/profile.jpg" alt="Anjolaoluwa Adekola" /><div className="portrait-shade" /><div className="portrait-caption"><span className="caption-mark">AA</span><span><strong>Systems-minded.</strong><small>Growth-focused.</small></span><ArrowUpRight size={19} /></div></div>
          <div className="portrait-note"><Sparkles size={15} /> Marketing meets technology</div>
        </motion.div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
      </section>

      <section id="about" className="about section-wrap section-pad">
        <div className="about-label"><p className="eyebrow">A LITTLE ABOUT ME</p></div>
        <div className="about-main"><h2>Technology should make business <em>easier.</em></h2><div className="about-body"><p className="lead">I work where digital marketing, business systems and technology meet—helping teams do more of their best work with less friction.</p><p>From CRM setup and API integrations to email journeys and websites, I turn disconnected tools and repetitive tasks into practical systems that support better customer experiences. I listen first, understand the real challenge, then build with care and clarity.</p><a href="#contact" className="inline-link">A little more about working together <ArrowUpRight size={16} /></a></div>
          <div className="expertise-strip"><span>CRM & customer journeys</span><span>Automation & integrations</span><span>Marketing & web experiences</span></div>
        </div>
      </section>

      <section id="services" className="services section-pad"><div className="section-wrap">
        <div className="section-heading"><div><p className="eyebrow">HOW I CAN HELP</p><h2>Good work starts with <em>the right system.</em></h2></div><p>Thoughtful digital solutions, shaped around the way your business needs to grow.</p></div>
        <div className="service-grid">{services.map((service, i) => { const Icon = service.icon; return <motion.article key={service.title} className="service-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={appear} transition={{ duration: .45, delay: i * .05 }}><div className="service-card-top"><span className="service-icon"><Icon size={21} /></span><span className="service-number">0{i + 1}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="tag-list">{service.tools.map(tag => <span key={tag}>{tag}</span>)}</div><a className="card-link" href={`/services/${service.slug}`} aria-label={`Learn about ${service.title}`}>Learn more <ArrowUpRight size={15} /></a></motion.article> })}</div>
      </div></section>

      <section className="platforms section-wrap section-pad"><div className="platform-intro"><p className="eyebrow">TOOLS I WORK WITH</p><h2>A connected <em>toolkit.</em></h2><p>Choosing the right platform for the job—and making it work with the rest of your stack.</p></div><div className="platform-marquee"><div className="platform-grid">{[...platforms, ...platforms].map((name, i) => <span className="platform-chip" key={`${name}-${i}`} aria-hidden={i >= platforms.length}><i>{String((i % platforms.length) + 1).padStart(2, '0')}</i>{name}</span>)}</div></div></section>

      <section id="work" className="work section-pad"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Real samples & <em>capabilities.</em></h2></div><p>Supplied screenshots and walkthroughs from CRM, email marketing and automation work. Browse all samples by category.</p></div><div className="project-grid">{featuredSamples.map((group, i) => <motion.article className="project-card" key={`${group.service}-${group.category}`} whileHover={{ y: -5 }} transition={{ duration: .22 }}><div className={`project-art project-art-${i + 1}`}><span className="project-id">{group.category.toUpperCase()}</span><MediaGallery title={`${group.title} featured samples`} items={group.items.slice(0, 1)} /><span className="art-note">SUPPLIED<br />SAMPLE</span></div><div className="project-info"><p className="eyebrow">{services.find(service => service.slug === group.service)?.title}</p><h3>{group.title}</h3><p>{group.description}</p><div className="project-bottom"><a href={`/services/${group.service}`} className="inline-link">Explore service <ArrowUpRight size={18} /></a></div></div></motion.article>)}</div><a className="inline-link all-projects-link" href="/portfolio">Explore all portfolio samples <ArrowUpRight size={16} /></a></div></section>

      <section className="value-section section-pad"><div className="section-wrap value-layout"><div><p className="eyebrow">WHY WORK WITH ME</p><h2>Clear thinking.<br /><em>Careful doing.</em></h2><p className="value-intro">I bring marketing and technology together to solve the actual problem in front of your business.</p></div><div className="value-grid">{values.map(({ icon: Icon, title, text }, i) => <article className="value-item" key={title}><span>0{i + 1}</span><Icon size={21} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="testimonials section-wrap section-pad"><div className="testimonial-head"><div><p className="eyebrow">KIND WORDS</p><h2>Client experiences <em>in their words.</em></h2></div><a className="placeholder-label" href="/testimonials"><Quote size={16} /> VIEW TESTIMONIALS</a></div>{youtubeId(siteVideos.clientTestimonial.youtube) && <div className="home-testimonial-video"><YouTubeEmbed url={siteVideos.clientTestimonial.youtube} title="Client video testimonial" /><p>Video testimonial · Client identity not provided</p></div>}</section>

      <section id="contact" className="contact section-pad"><div className="section-wrap contact-layout"><div className="contact-copy"><p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p><h2>Have a project in mind? <em>Let’s make it happen.</em></h2><p>Tell me what you are working on. Share as much or as little as you like and we can take it from there.</p><div className="contact-details">{siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={17} /><span><small>EMAIL</small>{siteConfig.email}</span><ArrowUpRight size={15} /></a> : <p className="form-note">Add your email in <code>src/data/siteConfig.ts</code>.</p>}<a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span><small>WHATSAPP</small>+234 705 728 9672 · Message on WhatsApp</span><ArrowUpRight size={15} /></a><div className="social-links"><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon network="instagram" /></a><a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon network="facebook" /></a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon network="linkedin" /></a>{siteConfig.otherSocials.map(social => <a href={social.url} key={social.label} target="_blank" rel="noreferrer">{social.label}</a>)}</div></div></div>
        <form id="contact-form" className="contact-form" onSubmit={handleSubmit} onInvalid={() => setFormError('Please check the highlighted fields and try again.')} noValidate={false}><div className="form-heading"><span>01</span><h3>Tell me about your project</h3></div><div className="form-row"><label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required minLength={2} /></label><label>Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label></div><div className="form-row"><label>Company name <small>OPTIONAL</small><input name="company" type="text" placeholder="Your company" autoComplete="organization" /></label><label>Service required<select name="service" defaultValue="" required><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Something else</option></select></label></div><label>Project description<textarea name="description" placeholder="What would you like to improve or build?" rows={4} required minLength={15} /></label><button className="button submit-button" type="submit">Send project enquiry <Send size={16} /></button><p className="form-note">This form is a front-end demo and is not connected to email yet. Your details will not be sent.</p>{formError && <p className="form-feedback error" role="alert">{formError}</p>}</form>
      </div></section>

      <footer className="footer"><div className="section-wrap"><div className="footer-top"><div className="footer-brand"><a className="brand" href="/"><img src="/logo.jpg" alt="" /><span>{siteConfig.name}</span></a><p>{siteConfig.description}</p></div><div className="footer-nav"><span>EXPLORE</span><div>{[['About', '/about'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Testimonials', '/testimonials'], ['Contact', '/contact']].map(([n, h]) => <a href={h} key={n}>{n}</a>)}</div><div className="footer-contact-links"><a href={`mailto:${siteConfig.email}`}><Mail size={15} /> {siteConfig.email}</a><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={15} /> +234 705 728 9672 · WhatsApp</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon network="instagram" size={15} /> Instagram</a><a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon network="facebook" size={15} /> Facebook</a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon network="linkedin" size={15} /> LinkedIn</a></div></div><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span><span>Built with intention <HeartHandshake size={14} /></span></div></div></footer>
    </main>
  )
}

function RoutedApp() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/$/, '') || '/')
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname.replace(/\/$/, '') || '/')
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor || anchor.target || anchor.origin !== window.location.origin || !anchor.pathname.startsWith('/')) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.pathname.startsWith('/projects/')) return
      if (anchor.pathname === window.location.pathname && anchor.hash) return
      event.preventDefault()
      window.history.pushState({}, '', `${anchor.pathname}${anchor.search}${anchor.hash}`)
      setPath(anchor.pathname.replace(/\/$/, '') || '/')
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => { window.removeEventListener('popstate', onPopState); document.removeEventListener('click', onClick) }
  }, [])
  useEffect(() => {
    const routeTitles: Record<string, string> = { '/': 'Digital Marketing & Automation', '/about': 'About', '/services': 'Services', '/portfolio': 'Portfolio', '/contact': 'Contact', '/testimonials': 'Testimonials' }
    const leaf = path.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ')
    document.title = `${leaf ? (routeTitles[path] || leaf.replace(/\b\w/g, char => char.toUpperCase())) : routeTitles['/']} | ${siteConfig.name}`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = `${siteConfig.name} — ${routeTitles[path] || leaf || 'Digital marketing, CRM and automation services'}. ${siteConfig.description}`
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (ogTitle) ogTitle.content = document.title
    if (ogDescription && description) ogDescription.content = description.content
  }, [path])
  let content: ReactNode
  if (path === '/') return <HomePage />
  if (path === '/about') content = <AboutPage />
  else if (path === '/services') content = <ServicesPage />
  else if (path.startsWith('/services/')) content = <ServicesPage slug={path.split('/')[2]} />
  else if (path === '/portfolio') content = <PortfolioPage />
  else if (path.startsWith('/portfolio/')) { const [, , slug, projectSlug] = path.split('/'); content = <PortfolioPage slug={slug} projectSlug={projectSlug} /> }
  else if (path === '/contact') content = <ContactPage />
  else if (path === '/testimonials') content = <TestimonialsPage />
  else content = <NotFound />
  return <PageShell><motion.div key={path} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .26 }}>{content}</motion.div></PageShell>
}

export default RoutedApp

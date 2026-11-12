import { ArrowUp, Briefcase, CalendarDays, Mail, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { SocialIcon } from './SocialIcon'

const explore = [['About', '/about'], ['Services', '/services'], ['Portfolio', '/portfolio'], ['Testimonials', '/testimonials'], ['Contact', '/contact']]

// One footer for every page: brand, page links, contact details and social profiles in separate columns.
export function SiteFooter({ topId }: { topId: string }) {
  return <footer className="footer"><div className="section-wrap">
    <div className="footer-grid">
      <div className="footer-brand">
        <a className="brand" href="/"><img src="/logo.jpg" alt="" /><span>{siteConfig.name}</span></a>
        <p>{siteConfig.description}</p>
      </div>
      <nav className="footer-col" aria-label="Footer">
        <span>EXPLORE</span>
        {explore.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="footer-col">
        <span>GET IN TOUCH</span>
        <a href={`mailto:${siteConfig.email}`}><Mail size={15} /> {siteConfig.email}</a>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={15} /> +234 705 728 9672</a>
        {siteConfig.bookingUrl && <a href="/contact#book"><CalendarDays size={15} /> Book a call</a>}
      </div>
      <div className="footer-col">
        <span>FOLLOW</span>
        <div className="footer-social">
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><SocialIcon network="linkedin" size={17} /></a>
          <a href={siteConfig.upwork} target="_blank" rel="noreferrer" aria-label="Upwork"><Briefcase size={17} /></a>
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon network="instagram" size={17} /></a>
          <a href={siteConfig.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon network="facebook" size={17} /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span><a href={`#${topId}`} className="back-top">Back to top <ArrowUp size={14} /></a></div>
  </div></footer>
}

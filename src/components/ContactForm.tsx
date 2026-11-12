import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'
import { services } from '../data/content'

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string }

// Sends enquiries by email through Web3Forms. The access key is public by design (it only routes
// messages to the owner's inbox). Success is shown only when Web3Forms confirms delivery.
export function ContactForm({ id, className = '', headingLevel = 3, initialService = '', submitLabel = 'Send project enquiry' }: {
  id?: string
  className?: string
  headingLevel?: 2 | 3
  initialService?: string
  submitLabel?: string
}) {
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' })
  const connected = Boolean(siteConfig.formAccessKey)
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const fallback = `Please email ${siteConfig.email} or message me on WhatsApp instead.`

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) {
      setStatus({ kind: 'error', message: 'Please check the highlighted fields and try again.' })
      return
    }
    if (!connected) {
      setStatus({ kind: 'error', message: `This form is not connected yet, so your message was not sent. ${fallback}` })
      return
    }
    const data = new FormData(form)
    if (data.get('botcheck')) return
    setStatus({ kind: 'sending', message: '' })
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.formAccessKey,
          subject: `New portfolio enquiry from ${String(data.get('name') || 'a visitor')}`,
          from_name: 'Portfolio website',
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company') || 'Not provided',
          service: data.get('service'),
          message: data.get('description'),
        }),
      })
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null
      if (!response.ok || !result?.success) throw new Error('Not delivered')
      form.reset()
      setStatus({ kind: 'success', message: 'Thank you, your message has been sent. I will reply by email.' })
    } catch {
      setStatus({ kind: 'error', message: `Sorry, your message could not be sent. ${fallback}` })
    }
  }

  return <form id={id} className={`contact-form ${className}`.trim()} onSubmit={handleSubmit} onInvalidCapture={() => setStatus({ kind: 'error', message: 'Please check the highlighted fields and try again.' })}>
    <div className="form-heading"><span>01</span><Heading>Tell me about your project</Heading></div>
    <div className="form-row">
      <label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required minLength={2} /></label>
      <label>Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label>
    </div>
    <div className="form-row">
      <label>Company name <small>OPTIONAL</small><input name="company" type="text" placeholder="Your company" autoComplete="organization" /></label>
      <label>Service required<select name="service" required defaultValue={initialService}><option value="" disabled>Select a service</option>{services.map(service => <option key={service.slug} value={service.title}>{service.title}</option>)}<option>Something else</option></select></label>
    </div>
    <label>Project description<textarea name="description" placeholder="What would you like to improve or build?" rows={5} required minLength={15} /></label>
    <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button submit-button" type="submit" disabled={status.kind === 'sending'}>{status.kind === 'sending' ? 'Sending…' : submitLabel} <Send size={16} /></button>
    <p className="form-note">{connected ? 'Your message goes straight to my inbox, and I will reply by email.' : 'This form is not connected to email yet. Please use the email or WhatsApp links for now.'}</p>
    {status.message && <p className={`form-feedback ${status.kind === 'error' ? 'error' : ''}`} role={status.kind === 'error' ? 'alert' : 'status'}>{status.message}</p>}
  </form>
}

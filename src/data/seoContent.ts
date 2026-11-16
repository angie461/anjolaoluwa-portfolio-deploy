// Search engine and AI-search text: page titles, meta descriptions and service FAQs.
// Meta descriptions should be 150–160 characters; the build prints a warning if one is not.
// FAQ answers must only repeat what the site already says (no invented clients, results or numbers).

export type Faq = { question: string; answer: string }
export type PageSeo = { title: string; description: string }

export const pageSeo: Record<'home' | 'about' | 'services' | 'portfolio' | 'testimonials' | 'contact' | 'notFound', PageSeo> = {
  home: {
    title: 'Anjolaoluwa Adekola | CRM, Automation & Digital Marketing Specialist',
    description: 'Anjolaoluwa Adekola is a CRM, automation and digital marketing specialist who helps businesses connect their tools, automate their work and grow online.',
  },
  about: {
    title: 'About Anjolaoluwa Adekola | CRM & Automation Specialist',
    description: 'Meet Anjolaoluwa Blessing Adekola, a CRM, automation and digital marketing specialist based in Nigeria who works remotely with businesses around the world.',
  },
  services: {
    title: 'CRM, Automation & Marketing Services | Anjolaoluwa Adekola',
    description: 'CRM development, API integrations, email marketing, websites and funnels, AI automation and virtual assistance by Anjolaoluwa Adekola, available remotely.',
  },
  portfolio: {
    title: 'Portfolio: CRM, Email & Automation Work | Anjolaoluwa Adekola',
    description: 'Real screenshots and video walkthroughs of CRM, automation workflow, integration, email marketing and website work by Anjolaoluwa Adekola, grouped by service.',
  },
  testimonials: {
    title: 'Client Reviews & Testimonials | Anjolaoluwa Adekola',
    description: 'Read verified Upwork reviews and watch a client video testimonial for Anjolaoluwa Adekola’s GoHighLevel, CRM, automation and email marketing work, unedited.',
  },
  contact: {
    title: 'Contact & Book a Call | Anjolaoluwa Adekola',
    description: 'Contact Anjolaoluwa Adekola about CRM, automation, integrations, email marketing or websites. Send an enquiry, email, message on WhatsApp or book a call.',
  },
  notFound: {
    title: 'Page Not Found | Anjolaoluwa Adekola',
    description: 'This page could not be found. Explore the CRM, automation and digital marketing services, portfolio samples and client reviews from Anjolaoluwa Adekola.',
  },
}

// Per service: meta descriptions for the service page and its portfolio page, plus two service-specific FAQs.
// Four more FAQs (what's included, tools, process, getting started) are generated from content.ts.
export const serviceSeo: Record<string, { description: string; portfolioDescription: string; faqs: Faq[] }> = {
  'crm-automation': {
    description: 'CRM development and automation by Anjolaoluwa Adekola: GoHighLevel setup, HubSpot and Salesforce integrations, pipelines, lead management and workflows.',
    portfolioDescription: 'CRM and automation portfolio by Anjolaoluwa Adekola: real GoHighLevel workflow builds, pipelines, contact management screens and recorded CRM walkthroughs.',
    faqs: [
      { question: 'Can you move my contacts and workflows to GoHighLevel from another CRM?', answer: 'Yes. CRM setup and migration are part of this service. One of my Upwork projects, for example, was an EngageBay to GoHighLevel migration, which the client reviewed on Upwork.' },
      { question: 'What can CRM automation do for my team?', answer: 'It keeps follow-up from depending on memory. I build pipelines, lead management and booking automations so every lead has a clear next step, such as the Missed Call Text-Back workflow in my portfolio, which sends an SMS, waits five minutes, sends a follow-up email and creates a task.' },
    ],
  },
  integrations: {
    description: 'API and platform integrations by Anjolaoluwa Adekola: webhooks, CRM sync, data flows and business process automation with n8n, Make.com, Zapier and REST APIs.',
    portfolioDescription: 'Integration portfolio by Anjolaoluwa Adekola: screenshots of connected apps, Mailgun and domain setup, and platform integration settings for business tools.',
    faqs: [
      { question: 'What is an API or webhook integration?', answer: 'It is a connection that lets one app send information to another automatically. Instead of typing the same customer details into several tools, an integration moves the data for you, so each system stays up to date.' },
      { question: 'Can you connect my CRM to the other apps my business uses?', answer: 'Yes. CRM synchronization, data flows and third-party application connections are core parts of this service. I also advise on which platforms integrate well with GoHighLevel.' },
    ],
  },
  'email-marketing': {
    description: 'Email marketing by Anjolaoluwa Adekola: Klaviyo flows, campaign design, welcome and abandoned cart sequences, customer retention and deliverability setup.',
    portfolioDescription: 'Email marketing portfolio by Anjolaoluwa Adekola: campaign designs, abandoned cart, welcome and retention flows, automation flows and reporting screenshots.',
    faqs: [
      { question: 'What kinds of email flows can you build?', answer: 'Welcome flows, abandoned cart sequences, customer retention and re-engagement flows, lead nurturing sequences and one-off campaign designs. Samples of each are in my portfolio.' },
      { question: 'Can you help with email deliverability?', answer: 'Yes. Deliverability setup and optimization is part of this service, including list hygiene and sending setup with platforms such as Mailgun, so your emails have a better chance of reaching the inbox.' },
    ],
  },
  'websites-funnels': {
    description: 'Websites and sales funnels by Anjolaoluwa Adekola: business websites, landing pages, GoHighLevel funnels and lead capture built on GoHighLevel, Wix and Shopify.',
    portfolioDescription: 'Website and funnel portfolio by Anjolaoluwa Adekola: real screenshots of business websites, listing pages and landing pages, plus a recorded site walkthrough.',
    faqs: [
      { question: 'Can you fix an existing GoHighLevel landing page or funnel?', answer: 'Yes. Troubleshooting is part of this service. In a May 2026 Upwork project, I resolved responsiveness and functionality issues on a client’s GoHighLevel landing page.' },
      { question: 'Can my website send leads straight into my CRM?', answer: 'Yes. I connect lead capture to follow-up, so form submissions from your website or funnel land in your CRM and start the right workflow instead of waiting in an inbox.' },
    ],
  },
  'ai-automation': {
    description: 'AI automation by Anjolaoluwa Adekola: AI agents, AI receptionists, chatbots and lead qualification workflows built with Vapi AI, ManyChat and n8n for your CRM.',
    portfolioDescription: 'AI automation work by Anjolaoluwa Adekola: AI agents, chatbots and lead qualification workflows linked to your CRM. Portfolio samples will be added here soon.',
    faqs: [
      { question: 'What is an AI receptionist?', answer: 'An AI receptionist is a conversational assistant that answers common questions and responds to new enquiries at any hour, then passes the details to your team or CRM.' },
      { question: 'Can AI qualify leads and send them to my CRM?', answer: 'Yes. I build lead qualification workflows and connect AI agents to the CRM and workflows your business already uses, so qualified leads arrive with the context your team needs.' },
    ],
  },
  'virtual-assistance': {
    description: 'Virtual assistance and digital marketing support by Anjolaoluwa Adekola: social media management, digital operations and business process coordination.',
    portfolioDescription: 'Virtual assistance by Anjolaoluwa Adekola: social media, digital operations and marketing support for busy teams. Portfolio samples will be added here soon.',
    faqs: [
      { question: 'What tasks can a virtual assistant handle for my business?', answer: 'Day-to-day digital operations, marketing support, social media management and coordination of business processes, so routine work no longer competes with your high-value work.' },
      { question: 'Do you manage social media?', answer: 'Yes. Social media management is part of this service, alongside wider digital marketing support to keep your marketing consistent from week to week.' },
    ],
  },
}

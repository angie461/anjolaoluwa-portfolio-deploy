import { Bot, Mail, Megaphone, PanelsTopLeft, PlugZap, Workflow, type LucideIcon } from 'lucide-react'
import { siteVideos } from './videoLinks'

export type Service = { slug: string; title: string; description: string; intro: string; problems: string[]; offers: string[]; tools: string[]; icon: LucideIcon }

export const services: Service[] = [
  { slug: 'crm-automation', title: 'CRM Development & Automation', description: 'Build a dependable home for every lead, conversation and next step, with workflows that keep your pipeline moving.', intro: 'Set up a CRM that gives your team a clear view of every lead and helps important follow-up happen on time.', problems: ['Leads fall through the cracks between channels.', 'Your team spends too much time on repetitive admin.', 'Pipeline status and customer context are hard to find.'], offers: ['GoHighLevel setup and customization', 'HubSpot and Salesforce CRM integrations', 'Lead management, pipelines and booking automation', 'Workflow and AI-assisted CRM automation'], tools: ['GoHighLevel', 'HubSpot', 'Salesforce', 'n8n'], icon: Workflow },
  { slug: 'integrations', title: 'API & Platform Integrations', description: 'Connect the tools your business relies on and move information cleanly between them, without repetitive manual work.', intro: 'Make your business applications work together with reliable automations and integrations designed around your processes.', problems: ['The same information is entered in multiple tools.', 'Apps do not share timely or consistent customer data.', 'Manual handoffs slow down important business processes.'], offers: ['API and webhook integrations', 'CRM synchronization and data flows', 'Business process automation', 'Third-party application connections'], tools: ['n8n', 'Make.com', 'Zapier', 'REST APIs'], icon: PlugZap },
  { slug: 'email-marketing', title: 'Email Marketing', description: 'Turn your email list into a thoughtful customer journey, from the first welcome to the moments that bring people back.', intro: 'Build useful email experiences that welcome, educate and re-engage customers at the right moments.', problems: ['Email follow-up depends on someone remembering.', 'Campaigns are difficult to target or measure.', 'Deliverability and list hygiene need attention.'], offers: ['Email strategy and campaign design', 'Automated sequences and lead nurturing', 'Customer retention flows', 'Deliverability setup and optimization'], tools: ['Klaviyo', 'Mailgun', 'CRM integrations', 'Email automation'], icon: Mail },
  { slug: 'websites-funnels', title: 'Websites & Sales Funnels', description: 'Create clear, responsive digital experiences that help the right people understand your offer and take the next step.', intro: 'Give your business a thoughtful online presence with focused pages and funnels designed around customer decisions.', problems: ['Visitors are unsure what to do next.', 'Your website does not reflect the quality of your offer.', 'Lead capture and follow-up are disconnected.'], offers: ['Business website design and development', 'Landing pages and sales funnels', 'GoHighLevel websites and funnels', 'Lead capture and e-commerce experiences'], tools: ['GoHighLevel', 'Wix', 'Shopify', 'BigCommerce'], icon: PanelsTopLeft },
  { slug: 'ai-automation', title: 'AI Automation', description: 'Use practical conversational AI to answer common questions, qualify leads and support your team around the clock.', intro: 'Apply conversational AI to repetitive interactions and connect it to the workflows your business already uses.', problems: ['Common questions take time away from the team.', 'New enquiries wait too long for a response.', 'Lead qualification is difficult to scale consistently.'], offers: ['AI agents and conversational experiences', 'AI receptionists and customer support', 'Lead qualification workflows', 'AI workflow and CRM integrations'], tools: ['Vapi AI', 'ManyChat', 'n8n', 'AI agents'], icon: Bot },
  { slug: 'virtual-assistance', title: 'Virtual Assistance & Marketing', description: 'Get reliable digital marketing and day-to-day operational support to keep your business systems running smoothly.', intro: 'Bring dependable digital support to the work that keeps your marketing and operations moving.', problems: ['Routine digital tasks compete with high-value work.', 'Marketing activity is inconsistent week to week.', 'Business processes need thoughtful ongoing support.'], offers: ['Virtual assistance and digital operations', 'Social media management', 'Digital marketing support', 'Business process coordination'], tools: ['Social platforms', 'Marketing tools', 'CRM systems', 'Operations workflows'], icon: Megaphone },
]

export const platforms = ['GoHighLevel', 'HubSpot', 'Salesforce', 'n8n', 'Make.com', 'Zapier', 'Klaviyo', 'Mailgun', 'Twilio', 'Shopify', 'BigCommerce', 'Wix', 'Apollo.io', 'Clay.com', 'ManyChat', 'Vapi AI']
export type Project = { slug: string; service: string; title: string; category: string; overview: string; challenge: string; solution: string; tools: string[]; images: string[]; video?: string; outcomes?: string[]; client?: string }
export const projects: Project[] = services.map((service, index) => ({
  slug: ['lead-management-system', 'connected-business-tools', 'customer-journey-email', 'digital-customer-experience', 'conversational-ai-workflow', 'digital-operations-support'][index],
  service: service.slug,
  title: ['Lead management system', 'Connected business tools', 'Customer journey email system', 'Digital customer experience', 'Conversational AI workflow', 'Digital operations support'][index],
  category: service.title.toUpperCase(),
  overview: 'Editable case study placeholder. Replace with an approved project overview and the context you can share publicly.',
  challenge: 'Add the client-approved challenge or opportunity this project addressed.',
  solution: 'Describe the approach, implementation and important project decisions here.',
  tools: service.tools,
  images: [],
}))

// The supplied video is displayed without an invented speaker name, quote, rating, or result.
// The client review keeps its original sound and is embedded from YouTube (link set in videoLinks.ts).
export type Testimonial = { type: 'written' | 'image' | 'video'; quote?: string; name?: string; role?: string; src?: string; youtube?: string; poster?: string; service?: string; rating?: number; period?: string; source?: string; proof?: string; featured?: boolean }

// Upwork reviews: quoted exactly as the client wrote them. `name` is the Upwork job title (Upwork does not show client names).
// Screenshots live in public/testimonials/upwork/ with contract amounts cropped out.
const upwork = (name: string, rating: number, period: string, quote: string, proof: string, service: string, featured = false): Testimonial =>
  ({ type: 'written', name, rating, period, quote, proof: `/testimonials/upwork/${proof}.jpg`, service, source: 'Upwork', featured })

export const testimonials: Testimonial[] = [
  ...(siteVideos.clientTestimonial.youtube ? [{ type: 'video' as const, youtube: siteVideos.clientTestimonial.youtube, name: 'Anterric Maxey' }] : []),
  upwork('Go High Level Admin for Landing Page Design for Social Media and Automation', 5, 'Mar–Aug 2025', 'Hard working, very knowledgeable. Highly recommend.', 'review-ghl-landing-page', 'websites-funnels'),
  upwork('Seeking Experienced VA for REIReply Workflows & Real Estate Lead Management', 4.9, 'Mar 2025', 'I loved her work. She was consistently stayed in communication with me throughout the whole process. The thing that I love about her the most is that she ahead of my understanding of the project and even delivered earlier than the task time projected. I will definitely rehire hire for further work in the future.', 'review-reireply-va', 'crm-automation', true),
  upwork('EngageBay to GHL migration', 5, 'Jan–Feb 2025', 'Anjolaoluwa did a great job, very professional, would hire again', 'review-engagebay-migration', 'crm-automation'),
  upwork('ReiReply Workflow Expert', 5, 'Dec 2024–Jan 2025', 'excellent hire! completed every task on time and helped out even after the project was complete to ensure quality!', 'review-reireply-workflow-1', 'crm-automation'),
  upwork('ReiReply Workflow Expert', 5, 'Nov–Dec 2024', 'If you want it done right and on time then hire her!', 'review-reireply-workflow-2', 'crm-automation', true),
  upwork('GoHighLevel Chatbot Troubleshooting Needed - Quick Fix', 5, 'Apr 2024', 'Anjolaoluwa was a lifesaver! My GoHighLevel chatbot was on the fritz, and she quickly diagnosed the issue and pointed me in the right direction for a fix. Highly recommend!', 'review-ghl-chatbot', 'ai-automation', true),
  upwork('GoHighLevel & IDX: Need Quick Pointers', 5, 'Apr 2024', 'Anjolaoluwa was super helpful in my initial exploration of IDX for my website! She offered valuable insights on platforms that integrate well with GoHighLevel, saving me time researching on my own. Definitely recommend her for GoHighLevel consultations', 'review-ghl-idx', 'integrations'),
  upwork('Klaviyo expert needed', 5, 'Mar–Apr 2023', 'Anjolaoluwa helped me to create a Klaviyo flow and she did exceptional work. she is a professional who is knowledgeable, skilled, and passionate about her craft.', 'review-klaviyo', 'email-marketing'),
]
export const featuredReviews = testimonials.filter(item => item.featured)

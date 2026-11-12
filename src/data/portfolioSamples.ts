import { siteVideos, type VideoEntry } from './videoLinks'

export type SampleMedia = { src: string; alt: string; kind: 'image' | 'video'; muted?: boolean; fullVideoUrl?: string }
export type SampleGroup = { service: string; category: string; title: string; description: string; items: SampleMedia[] }

const asset = (path: string) => `/projects/${path.split('/').map(encodeURIComponent).join('/')}`
const sample = (path: string, alt: string, options: { muted?: boolean } = {}): SampleMedia => ({ src: asset(path), alt, kind: /\.(mov|mp4|m4v|webm)$/i.test(path) ? 'video' : 'image', ...options })
// Short highlight clip from public/projects/clips/, linked to its full YouTube version. Hidden until the clip name is set in videoLinks.ts.
const clip = (entry: VideoEntry, alt: string, muted: boolean): SampleMedia[] => entry.clip
  ? [{ ...sample(`clips/${entry.clip}`, alt, { muted }), kind: 'video', ...(entry.youtube ? { fullVideoUrl: entry.youtube } : {}) }]
  : []
const numbered = (files: string[], description: string) => files.map((file, i) => sample(file, `${description} — sample ${i + 1}`))

// Set src and service when the additional video is supplied. It is intentionally sound-enabled.
export const additionalVideoConfig = { src: '', service: 'crm-automation', muted: false as const }

const emailRoot = 'email-marketing'
const emailFiles = {
  'Abandoned Cart': ['sample_16.png', 'sample_17.png', 'sample_18.png', 'sample_21.png', 'sample_23.png', 'sample_29.png', 'sample_35.png', 'sample_38.png'],
  'Automation Flows': ['sample_19.png', 'sample_20.png', 'sample_26.png', 'sample_27.png', 'sample_28.png'],
  'Campaign Designs': ['campaign .jpg', 'campaign.jpg', 'campaign 2.jpg', 'campaign 3.jpg', 'campaign 4.jpg', 'campaign 5.jpg', 'campaign 6.jpg', 'campaign 7.jpg', 'campaign 8.jpg', 'campaign 9.jpg', 'campaign 10.jpg', 'campaign 11.jpg', 'campaign 12.jpg', 'campaign 13.jpg', 'klaviyo_sample_no_tabs.jpg', 'calendar.jpg', 'sample_01.png', 'sample_03.png', 'sample_07.png', 'sample_08.png', 'sample_09.png', 'sample_11.png', 'sample_22.png', 'sample_30.png', 'sample_31.png', 'sample_32.png', 'sample_34.png', 'sample_36.png', 'sample_37.png', 'sample_39.png'],
  'Customer Retention': ['sample_04.png', 'sample_14.png'],
  Reports: ['Untitled design.png', 'sample_12.png', 'sample_24.png'],
  'Welcome Flows': ['sample_25.png'],
}

export const portfolioSamples: SampleGroup[] = [
  ...Object.entries(emailFiles).map(([category, files]) => ({
    service: 'email-marketing', category, title: `${category} samples`,
    description: `Email marketing ${category.toLowerCase()} screenshots and design samples.`,
    items: numbered(files.map(file => `${emailRoot}/${category.toLowerCase().replaceAll(' ', '-')}/${file}`), `${category} email marketing`),
  })),
  {
    service: 'crm-automation', category: 'Workflow Builds', title: 'Automation workflow builds',
    description: 'Workflow editor captures showing triggers, actions, branching and automation sequence layouts.',
    items: [
      ...numbered([
      ...Array.from({ length: 17 }, (_, i) => `automation-workflows/workflow ${i + 1}.jpg`),
      'automation-workflows/worklow 6.jpg',
      ], 'Automation workflow build'),
      // Audio was removed from these files; muted stays true as a safeguard.
      ...clip(siteVideos.crmDec05, 'CRM workflow demonstration — recording from 5 December 2024', true),
      ...clip(siteVideos.crmDec12, 'CRM workflow demonstration — recording from 12 December 2024', true),
      ...clip(siteVideos.crmJun28, 'CRM workflow demonstration — recording from 28 June 2025', true),
    ],
  },
  {
    service: 'crm-automation', category: 'Reports', title: 'Workflow reports and overviews',
    description: 'Workflow list and reporting interface captures.',
    items: numbered([
      'automation-workflows/Screenshot 2025-03-13 at 9.22.05 PM.png',
      'automation-workflows/Screenshot 2025-05-27 050244.png',
      'automation-workflows/Screenshot 2025-05-27 052411.png',
      'automation-workflows/Screenshot 2025-05-27 052442.png',
    ], 'Workflow reports and overview'),
  },
  {
    service: 'crm-automation', category: 'CRM Setup and Dashboards', title: 'CRM setup and dashboards',
    description: 'CRM pipeline, contact management, segmentation and account setup screen samples.',
    items: [
      sample('crm/pipelines.jpg', 'CRM opportunities pipeline board'),
      sample('crm/contact upload.jpg', 'CRM contact list and upload view'),
      sample('crm/segmented contacts.jpg', 'CRM segmented contacts view'),
      sample('crm/tagged contacts.jpg', 'CRM tagged contacts view'),
      sample('crm/bulk action.jpg', 'CRM bulk actions screen'),
      sample('crm/Screenshot 2025-04-28 155107 (1).png', 'CRM contact management screenshot'),
      sample('crm/sample_15.png', 'CRM dashboard screenshot'),
      ...numbered(['A2P verification.jpg', 'a2p .jpg', 'a2p v.jpg', 'a2p v1.jpg', 'a2p verification 1.jpg', 'a2p vv.jpg'].map(file => `crm/${file}`), 'A2P verification settings'),
    ],
  },
  {
    service: 'integrations', category: 'Platform Integrations', title: 'Platform integration samples',
    description: 'Screens from connected applications, email service configuration and platform integration settings.',
    items: numbered(['integration.jpg', 'integrations.jpg', 'mailgun integration.jpg', 'sample_02.png', 'domain integration.jpg', 'domain integration 1.jpg'].map(file => `integrations/${file}`), 'Platform integration setup'),
  },
  {
    service: 'websites-funnels', category: 'Websites and Funnels', title: 'Website and page samples',
    description: 'Website, listing and landing page design screenshots, plus a recorded walkthrough.',
    items: numbered(['Jeff rei website.png', 're.jpg', 're 2.jpg', 're 3.jpg', 're 4.jpg', 're 5.jpg', 're 6.jpg', 're 7.jpg', 're 8.jpg', 're 9.jpg', 're 10.jpg', 're 11.jpg', 're 12.jpg', 'renograte.jpg', 'website.jpg', 'website 1.jpg', 'website 2.jpg', 'website 3.jpg', 'website 4.jpg', 'website 5.jpg', 'website 6.jpg', 'website 7.jpg', 'website 8.jpg', 'website 9.jpg', 'website 10.jpg', 'website 11.jpg', 'website 12.jpg', 'website 13.jpg', 'website 14.jpg'].map(file => `websites/${file}`), 'Website design'),
  },
  {
    service: 'websites-funnels', category: 'Video Walkthrough', title: 'Website video walkthrough',
    description: 'Video walkthrough of a website listing experience.',
    // Keeps its original sound; plays only when the visitor presses play.
    items: clip(siteVideos.websiteWalkthrough, 'Website listing video walkthrough', false),
  },
]

export const getPortfolioSamples = (service?: string) => service ? portfolioSamples.filter(group => group.service === service) : portfolioSamples

export const siteConfig = {
  name: 'Anjolaoluwa Adekola',
  // Used for search engines and AI tools (structured data, page titles, llms.txt).
  fullName: 'Anjolaoluwa Blessing Adekola',
  alternateNames: ['Anjolaoluwa Blessing Adekola', 'Adekola Anjolaoluwa'],
  jobTitle: 'CRM, Automation & Digital Marketing Specialist',
  siteUrl: 'https://anjolaoluwaadekola.com',
  basedIn: { country: 'Nigeria', countryCode: 'NG' },
  description: 'Digital marketing, CRM, automation and connected systems that help businesses grow.',
  email: 'adekolaanjolaoluwablessing@gmail.com',
  whatsappUrl: 'https://wa.me/2347057289672?text=Hello%20Anjolaoluwa%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
  // Business accounts: shown on the site (footer, contact page) and listed in llms.txt.
  instagram: 'https://www.instagram.com/anjolaoluwa_adekola/',
  instagramHandle: '@anjolaoluwa_adekola',
  facebook: 'https://www.facebook.com/anjolaoluwaadekola01',
  // Personal accounts: not shown on the page; only listed in the Person structured data for search engines.
  personalInstagram: 'https://www.instagram.com/anjolaoluwa_blessing/',
  personalFacebook: 'https://www.facebook.com/share/1MLZXfP2Ks/',
  linkedin: 'https://www.linkedin.com/in/adekola-anjolaoluwa-blessing',
  upwork: 'https://www.upwork.com/freelancers/anjolaoluwa',
  otherSocials: [] as { label: string; url: string }[],
  availability: 'Available for select projects',
  // Homepage stats row (just below the hero). Edit the value or label; keep symbols such as $, K, + and %
  // in the value and they stay in place while the number counts up. Years of experience update every January.
  stats: [
    { value: `${new Date().getFullYear() - 2022}+`, label: 'Years of experience' },
    { value: '140+', label: 'Jobs completed' },
    { value: '$10K+', label: 'Revenue Generated for Clients' },
  ],
  // Web3Forms access key (public by design; it only routes messages to the email above). Leave '' to disable sending.
  formAccessKey: '29f395ba-48df-40a2-8383-379e2ef7bd4c',
  // Google Calendar appointment schedule embed link (the src from 'Inline booking page'). Leave '' to hide the booking section.
  bookingUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Ol23f9itbWt82Dc3hcBJvS8m1rMNOtmt5ZyrsgWn2Kizc4AryWs0LLykGVHthDb3-VzRzBTQ2?gv=true',
}

// Contact details supplied and verified by the site owner.

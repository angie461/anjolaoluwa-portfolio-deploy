// Presentation components read through this repository so a future Wix CMS adapter can replace local data.
import { platforms, projects, services, testimonials } from './content'

export const contentRepository = {
  getServices: () => services,
  getService: (slug: string) => services.find((service) => service.slug === slug),
  getProjects: (serviceSlug?: string) => serviceSlug ? projects.filter((project) => project.service === serviceSlug) : projects,
  getProject: (serviceSlug: string, projectSlug: string) => projects.find((project) => project.service === serviceSlug && project.slug === projectSlug),
  getTestimonials: (serviceSlug?: string) => serviceSlug ? testimonials.filter((testimonial) => testimonial.service === serviceSlug) : testimonials,
  getPlatforms: () => platforms,
}

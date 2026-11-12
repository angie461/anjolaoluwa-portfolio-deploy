# Portfolio content and media

Edit `siteConfig.ts` for the name, description, contact details, profile links, and availability indicator. Leave a detail empty until it is confirmed; empty contacts are not rendered as links.

Edit `content.ts` to add or update services, projects, platforms, and approved testimonials. `contentRepository.ts` is the presentation layer's data access boundary and can later be replaced with a Wix CMS adapter.

Project media is referenced from `public/` with root-relative paths, for example `/projects/crm/pipeline-overview.png`. Add image paths to a project's `images` array, or a demonstration path to `video`. Supported videos use native browser controls. Screenshots keep their natural proportions and open in a full-screen viewer. No manual resizing or cropping is required.

Place samples in the matching folders:

- `public/projects/crm/`
- `public/projects/integrations/`
- `public/projects/email-marketing/`
- `public/projects/websites/`
- `public/projects/ai/`
- `public/projects/virtual-assistance/`
- `public/testimonials/`

The service sample catalog and per-video audio settings are in `portfolioSamples.ts`. Video entries carry their own `muted` setting: ordinary demonstrations are muted, the website walkthrough and client testimonial keep sound. When the additional video is ready, set `additionalVideoConfig.src` to its `/projects/...` path and set its `service`; `muted: false` is already configured so it can retain sound. Add that entry to the matching sample group to display it.

Add only client-approved testimonial text and media to the `testimonials` array in `content.ts`. The testimonial pages show an empty-state guide until real material is supplied.

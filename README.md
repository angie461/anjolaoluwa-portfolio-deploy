# Anjolaoluwa Adekola — Portfolio

A responsive personal portfolio for Anjolaoluwa Adekola, built with React, TypeScript, Vite, Framer Motion and Tailwind CSS. It includes the homepage, service and portfolio routes, galleries, testimonials and direct contact links.

## Local development

```sh
npm install
npm run dev
```

## Quality checks and production build

```sh
npm run lint
npm run build
```

Vite writes the production site to `dist/`. `vercel.json` provides the SPA fallback for nested routes. The contact form is front-end only and intentionally does not claim to send enquiries; use the published email or WhatsApp links until a delivery provider is configured.

See `src/data/CONTENT_GUIDE.md` for updating portfolio content and media. Keep credentials in local environment files, which are excluded by `.gitignore`.

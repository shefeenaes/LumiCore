# Ideal Factory — Homepage Clone

A pixel-perfect, production-ready homepage replication of [Ideal Factory / IdealHome UAE](https://www.idealhomeuae.com/), built as part of a Frontend Developer assessment for Lumicore.

## Live Demo

**[https://lumi-core.vercel.app/](https://lumi-core.vercel.app/)**

## Project Notes

Full write-up of approach, design decisions, and trade-offs: **[PROJECT_NOTES.pdf](PROJECT_NOTES.pdf)**

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 + GSAP (ScrollTrigger) |
| Media / CDN | Cloudinary (via `next-cloudinary`) — `f_auto,q_auto` images & video |
| Icons | Lucide React |
| Fonts | next/font/google — Lexend + Inter + Bebas Neue |
| Linting | ESLint + next/core-web-vitals |
| Formatting | Prettier + prettier-plugin-tailwindcss |
| Git hooks | Husky + lint-staged |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout, metadata, fonts
│   ├── page.tsx            — Homepage composition
│   ├── globals.css         — Tailwind directives, custom utilities
│   ├── sitemap.ts          — Dynamic sitemap
│   └── robots.ts           — Robots directives
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx      — Sticky nav with scroll-aware background
│   │   ├── MobileMenu.tsx  — Animated slide-in drawer
│   │   └── Footer.tsx      — 4-column footer with links + contacts
│   │
│   ├── sections/           — One file per homepage section
│   │   ├── HeroSection.tsx
│   │   ├── InteriorSolutionsReveal.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ApproachSection.tsx
│   │   ├── DesignCTASection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── ui/                 — Reusable presentational components
│   │   ├── Button.tsx
│   │   ├── ServiceCard.tsx
│   │   └── TestimonialCard.tsx
│   │
│   └── shared/             — Utility components used across sections
│       ├── SectionHeading.tsx
│       └── ServiceIcon.tsx
│
├── data/                   — Static data / content
│   ├── navigation.ts
│   ├── services.ts
│   ├── portfolio.ts
│   └── testimonials.ts
│
├── constants/index.ts      — Site-wide constants (name, URL, copy)
├── types/index.ts          — Shared TypeScript types
├── hooks/useMediaQuery.ts  — matchMedia breakpoint hook (e.g. testimonials carousel)
└── lib/
    ├── cloudinary.ts       — CDN URL helpers + asset map (f_auto,q_auto)
    └── utils.ts            — cn() helper (clsx + tailwind-merge)
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm start

# 4. Type-check only
npm run type-check

# 5. Lint
npm run lint

# 6. Format
npm run format
```

## Deploy to Vercel

```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — Push to GitHub, then import at vercel.com
git remote add origin https://github.com/shefeenaes/LumiCore.git
git push -u origin main
# → Import repo at vercel.com/new
```

## Environment Variables

All media is served from Cloudinary. The cloud name has a sensible default baked in, but you can override it:

```bash
# .env.local (optional — falls back to the project's cloud name)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

The `upload` / `upload:compressed` / `compress` npm scripts (used to push assets to Cloudinary) additionally require `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` — only needed if you re-upload assets, not to run the site.

## Architecture Decisions

### App Router + Server Components
All section components that don't require interactivity (Hero, Approach, WhyChoose, Footer, etc.) are React Server Components — they render to HTML on the server with zero JS hydration cost. Only components with user interaction (`"use client"`) get shipped as client JS: Header (scroll state), MobileMenu (animation), PortfolioSection (filter state), TestimonialsSection (carousel), ContactSection (form).

### Data Layer
Content lives in `/src/data/*.ts` typed arrays. In a production app these would be replaced with CMS calls (Sanity, Contentful) without touching any component code.

### Animation Strategy
Two libraries, each where it fits best:
- `InteriorSolutionsReveal` (the "OUR INTERIOR SOLUTIONS" text-masked image reveal) — **GSAP** with `ScrollTrigger`: a pinned, scrubbed timeline zooms the Bebas Neue letters while a Cloudinary villa image is revealed through them via `background-clip: text`, then hands off to the real section content.
- Section entry animations — Framer Motion `whileInView` with `once: true` (fires once, no repeat)
- MobileMenu panel — Framer Motion `AnimatePresence` spring slide
- Portfolio grid — Framer Motion `layout` + `AnimatePresence` when filtering by category

### Media (Cloudinary)
All images and video are served from Cloudinary through a small helper (`src/lib/cloudinary.ts`):
- `f_auto,q_auto` (and `vc_auto,q_auto` for video) → automatic WebP/AVIF and quality, smaller payloads
- Edge CDN delivery keeps assets out of the bundle/repo and fast worldwide
- Asset upload is reproducible via the `npm run upload` / `compress` scripts

## Responsive Strategy

Mobile-first approach throughout. Breakpoints:

| Name | Range |
|---|---|
| Mobile | 320px – 767px |
| Tablet | 768px – 1023px |
| Desktop | 1024px+ |

- All typography scales with `sm:` / `lg:` variants
- Grid layouts switch from 1-col → 2-col → 3-col
- The "OUR INTERIOR SOLUTIONS" reveal text sizes with `clamp(16px, min(18vw, 18vh), 160px)` so it fills the viewport on any screen, then GSAP animates the zoom
- Mobile menu replaces desktop nav on narrow screens
- Images use `next/image` with responsive `sizes` attribute

## SEO

- Full Metadata API (`title` template, `description`, keywords, `openGraph`, `twitter`, `canonical`)
- JSON-LD structured data — `LocalBusiness` + `WebSite` schema (services, service area, contact)
- `sitemap.ts` → `/sitemap.xml`
- `robots.ts` → `/robots.txt`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`
- Correct heading hierarchy: `h1` (hero), `h2` (section titles), `h3` (card titles)
- `aria-label` on every landmark and interactive element
- `alt` text on all images

## Performance

- **Cloudinary `f_auto,q_auto`** — modern formats (WebP/AVIF) and automatic quality, served from the edge
- `next/image` with responsive `sizes` for the portfolio grid; large decorative layers use CSS backgrounds
- `next/font/google` self-hosts fonts with `display: swap`; non-critical faces use `preload: false`
- Only interactive sections ship client JS (`"use client"`); the rest render on the server
- Static rendering for the homepage (no SSR waterfall)
- Tailwind CSS tree-shakes unused utilities at build time
- SEO: full Metadata API, JSON-LD (`LocalBusiness` + `WebSite`), `sitemap.ts`, `robots.ts`

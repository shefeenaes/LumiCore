# Ideal Factory — Homepage Clone

A pixel-perfect, production-ready homepage replication of [Ideal Factory / IdealHome UAE](https://www.idealhomeuae.com/), built as part of a Frontend Developer assessment for Lumicore.

## Live Demo

> Deploy to Vercel and paste the URL here.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Fonts | next/font/google — Poppins + Inter |
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
├── hooks/useMediaQuery.ts  — Responsive hook
└── lib/utils.ts            — cn() helper (clsx + tailwind-merge)
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
git remote add origin https://github.com/<your-username>/ideal-factory.git
git push -u origin main
# → Import repo at vercel.com/new
```

## Environment Variables

No environment variables are required. All content is static.

## Architecture Decisions

### App Router + Server Components
All section components that don't require interactivity (Hero, Approach, WhyChoose, Footer, etc.) are React Server Components — they render to HTML on the server with zero JS hydration cost. Only components with user interaction (`"use client"`) get shipped as client JS: Header (scroll state), MobileMenu (animation), PortfolioSection (filter state), TestimonialsSection (carousel), ContactSection (form).

### Data Layer
Content lives in `/src/data/*.ts` typed arrays. In a production app these would be replaced with CMS calls (Sanity, Contentful) without touching any component code.

### Animation Strategy
Framer Motion is used surgically:
- `InteriorSolutionsReveal` — scroll-driven `useScroll` / `useTransform` for the letter-reveal
- Section entry animations — `whileInView` with `once: true` (fires once, no repeat)
- MobileMenu panel — `AnimatePresence` spring slide
- Testimonials — `AnimatePresence` crossfade between pages

### CSS Custom Utilities
- `.marble-bg` — multi-layer radial gradients simulating dark stone texture
- `.glass-card` — `backdrop-filter: blur` glassmorphism for the hero card
- `.text-outlined` — `-webkit-text-stroke` for the outlined text phase
- `.text-image-filled` — `background-clip: text` for the image-filled text phase
- `.oval-container` — asymmetric `border-radius` for the villa image pill

## Responsive Strategy

Mobile-first approach throughout. Breakpoints:

| Name | Range |
|---|---|
| Mobile | 320px – 767px |
| Tablet | 768px – 1023px |
| Desktop | 1024px+ |

- All typography scales with `sm:` / `lg:` variants
- Grid layouts switch from 1-col → 2-col → 3-col
- The "OUR INTERIOR SOLUTIONS" text scales with `13vw` → `10vw` (viewport-relative)
- Mobile menu replaces desktop nav on narrow screens
- Images use `next/image` with responsive `sizes` attribute

## SEO

- Full Metadata API (`title`, `description`, `openGraph`, `twitter`)
- `sitemap.ts` → `/sitemap.xml`
- `robots.ts` → `/robots.txt`
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`
- Correct heading hierarchy: `h1` (hero), `h2` (section titles), `h3` (card titles)
- `aria-label` on every landmark and interactive element
- `alt` text on all images

## Performance

- Hero image marked `priority` — preloaded, not lazy
- All other images lazy-loaded (Next.js default)
- `next/font/google` inlines critical font CSS — no render-blocking external requests
- Only interactive sections ship client JS (`"use client"`)
- Static rendering for all pages (no SSR waterfall)
- Tailwind CSS tree-shakes unused utilities at build time

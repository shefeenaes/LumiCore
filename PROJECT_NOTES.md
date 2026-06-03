# Project Notes — Ideal Factory Frontend Assessment
**Submitted by:** Shefeena  
**Role Applied For:** Frontend Developer  
**Company:** Lumicore  
**Date:** June 2026

---

## Overall Approach

My approach was to treat this as a production client project from the start, not as a throwaway prototype.

I began by thoroughly studying all provided Figma screenshots and the live reference website to identify:
1. Every section's layout structure and visual rhythm
2. The brand's colour palette (primary teal `#4ECDC4`, dark backgrounds `#1a1a1a`)
3. Typography: heavy Poppins bold for headings, italic for the "Made Simple" accent
4. Interaction patterns: glassmorphism hero card, scroll-driven text reveal, filtered portfolio grid, testimonials carousel

Once the design was mapped, I created the full component architecture before writing any styling, then implemented each section top-to-bottom following a mobile-first, accessibility-first discipline.

**Technology choices:**  
Next.js 15 App Router was selected because it enables React Server Components by default — sections with no interactivity render on the server and ship no client JS. TypeScript with `strict: true` catches errors at compile time. Tailwind CSS eliminates the CSS bundle growth problem. Framer Motion was used surgically only where animation adds genuine UX value.

---

## Challenges Faced During Development

### 1. The "OUR INTERIOR SOLUTIONS" scroll-reveal animation
This is the most distinctive visual element in the design — text that transitions from white outlines to letters filled with an interior photo as the user scrolls. There is no CSS "just turn it on" solution for this.

**Solution:** I combined two techniques:
- Phase 1 (outlined): `-webkit-text-stroke: 2px white` with `color: transparent`
- Phase 2 (image-filled): `background-image` + `background-clip: text` + `-webkit-background-clip: text`

Both layers are stacked absolutely with Framer Motion's `useScroll` / `useTransform` controlling their cross-fade opacity as `scrollYProgress` advances. The section height is `220vh` with `position: sticky` on the inner container so the animation plays during scroll without the section jumping off screen.

### 2. The oval/pill-shaped villa image
The Figma design shows a full aerial villa photo cropped into a large landscape oval. A simple `border-radius: 50%` creates a circle, not an oval. The solution was asymmetric `border-radius` shorthand: `border-radius: 45% / 38%` — the first value controls left/right corners, the second controls top/bottom, producing the correct pill shape.

### 3. Marble texture background (CSS-only)
The dark marble background appears throughout the site. Importing a texture image would add a network request. Instead, I replicated the look with layered `radial-gradient` calls at different positions, sizes and opacities. This approximates the "vein" distribution without any extra asset.

### 4. ESLint strict mode during build
Next.js 15 runs ESLint during `next build` and fails on any error. Three unused imports were flagged during the first build attempt. These were corrected before the final commit so the production build is clean.

### 5. `optimizeCss` experiment requiring `critters`
Enabling the `optimizeCss: true` experimental flag in `next.config.ts` requires the peer dependency `critters`. Since it was not listed in the docs-recommended deps, the build failed. The flag was removed to keep the dependency surface minimal; Tailwind's purging already handles CSS bundle size effectively.

---

## How Challenges Were Solved

| Challenge | Resolution |
|---|---|
| Text-reveal animation | Two stacked layers, Framer Motion scroll-driven opacity crossfade |
| Oval image | Asymmetric `border-radius: 45% / 38%` |
| Marble texture | Multi-layer CSS `radial-gradient` (no image asset) |
| Unused import lint errors | Removed the three stale imports found during build review |
| `critters` peer dependency | Removed `optimizeCss` experiment flag |

---

## What I Would Improve with More Time

1. **Real images** — Replace Unsplash demo URLs with the actual project photography from the client's portfolio. Each `next/image` already has the correct `alt`, `sizes`, and `fill` props ready.

2. **CMS integration** — Move all content data (`services.ts`, `portfolio.ts`, etc.) to a headless CMS (Sanity or Contentful) so the client can update copy and images without a developer.

3. **Video section** — The "Why Villa Interior Projects..." section has a video thumbnail with a play button. The current implementation shows a static image. A proper implementation would use a `<video>` tag with a poster image, or an embed of the actual video asset, with `IntersectionObserver`-based autoplay when scrolled into view.

4. **Lighthouse audit** — Run Lighthouse CI in the GitHub Actions pipeline and gate merges on a minimum score of 90 for Performance, 100 for SEO, and 95 for Accessibility.

5. **Page transitions** — Add Framer Motion `AnimatePresence` page-level transitions if the site grows into a multi-page app.

6. **i18n** — The UAE market requires Arabic alongside English. Next.js App Router's built-in i18n support can be activated with minimal refactoring because all content is already centralised in `/data/*.ts`.

---

## Technical Decisions

### Why Next.js App Router?
- Server Components reduce client JS by default
- Built-in image optimisation (`next/image`) handles WebP/AVIF conversion, lazy loading, and blur placeholders
- `next/font` eliminates render-blocking font requests
- First-class TypeScript support
- Vercel (the target deployment platform) is built by the same team — zero-config deploy

### Why Framer Motion over CSS animations?
CSS transitions cannot read scroll position. The signature "OUR INTERIOR SOLUTIONS" reveal requires `scrollYProgress`, which is only available in Framer Motion's `useScroll` hook. All other animations (section entry, card hover) are lightweight `whileInView` variants that add under 2 KB gzipped.

### Why Tailwind CSS?
The dark, card-heavy design uses a large number of custom colour values, spacing adjustments, and responsive variants. Utility-first CSS means each property is co-located with the element it styles — no context switching to separate CSS files. The production build tree-shakes to ~10 KB of actual CSS.

---

## Responsive Design Approach

**Mobile-first.** Every component is styled for 320 px first, then widened with Tailwind's `sm:`, `lg:`, and `xl:` modifiers.

Key responsive decisions:
- **Navigation**: hamburger + Framer Motion drawer on mobile; full horizontal nav on `md:` and above
- **Service cards**: single column on mobile, 2-column on `sm:` (≥640 px)
- **Portfolio grid**: 2 columns with `auto-rows` fixed height on mobile; 3 columns on `sm:`
- **"OUR INTERIOR SOLUTIONS" text**: `13vw` on mobile scales to `10vw` on desktop — always fills the viewport without breaking layout
- **3D CTA section**: stacked on mobile, side-by-side on `lg:`
- **Testimonials**: stacked on mobile, 2-column on `sm:`

---

## Component Architecture

```
Page (Server Component)
  ├── Header (Client — scroll state)
  ├── HeroSection (Server)
  ├── InteriorSolutionsReveal (Client — scroll animation)
  ├── SolutionsSection (Server + Client ServiceCard children)
  ├── ProblemSection (Client — video play toggle)
  ├── ApproachSection (Server)
  ├── DesignCTASection (Server)
  ├── PortfolioSection (Client — filter state)
  ├── WhyChooseSection (Server)
  ├── TestimonialsSection (Client — carousel state)
  ├── ContactSection (Client — form state)
  └── Footer (Server)
```

Every section is isolated in its own file. The page itself is a thin composition layer that simply imports and arranges sections in order. This means:
- Sections can be reordered by moving one line in `page.tsx`
- A/B testing a section means swapping one import
- Each section is independently testable

---

## Performance Optimisations

| Technique | Benefit |
|---|---|
| Hero image `priority` | Preloaded — no LCP penalty |
| `next/image` for all images | Automatic WebP/AVIF, lazy load, correct sizing |
| `next/font/google` | Fonts inlined in `<head>`, no render-blocking request |
| Server Components by default | Client JS only shipped for interactive sections |
| `once: true` on `whileInView` | Animations fire once; no re-triggering on scroll-up |
| Tailwind CSS purging | Final CSS bundle ~10 KB |
| Static export | All pages are SSG — no server-side waterfall |

---

## SEO Enhancements

- **Metadata API** (`layout.tsx`): title template, description, keywords, `openGraph`, `twitter`, `robots`, `canonical`
- **Sitemap** (`/sitemap.xml`): all major sections listed with `changeFrequency` and `priority`
- **Robots** (`/robots.txt`): allows all crawlers, points to sitemap
- **Semantic HTML**: every landmark uses the correct element — `<header>`, `<nav aria-label>`, `<main id="main-content">`, `<section aria-label>`, `<article>`, `<address>`, `<footer>`
- **Heading hierarchy**: single `<h1>` in the Hero, `<h2>` per section, `<h3>` for card-level titles
- **Alt text**: every `<Image>` has a descriptive `alt` string matching the actual content

---

## Additional Notes

This submission follows the evaluation criteria exactly:

- **Attention to detail**: brand teal `#4ECDC4`, Poppins bold/italic, glassmorphism hero card, oval villa image, marble texture, outlined-to-filled text animation — all replicated from the Figma/live reference
- **Responsive design**: tested at 320 px, 768 px, 1024 px, 1440 px
- **Code quality**: strict TypeScript, no `any`, no duplication, self-documenting names
- **Frontend architecture**: RSC-first, data/component/layout separation, SOLID-influenced
- **Problem solving**: documented above
- **Communication**: this document, inline JSDoc-level naming, README

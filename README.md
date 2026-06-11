# Dubu Business — Fable Site

A motion-driven landing page for Dubu's payment infrastructure product.
**One API. Every rail.**

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS 4** — design tokens in `src/index.css` (`@theme`)
- **GSAP 3 + ScrollTrigger** (`@gsap/react`) — scroll choreography
- **Lenis** — smooth scrolling (anchors enabled)

## Run

```bash
npm install
npm run dev      # http://localhost:3003
npm run build    # typecheck + production bundle
npm run preview
```

## Experience map

| Section | Motion |
|---|---|
| Preloader | Terminal boot sequence (`$ dubu init` → rails online) |
| Hero | Cycling ACCEPT/MANAGE/SETTLE verb, line-masked reveal, self-typing API terminal with live webhook events, animated counters |
| Ticker | Mono-type stats marquee |
| Pipeline | Pinned scrollytelling: SVG payment machine — three rails draw in, webhook badge pops, FX flow dashes animate, settlement lands — scrubbed by scroll. Static lit diagram on mobile |
| Features | Bento grid with corner-tick hover states and inline code card |
| Dev section | Tabbed terminal (create_session / webhook_event / trigger_payout) with staggered line reveals |
| Use cases | Two counter-scrolling marquee rows, pause on hover |
| Pricing | Live fee calculators with sliders (0.85% NGN capped ₦2,000 · 1.5% USD capped $8.50) + revenue split banner |
| Footer | Giant outlined DUBU wordmark with scrub parallax, "all rails operational" status |

`prefers-reduced-motion` is respected throughout.

## Content

All copy lives in `src/data/content.ts` — sourced from `dubu-new-business-site`
(pricing, features, use cases, URLs). Brand assets copied from the same repo.

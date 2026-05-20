# Padelit — Wireframe / Concept

A full visual redesign concept for [padelit.in](https://padelit.in) — India's curated padel destination. Plain HTML + CSS + JS, no build step. Hosted live via GitHub Pages.

**Live demo:** https://soyalkhan.github.io/padelit-custom-wireframe/

## Pages

| File | Page | What it covers |
|---|---|---|
| [index.html](index.html) | Home | Hero, brand strip, bento categories, new drops, brand spotlight, play-style selector, bestsellers, editorial split, racket-finder quiz, testimonials, community, newsletter |
| [collection.html](collection.html) | Racquets collection | Sticky sidebar filters, sort, chips, product grid + mid-grid editorial banner, pagination, SEO copy. Mobile filter drawer. |
| [product.html](product.html) | PDP (NOX AT10 Genius 18K) | Gallery + thumbs, options, fit-chart (Power/Control/Spin etc.), feature highlights, lifestyle banner, tabs (description/specs/care/reviews/shipping), pro verdict card, FAQ, related |
| [brand.html](brand.html) | Brand page (NOX) | Full-bleed brand hero, "Shop by category" 5-tile grid, featured series, brand spotlight, all products, long-form brand story |
| [cart.html](cart.html) | Cart | Step indicator, line items, free-ship progress, summary card with bundle savings, upsell rail, USPs |
| [guide.html](guide.html) | The Ultimate Racket Guide | 8-chapter editorial: skill level, shape, weight, balance, core, surface, grip, texture. Quiz CTA + reader picks. |

## Design system

- **Palette** — Court Lime `#D7FF3C`, Court Navy `#0B1220`, Bone `#F4F1EA`, Clay `#E8543A`
- **Typography** — Anton (display), Archivo (headings), Inter (body), JetBrains Mono (specs/eyebrows)
- **Layout** — `var(--container): 1380px`, generous whitespace, bento grids, editorial spotlight blocks
- **Motion** — `cubic-bezier(.2,.7,.2,1)` ease, marquee tickers, hover swap on product cards, sticky add-to-cart on scroll

## Architecture

```
padelit-wireframe/
├── index.html
├── collection.html
├── product.html
├── brand.html
├── cart.html
├── guide.html
└── assets/
    ├── css/
    │   └── style.css       # all design tokens + components, single file
    └── js/
        └── main.js         # mega menu, drawers (cart/search/mobile/filter), tabs, qty steppers, sticky ATC
```

All header/footer markup is duplicated per page (static HTML). The shared CSS + JS handle every page consistently.

## Run locally

It's static HTML. Either open [index.html](index.html) directly in a browser, or serve from the folder for proper relative paths:

```bash
# Python 3
python3 -m http.server 8080

# Or Node
npx serve .
```

Then open http://localhost:8080.

## Deploying

Hosted via **GitHub Pages** from the `main` branch root. Any push to `main` redeploys within ~1 minute.

To enable from a fresh fork:
1. Repo → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `/ (root)`
4. Save → wait ~30s → live at `https://<username>.github.io/<repo>/`

## Status

Wireframe / visual concept — **not production code**. Images are placeholder URLs (Unsplash / Picsum / Pravatar / padelit.in CDN). No backend, no analytics, no auth, no real cart state.

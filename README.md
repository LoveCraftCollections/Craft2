# Mana Pelli — Venu & Sravya

A mobile-first Telugu wedding invitation for a Konaseema kobbarithota pelli.
Most guests open this link from a WhatsApp message on an Android phone or an
iPhone, so the phone layout is the design — tablets and desktops are the
adaptation, not the other way round. Built with Next.js (App Router), TypeScript
and hand-written CSS; no animation library.

## Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Mobile-first design

- **Base stylesheet = 320px phones.** Media queries only add (`min-width: 640px`,
  `768px`, `900px`, `1200px`), plus two narrow-phone overrides
  (`max-width: 359px`) and short-phone overrides (`max-height: 740px` / `620px`)
  so the hero still fits a 320×568 screen.
- **No horizontal scrolling.** Gutters are `clamp(18px, 5.4vw, 34px)`, every grid
  child gets `min-width: 0`, long Telugu strings wrap, and chips shrink instead
  of overflowing. Fixed-width values above 300px are confined to desktop rules.
- **Touch targets** are 44px minimum (buttons 50–54px, inputs 52px, 16px font
  size so iOS Safari never zooms on focus).
- **Navigation**: a compact sticky header with language toggle and a full-screen
  menu that closes on selection, plus a five-item bottom bar (Home · Events ·
  Venue · Gallery · RSVP) that hides itself for the lightbox, the menu and the
  phone keyboard. The footer reserves space so the bar never covers content.
- **Hero**: art-directed photography — a vertical composition on phones, the wide
  mandapam frame from 768px up — with the Telugu blessing, the couple's names,
  date/muhurtham chips, a compact countdown, share and "open the invitation"
  actions, and safe-area aware framing.
- **Sections**: vertical couple layout → stacked profile cards; invitation card
  with a stacked detail block; events as a single vertical thread; venue photo
  above a full-width *Get directions* button; traditions in one column on
  phones; a two-column *vindhu bhojanam* photo grid (one column under 360px);
  a two-column gallery with a full-screen, swipeable lightbox; a single-column
  RSVP form with field-level validation; compact stacked wishes.
- **Telugu typography**: Noto Serif Telugu for display headings, Noto Sans
  Telugu for body copy, generous line-height (1.85–1.95), no negative tracking,
  and `lang="te"` everywhere so screen readers switch voice.

## Performance

- Hero art direction ships AVIF with WebP fallback and a ~600-character inline
  blur placeholder, preloaded with `media` so phones never fetch the desktop
  crop. Everything else goes through `next/image` (AVIF/WebP, lazy by default,
  explicit `sizes` and aspect-ratio containers so nothing shifts).
- The first load is ~216kB gzipped of JS + CSS in total, including React/Next:
  `framer-motion` was removed and the scroll reveals are a ~40-line
  `IntersectionObserver` + CSS transition component.
- `prefers-reduced-motion` disables every animation, and decorative petals are
  dropped on `(update: slow)` devices. Audio never autoplays — the ambient drone
  is generated locally and starts only after a tap.
- `color-scheme: light` prevents Android Chrome's forced dark mode from
  inverting the cream/gold palette.

## Images

The optimistic derivatives live in `public/images`. To rebuild them after
changing the art:

```bash
npm run images
```

`scripts/optimize-images.mjs` (sharp) reads the multi-megabyte source art from
`assets/source/*-source.png` (git-ignored) and writes:

- `public/images/hero/hero-portrait-{440,660,880}.{avif,webp}` — phone hero
- `public/images/hero/hero-landscape-{960,1376}.{avif,webp}` — tablet/desktop hero
- `src/data/hero-lqip.ts` — inline blur placeholders
- `public/images/og-mana-pelli.jpg` — 1200×630 WhatsApp/social preview card

## Sharing and metadata

WhatsApp reads Open Graph tags, so set the public URL before deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

It feeds `metadataBase`, the `og:image` absolute URL and the Event JSON-LD. The
share button uses the native share sheet on phones (WhatsApp, SMS, anything)
and falls back to a pre-filled `wa.me` message on desktop.

## Demo content and extension points

Wedding details, events, traditions, food and gallery content live in
`src/data/`. RSVP replies and wishes are intentionally held in local React state
for this demo; the RSVP form dispatches a `mana-pelli:rsvp` browser event so an
API integration can be added without changing the form UI. Background ambience is
generated locally with the Web Audio API and only starts after the visitor
presses play.

All couple names, families, venue details and dates shown here are fictional demo
content. Replace the data in `src/data/wedding.ts` and related data files before
using this for a real event.

## Manual QA checklist

Widths 320 / 360 / 375 / 390 / 414 / 430px, then 768 / 1024 / 1440px:

1. No horizontal scroll at any width (also test the closed/open menu).
2. Hero fits without clipping; countdown and both CTAs visible on a 320×568
   screen; the names never overflow their column.
3. Bottom bar never covers the RSVP submit button or the footer's last line.
4. Menu opens/closes, locks scroll, closes on selection, and `Esc` closes it.
5. Gallery lightbox: swipe, arrow keys, close, counter, caption in Telugu.
6. RSVP: empty submit shows the name error and focuses the field; a bad phone
   number shows the phone error; success card replaces the form.
7. Wishes: short message rejected, valid wish appears at the top of the list.
8. Language toggle: every section switches, no clipped Telugu, hero names stay
   on screen.
9. WhatsApp share opens the native sheet, and the link preview shows the
   mandapam card.
10. Reduced-motion mode: no reveal/petal/zoom animation.

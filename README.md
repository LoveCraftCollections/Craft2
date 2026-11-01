# Mana Pelli — Venu & Sravya

A premium demo wedding invitation inspired by a traditional Konaseema kobbarithota pelli. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

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

## Demo content and extension points

Wedding details, events, traditions, food and gallery content live in `src/data/`. RSVP replies and wishes are intentionally held in local React state for this demo; the RSVP form dispatches a `mana-pelli:rsvp` browser event so an API integration can be added without changing the form UI. Background ambience is generated locally with the Web Audio API and only starts after the visitor presses play.

All couple names, families, venue details and dates shown here are fictional demo content. Replace the data in `src/data/wedding.ts` and related data files before using this for a real event.

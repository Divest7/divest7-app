# DIVEST 7 — The Next Step Forward

**Small Steps. Big Movement.**

A mobile-first, installable daily practice app for growing spiritually, mentally and
personally. Every day pairs one affirmation, one inspirational message, one KJV
Scripture, one reflection question and one action step.

The design is cinematic and deliberately unlike a generic website: a sunrise-over-
mountains photographic plate, deep navy and near-black grounds, warm gold accents,
film grain, and a staggered reveal on load. Typography pairs Fraunces (display),
Jost (interface) and Newsreader (Scripture and long-form reading).

## The seven movements

Dream → Believe → Decide → Act → Reflect → Plan → Repeat.

The seven cycle continuously through the 365-day year, so every entry sits inside one
of them.

## What is live now

| Screen | Route | State |
|---|---|---|
| Opening screen | `/` | Built — cinematic sunrise hero, wordmark, the seven movements, today's affirmation |
| Today | `/today` | Built — affirmation, message, KJV Scripture, reflection, action step, mark-complete |
| 365 Days | `/days` | Built — twelve monthly movements, month rail, full-year search, completion dots |
| Day detail | `/days/:day` | Built — any day of the year, with prev/next navigation |
| KJV Bible | `/bible` | Data layer complete (66 books, 12 chapters of text); reader screens are next |
| DIVEST 7 | `/divest7` | Framework content complete; screen is next |
| Journal | `/journal` | Store complete; screen is next |
| Favorites | `/favorites` | Store complete and already writable from Today; screen is next |
| Progress | `/progress` | Store and streak logic complete; screen is next |

Saving an affirmation or Scripture and marking a day complete already work from Today
and from any day in the archive — the data is being recorded on device and the
remaining screens read from it.

See [PLAN.md](./PLAN.md) for the full roadmap.

## Technologies

- **TanStack Start** (React 19 + TanStack Router, file-based routing, SSR)
- **Tailwind CSS 4** with a custom `@theme` palette and hand-written atmosphere layers
- **TypeScript** in strict mode, `@/*` path alias for `src/*`
- **lucide-react** for iconography
- **Netlify** for hosting, with the **Netlify Image CDN** serving every image transform
- **Progressive Web App**: web manifest, service worker with an offline shell, iOS and
  Android install metadata
- Hero and icon artwork generated through the **Netlify AI Gateway** (Gemini image model)

## Running locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Or with the Netlify CLI, which emulates the Image CDN and the rest of the platform:

```bash
netlify dev --port 8889
```

The Image CDN route (`/.netlify/images`) only resolves under `netlify dev` or on a
deployed site. Under plain `pnpm dev` the hero and icons fall back to unstyled or
missing images; the rest of the app is unaffected.

## Adding the rest of the KJV text

The King James Version is public domain. `src/data/bible.ts` already describes all 66
books, their divisions and their chapter counts, so navigation works for every chapter
whether or not text is present.

To add text, drop entries into `CHAPTERS` in `src/data/bible-text.ts`:

```ts
'romans:8': [
  "There is therefore now no condemnation…",  // verse 1
  "For the law of the Spirit of life…",        // verse 2
]
```

Keys are `"<book-slug>:<chapter>"` and index 0 is verse 1. Nothing else needs to
change — the chapter grid, the reader and Scripture search pick up new text
automatically, and chapters without text stay navigable and say so.

Twelve complete chapters ship today (Genesis 1; Psalms 1, 23, 27, 91, 121; Proverbs 3;
Isaiah 53; John 3; 1 Corinthians 13; Philippians 4; James 1) — at least one from every
division of both testaments.

## Installing as an app

On Android and desktop Chrome an **Install app** control appears in the interface once
the browser offers it. On iOS, use Share → *Add to Home Screen*. The app launches
standalone with no browser chrome, in portrait, on a `#04070d` ground.

## Functional rebuild notes (September 27, 2026)

This package uses the plain Vite/TanStack Start development server. The Netlify Vite
middleware is intentionally not loaded in `vite.config.ts`, because its local Edge
Functions helper was the source of the `--allow-scripts` / Deno startup failure seen
on Windows.

Bible navigation now uses TanStack Router `Link` components for book, chapter,
previous-chapter and next-chapter navigation instead of forcing full-page browser
requests. This keeps navigation inside the generated route tree and prevents valid
Bible routes from falling through to the generic not-found route.

The DIVEST 7 visual theme remains active throughout the app using the bundled
`public/img/summit-path.png` and `public/img/sunrise-hero.png` artwork. Image metadata
also uses the bundled assets directly, so local development does not depend on the
Netlify Image CDN.

The official DIVEST 7 program page is linked from the welcome screen, the desktop
application rail, and the DIVEST 7 method screen:
https://payhip.com/b/zRFVh

For Windows local development:

```bat
npm install
npm run dev
```

Then open `http://localhost:3000/`. Keep the command window open while using the app.

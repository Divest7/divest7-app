# DIVEST 7 — Product Roadmap

DIVEST 7 is a large product: a daily devotional, a full-year library, a 66-book Bible
reader, journaling, favorites and progress tracking, all in one installable app. It is
being built in milestones so each one is usable on its own.

Milestone 1 is complete. Milestones 2 onward are ordered by what adds the most for a
person using the app daily.

---

## Milestone 1 — The branded product surface ✅ Complete

The look, the shell and the daily practice.

- Cinematic opening screen at `/` — sunrise-over-mountains plate, DIVEST 7 wordmark,
  *The Next Step Forward*, *Small Steps. Big Movement.*, the seven movements named, and
  today's affirmation.
- Design system: navy/black/white/gold `@theme` palette, Fraunces + Jost + Newsreader,
  grain overlay, horizon glow, gold hairlines, staggered reveal animations, full
  `prefers-reduced-motion` support.
- Responsive app shell — bottom tab bar with safe-area insets on phones, a persistent
  left rail from large screens up, with every section reachable in one tap.
- **Today** (`/today`) — affirmation, message, KJV Scripture, reflection question and
  one action step, with save toggles and mark-day-complete.
- **365 Days** (`/days`) — twelve monthly movements, a month rail, search across the
  whole year, completion dots, and a detail screen for any day (`/days/:day`).
- Content engine: 365 entries composed from a curated editorial library whose pool
  lengths are pairwise-coprime primes, so no two days in a year share a combination.
- Bible data layer: all 66 books with divisions and chapter counts, plus twelve
  complete KJV chapters and a documented drop-in format for the rest.
- The seven movements authored in full (`src/data/divest7.ts`) with essence, body,
  prompt and Scripture for each.
- On-device store for journal, favorites and completed days, with streak calculation.
- Progressive Web App: manifest, service worker with an offline shell, iOS and Android
  install metadata, and an install control that appears when the browser offers one.
- Hero and app-icon artwork generated for the brand and served through the Netlify
  Image CDN.

---

## Milestone 2 — The KJV Bible reader ✅ Complete (hybrid offline + public-domain CDN)

Turn the finished Bible data layer into screens.

1. `/bible` — testament toggle, books grouped by division (Law, History, Wisdom &
   Poetry, Major and Minor Prophets, Gospels, Epistles, Prophecy), with a marker showing
   which books have text loaded.
2. `/bible/:book` — chapter grid sized to each book's real chapter count.
3. `/bible/:book/:chapter` — the reader: verse numbers in gold, Newsreader at a
   comfortable measure, tap a verse to save it to Favorites, previous/next chapter,
   and a clear "text not yet loaded" state for chapters awaiting content.
4. `/bible/search` — Scripture search across loaded chapters and the daily-Scripture
   library, with book and testament filters and highlighted matches.
5. Load the remaining public-domain KJV text into `src/data/bible-text.ts`, or move it
   behind a Netlify Blobs bucket if the payload warrants it. The `getChapter` seam
   already exists for this.

## Milestone 3 — Journal, Favorites and Progress screens ✅ Complete

The store and its data are already in place; these are the reading surfaces.

1. `/journal` — composer that accepts the day and reflection prompt passed from Today's
   *Write about this* link, plus a list of saved entries with edit and delete, and a
   composed empty state.
2. `/favorites` — saved affirmations and Scriptures in two groups, each linking back to
   its day or its chapter, with removal.
3. `/progress` — a 365-dot constellation of the year, current streak, longest streak,
   total days and percentage complete, per-movement bars, and iOS *Add to Home Screen*
   guidance for people whose browser never offers an install prompt.

## Milestone 4 — The DIVEST 7 framework screen ✅ Complete

`/divest7` — the seven movements as an editorial vertical sequence: oversized numerals,
gold hairlines, the summit-path plate, and each movement's essence, body, Scripture and
prompt, with a link into the day currently sitting on that step.

## Milestone 5 — Accounts and cross-device sync

Everything personal currently lives on the device. This milestone makes it portable.

1. Netlify Identity for sign-in, with the app fully usable before signing in.
2. A Netlify Database schema for journal entries, favorites and completed days, keyed
   by user.
3. Server functions for reads and writes, and a one-time merge that lifts existing
   on-device data into the account on first sign-in.
4. `src/lib/store.ts` is the only module that has to change — it was written as the
   single seam between the interface and persistence.

## Milestone 6 — Rhythm and reach

1. Daily reminder notifications through the service worker, with a chosen time.
2. Share an affirmation or Scripture as a generated sunrise card image.
3. Export the journal as a PDF or markdown archive.
4. Fully hand-authored per-day entries replacing the composition layer, editable from a
   simple authoring surface.
5. Reading plans — thirty-day tracks assembled from the library for specific seasons
   (grief, new work, discipline, gratitude).

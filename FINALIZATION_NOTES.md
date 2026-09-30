# DIVEST 7 — Finalized 365 Content Build

## Editorial correction
The former 365-day generator independently rotated affirmations, Scriptures, messages, reflections and actions. That guaranteed variety but could combine unrelated themes on the same day.

This build replaces that model with coherent lesson packs. Each day now receives its affirmation, message, KJV Scripture, prayer, reflection and action from one DIVEST 7 practice lesson. This makes each day teach one central idea from beginning to end.

## Framework
Dream → Believe → Decide → Act → Reflect → Plan → Transform

Repeat is the continuing instruction after Transform; it is not an eighth step and is not inserted between Plan and Transform.

## Added user benefit
A dedicated Prayer section now sits between Scripture and Reflection, turning the daily reading into a more complete faith-based practice.

## Preserved functionality
Bible, Journal, Create, Music, 7-Min Reset, Progress, Favorites, The Seven, completion tracking, day navigation, month navigation, search, PWA/offline assets, and external DIVEST 7 website link remain in the source tree.

## Deployment
Upload the contents of this folder to the existing GitHub repository main branch. Render should redeploy automatically from the new commit.


## Final production polish — 2026-09-30
- Removed the automatically appended monthly-theme sentence from each daily message. The generated sentence could create awkward grammar and dilute the lesson's single theme.
- Preserved monthly movement metadata without forcing it into every lesson paragraph.
- Restored Joshua 24:15 to the full KJV verse rather than an ellipsized excerpt.
- Normalized the apostrophe in Lamentations 3:22-23 for consistent text rendering.
- Confirmed all 365 days still derive affirmation, message, Scripture, prayer, reflection, and action from one coherent lesson object.
- Production build verified successfully after edits.

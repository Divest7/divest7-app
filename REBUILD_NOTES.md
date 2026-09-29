# DIVEST 7 rebuild notes

## Production configuration
- Build command: `pnpm install --frozen-lockfile && pnpm run build`
- Publish directory: `dist`
- No environment variables are required for the current build.

## Bible reader fix
The prior build mixed a dynamic translation catalog from one provider with chapter text from other providers. That allowed unsupported translation IDs to appear in the selector and fail at chapter load.

This rebuild uses one verified public Bible service for remote translations and a fixed catalog of translation identifiers that service documents as supported. KJV retains the app's bundled chapter text where available and uses the same remote service as fallback. Every remotely opened chapter is cached in localStorage by translation/book/chapter.

## PWA fixes
- Manifest now uses local icon assets rather than Netlify-only image transformation URLs.
- Service worker is registered from the production HTML.
- Cache version bumped to `divest7-v3` so old cached assets are replaced.

## Render
`render.yaml` is included. A manual Render Static Site should use the production configuration above.


## Framework polish
- The seven-step framework is now consistently: Dream → Believe → Decide → Act → Reflect → Plan → Transform.
- Repeat is no longer presented as Step 7; it is the instruction to begin the seven-step process again with what the user has learned.
- Updated the sidebar, The Seven page, 365 Days wording, Today completion language, metadata, and documentation to match.
- Service-worker cache version bumped so the polished framework is not masked by an older cached build after deployment.

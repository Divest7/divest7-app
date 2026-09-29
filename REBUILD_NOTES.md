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

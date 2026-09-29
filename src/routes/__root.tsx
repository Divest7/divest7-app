import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { PwaRuntime } from '@/components/pwa'

import '../styles.css'

const siteName = 'DIVEST 7 — The Next Step Forward'
const siteDescription =
  'A daily practice of affirmation, Scripture, reflection and action. Dream, Believe, Decide, Act, Reflect, Plan, Repeat. Small Steps. Big Movement.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5',
      },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#04070d' },
      { name: 'application-name', content: 'DIVEST 7' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'DIVEST 7' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'DIVEST 7' },
      {
        property: 'og:image',
        content: '/img/sunrise-hero.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Jost:ital,wght@0,200..600;1,300..500&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..400&display=swap',
      },
      {
        rel: 'apple-touch-icon',
        href: '/img/icon-source.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/icon-source.png',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <PwaRuntime />
        <Scripts />
      </body>
    </html>
  )
}

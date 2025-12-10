// Reusable meta tag component for Open Graph and Twitter Card tags
import type { FC } from 'hono/jsx'
import type { MetaData } from '../types/graphql.js'

export const MetaTags: FC<MetaData> = ({ title, description, url, imageUrl }) => {
  return (
    <>
      <title>{title}</title>
      <link rel="stylesheet" href="/styles/output.css" />

      {/* Theme and viewport - supports both light and dark modes */}
      <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)" />
      <meta name="color-scheme" content="light dark" />

      {/* Apple mobile web app */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Intuition" />

      {/* Microsoft */}
      <meta name="msapplication-TileColor" content="#3b82f6" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Intuition Portal" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="intuition.systems" />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@0xIntuition" />
      <meta name="twitter:creator" content="@0xIntuition" />

      {/* Additional meta tags */}
      <meta name="description" content={description} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  )
}

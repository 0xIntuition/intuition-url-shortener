// HTML page template for redirecting with meta tags
import type { FC } from 'hono/jsx'
import type { MetaData } from '../types/graphql.js'
import { MetaTags } from './MetaTags.js'

export const RedirectPage: FC<MetaData> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Meta tags for social media */}
        <MetaTags {...props} />

        {/* Meta refresh as fallback */}
        <meta http-equiv="refresh" content={`0;url=${props.url}`} />
      </head>
      <body className="flex items-center justify-center min-h-screen p-8 text-center">
        <div className="container max-w-[540px] w-full animate-fade-in">
          <div className="flex flex-col items-center gap-6">
            <div
              className="w-10 h-10 border-[3px] border-brand-primary/10 border-t-brand-primary rounded-full animate-spin-custom"
              role="status"
              aria-label="Loading"
            ></div>
            <p className="text-lg leading-normal text-text-secondary m-0 animate-pulse-custom">
              Taking you to the Intuition Portal...
            </p>
          </div>

          <div className="mt-12 text-sm text-text-secondary">
            If you're not redirected,{' '}
            <a
              href={props.url}
              aria-label={`Go to ${props.title}`}
              className="text-brand-primary underline underline-offset-2 transition-colors duration-fast ease-out-custom hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              click here
            </a>
          </div>
        </div>

        {/* JavaScript redirect */}
        <script dangerouslySetInnerHTML={{
          __html: `window.location.href = '${props.url}';`
        }} />
      </body>
    </html>
  )
}

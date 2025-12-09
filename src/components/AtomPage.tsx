// HTML page template for atom display
import type { FC } from 'hono/jsx'
import type { MetaData } from '../types/graphql.js'
import { MetaTags } from './MetaTags.js'

export const AtomPage: FC<MetaData> = (props) => {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />

        {/* Meta tags for social media */}
        <MetaTags {...props} />

        {/* Meta refresh as fallback */}
        <meta http-equiv="refresh" content="0;url={props.url}" />

        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
          }
          .container {
            max-width: 600px;
            padding: 2rem;
          }
          a {
            color: #60a5fa;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <p>Redirecting to <a href={props.url}>{props.url}</a>...</p>
        </div>

        {/* JavaScript redirect */}
        <script dangerouslySetInnerHTML={{
          __html: `window.location.href = '${props.url}';`
        }} />
      </body>
    </html>
  )
}

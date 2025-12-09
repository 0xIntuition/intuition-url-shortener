// 404 Error page component
import type { FC } from 'hono/jsx'

export const ErrorPage: FC = () => {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <title>404 - Not Found | Intuition</title>

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
          h1 {
            font-size: 3rem;
            margin: 0 0 1rem 0;
            color: #ef4444;
          }
          p {
            font-size: 1.2rem;
            margin: 0 0 2rem 0;
            color: #9ca3af;
          }
          a {
            color: #60a5fa;
            text-decoration: none;
            font-size: 1rem;
          }
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1>404</h1>
          <p>The requested atom or triple could not be found.</p>
          <a href="https://portal.intuition.systems">Visit Intuition Portal</a>
        </div>
      </body>
    </html>
  )
}

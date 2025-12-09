// Homepage with URL shortener form
import type { FC } from 'hono/jsx'

export const HomePage: FC = () => {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <title>Intuition URL Shortener</title>

        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 2rem;
          }
          .container {
            max-width: 600px;
            width: 100%;
          }
          h1 {
            font-size: 2.5rem;
            margin: 0 0 1rem 0;
            text-align: center;
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          p {
            font-size: 1.1rem;
            color: #9ca3af;
            text-align: center;
            margin: 0 0 2rem 0;
          }
          form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          label {
            font-size: 1rem;
            color: #d1d5db;
            margin-bottom: 0.5rem;
          }
          input[type="text"] {
            width: 100%;
            padding: 1rem;
            font-size: 1rem;
            background: #1f2937;
            border: 2px solid #374151;
            border-radius: 0.5rem;
            color: #ffffff;
            box-sizing: border-box;
            transition: border-color 0.2s;
          }
          input[type="text"]:focus {
            outline: none;
            border-color: #60a5fa;
          }
          input[type="text"]::placeholder {
            color: #6b7280;
          }
          button {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
            border: none;
            border-radius: 0.5rem;
            color: #ffffff;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
          }
          button:active {
            transform: translateY(0);
          }
          .footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.9rem;
            color: #6b7280;
          }
          .footer a {
            color: #60a5fa;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1>Intuition URL Shortener</h1>
          <p>Paste an Intuition Portal URL to create a shortened link</p>

          <form method="post" action="/short">
            <div>
              <label for="url">Portal URL</label>
              <input
                type="text"
                id="url"
                name="url"
                placeholder="https://portal.intuition.systems/explore/atom/0x..."
                required
                autofocus
              />
            </div>
            <button type="submit">Shorten URL</button>
          </form>

          <div class="footer">
            <a href="https://portal.intuition.systems" target="_blank">Visit Intuition Portal</a>
          </div>
        </div>
      </body>
    </html>
  )
}

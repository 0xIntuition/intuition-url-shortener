// Preview page showing share card and shortened URL
import type { FC } from 'hono/jsx'
import type { MetaData } from '../types/graphql.js'

interface PreviewPageProps extends MetaData {
  shortUrl: string
}

export const PreviewPage: FC<PreviewPageProps> = (props) => {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <title>Preview - Intuition URL Shortener</title>

        <style>{`
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            margin: 0;
            padding: 2rem;
            min-height: 100vh;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 2rem;
            margin: 0 0 2rem 0;
            text-align: center;
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .section {
            background: #1f2937;
            border: 2px solid #374151;
            border-radius: 0.75rem;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 1.5rem 0;
            color: #60a5fa;
          }
          .preview-card {
            background: #111827;
            border: 1px solid #374151;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          .preview-image {
            width: 100%;
            height: auto;
            display: block;
            background: #1f2937;
          }
          .preview-content {
            padding: 1.5rem;
          }
          .preview-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 0.75rem 0;
            color: #ffffff;
          }
          .preview-description {
            font-size: 1rem;
            line-height: 1.6;
            margin: 0;
            color: #9ca3af;
          }
          .url-container {
            display: flex;
            gap: 1rem;
            align-items: center;
          }
          .url-input {
            flex: 1;
            padding: 1rem;
            font-size: 1rem;
            background: #111827;
            border: 2px solid #374151;
            border-radius: 0.5rem;
            color: #60a5fa;
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          }
          .url-input:focus {
            outline: none;
            border-color: #60a5fa;
          }
          .copy-button {
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
            border: none;
            border-radius: 0.5rem;
            color: #ffffff;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            white-space: nowrap;
          }
          .copy-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
          }
          .copy-button:active {
            transform: translateY(0);
          }
          .copy-button.copied {
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
          }
          .actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
          }
          .link-button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            background: transparent;
            border: 2px solid #374151;
            border-radius: 0.5rem;
            color: #9ca3af;
            text-decoration: none;
            display: inline-block;
            transition: border-color 0.2s, color 0.2s;
          }
          .link-button:hover {
            border-color: #60a5fa;
            color: #60a5fa;
          }
          @media (max-width: 640px) {
            .url-container {
              flex-direction: column;
            }
            .copy-button {
              width: 100%;
            }
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1>Your Shortened URL is Ready!</h1>

          <div class="section">
            <h2 class="section-title">Share Card Preview</h2>
            <div class="preview-card">
              <img src={props.imageUrl} alt={props.title} class="preview-image" />
              <div class="preview-content">
                <h3 class="preview-title">{props.title}</h3>
                <p class="preview-description">{props.description}</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Shortened URL</h2>
            <div class="url-container">
              <input
                type="text"
                id="short-url"
                class="url-input"
                value={props.shortUrl}
                readonly
              />
              <button
                class="copy-button"
                id="copy-btn"
                onclick="copyToClipboard()"
              >
                Copy
              </button>
            </div>
          </div>

          <div class="actions">
            <a href="/" class="link-button">Create Another</a>
            <a href={props.shortUrl} class="link-button" target="_blank">Test Link</a>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            function copyToClipboard() {
              const input = document.getElementById('short-url');
              const button = document.getElementById('copy-btn');

              // Use the Clipboard API
              navigator.clipboard.writeText(input.value).then(function() {
                // Update button to show success
                button.textContent = 'Copied!';
                button.classList.add('copied');

                // Reset after 2 seconds
                setTimeout(function() {
                  button.textContent = 'Copy';
                  button.classList.remove('copied');
                }, 2000);
              }).catch(function(err) {
                console.error('Failed to copy: ', err);
                // Fallback: select the text
                input.select();
                document.execCommand('copy');
                button.textContent = 'Copied!';
                setTimeout(function() {
                  button.textContent = 'Copy';
                }, 2000);
              });
            }
          `
        }} />
      </body>
    </html>
  )
}

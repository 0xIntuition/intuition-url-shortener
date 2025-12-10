import type { FC } from 'hono/jsx'

interface AboutPageProps {
  hostname: string
}

export const AboutPage: FC<AboutPageProps> = ({ hostname }) => {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <title>How It Works - Intuition URL Shortener</title>
        <meta
          name="description"
          content="Learn how Intuition's URL shortener works using shortest prefix algorithm and base62 encoding for maximum compression."
        />
        <style>
          {`
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
            }

            h1 {
              font-size: 2.5rem;
              font-weight: 700;
              margin-bottom: 1rem;
              background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }

            h2 {
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #60a5fa;
            }

            h3 {
              font-size: 1.25rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #a78bfa;
            }

            p {
              color: #9ca3af;
              margin-bottom: 1rem;
              font-size: 1rem;
            }

            .subtitle {
              font-size: 1.125rem;
              color: #9ca3af;
              margin-bottom: 3rem;
            }

            .section {
              background-color: #1f2937;
              border: 1px solid #374151;
              border-radius: 8px;
              padding: 1.5rem;
              margin-bottom: 2rem;
            }

            .code-block {
              background-color: #111827;
              border: 1px solid #374151;
              border-radius: 6px;
              padding: 1rem;
              margin: 1rem 0;
              overflow-x: auto;
            }

            .code-block code {
              font-family: Monaco, Menlo, 'Courier New', monospace;
              font-size: 0.875rem;
              line-height: 1.6;
              color: #e5e7eb;
              display: block;
              white-space: pre;
            }

            .example-box {
              background-color: #111827;
              border: 1px solid #374151;
              border-radius: 6px;
              padding: 1rem;
              margin: 1rem 0;
            }

            .example-label {
              font-weight: 600;
              color: #60a5fa;
              margin-bottom: 0.5rem;
              font-size: 0.875rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .url {
              font-family: Monaco, Menlo, 'Courier New', monospace;
              font-size: 0.875rem;
              color: #e5e7eb;
              word-break: break-all;
              background-color: #0a0a0a;
              padding: 0.5rem;
              border-radius: 4px;
              margin: 0.25rem 0;
            }

            .short-url {
              color: #10b981;
              font-weight: 600;
            }

            .highlight {
              color: #a78bfa;
              font-weight: 600;
            }

            .benefit-list {
              list-style: none;
              margin: 1rem 0;
            }

            .benefit-list li {
              padding: 0.5rem 0;
              color: #9ca3af;
              position: relative;
              padding-left: 1.5rem;
            }

            .benefit-list li:before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #10b981;
              font-weight: bold;
            }

            .cta-section {
              text-align: center;
              margin-top: 3rem;
              padding: 2rem;
              background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%);
              border-radius: 8px;
              border: 1px solid #374151;
            }

            .btn {
              display: inline-block;
              padding: 0.75rem 2rem;
              background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 1rem;
              transition: all 0.2s ease;
              margin: 0.5rem;
            }

            .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
            }

            .btn-secondary {
              background: transparent;
              border: 1px solid #60a5fa;
              color: #60a5fa;
            }

            .btn-secondary:hover {
              background: rgba(96, 165, 250, 0.1);
              box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
            }

            .stage {
              margin: 1.5rem 0;
            }

            .stage-number {
              display: inline-block;
              background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
              color: #ffffff;
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              text-align: center;
              line-height: 2rem;
              font-weight: 700;
              margin-right: 0.5rem;
            }

            .arrow {
              color: #60a5fa;
              font-size: 1.5rem;
              text-align: center;
              margin: 1rem 0;
            }

            .result-badge {
              display: inline-block;
              background-color: #10b981;
              color: #ffffff;
              padding: 0.25rem 0.75rem;
              border-radius: 4px;
              font-size: 0.875rem;
              font-weight: 600;
              margin-top: 0.5rem;
            }

            @media (max-width: 640px) {
              .container {
                padding: 1rem;
              }

              h1 {
                font-size: 2rem;
              }

              h2 {
                font-size: 1.25rem;
              }

              .section {
                padding: 1rem;
              }

              .url {
                font-size: 0.75rem;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div class="container">
          <h1>How It Works</h1>
          <p class="subtitle">
            Intuition URL Shortener transforms long blockchain IDs into compact, shareable links
            with rich social media previews.
          </p>

          <div class="section">
            <h2>The Problem</h2>
            <p>
              Intuition protocol uses 256-bit hexadecimal identifiers for atoms, triples, and lists.
              These IDs are <span class="highlight">64 characters long</span>, making them impractical
              for sharing on social media or messaging platforms.
            </p>
            <div class="code-block">
              <code>0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
            </div>
            <p>
              Our solution: A two-stage algorithm that achieves <span class="highlight">~95% compression</span> while
              maintaining uniqueness and readability.
            </p>
          </div>

          <div class="section">
            <h2>The Algorithm</h2>

            <div class="stage">
              <h3>
                <span class="stage-number">1</span>
                Shortest Unique Prefix
              </h3>
              <p>
                Instead of using the full 64-character ID, we find the <strong>shortest prefix</strong> that
                uniquely identifies the term in the Intuition database.
              </p>
              <div class="code-block">
                <code>Full ID:  0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
                <code>Shortest: 0x8c48</code>
              </div>
              <p>
                The algorithm uses smart collision detection: it starts with a 2-character prefix and
                increments by 2 until it finds a unique match. Most terms need only 4-8 characters.
              </p>
            </div>

            <div class="arrow">↓</div>

            <div class="stage">
              <h3>
                <span class="stage-number">2</span>
                Base62 Encoding
              </h3>
              <p>
                We convert the shortest hex prefix to <strong>base62</strong> (using 0-9, A-Z, a-z)
                for maximum URL density.
              </p>
              <div class="code-block">
                <code>Hex:    0x8c48  (4 characters)</code>
                <code>Base62: 9LE     (3 characters)</code>
              </div>
              <p>
                Base62 uses the full alphanumeric character set, resulting in shorter URLs that are
                still easy to read and share.
              </p>
            </div>

            <div class="arrow">↓</div>

            <div class="example-box">
              <div class="example-label">Final Result</div>
              <div class="url short-url">{hostname}/9LE</div>
              <span class="result-badge">95% shorter</span>
            </div>
          </div>

          <div class="section">
            <h2>Real Examples</h2>

            <h3>Atom</h3>
            <div class="example-box">
              <div class="example-label">Before</div>
              <div class="url">
                portal.intuition.systems/explore/atom/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e
              </div>
            </div>
            <div class="example-box">
              <div class="example-label">After</div>
              <div class="url short-url">{hostname}/9LE</div>
            </div>

            <h3>Triple</h3>
            <div class="example-box">
              <div class="example-label">Before</div>
              <div class="url">
                portal.intuition.systems/explore/triple/0xa1739235f5a8362b15268eab46484abdd7660a1e2a6a5d7deacbed9d4c055e68
              </div>
            </div>
            <div class="example-box">
              <div class="example-label">After</div>
              <div class="url short-url">{hostname}/Akd</div>
              <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #9ca3af;">
                Each triple gets its own unique short identifier
              </p>
            </div>

            <h3>List</h3>
            <div class="example-box">
              <div class="example-label">Before</div>
              <div class="url">
                portal.intuition.systems/explore/list/0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5-0xc2bd74b8b79a52c311e2adcfe3739db273c4c5df1168dd5f30471998877dd784
              </div>
            </div>
            <div class="example-box">
              <div class="example-label">After</div>
              <div class="url short-url">{hostname}/8RP/Cy5</div>
              <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #9ca3af;">
                Lists use two short IDs (predicate and object) separated by a slash
              </p>
            </div>
          </div>

          <div class="section">
            <h2>Social Media Optimization</h2>
            <p>
              Beyond just shortening URLs, our service optimizes links for social media sharing:
            </p>
            <ul class="benefit-list">
              <li>
                <strong>Rich Previews:</strong> Open Graph and Twitter Card meta tags ensure beautiful
                link previews with images, titles, and descriptions
              </li>
              <li>
                <strong>Automatic Type Detection:</strong> The system identifies whether a link is an
                atom, triple, or list and generates appropriate metadata
              </li>
              <li>
                <strong>Custom List Images:</strong> List URLs display custom preview images generated
                from the predicate and object terms
              </li>
              <li>
                <strong>Seamless Redirects:</strong> Users are automatically redirected to the full
                Intuition Portal after the preview loads
              </li>
            </ul>
          </div>

          <div class="section">
            <h2>Why It Makes Sense</h2>
            <p>This approach offers several key advantages:</p>
            <ul class="benefit-list">
              <li>
                <strong>Minimal Collision Risk:</strong> The shortest prefix algorithm ensures uniqueness
                while maximizing compression
              </li>
              <li>
                <strong>Efficient API Usage:</strong> Smart character-by-character comparison minimizes
                database queries (typically 1-3 queries per URL)
              </li>
              <li>
                <strong>Future-Proof:</strong> As the database grows, the algorithm automatically adjusts
                prefix length to maintain uniqueness
              </li>
              <li>
                <strong>Backwards Compatible:</strong> The system still accepts full hex IDs and partial
                prefixes alongside base62 identifiers
              </li>
              <li>
                <strong>URL-Safe:</strong> Base62 encoding produces alphanumeric-only strings that work
                everywhere without escaping
              </li>
            </ul>
          </div>

          <div class="cta-section">
            <h2>Try It Yourself</h2>
            <p style="margin-bottom: 1.5rem;">
              Experience the compression in action by shortening your own Intuition URLs.
            </p>
            <a href="/" class="btn">
              Shorten a URL
            </a>
            <a href="https://portal.intuition.systems" class="btn btn-secondary">
              Visit Intuition Portal
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}

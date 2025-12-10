import type { FC } from 'hono/jsx'

interface AboutPageProps {
  hostname: string
}

export const AboutPage: FC<AboutPageProps> = ({ hostname }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>How It Works - Intuition URL Shortener</title>
        <meta
          name="description"
          content="Learn how Intuition's URL shortener works using shortest prefix algorithm and base62 encoding for maximum compression."
        />
        <link rel="stylesheet" href="/styles/output.css" />
      </head>
      <body className="p-8 sm:p-6 min-h-screen">
        <div className="container max-w-[720px] mx-auto animate-fade-in-up">
          <h1 className="text-4xl sm:text-3xl font-bold leading-tight text-text-primary text-center m-0 mb-6 tracking-tight">
            How Link Shortening Works
          </h1>
          <p className="text-xl sm:text-lg leading-snug text-text-secondary text-center m-0 mb-16 sm:mb-12 font-normal">
            We compress 256-bit blockchain IDs into 3-character URLs using shortest-prefix detection and base62 encoding.
          </p>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-6 tracking-tight">
              Why 64-Character URLs Don't Work
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-6">
              Intuition protocol uses 256-bit hexadecimal identifiers for atoms, triples, and lists.
              These IDs are <span className="text-brand-primary font-medium">64 characters long</span>, making them impractical
              for sharing on social media or messaging platforms.
            </p>
            <div className="bg-bg-code border border-border-base rounded-md p-4 mb-6 overflow-x-auto">
              <code className="text-sm font-mono text-text-code break-all">0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
            </div>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0">
              Our solution: A two-stage algorithm that achieves <span className="text-success font-medium">~95% compression</span> while
              maintaining uniqueness and readability.
            </p>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-8 tracking-tight">
              The Two-Stage Algorithm
            </h2>

            <div className="bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 transition-colors duration-base hover:border-border-hover">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-lg flex-shrink-0">
                  1
                </span>
                <h3 className="text-xl font-semibold text-text-primary m-0">Find Shortest Unique Prefix</h3>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0 mb-4">
                Instead of using the full 64-character ID, we find the <strong className="text-text-primary">shortest prefix</strong> that
                uniquely identifies the term in the Intuition database.
              </p>
              <div className="bg-bg-code border border-border-base rounded-md p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono text-text-code block mb-2">Full ID:  0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
                <code className="text-sm font-mono text-text-code block">Shortest: 0x8c48</code>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0">
                The algorithm uses smart collision detection: it starts with a 2-character prefix and
                increments by 2 until it finds a unique match. Most terms need only 4-8 characters.
              </p>
            </div>

            <div className="text-center text-4xl text-brand-primary my-6">↓</div>

            <div className="bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 transition-colors duration-base hover:border-border-hover">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-secondary text-white font-bold text-lg flex-shrink-0">
                  2
                </span>
                <h3 className="text-xl font-semibold text-text-primary m-0">Compress with Base62</h3>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0 mb-4">
                We convert the shortest hex prefix to <strong className="text-text-primary">base62</strong> (using 0-9, A-Z, a-z)
                for maximum URL density.
              </p>
              <div className="bg-bg-code border border-border-base rounded-md p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono text-text-code block mb-2">Hex:    0x8c48  (4 characters)</code>
                <code className="text-sm font-mono text-text-code block">Base62: 9LE     (3 characters)</code>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0">
                Base62 uses the full alphanumeric character set, resulting in shorter URLs that are
                still easy to read and share.
              </p>
            </div>

            <div className="text-center text-4xl text-brand-primary my-6">↓</div>

            <div className="bg-bg-elevated border border-brand-primary/30 rounded-lg p-6 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Final Result</div>
              <div className="text-2xl sm:text-xl font-mono font-semibold text-brand-primary mb-3 break-all">
                {hostname}/9LE
              </div>
              <span className="inline-block px-3 py-1 bg-success-10 border border-success-30 rounded-md text-success text-sm font-medium">
                95% shorter
              </span>
            </div>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-8 tracking-tight">
              Live Examples
            </h2>

            <h3 className="text-lg font-semibold text-text-primary m-0 mb-4">Atom</h3>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
              <div className="text-sm font-mono text-text-secondary break-all">
                portal.intuition.systems/explore/atom/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e
              </div>
            </div>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
              <div className="text-base font-mono font-medium text-brand-primary">{hostname}/9LE</div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary m-0 mb-4">Triple</h3>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
              <div className="text-sm font-mono text-text-secondary break-all">
                portal.intuition.systems/explore/triple/0xa1739235f5a8362b15268eab46484abdd7660a1e2a6a5d7deacbed9d4c055e68
              </div>
            </div>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
              <div className="text-base font-mono font-medium text-brand-primary">{hostname}/Akd</div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary m-0 mb-4">List</h3>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
              <div className="text-sm font-mono text-text-secondary break-all">
                portal.intuition.systems/explore/list/0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5-0xc2bd74b8b79a52c311e2adcfe3739db273c4c5df1168dd5f30471998877dd784
              </div>
            </div>
            <div className="bg-bg-card border border-border-base rounded-lg p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
              <div className="text-base font-mono font-medium text-brand-primary mb-2">{hostname}/8RP/Cy5</div>
              <p className="text-sm text-text-tertiary m-0">
                Lists use two short IDs (predicate and object) separated by a slash
              </p>
            </div>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-6 tracking-tight">
              Social Media Features
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-6">
              Beyond just shortening URLs, our service optimizes links for social media sharing:
            </p>
            <ul className="space-y-4 list-none pl-0 m-0">
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Rich Previews:</strong> Open Graph and Twitter Card meta tags ensure beautiful
                link previews with images, titles, and descriptions
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Auto-Detection:</strong> The system identifies whether a link is an
                atom, triple, or list and generates appropriate metadata
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Custom Images:</strong> List URLs display custom preview images generated
                from the predicate and object terms
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Fast Redirects:</strong> Users are automatically redirected to the full
                Intuition Portal after the preview loads
              </li>
            </ul>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-6 tracking-tight">
              Key Advantages
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-6">This approach offers several important benefits:</p>
            <ul className="space-y-4 list-none pl-0 m-0">
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Minimal Collisions:</strong> The shortest prefix algorithm ensures uniqueness
                while maximizing compression
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Efficient Queries:</strong> Smart character-by-character comparison minimizes
                database queries (typically 1-3 queries per URL)
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Future-Proof:</strong> As the database grows, the algorithm automatically adjusts
                prefix length to maintain uniqueness
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">Backwards Compatible:</strong> The system still accepts full hex IDs and partial
                prefixes alongside base62 identifiers
              </li>
              <li className="text-base leading-relaxed text-text-secondary">
                <strong className="text-text-primary">URL-Safe:</strong> Base62 encoding produces alphanumeric-only strings that work
                everywhere without escaping
              </li>
            </ul>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-6 tracking-tight">
              Developer API
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-8">
              In addition to the web interface, we provide REST API endpoints for programmatic access.
              These endpoints return shortened URLs as plain text, making them ideal for integration
              with other services and automation workflows.
            </p>

            <h3 className="text-lg font-semibold text-text-primary m-0 mb-4">Term Shortening API</h3>
            <div className="bg-bg-code border border-border-base rounded-md p-4 mb-4 overflow-x-auto">
              <code className="text-sm font-mono text-text-code">GET /api/short/term/:termId</code>
            </div>
            <p className="text-base leading-relaxed text-text-secondary m-0 mb-6">
              Accepts hex IDs (full or partial) or base62 IDs. Returns the shortened URL as plain text.
            </p>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Example Request</div>
              <div className="bg-bg-code border border-border-base rounded-md p-3 mb-4">
                <code className="text-sm font-mono text-text-code">curl {hostname}/api/short/term/0x8c486fd3377</code>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Response</div>
              <div className="bg-bg-code border border-border-base rounded-md p-3">
                <code className="text-sm font-mono text-text-code">{hostname}/9LE</code>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text-primary m-0 mb-4">List Shortening API</h3>
            <div className="bg-bg-code border border-border-base rounded-md p-4 mb-4 overflow-x-auto">
              <code className="text-sm font-mono text-text-code">GET /api/short/list/:predicateTermId/:objectTermId</code>
            </div>
            <p className="text-base leading-relaxed text-text-secondary m-0 mb-6">
              Accepts hex IDs or base62 IDs for both the predicate and object terms.
            </p>
            <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Example Request</div>
              <div className="bg-bg-code border border-border-base rounded-md p-3 mb-4">
                <code className="text-sm font-mono text-text-code">curl {hostname}/api/short/list/8RP/9Vk</code>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Response</div>
              <div className="bg-bg-code border border-border-base rounded-md p-3">
                <code className="text-sm font-mono text-text-code">{hostname}/8RP/9Vk</code>
              </div>
            </div>

            <p className="text-base leading-relaxed text-text-secondary m-0">
              <strong className="text-text-primary">API Features:</strong> Format detection, plain text response, error handling,
              and parallel processing for optimal performance.
            </p>
          </div>

          <div className="bg-bg-card border border-border-base rounded-lg p-8 sm:p-6 text-center">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-4">
              Try It Yourself
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-8">
              Experience the compression in action by shortening your own Intuition URLs.
            </p>
            <div className="flex gap-4 justify-center sm:flex-col">
              <a
                href="/"
                className="btn-gradient-hover inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-base font-semibold bg-brand-primary rounded-md text-white no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:shadow-focus focus-visible:shadow-md sm:w-full"
              >
                <span className="relative z-10">Shorten a URL</span>
              </a>
              <a
                href="https://portal.intuition.systems"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-base font-medium bg-transparent border border-border-base rounded-md text-text-secondary no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-5 focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 sm:w-full"
              >
                Browse Portal
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

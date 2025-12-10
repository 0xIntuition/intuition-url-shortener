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
      <body className="p-8 sm:p-6 min-h-screen bg-gradient-radial">
        <div className="container max-w-[720px] mx-auto animate-fade-in-up">
          <h1 className="text-4xl sm:text-3xl font-bold leading-tight text-text-primary text-center m-0 mb-6 tracking-tighter">
            How Link Shortening Works
          </h1>
          <p className="text-xl sm:text-lg leading-snug text-text-secondary text-center m-0 mb-12 sm:mb-10 font-normal">
            We compress 256-bit blockchain IDs into 3-character URLs using shortest-prefix detection and base62 encoding.
          </p>

          {/* TL;DR Summary Box */}
          <div className="bg-bg-elevated border border-brand-primary-30 rounded-lg p-6 sm:p-5 mb-16 sm:mb-12 shadow-glow-blue">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h2 className="text-xl font-bold text-text-primary m-0">TL;DR</h2>
            </div>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="px-3 py-1.5 bg-brand-primary-10 border border-brand-primary-30 rounded-md text-brand-blue text-sm font-semibold">
                95% compression
              </span>
              <span className="px-3 py-1.5 bg-brand-primary-10 border border-brand-primary-30 rounded-md text-brand-blue text-sm font-semibold">
                Zero collisions
              </span>
            </div>
            <p className="text-base leading-relaxed text-text-secondary m-0">
              Our two-stage algorithm finds the shortest unique hexadecimal prefix for each ID, then compresses it to base62.
              This creates URLs like <code className="font-mono text-brand-blue bg-bg-code px-2 py-0.5 rounded">{hostname}/9LE</code> that
              are 95% shorter than full blockchain identifiers while maintaining perfect uniqueness through creation-date sorting.
            </p>
          </div>

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

            <div className="border-accent-gradient bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 shadow-card transition-all duration-base hover:border-border-hover hover:shadow-card-hover">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-blue-light text-white font-bold text-lg flex-shrink-0">
                  1
                </span>
                <h3 className="text-xl font-semibold text-text-primary m-0 tracking-tight">Find Shortest Unique Prefix</h3>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0 mb-4">
                Instead of using the full 64-character ID, we find the <strong className="text-text-primary">shortest prefix</strong> that
                uniquely identifies the term in the Intuition database.
              </p>
              <div className="bg-bg-code border border-border-base rounded-md p-4 mb-4 overflow-x-auto">
                <code className="text-sm font-mono text-text-code block mb-2">Full ID:  0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
                <code className="text-sm font-mono text-text-code block">Shortest: 0x8c48</code>
              </div>
              <p className="text-base leading-relaxed text-text-secondary m-0 mb-4">
                The algorithm uses smart collision detection: it starts with a 2-character prefix and
                increments by 2 until it finds a unique match. Most terms need only 4-8 characters.
              </p>

              <div className="bg-bg-elevated border border-border-base rounded-md p-4 mt-4">
                <h4 className="text-base font-semibold text-text-primary m-0 mb-3">How Creation Date Ensures Uniqueness</h4>
                <p className="text-sm leading-relaxed text-text-secondary m-0 mb-3">
                  When multiple terms share the same starting characters, the system uses <strong className="text-text-primary">creation date sorting</strong> to
                  determine which term gets the shorter ID. Terms are sorted by when they were created (oldest first), ensuring:
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-text-secondary m-0 mb-3 pl-4">
                  <li><strong className="text-text-primary">Older terms get shorter IDs:</strong> The first term created with a prefix claims that short ID</li>
                  <li><strong className="text-text-primary">Newer terms need longer prefixes:</strong> Later terms with similar starting characters require more characters to differentiate</li>
                  <li><strong className="text-text-primary">Deterministic behavior:</strong> The same prefix always resolves to the same (oldest) term</li>
                </ul>

                <div className="bg-bg-code border border-border-base rounded-md p-3 overflow-x-auto">
                  <code className="text-xs font-mono text-text-code block mb-1">// Example collision scenario</code>
                  <code className="text-xs font-mono text-text-code block mb-1">Term A (created Jan 1, 2024): 0x8c486fd3377cef67861f7137bcc89b188c7f1781...</code>
                  <code className="text-xs font-mono text-text-code block mb-1">Term B (created Feb 15, 2024): 0x8c489a2b5d8e1f47c2d3b8f4e9a1c5d7f2b6a4e8...</code>
                  <code className="text-xs font-mono text-text-code block mb-3">                                      ^ Differ at position 5</code>
                  <code className="text-xs font-mono text-success block mb-1">Short ID for Term A: 0x8c486f → 9LKx (6 chars)</code>
                  <code className="text-xs font-mono text-success block">Short ID for Term B: 0x8c489a → 9LMp (6 chars)</code>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary m-0 mt-3">
                  If you try to shorten a newer term that shares a prefix with an older term, the algorithm will detect the collision
                  and return a longer prefix to ensure the URL uniquely identifies the correct term.
                </p>
              </div>
            </div>

            <div className="text-center my-8">
              <div className="inline-block text-4xl text-gradient font-bold">↓</div>
            </div>

            <div className="border-accent-gradient bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 shadow-card transition-all duration-base hover:border-border-hover hover:shadow-card-hover">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-purple-deep text-white font-bold text-lg flex-shrink-0">
                  2
                </span>
                <h3 className="text-xl font-semibold text-text-primary m-0 tracking-tight">Compress with Base62</h3>
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

            <div className="text-center my-8">
              <div className="inline-block text-4xl text-gradient font-bold">↓</div>
            </div>

            <div className="bg-bg-elevated border border-brand-primary-30 rounded-lg p-6 text-center shadow-glow-blue">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Final Result</div>
              <div className="text-2xl sm:text-xl font-mono font-semibold text-gradient mb-3 break-all">
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

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Atom Example */}
              <div>
                <h3 className="text-xl font-semibold text-text-primary m-0 mb-4 tracking-tight">Atom</h3>
                <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
                  <div className="text-sm font-mono text-text-secondary break-all overflow-x-auto">
                    portal.intuition.systems/explore/atom/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e
                  </div>
                </div>
                <div className="bg-bg-card border border-border-base rounded-lg p-4 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
                  <div className="text-lg font-mono font-semibold text-gradient">{hostname}/9LE</div>
                </div>
              </div>

              {/* Triple Example */}
              <div>
                <h3 className="text-xl font-semibold text-text-primary m-0 mb-4 tracking-tight">Triple</h3>
                <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
                  <div className="text-sm font-mono text-text-secondary break-all overflow-x-auto">
                    portal.intuition.systems/explore/triple/0xa1739235f5a8362b15268eab46484abdd7660a1e2a6a5d7deacbed9d4c055e68
                  </div>
                </div>
                <div className="bg-bg-card border border-border-base rounded-lg p-4 shadow-card">
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
                  <div className="text-lg font-mono font-semibold text-gradient">{hostname}/Akd</div>
                </div>
              </div>
            </div>

            {/* List Example - Full Width */}
            <div>
              <h3 className="text-xl font-semibold text-text-primary m-0 mb-4 tracking-tight">List</h3>
              <div className="bg-bg-card border border-border-base rounded-lg p-4 mb-3 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">Before</div>
                <div className="text-sm font-mono text-text-secondary break-all overflow-x-auto">
                  portal.intuition.systems/explore/list/0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5-0xc2bd74b8b79a52c311e2adcfe3739db273c4c5df1168dd5f30471998877dd784
                </div>
              </div>
              <div className="bg-bg-card border border-border-base rounded-lg p-4 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2">After</div>
                <div className="text-lg font-mono font-semibold text-gradient mb-2">{hostname}/8RP/Cy5</div>
                <p className="text-sm text-text-tertiary m-0">
                  Lists use two short IDs (predicate and object) separated by a slash
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16 sm:mb-12">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-8 tracking-tight">
              Deep Dive: How the Algorithm Works
            </h2>

            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-6">
              Understanding the exact mechanics of prefix finding and collision resolution helps explain
              why some URLs are shorter than others.
            </p>

            <div className="border-accent-gradient bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 shadow-card">
              <h3 className="text-lg font-semibold text-text-primary m-0 mb-4 tracking-tight">Step-by-Step Algorithm Flow</h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue-light text-white font-bold text-sm flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-base font-semibold text-text-primary m-0 mb-1">Start with shortest prefix (2 characters)</p>
                    <p className="text-sm text-text-secondary m-0">Extract first 2 hex characters after "0x" (e.g., <code className="text-brand-blue bg-bg-code px-1.5 py-0.5 rounded font-mono text-sm">0x8c</code>)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-sm flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-base font-semibold text-text-primary m-0 mb-1">Query database with wildcard</p>
                    <p className="text-sm text-text-secondary m-0 mb-2">Search for all IDs matching <code className="text-brand-blue bg-bg-code px-1.5 py-0.5 rounded font-mono text-sm">0x8c%</code> (LIKE operator)</p>
                    <p className="text-sm text-text-secondary m-0">Results are sorted by <code className="text-brand-blue bg-bg-code px-1.5 py-0.5 rounded font-mono text-sm">created_at: asc</code> (oldest first)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-white font-bold text-sm flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-base font-semibold text-text-primary m-0 mb-1">Check first result</p>
                    <p className="text-sm text-text-secondary m-0">If first result matches your target ID → Success! Use this prefix</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple-light text-white font-bold text-sm flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="text-base font-semibold text-text-primary m-0 mb-1">Handle collision (first result is different)</p>
                    <p className="text-sm text-text-secondary m-0 mb-2">Compare character-by-character to find where they differ</p>
                    <p className="text-sm text-text-secondary m-0">Jump directly to the needed prefix length (smart optimization)</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple-deep text-white font-bold text-sm flex-shrink-0 mt-0.5">5</span>
                  <div>
                    <p className="text-base font-semibold text-text-primary m-0 mb-1">Repeat until unique</p>
                    <p className="text-sm text-text-secondary m-0">Continue with longer prefixes until finding one that uniquely identifies your term as the first result</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-accent-gradient bg-bg-card border border-border-base rounded-lg p-6 sm:p-5 mb-6 shadow-card">
              <h3 className="text-lg font-semibold text-text-primary m-0 mb-4 tracking-tight">Real-World Example Scenarios</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-success-10 border border-success-30 rounded text-success text-xs font-semibold">SCENARIO 1</span>
                    <span className="text-sm font-medium text-text-primary">Unique Early Prefix (Ideal Case)</span>
                  </div>
                  <div className="bg-bg-code border border-border-base rounded-md p-3 mb-2">
                    <code className="text-xs font-mono text-text-code block">Your term: 0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 1:</strong> Search <code className="text-text-code">0x8c%</code> → Returns 5 results, first one is <code className="text-text-code">0x8c48...</code> (different term)
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 2:</strong> Smart jump to <code className="text-text-code">0x8c48%</code> → Returns 1 result matching your term
                  </div>
                  <div className="bg-success-10 border border-success-30 rounded-md p-3 mt-2">
                    <code className="text-xs font-mono text-success block mb-1">Result: 0x8c48 (4 characters)</code>
                    <code className="text-xs font-mono text-success block">Base62: 9LE (3 characters)</code>
                    <code className="text-xs font-mono text-success block">Final URL: {hostname}/9LE</code>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-warning-10 border border-warning-30 rounded text-warning text-xs font-semibold">SCENARIO 2</span>
                    <span className="text-sm font-medium text-text-primary">Early Collision (Newer Term)</span>
                  </div>
                  <div className="bg-bg-code border border-border-base rounded-md p-3 mb-2">
                    <code className="text-xs font-mono text-text-code block mb-1">Older term (Jan 2024): 0x7a3b9c2d8f1e4a6b5c9d2e8f1a3b7c4d9e2f8a1b6c3d7e9f2a5b8c1d4e7f9a2b</code>
                    <code className="text-xs font-mono text-text-code block">Your term (Mar 2024): 0x7a3b9c5a1f2e3d4c5b6a7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a</code>
                    <code className="text-xs font-mono text-text-code block mt-1">                            ^</code>
                    <code className="text-xs font-mono text-text-code block">                    Differ at position 7</code>
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 1:</strong> Search <code className="text-text-code">0x7a%</code> → Returns older term first (created earlier)
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 2:</strong> Smart jump to <code className="text-text-code">0x7a3b9c2d%</code> → Older term still appears first
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 3:</strong> Use <code className="text-text-code">0x7a3b9c5a%</code> → Your term appears first!
                  </div>
                  <div className="bg-warning-10 border border-warning-30 rounded-md p-3 mt-2">
                    <code className="text-xs font-mono text-warning block mb-1">Result: 0x7a3b9c5a (8 characters)</code>
                    <code className="text-xs font-mono text-warning block">Base62: 2Gf9Jm (6 characters)</code>
                    <code className="text-xs font-mono text-warning block">Final URL: {hostname}/2Gf9Jm</code>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-brand-primary-10 border border-brand-primary-30 rounded text-brand-primary text-xs font-semibold">SCENARIO 3</span>
                    <span className="text-sm font-medium text-text-primary">Medium Collision (Mid-Length Prefix)</span>
                  </div>
                  <div className="bg-bg-code border border-border-base rounded-md p-3 mb-2">
                    <code className="text-xs font-mono text-text-code block mb-1">Older term (Feb 2024): 0xa1739235f5a8362b15268eab46484abdd7660a1e2a6a5d7deacbed9d4c055e68</code>
                    <code className="text-xs font-mono text-text-code block">Your term (Apr 2024): 0xa1739235f5a8362b15268fab72b9c3d5e8f1a2b6c4d7e9f3a5b8c2d6e1f4a7b9c</code>
                    <code className="text-xs font-mono text-text-code block mt-1">                                              ^</code>
                    <code className="text-xs font-mono text-text-code block">                                    Differ at position 26</code>
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 1:</strong> Search <code className="text-text-code">0xa1%</code> → Older term appears first
                  </div>
                  <div className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Query 2:</strong> Smart jump to position 26, use <code className="text-text-code">0xa1739235f5a8362b15268f</code> prefix → Your term appears first!
                  </div>
                  <div className="bg-brand-primary-10 border border-brand-primary-30 rounded-md p-3 mt-2">
                    <code className="text-xs font-mono text-brand-primary block mb-1">Result: 0xa1739235f5a8362b15268f (26 chars)</code>
                    <code className="text-xs font-mono text-brand-primary block">Base62: 7kNmQxDwFpHr (12 characters)</code>
                    <code className="text-xs font-mono text-brand-primary block">Final URL: {hostname}/7kNmQxDwFpHr</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-base rounded-lg p-5">
              <h3 className="text-base font-semibold text-text-primary m-0 mb-3">Key Takeaway</h3>
              <p className="text-sm leading-relaxed text-text-secondary m-0 mb-3">
                The length of your shortened URL depends on <strong className="text-text-primary">when your term was created</strong> and
                <strong className="text-text-primary"> how similar its ID is</strong> to older terms. This is why:
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-text-secondary m-0 pl-4">
                <li>Terms with unique early hex patterns get very short URLs (3-6 characters)</li>
                <li>Terms sharing longer prefixes with older terms need proportionally longer URLs (typically 6-20 characters)</li>
                <li>The same short URL always resolves to the same term (deterministic behavior)</li>
                <li>Most URLs achieve 80-95% compression despite this collision handling</li>
              </ul>
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
                <code className="text-sm font-mono text-text-code overflow-x-auto">curl {hostname}/api/short/term/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e</code>
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
                <code className="text-sm font-mono text-text-code overflow-x-auto">curl {hostname}/api/short/list/0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5/0x8ed4f8de1491e074fa188b5c679ee45c657e0802c186e3bb45a4d3f3faa6d426</code>
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

          <div className="bg-bg-elevated border border-brand-primary-30 rounded-lg p-8 sm:p-6 text-center shadow-glow-blue">
            <h2 className="text-2xl sm:text-xl font-bold leading-tight text-text-primary m-0 mb-4 tracking-tight">
              Try It Yourself
            </h2>
            <p className="text-lg sm:text-base leading-relaxed text-text-secondary m-0 mb-8">
              Experience the compression in action by shortening your own Intuition URLs.
            </p>
            <div className="flex gap-4 justify-center sm:flex-col">
              <a
                href="/"
                className="btn-gradient-hover inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-base font-semibold bg-brand-primary rounded-md text-white no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:shadow-focus-refined sm:w-full"
              >
                <span className="relative z-10">Shorten a URL</span>
              </a>
              <a
                href="https://portal.intuition.systems"
                className="inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-base font-medium bg-transparent border border-border-base rounded-md text-text-secondary no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-5 hover:shadow-card focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 sm:w-full"
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

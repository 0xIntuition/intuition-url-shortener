// Route handler for URL shortening form submission
import { Hono } from 'hono'
import { fetchTerm } from '../services/graphql.js'
import { extractIdFromUrl } from '../utils/urlParser.js'
import { extractMetadata } from '../utils/metadata.js'
import { PreviewPage } from '../components/PreviewPage.js'
import { ErrorPage } from '../components/ErrorPage.js'
import { hexToBase62 } from '../utils/base62.js'
import { findShortestPrefix } from '../utils/prefixFinder.js'

export const shortenerRoute = new Hono()

// Custom error page component for invalid URLs
const InvalidUrlPage = () => (
  <html lang="en" data-theme="dark">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
      <title>Invalid URL | Intuition</title>

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
        <h1>Invalid URL</h1>
        <p>Could not extract a valid ID from the provided URL. Please paste a valid Intuition Portal URL.</p>
        <a href="/">Go Back</a>
      </div>
    </body>
  </html>
)

shortenerRoute.post('/', async (c) => {
  // Parse form data
  const formData = await c.req.formData()
  const url = formData.get('url')

  console.log(`Processing shortener request for URL: ${url}`)

  // Validate input
  if (!url || typeof url !== 'string') {
    console.log('No URL provided in form submission')
    return c.html(<InvalidUrlPage />, 400)
  }

  // Extract ID from URL
  const id = extractIdFromUrl(url)

  if (!id) {
    console.log(`Could not extract ID from URL: ${url}`)
    return c.html(<InvalidUrlPage />, 400)
  }

  console.log(`Extracted ID: ${id}`)

  // Fetch data from GraphQL
  const data = await fetchTerm(id)

  // Check for no results
  if (!data?.terms || data.terms.length === 0) {
    console.log(`No term found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  // Check for ambiguous match (multiple results)
  if (data.terms.length > 1) {
    console.log(`Ambiguous match: ${data.terms.length} results found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  const term = data.terms[0]

  // Extract metadata with automatic type detection
  const metadata = extractMetadata(term)

  // Check for malformed data (neither atom nor triple)
  if (!metadata) {
    console.log(`Malformed term data: neither atom nor triple found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  // Find shortest unique prefix
  const fullId = term.id
  console.log(`Finding shortest unique prefix for ID: ${fullId}`)

  const shortestPrefix = await findShortestPrefix(fullId)
  console.log(`Shortest prefix found: ${shortestPrefix} (${shortestPrefix.length - 2} chars)`)

  // Encode the shortest prefix to base62
  const base62Id = hexToBase62(shortestPrefix)
  console.log(`Encoded hex ${shortestPrefix} → base62 ${base62Id}`)

  // Generate short URL using base62 ID
  const baseUrl = new URL(c.req.url).origin
  const shortUrl = `${baseUrl}/${base62Id}`

  // Determine type for logging
  const termType = term.atom ? 'atom' : 'triple'
  console.log(`Generated base62 short URL for ${termType}: ${shortUrl}`)

  return c.html(
    <PreviewPage
      {...metadata}
      shortUrl={shortUrl}
    />
  )
})

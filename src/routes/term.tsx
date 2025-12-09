// Unified route handler for /:id (atoms and triples)
import { Hono } from 'hono'
import { fetchTerm } from '../services/graphql.js'
import { extractMetadata } from '../utils/metadata.js'
import { RedirectPage } from '../components/RedirectPage.js'
import { ErrorPage } from '../components/ErrorPage.js'

export const termRoute = new Hono()

termRoute.get('/:id', async (c) => {
  const id = c.req.param('id')

  console.log(`Processing term request for ID: ${id}`)

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

  // Determine type for logging
  const termType = term.atom ? 'atom' : 'triple'
  console.log(`Rendering ${termType} page for: ${metadata.title}`)

  return c.html(<RedirectPage {...metadata} />)
})

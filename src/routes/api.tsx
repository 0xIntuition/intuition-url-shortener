// API route handlers that return plain text shortened URLs
import { Hono } from 'hono'
import { shortenTermId, shortenListIds } from '../utils/shortener.js'

export const apiRoute = new Hono()

/**
 * GET /short/term/:termId
 * Returns shortened URL as plain text for a single term (atom or triple)
 * Accepts both hex and base62 IDs
 */
apiRoute.get('/short/term/:termId', async (c) => {
  const termId = c.req.param('termId')

  console.log(`API request: shorten term ${termId}`)

  // Get base URL from request
  const baseUrl = new URL(c.req.url).origin

  // Call shared shortening utility
  const result = await shortenTermId(termId, baseUrl)

  if (!result) {
    console.log(`Failed to shorten term: ${termId}`)
    return c.text('Error: Term not found', 404)
  }

  console.log(`API response: ${result.shortUrl}`)
  return c.text(result.shortUrl, 200)
})

/**
 * GET /short/list/:predicateTermId/:objectTermId
 * Returns shortened URL as plain text for a list with two terms
 * Accepts both hex and base62 IDs for both parameters
 */
apiRoute.get('/short/list/:predicateTermId/:objectTermId', async (c) => {
  const predicateTermId = c.req.param('predicateTermId')
  const objectTermId = c.req.param('objectTermId')

  console.log(`API request: shorten list ${predicateTermId}/${objectTermId}`)

  // Get base URL from request
  const baseUrl = new URL(c.req.url).origin

  // Call shared shortening utility
  const result = await shortenListIds(predicateTermId, objectTermId, baseUrl)

  if (!result) {
    console.log(`Failed to shorten list: ${predicateTermId}/${objectTermId}`)
    // More specific error message would require additional checks
    return c.text('Error: One or both terms not found', 404)
  }

  console.log(`API response: ${result.shortUrl}`)
  return c.text(result.shortUrl, 200)
})

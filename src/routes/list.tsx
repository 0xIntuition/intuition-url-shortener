// Route handler for /:predicateId/:objectId (list URLs)
import { Hono } from 'hono'
import { fetchTerm } from '../services/graphql.js'
import { extractMetadata } from '../utils/metadata.js'
import { RedirectPage } from '../components/RedirectPage.js'
import { ErrorPage } from '../components/ErrorPage.js'
import { base62ToHex } from '../utils/base62.js'
import { detectIdFormat } from '../utils/idDetector.js'

export const listRoute = new Hono()

listRoute.get('/:predicateId/:objectId', async (c) => {
  const rawPredicateId = c.req.param('predicateId')
  const rawObjectId = c.req.param('objectId')

  console.log(`Processing list request - Predicate: ${rawPredicateId}, Object: ${rawObjectId}`)

  // Detect ID formats and decode if needed
  const predicateFormat = detectIdFormat(rawPredicateId)
  const objectFormat = detectIdFormat(rawObjectId)

  if (predicateFormat === 'invalid') {
    console.log(`Invalid predicate ID format: ${rawPredicateId}`)
    return c.html(<ErrorPage />, 404)
  }

  if (objectFormat === 'invalid') {
    console.log(`Invalid object ID format: ${rawObjectId}`)
    return c.html(<ErrorPage />, 404)
  }

  let predicateHexId: string
  let objectHexId: string

  // Decode predicate ID if base62
  if (predicateFormat === 'base62') {
    try {
      predicateHexId = base62ToHex(rawPredicateId)
      console.log(`Decoded predicate base62 ${rawPredicateId} → hex ${predicateHexId}`)
    } catch (error) {
      console.error(`Predicate base62 decode error:`, error)
      return c.html(<ErrorPage />, 404)
    }
  } else {
    predicateHexId = rawPredicateId
  }

  // Decode object ID if base62
  if (objectFormat === 'base62') {
    try {
      objectHexId = base62ToHex(rawObjectId)
      console.log(`Decoded object base62 ${rawObjectId} → hex ${objectHexId}`)
    } catch (error) {
      console.error(`Object base62 decode error:`, error)
      return c.html(<ErrorPage />, 404)
    }
  } else {
    objectHexId = rawObjectId
  }

  // Fetch both terms from GraphQL
  const [predicateData, objectData] = await Promise.all([
    fetchTerm(predicateHexId),
    fetchTerm(objectHexId)
  ])

  // Validate both terms exist
  if (!predicateData?.terms || predicateData.terms.length === 0) {
    console.log(`No predicate term found for ID: ${predicateHexId}`)
    return c.html(<ErrorPage />, 404)
  }

  if (!objectData?.terms || objectData.terms.length === 0) {
    console.log(`No object term found for ID: ${objectHexId}`)
    return c.html(<ErrorPage />, 404)
  }

  const predicateTerm = predicateData.terms[0]
  const objectTerm = objectData.terms[0]

  // Extract object metadata (use object term for title/description)
  const objectMetadata = extractMetadata(objectTerm)

  if (!objectMetadata) {
    console.log(`Malformed object term data for ID: ${objectHexId}`)
    return c.html(<ErrorPage />, 404)
  }

  // Generate list image URL with full hex IDs
  const listImageUrl = `http://portal.intuition.systems/resources/list-image?id=${predicateTerm.id}-${objectTerm.id}`

  // Generate redirect URL with full hex IDs
  const redirectUrl = `https://portal.intuition.systems/explore/list/${predicateTerm.id}-${objectTerm.id}`

  console.log(`Rendering list page with object title: ${objectMetadata.title}`)
  console.log(`List image URL: ${listImageUrl}`)
  console.log(`Redirect URL: ${redirectUrl}`)

  return c.html(
    <RedirectPage
      title={objectMetadata.title}
      description={objectMetadata.description}
      imageUrl={listImageUrl}
      url={redirectUrl}
    />
  )
})

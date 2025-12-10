// Shared URL shortening utilities
// Centralizes shortening logic for both form handler and API endpoints

import { fetchTerm } from '../services/graphql.js'
import { findShortestPrefix } from './prefixFinder.js'
import { hexToBase62, base62ToHex } from './base62.js'
import { detectIdFormat } from './idDetector.js'

// Result types for shortening operations
export interface TermShortUrlResult {
  type: 'term'
  shortUrl: string
  base62Id: string
  hexPrefix: string
  fullId: string
}

export interface ListShortUrlResult {
  type: 'list'
  shortUrl: string
  base62PredicateId: string
  base62ObjectId: string
  predicateHexPrefix: string
  objectHexPrefix: string
  predicateFullId: string
  objectFullId: string
}

/**
 * Normalizes a term ID by detecting format and converting base62 to hex if needed
 * @param termId - The term ID (hex or base62)
 * @returns Normalized hex ID or null if invalid
 */
function normalizeTermId(termId: string): string | null {
  const format = detectIdFormat(termId)

  if (format === 'invalid') {
    console.log(`Invalid ID format: ${termId}`)
    return null
  }

  if (format === 'hex') {
    return termId
  }

  // format === 'base62' - decode to hex
  try {
    const hexId = base62ToHex(termId)
    console.log(`Decoded base62 ${termId} → hex ${hexId}`)
    return hexId
  } catch (error) {
    console.error(`Failed to decode base62 ID: ${termId}`, error)
    return null
  }
}

/**
 * Shortens a single term ID (atom or triple)
 * Accepts both hex and base62 IDs, returns shortest URL
 *
 * @param termId - The term ID (hex or base62, full or partial)
 * @param baseUrl - The base URL for the short link (e.g., 'http://localhost:3000')
 * @returns Result with short URL and metadata, or null if term not found
 */
export async function shortenTermId(
  termId: string,
  baseUrl: string
): Promise<TermShortUrlResult | null> {
  console.log(`Shortening term ID: ${termId}`)

  // Normalize ID format (convert base62 to hex if needed)
  const hexId = normalizeTermId(termId)
  if (!hexId) {
    return null
  }

  // Fetch term data from GraphQL
  const data = await fetchTerm(hexId)

  // Check for no results
  if (!data?.terms || data.terms.length === 0) {
    console.log(`No term found for ID: ${hexId}`)
    return null
  }

  // Take first result (oldest by creation date)
  // NOTE: Unlike form handler, we don't enforce uniqueness here
  const term = data.terms[0]
  const fullId = term.id

  console.log(`Found term: ${fullId}`)

  // Find shortest unique prefix
  let shortestPrefix: string
  try {
    shortestPrefix = await findShortestPrefix(fullId)
    console.log(`Shortest prefix: ${shortestPrefix}`)
  } catch (error) {
    console.error(`Failed to find shortest prefix for ${fullId}`, error)
    return null
  }

  // Encode to base62
  let base62Id: string
  try {
    base62Id = hexToBase62(shortestPrefix)
    console.log(`Encoded ${shortestPrefix} → base62 ${base62Id}`)
  } catch (error) {
    console.error(`Failed to encode to base62: ${shortestPrefix}`, error)
    return null
  }

  // Build short URL
  const shortUrl = `${baseUrl}/${base62Id}`

  console.log(`Generated short URL: ${shortUrl}`)

  return {
    type: 'term',
    shortUrl,
    base62Id,
    hexPrefix: shortestPrefix,
    fullId
  }
}

/**
 * Shortens a list URL with predicate and object term IDs
 * Accepts both hex and base62 IDs for both parameters
 *
 * @param predicateId - The predicate term ID (hex or base62)
 * @param objectId - The object term ID (hex or base62)
 * @param baseUrl - The base URL for the short link
 * @returns Result with short URL and metadata, or null if either term not found
 */
export async function shortenListIds(
  predicateId: string,
  objectId: string,
  baseUrl: string
): Promise<ListShortUrlResult | null> {
  console.log(`Shortening list IDs - Predicate: ${predicateId}, Object: ${objectId}`)

  // Normalize both IDs
  const predicateHex = normalizeTermId(predicateId)
  const objectHex = normalizeTermId(objectId)

  if (!predicateHex || !objectHex) {
    console.log('Invalid ID format for one or both list IDs')
    return null
  }

  // Fetch both terms in parallel
  const [predicateData, objectData] = await Promise.all([
    fetchTerm(predicateHex),
    fetchTerm(objectHex)
  ])

  // Validate both terms exist
  if (!predicateData?.terms || predicateData.terms.length === 0) {
    console.log(`No predicate term found for ID: ${predicateHex}`)
    return null
  }

  if (!objectData?.terms || objectData.terms.length === 0) {
    console.log(`No object term found for ID: ${objectHex}`)
    return null
  }

  // Take first result for each (oldest by creation date)
  const predicateTerm = predicateData.terms[0]
  const objectTerm = objectData.terms[0]

  console.log(`Found predicate: ${predicateTerm.id}`)
  console.log(`Found object: ${objectTerm.id}`)

  // Find shortest prefixes in parallel
  let predicatePrefix: string
  let objectPrefix: string

  try {
    [predicatePrefix, objectPrefix] = await Promise.all([
      findShortestPrefix(predicateTerm.id),
      findShortestPrefix(objectTerm.id)
    ])
    console.log(`Predicate prefix: ${predicatePrefix}`)
    console.log(`Object prefix: ${objectPrefix}`)
  } catch (error) {
    console.error('Failed to find shortest prefixes', error)
    return null
  }

  // Encode both to base62
  let base62Predicate: string
  let base62Object: string

  try {
    base62Predicate = hexToBase62(predicatePrefix)
    base62Object = hexToBase62(objectPrefix)
    console.log(`Encoded predicate ${predicatePrefix} → ${base62Predicate}`)
    console.log(`Encoded object ${objectPrefix} → ${base62Object}`)
  } catch (error) {
    console.error('Failed to encode to base62', error)
    return null
  }

  // Build short URL
  const shortUrl = `${baseUrl}/${base62Predicate}/${base62Object}`

  console.log(`Generated list short URL: ${shortUrl}`)

  return {
    type: 'list',
    shortUrl,
    base62PredicateId: base62Predicate,
    base62ObjectId: base62Object,
    predicateHexPrefix: predicatePrefix,
    objectHexPrefix: objectPrefix,
    predicateFullId: predicateTerm.id,
    objectFullId: objectTerm.id
  }
}

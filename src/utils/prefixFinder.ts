// Utility for finding the shortest unique hex prefix for URL shortening
import { fetchTerm } from '../services/graphql.js'

// Configuration constants
const MIN_PREFIX_LEN = 2    // Start with 2 chars after '0x'
const MAX_PREFIX_LEN = 64   // Full hex ID length (after '0x')
const INCREMENT = 2         // Grow by 2 characters each time
const MAX_ATTEMPTS = 32     // Cap at 32 queries (safety limit)

/**
 * Finds the shortest hex prefix that uniquely identifies a term as the first search result
 * Uses smart character comparison to minimize API calls
 *
 * @param targetId - The full hex ID to find shortest prefix for (e.g., '0x8c486fd3377cef67...')
 * @returns Shortest hex prefix (e.g., '0x8c48') or full ID if no unique prefix found
 * @throws Error if targetId is not a valid 64-char hex ID with 0x prefix
 */
export async function findShortestPrefix(targetId: string): Promise<string> {
  // Validate input
  if (!targetId || typeof targetId !== 'string') {
    throw new Error('Target ID must be a non-empty string')
  }

  if (!targetId.startsWith('0x')) {
    throw new Error('Target ID must start with 0x prefix')
  }

  // Accept full 64-char hex ID (0x + 64 hex chars = 66 total)
  if (targetId.length !== 66) {
    throw new Error('Target ID must be full 64-character hex ID (66 chars including 0x prefix)')
  }

  if (!/^0x[a-fA-F0-9]{64}$/.test(targetId)) {
    throw new Error('Target ID must contain only valid hexadecimal characters')
  }

  let currentLength = MIN_PREFIX_LEN
  let attempts = 0
  const startTime = Date.now()

  console.log(`Starting prefix search for ID: ${targetId.slice(0, 16)}...`)

  while (currentLength <= MAX_PREFIX_LEN && attempts < MAX_ATTEMPTS) {
    attempts++

    // Extract current prefix (0x + N chars)
    const prefix = targetId.slice(0, 2 + currentLength)

    console.log(`Attempt ${attempts}: Testing prefix length ${currentLength} chars → ${prefix}`)

    // Query GraphQL with this prefix
    const data = await fetchTerm(prefix)

    // Handle error/null response
    if (!data?.terms || data.terms.length === 0) {
      console.warn(`No results for prefix ${prefix}, falling back to full ID`)
      return targetId
    }

    // Check if first result matches our target ID
    const firstResult = data.terms[0]

    if (firstResult.id === targetId) {
      // SUCCESS: This prefix uniquely identifies our target as the first result
      const timeTaken = Date.now() - startTime
      console.log(`✓ Found unique prefix: ${prefix} (${currentLength} chars, ${attempts} queries, ${timeTaken}ms)`)
      return prefix
    }

    // First result is different - we need a longer prefix
    console.log(`First result is different ID: ${firstResult.id.slice(0, 16)}... (not our target)`)

    // OPTIMIZATION: Calculate exact prefix length needed
    // Compare character-by-character to find where they differ
    const charsNeeded = findDifferencePoint(targetId, firstResult.id)

    if (charsNeeded !== null) {
      // Jump directly to the needed length + 1 (rounded up to next even number)
      const nextLength = Math.ceil((charsNeeded + 1) / 2) * 2

      if (nextLength > currentLength) {
        console.log(`IDs differ at position ${charsNeeded}, jumping from ${currentLength} to ${nextLength} chars`)
        currentLength = nextLength
        continue
      }
    }

    // Fallback: increment by step size
    console.log(`Incrementing prefix length by ${INCREMENT}`)
    currentLength += INCREMENT
  }

  // Exhausted all attempts, return full ID
  const timeTaken = Date.now() - startTime
  console.warn(`Could not find unique prefix after ${attempts} attempts (${timeTaken}ms), using full ID`)
  return targetId
}

/**
 * Finds the character position where two hex IDs differ
 * Compares character-by-character starting after the '0x' prefix
 *
 * @param target - The target ID we want to match
 * @param other - The other ID returned by the query
 * @returns Character position (after '0x') where they differ (0-indexed), or null if identical
 */
function findDifferencePoint(target: string, other: string): number | null {
  // Compare character by character, skipping '0x' prefix
  const minLength = Math.min(target.length, other.length)

  for (let i = 2; i < minLength; i++) {
    if (target[i] !== other[i]) {
      // Return the position after '0x' (so position 2 → returns 0, position 3 → returns 1, etc.)
      return i - 2
    }
  }

  // If we reach here, one string is a prefix of the other, or they're identical
  // This shouldn't happen with distinct IDs, but handle it gracefully
  if (target.length !== other.length) {
    return Math.min(target.length, other.length) - 2
  }

  return null
}

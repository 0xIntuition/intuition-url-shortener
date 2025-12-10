// Utility for parsing IDs from portal URLs

/**
 * Result type for URL parsing
 * - 'term': Single ID (atom or triple)
 * - 'list': Two IDs (predicateId and objectId)
 */
export type ParsedUrl =
  | { type: 'term'; id: string }
  | { type: 'list'; predicateId: string; objectId: string }
  | null

/**
 * Extracts the ID(s) from a portal URL or returns null if no valid ID is found
 * Supports various URL formats including:
 * - https://portal.intuition.systems/explore/atom/{id}?tab=overview
 * - https://portal.intuition.systems/explore/triple/{id}
 * - https://portal.intuition.systems/explore/list/{predicateId}-{objectId}
 * - Any URL containing a 0x-prefixed hexadecimal ID
 * - Plain ID strings (0x...)
 *
 * @param url - The URL or string to extract the ID(s) from
 * @returns ParsedUrl object with type and ID(s), or null if no valid ID found
 */
export function extractIdFromUrl(url: string): ParsedUrl {
  if (!url || typeof url !== 'string') {
    return null
  }

  // Trim whitespace
  url = url.trim()

  // Check for list URL pattern first: /explore/list/{predicateId}-{objectId}
  const listPattern = /\/list\/(0x[a-fA-F0-9]+)-(0x[a-fA-F0-9]+)/i
  const listMatch = url.match(listPattern)
  if (listMatch && listMatch[1] && listMatch[2]) {
    return {
      type: 'list',
      predicateId: listMatch[1].toLowerCase(),
      objectId: listMatch[2].toLowerCase()
    }
  }

  // If the input is already just an ID (starts with 0x), return it as term
  if (/^0x[a-fA-F0-9]{64}$/.test(url)) {
    return { type: 'term', id: url.toLowerCase() }
  }

  // Try to extract ID from various URL formats
  // Pattern matches: /atom/{id}, /triple/{id}, or any 0x-prefixed hex string
  const patterns = [
    // Match /atom/{id} or /triple/{id} patterns
    /\/(?:atom|triple)\/(0x[a-fA-F0-9]+)/i,
    // Match any 0x-prefixed hex string (at least 64 chars for full ID)
    /(0x[a-fA-F0-9]{64,})/i,
    // Match shorter 0x-prefixed hex strings (for prefix matching)
    /(0x[a-fA-F0-9]+)/i
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return { type: 'term', id: match[1].toLowerCase() }
    }
  }

  return null
}

// Utility for parsing IDs from portal URLs

/**
 * Extracts the ID from a portal URL or returns null if no valid ID is found
 * Supports various URL formats including:
 * - https://portal.intuition.systems/explore/atom/{id}?tab=overview
 * - https://portal.intuition.systems/explore/triple/{id}
 * - Any URL containing a 0x-prefixed hexadecimal ID
 * - Plain ID strings (0x...)
 *
 * @param url - The URL or string to extract the ID from
 * @returns The extracted ID or null if no valid ID found
 */
export function extractIdFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  // Trim whitespace
  url = url.trim()

  // If the input is already just an ID (starts with 0x), return it
  if (/^0x[a-fA-F0-9]{64}$/.test(url)) {
    return url.toLowerCase()
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
      return match[1].toLowerCase()
    }
  }

  return null
}

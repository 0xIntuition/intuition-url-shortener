// ID format detection utilities

export type IdFormat = 'base62' | 'hex' | 'invalid'

/**
 * Detects if a string is a valid hex ID (with 0x prefix)
 */
export function isHexId(id: string): boolean {
  // Hex: 0x prefix + hex chars [0-9a-fA-F]
  // Can be partial (for prefix matching) or full (64 chars)
  const hexRegex = /^0x[a-fA-F0-9]+$/
  return hexRegex.test(id)
}

/**
 * Detects if a string is a valid base62 ID
 */
export function isBase62Id(id: string): boolean {
  // Base62: only alphanumeric, case-sensitive, no 0x prefix
  // Must be at least 10 chars to avoid false positives
  const base62Regex = /^[0-9A-Za-z]{10,}$/
  return base62Regex.test(id)
}

/**
 * Detects the ID format and returns metadata
 * Priority: hex > base62 (for backwards compatibility)
 */
export function detectIdFormat(id: string): IdFormat {
  // Check hex first (has 0x prefix)
  if (isHexId(id)) {
    return 'hex'
  }

  // Then check base62 (alphanumeric only)
  if (isBase62Id(id)) {
    return 'base62'
  }

  // Invalid format
  return 'invalid'
}

// Base62 encoding/decoding for URL shortening
// Supports 256-bit hex IDs using BigInt for arbitrary precision

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE = BigInt(62)

/**
 * Validates if a string contains only valid base62 characters
 */
export function isValidBase62(id: string): boolean {
  return /^[0-9A-Za-z]+$/.test(id)
}

/**
 * Encodes a hex ID (0x-prefixed) to base62 string
 * @param hexId - The hex ID to encode (e.g., '0x8c486fd3377cef67...')
 * @returns Base62 encoded string (e.g., '1vJhQxAZN9K3LmP5...')
 * @throws Error if input is not a valid hex ID
 */
export function hexToBase62(hexId: string): string {
  // Validate input
  if (!hexId || typeof hexId !== 'string') {
    throw new Error('Invalid input: hexId must be a non-empty string')
  }

  if (!hexId.startsWith('0x')) {
    throw new Error('Invalid hex ID: must start with 0x prefix')
  }

  if (!/^0x[a-fA-F0-9]+$/.test(hexId)) {
    throw new Error('Invalid hex ID: contains non-hexadecimal characters')
  }

  // Remove '0x' prefix and convert to BigInt
  const hexDigits = hexId.slice(2)
  let num = BigInt('0x' + hexDigits)

  // Handle zero case
  if (num === 0n) {
    return '0'
  }

  // Convert to base62
  let result = ''
  while (num > 0n) {
    const remainder = Number(num % BASE)
    result = ALPHABET[remainder] + result
    num = num / BASE
  }

  return result
}

/**
 * Decodes a base62 string back to hex ID (0x-prefixed)
 * @param base62Id - The base62 string to decode (e.g., '1vJhQxAZN9K3LmP5...')
 * @returns Hex ID with 0x prefix (e.g., '0x8c486fd3377cef67...')
 * @throws Error if input contains invalid base62 characters or decodes to invalid range
 */
export function base62ToHex(base62Id: string): string {
  // Validate input
  if (!base62Id || typeof base62Id !== 'string') {
    throw new Error('Invalid input: base62Id must be a non-empty string')
  }

  if (!isValidBase62(base62Id)) {
    throw new Error('Invalid base62 characters: must contain only alphanumeric characters')
  }

  // Convert from base62 to BigInt
  let num = 0n

  for (const char of base62Id) {
    const index = ALPHABET.indexOf(char)
    if (index === -1) {
      throw new Error(`Invalid base62 character: ${char}`)
    }
    num = num * BASE + BigInt(index)
  }

  // Validate result is within expected range (256 bits)
  const maxValue = BigInt(2) ** BigInt(256) - BigInt(1)
  if (num > maxValue) {
    throw new Error('Decoded value exceeds 256 bits')
  }

  // Convert to hex string without padding (preserves short prefixes)
  // For short prefixes like '9LE' → '0x8c48', we don't want zero-padding
  const hexDigits = num.toString(16)
  return '0x' + hexDigits
}

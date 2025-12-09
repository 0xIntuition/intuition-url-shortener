// Environment variable configuration with validation

export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || 'https://mainnet.intuition.sh/v1/graphql'
export const PORT = parseInt(process.env.PORT || '3000', 10)
export const NODE_ENV = process.env.NODE_ENV || 'development'

// Validation
if (!GRAPHQL_ENDPOINT) {
  throw new Error('GRAPHQL_ENDPOINT environment variable is required')
}

if (isNaN(PORT)) {
  throw new Error('PORT must be a valid number')
}

console.log(`Environment: ${NODE_ENV}`)
console.log(`GraphQL Endpoint: ${GRAPHQL_ENDPOINT}`)
console.log(`Port: ${PORT}`)

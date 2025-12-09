// Node.js server entry point
import { serve } from '@hono/node-server'
import app from './index.js'
import { PORT } from './utils/env.js'

console.log(`🚀 Server starting on port ${PORT}`)
console.log(`📍 Health check: http://localhost:${PORT}/health`)
console.log(`📍 Homepage: http://localhost:${PORT}/`)
console.log(`📍 Term route: http://localhost:${PORT}/:id`)
console.log(`📍 Shortener: POST http://localhost:${PORT}/short`)

serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`✅ Server is running on http://localhost:${PORT}`)

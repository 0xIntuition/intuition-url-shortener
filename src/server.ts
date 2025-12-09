// Node.js server entry point
import { serve } from '@hono/node-server'
import app from './index.js'
import { PORT } from './utils/env.js'

console.log(`🚀 Server starting on port ${PORT}`)
console.log(`📍 Health check: http://localhost:${PORT}/health`)
console.log(`📍 Atom route: http://localhost:${PORT}/atom/:id`)
console.log(`📍 Triple route: http://localhost:${PORT}/triple/:id`)

serve({
  fetch: app.fetch,
  port: PORT
})

console.log(`✅ Server is running on http://localhost:${PORT}`)

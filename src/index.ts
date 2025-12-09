// Main Hono application
import { Hono } from 'hono'
import { atomRoute } from './routes/atom.js'
import { tripleRoute } from './routes/triple.js'
import { errorRoute } from './routes/error.js'

const app = new Hono()

// Health check endpoint
app.get('/', (c) => c.text('Intuition URL Shortener'))
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Main routes
app.route('/atom', atomRoute)
app.route('/triple', tripleRoute)

// 404 handler
app.notFound(errorRoute)

export default app

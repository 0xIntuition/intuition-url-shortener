// Main Hono application
import { Hono } from 'hono'
import { homeRoute } from './routes/home.js'
import { shortenerRoute } from './routes/shortener.js'
import { termRoute } from './routes/term.js'
import { errorRoute } from './routes/error.js'

const app = new Hono()

// Health check endpoint (must be registered before catch-all routes)
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// URL shortener routes (specific routes first)
app.route('/short', shortenerRoute)

// Homepage and term routes
app.route('/', homeRoute)    // Handles GET /
app.route('/', termRoute)     // Handles GET /:id (catch-all for IDs)

// 404 handler
app.notFound(errorRoute)

export default app

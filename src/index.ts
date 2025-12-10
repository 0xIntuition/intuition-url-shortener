// Main Hono application
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { homeRoute } from './routes/home.js'
import { shortenerRoute } from './routes/shortener.js'
import { aboutRoute } from './routes/about.js'
import { listRoute } from './routes/list.js'
import { termRoute } from './routes/term.js'
import { errorRoute } from './routes/error.js'
import { apiRoute } from './routes/api.js'

const app = new Hono()

// Serve static files (CSS)
app.use('/styles/*', serveStatic({ root: './src' }))

// Health check endpoint (must be registered before catch-all routes)
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))

// API routes (specific routes first)
app.route('/api', apiRoute)

// URL shortener routes (specific routes first)
app.route('/short', shortenerRoute)
app.route('/about', aboutRoute)

// Homepage and term routes (order matters - more specific routes first)
app.route('/', homeRoute)    // Handles GET /
app.route('/', listRoute)    // Handles GET /:predicateId/:objectId (list URLs)
app.route('/', termRoute)    // Handles GET /:id (catch-all for single IDs)

// 404 handler
app.notFound(errorRoute)

export default app

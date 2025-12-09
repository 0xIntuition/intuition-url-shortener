// Error handler for 404 pages
import type { Context } from 'hono'
import { ErrorPage } from '../components/ErrorPage.js'

export function errorRoute(c: Context) {
  console.log(`404 Not Found: ${c.req.path}`)
  return c.html(<ErrorPage />, 404)
}

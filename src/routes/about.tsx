import { Hono } from 'hono'
import { AboutPage } from '../components/AboutPage.js'

export const aboutRoute = new Hono()

aboutRoute.get('/', (c) => {
  const hostname = c.req.header('host') || 'localhost:3000'
  return c.html(<AboutPage hostname={hostname} />)
})

// Route handler for homepage
import { Hono } from 'hono'
import { HomePage } from '../components/HomePage.js'

export const homeRoute = new Hono()

homeRoute.get('/', (c) => {
  return c.html(<HomePage />)
})

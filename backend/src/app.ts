import express from 'express'
import adRoutes from './routes/ad.routes'

export function initializeApp() {
  const app = express()

  app.use(express.json())

  // Setup routes
  app.use('/api', adRoutes)

  return app
}

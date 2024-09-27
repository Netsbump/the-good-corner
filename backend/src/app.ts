import express from 'express'
import adRoutes from './routes/ad.routes'
import categoryRoutes from './routes/category.routes'
import tagRoutes from './routes/tag.routes'

export function initializeApp() {
  const app = express()

  // Middlewares
  app.use(express.json())

  // Setup routes
  app.use('/api', adRoutes)
  app.use('/api', tagRoutes)
  app.use('/api', categoryRoutes)

  return app
}

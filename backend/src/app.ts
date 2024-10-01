import cors from 'cors'
import express from 'express'
import adRoutes from './routes/ad.routes'
import categoryRoutes from './routes/category.routes'
import tagRoutes from './routes/tag.routes'

export function initializeApp() {
  const app = express()

  // // Configuration de CORS pour autoriser uniquement https://example.com
  // const corsOptions = {
  //   origin: 'https://example.com',  // Autoriser uniquement cette URL
  //   optionsSuccessStatus: 200       // Pour assurer la compatibilité avec les anciens navigateurs
  // }

  // Middlewares
  app.use(cors())
  app.use(express.json())

  // Setup routes
  app.use('/api', adRoutes)
  app.use('/api', tagRoutes)
  app.use('/api', categoryRoutes)

  return app
}

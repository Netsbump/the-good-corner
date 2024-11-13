import express from 'express'
import { initializeApp } from './app'
import { dataSource } from './datasource'
import { seedAds } from './seeders/ads.seeder'
import { seedCategories } from './seeders/categories.seeder'
import { seedTags } from './seeders/tags.seeder'
import 'reflect-metadata'

const port = 3000

async function bootstrap() {
  try {
    // Initialize Database
    await dataSource.initialize()
    console.warn('DataSource has been initialized')

    // Seeds Database
    await seedTags()
    await seedCategories()
    await seedAds()

    // Initialize Express App
    const app = initializeApp()

    // Start the server
    app.listen(port, () => {
      console.warn(`Listening on ${port}`)
    })
  }
  catch (error) {
    console.error('Failed to bootstrap the application', error)
  }
}

bootstrap()

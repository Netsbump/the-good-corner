import cors from 'cors'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from 'type-graphql'
import { PictureResolver } from './resolvers/picture.resolver'
import { AdResolver } from './resolvers/ad.resolver'
import { TagResolver } from './resolvers/tag.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { dataSource } from './datasource'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
import { AdService } from './services/ad.service'
import { CategoryService } from './services/category.service'
import { TagService } from './services/tag.service'
import { PictureService } from './services/picture.service'
import Container from 'typedi'

const PORT = 3000

export async function initializeApp() {

//Initialize Apollo Server

// Initialisation des repositories
const adRepository = dataSource.getRepository(Ad);
const categoryRepository = dataSource.getRepository(Category);
const tagRepository = dataSource.getRepository(Tag);

// Enregistrer les repositories dans `typedi`
Container.set('AdRepository', adRepository);
Container.set('CategoryRepository', categoryRepository);
Container.set('TagRepository', tagRepository);


  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
    container: Container
});
  
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
  console.log(`GraphQL server ready at ${url}`);

  // Initialize Express

  // const app = express()

  // // Configuration de CORS pour autoriser uniquement https://example.com
  // const corsOptions = {
  //   origin: 'https://example.com',  // Autoriser uniquement cette URL
  //   optionsSuccessStatus: 200       // Pour assurer la compatibilité avec les anciens navigateurs
  // }

  // Middlewares
  // app.use(cors())
  // app.use(express.json())

  // // Setup routes
  // app.use('/api', adRoutes)
  // app.use('/api', tagRoutes)
  // app.use('/api', categoryRoutes)

  // Start the server
  // app.listen(PORT, () => {
  //   console.warn(`Listening on ${PORT}`)
  // })
}

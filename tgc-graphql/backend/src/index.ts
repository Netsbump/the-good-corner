import 'reflect-metadata'
import { dataSource } from './datasource'
import { seedAds } from './seeders/ads.seeder'
import { seedCategories } from './seeders/categories.seeder'
import { seedTags } from './seeders/tags.seeder'
import { seedUsers } from './seeders/users.seeder'
import Container from 'typedi'
import { buildSchema } from 'type-graphql'
import { AdResolver } from './resolvers/ad.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { TagResolver } from './resolvers/tag.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
import { User } from './entities/user.entity'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import Cookies from 'cookies'
import cors from 'cors'
import { Context } from './types/context.type'
import { authChecker } from './auth/auth-checker'


async function bootstrap() {
  try {
    const app = express()

    // Initialize Database
    await dataSource.initialize()
    console.warn('DataSource has been initialized')

    // Seeds Database dans l'ordre
    await seedUsers()    // D'abord les utilisateurs
    await seedTags()     // Puis les tags
    await seedCategories() // Puis les catégories
    await seedAds()      // Enfin les annonces

    // Initialize and build app (Express)
    //await initializeApp()

    // Initialisation des repositories
    const adRepository = dataSource.getRepository(Ad);
    const categoryRepository = dataSource.getRepository(Category);
    const tagRepository = dataSource.getRepository(Tag);
    const userRepository = dataSource.getRepository(User);

    // Enregistrer les repositories dans `typedi`
    Container.set('AdRepository', adRepository);
    Container.set('CategoryRepository', categoryRepository);
    Container.set('TagRepository', tagRepository);
    Container.set('UserRepository', userRepository);

    const schema = await buildSchema({
      resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
      container: Container,
      validate: true,
      authChecker,
      authMode: 'error',
    });

    const server = new ApolloServer<Context>({ 
      schema,
    })

    await server.start()

    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const cookies = new Cookies(req, res)
          return { req, res, cookies }
        },
      }),
    )

    app.listen(4000, () => {
      console.log(`Server ready at http://localhost:4000/graphql`)
    })
  }
  catch (error) {
    console.error('Failed to bootstrap the application', error)
  }
}

bootstrap()

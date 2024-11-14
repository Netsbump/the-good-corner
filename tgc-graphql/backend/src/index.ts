import 'reflect-metadata'
import { initializeApp } from './app'
import { dataSource } from './datasource'
import { seedAds } from './seeders/ads.seeder'
import { seedCategories } from './seeders/categories.seeder'
import { seedTags } from './seeders/tags.seeder'
import Container from 'typedi'
import { buildSchema } from 'type-graphql'
import { AdResolver } from './resolvers/ad.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { TagResolver } from './resolvers/tag.resolver'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from "@apollo/server/standalone";


async function bootstrap() {
  try {

    // Initialize Database
    await dataSource.initialize()
    console.warn('DataSource has been initialized')

    // Seeds Database
    await seedTags()
    await seedCategories()
    await seedAds()

    // Initialize and build app (Express)
    //await initializeApp()

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

  }
  catch (error) {
    console.error('Failed to bootstrap the application', error)
  }
}

bootstrap()

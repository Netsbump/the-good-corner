
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from 'type-graphql'
import { AdResolver } from './resolvers/ad.resolver'
import { TagResolver } from './resolvers/tag.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { dataSource } from './datasource'
import { Ad } from './entities/ad.entity'
import { Category } from './entities/category.entity'
import { Tag } from './entities/tag.entity'
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
}

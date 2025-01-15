import { dataSource } from '../datasource'

async function resetDb() {
  await dataSource.initialize()
  await dataSource.dropDatabase()
  await dataSource.synchronize()
  process.exit(0)
}

resetDb() 
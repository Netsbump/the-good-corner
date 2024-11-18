import type { AdDtoToCreate } from '@tgc/packages'
import type { AdType } from './types'
import { faker } from '@faker-js/faker'

const LYON = 'Lyon'
const PARIS = 'Paris'
const BORDEAUX = 'Bordeaux'

export function getFakeAds(): AdDtoToCreate[] {
  const ads: AdDtoToCreate[] = []

  for (let i = 0; i < 20; i++) {
    ads.push({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Number.parseFloat(faker.commerce.price()),
      owner: faker.person.firstName(),
      picture: faker.image.dataUri({ width: 207, height: 190 }),
      location: faker.helpers.arrayElement([PARIS, LYON, BORDEAUX]),
      category: faker.helpers.arrayElement([{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }]),
      tags: faker.helpers.arrayElements([ // Générez un tableau de tags
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]),
    })
  }

  return ads
}

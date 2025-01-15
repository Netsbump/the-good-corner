import { faker } from '@faker-js/faker'
import { AdCreateInput } from '../inputs/ad.input'
import { TagInput } from '../inputs/tag.input'

const LYON = 'Lyon'
const PARIS = 'Paris'
const BORDEAUX = 'Bordeaux'

// Tags prédéfinis avec noms
const TAGS: TagInput[] = [
  { id: 1, name: 'Occasion' },
  { id: 2, name: 'Comme neuf' },
  { id: 3, name: 'À négocier' }
]

export function getFakeAds(): Omit<AdCreateInput, 'author'>[] {
  const ads: Omit<AdCreateInput, 'author'>[] = []

  for (let i = 0; i < 20; i++) {
    ads.push({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Math.round(Number.parseFloat(faker.commerce.price())),
      picture: faker.image.dataUri({ width: 207, height: 190 }),
      location: faker.helpers.arrayElement([PARIS, LYON, BORDEAUX]),
      category: faker.helpers.arrayElement([{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }]),
      tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 })
    })
  }

  return ads
}

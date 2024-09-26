import type { AdType } from './types'
import { faker } from '@faker-js/faker'
import { BORDEAUX, LYON, PARIS } from './constants'

export function getFakeAds(): AdType[] {
  const ads: AdType[] = []

  for (let i = 0; i < 60; i++) {
    ads.push({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Number.parseFloat(faker.commerce.price()),
      owner: faker.person.firstName(),
      picture: faker.image.url(),
      location: faker.helpers.arrayElement([PARIS, LYON, BORDEAUX]),
      category_id: faker.helpers.arrayElement([1, 2, 3]),
    })
  }

  return ads
}

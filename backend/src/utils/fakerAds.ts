import type { Ad } from './types'
import { faker } from '@faker-js/faker'

export function getFakeAds(): Ad[] {
  const ads: Ad[] = []

  for (let i = 0; i < 60; i++) {
    ads.push({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: Number.parseFloat(faker.commerce.price()),
      owner: faker.person.firstName(),
      picture: faker.image.url(),
      location: faker.helpers.arrayElement(['Paris', 'Lyon', 'Bordeaux']),
    })
  }

  return ads
}

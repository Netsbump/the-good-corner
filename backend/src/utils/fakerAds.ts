import { faker } from "@faker-js/faker";
import { Ad } from "./types";

export const getFakeAds = (): Ad[] => {
  const ads: Ad[] = [];

  for (let i = 0; i < 60; i++) {
    ads.push({
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price()),
      owner: faker.person.firstName(),
      picture: faker.image.url(),
      location: faker.helpers.arrayElement(["Paris", "Lyon", "Bordeaux"]),
    });
  }

  return ads;
};

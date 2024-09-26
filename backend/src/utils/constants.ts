import type { AdType } from './types'

export const ads: AdType[] = [
  {
    title: 'Bike to sell',
    description:
      'My bike is blue, working fine. I\'m selling it because I\'ve got a new one',
    owner: 'bike.seller@gmail.com',
    price: 100,
    picture:
      'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000',
    location: 'Paris',
    category_id: 1,
  },
  {
    title: 'Car to sell',
    description:
      'My car is blue, working fine. I\'m selling it because I\'ve got a new one',
    owner: 'car.seller@gmail.com',
    price: 10000,
    picture:
      'https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg',
    location: 'Paris',
    category_id: 1,
  },
]

export const LYON = 'Lyon'
export const PARIS = 'Paris'
export const BORDEAUX = 'Bordeaux'

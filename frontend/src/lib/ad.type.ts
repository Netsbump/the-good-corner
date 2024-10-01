export interface AdCardType {
  id: number
  title: string
  description: string
  price: number
  owner: string
  picture: string
  location: string
  category: [id: number, name: string]
  tags: [id: number, name: string][]

}

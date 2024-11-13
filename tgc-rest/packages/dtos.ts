export type CategoryDto = {
  id: number
  name: string
}

export type TagDto = {
  id: number
  name: string
}

export type AdDto = {
  id: number
  title: string
  description?: string
  price: number
  owner: string
  picture: string
  location: string
  category: CategoryDto
  tags?: TagDto[]
}

export type AdDtoToCreate = Omit<AdDto, 'id' | 'category' | 'tags'> & {
  category: Omit<CategoryDto, 'name'> 
  tags?: Omit<TagDto, 'name'>[] 
}

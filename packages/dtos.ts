export interface CategoryDto {
    id: number
    name: string
  }
  
  export interface TagDto {
    id: number
    name: string
  }
  
  export interface AdDto {
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
  
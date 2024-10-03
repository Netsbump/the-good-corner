import type { AdDto, CategoryDto, TagDto } from '@tgc/packages'
import config from '@/api/config'
import ky from 'ky'

export async function fetchCategories() {
  return await ky.get<CategoryDto[]>(`${config.apiUrl}/categories`).json()
}

export async function fetchTags() {
  return await ky.get<TagDto[]>(`${config.apiUrl}/tags`).json()
}

export async function fetchAdById(id: number) {
  return await ky.get<AdDto>(`${config.apiUrl}/ads/${id}`).json()
}

export async function postAd(ad: AdDto) {
  return await ky.post<AdDto>(`${config.apiUrl}/ads`, { json: ad }).json()
}

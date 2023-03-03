import { TCost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { TProductCategory, TProductType } from '@/enums/product'

export type LeatherColorType = {
  _id: string
  article: string
  code: string
  photo: string
  name: string
  description: string
}
export type ProductPhotoType = {
  id: string
  url: string
}
export type ProductType = {
  _id: string
  category: TProductCategory[]
  comment: string
  cost: number
  costCurrency: TCost
  description?: string
  leather: string
  photos: Record<string, ProductPhotoType[]>
  punchPitch: EPunchPitch
  size: string
  title: string
  type: TProductType
  colors: string[]
}

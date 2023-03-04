import { TCost } from '@/enums/cost'
import { EButteroCode, EPunchPitch, EWaxCode, TLeather } from '@/enums/materials'
import { TProductAssignment, TProductCategory } from '@/enums/product'

export type LeatherColorType<T extends EButteroCode | EWaxCode> = {
  _id: string
  article: TLeather
  code: T
  photo: string
  title: string
  value: string
  description: string
}

export type ProductPhotoType = {
  id: string
  url: string
}

export type ProductType = {
  _id: string
  assignments: TProductAssignment[]
  category: TProductCategory
  cost: number
  costCurrency: TCost
  description: string
  leather: TLeather
  photos: PhotosType
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type PhotosType = Record<string, ProductPhotoType[]>
export type GeneralLeatherColorType = LeatherColorType<EButteroCode | EWaxCode>
export type LeathersType = Record<TLeather, GeneralLeatherColorType[]>

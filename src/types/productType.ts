import { TCost } from 'enums/cost'
import { EButteroCode, ELeather, EPunchPitch, EWaxCode } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'

export type LeatherColorType<T extends EButteroCode | EWaxCode> = {
  _id: string
  article: string
  code: T
  photo: string
  title: string
  value: string
  description: string
}

export type ProductPhotoType = {
  _id: string
  url: string
}

export type ProductType = {
  _id: string
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: TCost
  description: string
  leather: ELeather
  photos: PhotosType
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type PhotosType = Record<string, ProductPhotoType[]> // string - _id из LeatherColorType
export type GeneralLeatherColorType = LeatherColorType<EButteroCode | EWaxCode>
export type LeathersType = Record<ELeather, GeneralLeatherColorType[]>

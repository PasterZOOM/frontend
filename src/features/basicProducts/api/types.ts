import { ECost } from 'enums/cost'
import { EPunchPitch } from 'enums/materials'
import { EProductAssignment, EProductCategory } from 'enums/product'
import { LocaleFieldType } from 'types/localeType'
import { PhotosType } from 'types/productType'

export type BasicProductType = {
  _id: string
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: ECost
  leather: { _id: string; title: string }
  description: string
  photos: PhotosType
  punchPitch: EPunchPitch
  size: string
  title: string
  isPublished: boolean
  productColors: { _id: string; title: string; photo: string }[]
}

export type CreateBasicProductParamsType = {
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: ECost
  description: LocaleFieldType
  leather: string
  punchPitch: EPunchPitch
  size: LocaleFieldType
  title: LocaleFieldType
}

export type UpdateBasicProductParamsType = Partial<
  CreateBasicProductParamsType & { isPublished: boolean }
>

export type RemoveBasicProductPhotoParamsType = { productId: string; photoId: string }

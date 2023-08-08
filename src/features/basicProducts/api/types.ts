import { EPunchPitch } from 'shared/enums/materials'
import { EProductAssignment, EProductCategory } from 'shared/enums/product'
import { PhotosType } from 'shared/types/productType'

export type BasicProductType = {
  _id: string
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  description: string
  isPublished: boolean
  leather: {
    article: { _id: string; title: string }
    factory: { _id: string; title: string }
  }
  photos?: PhotosType
  productColors: { _id: string; photo: string; title: string }[]
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type BasicProductResponseType = {
  data: BasicProductType[]
  maxPrice: number
  minPrice: number
  totalCount: number
}

export type CreateBasicProductParamsType = {
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  description: string
  leather: {
    article: string
    factory: string
  }
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type UpdateBasicProductParamsType = Partial<
  CreateBasicProductParamsType & { isPublished: boolean }
>

export type RemoveBasicProductPhotoParamsType = { photoId: string; productId: string }

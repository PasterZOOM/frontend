import { ECost } from 'shared/enums/cost'
import { EPunchPitch } from 'shared/enums/materials'
import { EProductAssignment, EProductCategory } from 'shared/enums/product'
import { PhotosType } from 'types/productType'

export type BasicProductType = {
  _id: string
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: ECost
  description: string
  isPublished: boolean
  leather: { _id: string; title: string }
  photos?: PhotosType
  productColors: { _id: string; photo: string; title: string }[]
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type CreateBasicProductParamsType = {
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: ECost
  description: string
  leather: string
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type UpdateBasicProductParamsType = Partial<
  CreateBasicProductParamsType & { isPublished: boolean }
>

export type RemoveBasicProductPhotoParamsType = { photoId: string; productId: string }

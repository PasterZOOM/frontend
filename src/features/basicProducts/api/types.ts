import { ECost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { EProductAssignment, EProductCategory } from '@/enums/product'
import { PhotosType } from '@/types/productType'

export type BasicProductType = {
  _id: string
  assignments: EProductAssignment[]
  category: EProductCategory
  cost: number
  costCurrency: ECost
  leather: { _id: string; name: string }
  description: string
  photos: PhotosType
  punchPitch: EPunchPitch
  size: string
  title: string
}

export type CreateBasicProductParamsType = {
  category: EProductCategory
  cost: number
  costCurrency: ECost
  description: string
  leather: string
  punchPitch: EPunchPitch
  size: string
  title: string
}
export type UpdateBasicProductParamsType = Partial<CreateBasicProductParamsType> // TODO: добавить фото и назначения

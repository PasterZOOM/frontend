import { TCost } from '@/enums/cost'
import { EPunchPitch } from '@/enums/materials'
import { TProductCategory, TProductType } from '@/enums/product'

export type ProductType = {
  _id: string
  category: TProductCategory[]
  comment: string
  cost: number
  costCurrency: TCost
  description?: string
  leather: string
  photo: string
  punchPitch: EPunchPitch
  size: string
  title: string
  type: TProductType
}

import { ECreateLeatherColorParams, EUpdateLeatherColorParams } from '@/enums/crm/leatherColor'
import { ELeatherColor } from '@/enums/materials'

export type LeatherColorType = {
  _id: string
  article: { _id: string; name: string }
  code: string
  photo: string
  title: string
  value: ELeatherColor
  description: string
}
export type CreateLeatherColorParamsType = Record<ECreateLeatherColorParams, string> & {
  [ECreateLeatherColorParams.VALUE]: ELeatherColor
}
export type UpdateLeatherColorParamsType = Record<EUpdateLeatherColorParams, string> & {
  [EUpdateLeatherColorParams.VALUE]: ELeatherColor
}

import { ELeatherColor } from '@/shared/enums/materials'

export type LeatherColorType = {
  _id: string
  article: { _id: string; title: string }
  code: string
  description: string
  factory: { _id: string; title: string }
  photo: string
  title: string
  value: ELeatherColor
}

export type CreateLeatherColorParamsType = {
  code: string
  description: string
  factory: string
  photo: string
  title: string
  value: string
}
export type UpdateLeatherColorParamsType = Partial<CreateLeatherColorParamsType>

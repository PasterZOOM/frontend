import { ELeatherColor } from 'shared/enums/materials'

export type LeatherColorType = {
  _id: string
  article: { _id: string; title: string }
  code: string
  description: string
  photo: string
  title: string
  value: ELeatherColor
}

export type CreateLeatherColorParamsType = {
  code: string
  description: string
  photo: string
  title: string
  value: ELeatherColor
}
export type UpdateLeatherColorParamsType = Partial<CreateLeatherColorParamsType>

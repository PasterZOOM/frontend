import { ELeatherColor } from 'enums/materials'
import { LocaleFieldType } from 'types/localeType'

export type LeatherColorType = {
  _id: string
  article: { _id: string; title: string }
  code: string
  photo: string
  title: string
  value: ELeatherColor
  description: string
}

export type CreateLeatherColorParamsType = {
  code: string
  photo: string
  title: LocaleFieldType
  value: ELeatherColor
  description: LocaleFieldType
}
export type UpdateLeatherColorParamsType = Partial<CreateLeatherColorParamsType>

import { ECountry } from 'enums/countries'
import { LocaleFieldType } from 'types/localeType'

export type LeatherFactoryType = {
  _id: string
  articles: { _id: string; title: string }[]
  country: ECountry
  description: string
  title: string
}
export type CreateLeatherFactoryParamsType = {
  country: ECountry
  description: LocaleFieldType
  title: LocaleFieldType
}
export type UpdateLeatherFactoryParamsType = Partial<CreateLeatherFactoryParamsType>

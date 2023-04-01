import { ECountry } from '@/enums/countries'

export type LeatherFactoryType = {
  _id: string
  articles: { _id: string; name: string }[]
  country: ECountry
  description: string
  name: string
}
export type CreateLeatherFactoryParamsType = {
  country: ECountry
  description: string
  name: string
}
export type UpdateLeatherFactoryParamsType = Partial<CreateLeatherFactoryParamsType>

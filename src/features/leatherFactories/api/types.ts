import { ECountry } from 'shared/enums/country'

export type LeatherFactoryType = {
  _id: string
  articles: {
    _id: string
    title: string
  }[]
  country: ECountry
  description: string
  title: string
}
export type CreateLeatherFactoryParamsType = Partial<{
  country: string
  description: string
  title: string
}>

export type UpdateLeatherFactoryParamsType = Partial<CreateLeatherFactoryParamsType>

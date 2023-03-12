import { ECountry } from '@/enums/countries'
import {
  ECreateLeatherFactoryParams,
  EUpdateLeatherFactoryParams,
} from '@/enums/crm/leatherFactory'

export type LeatherFactoryType = {
  _id: string
  articles: { _id: string; name: string }[]
  country: ECountry
  description: string
  name: string
}
export type CreateLeatherFactoryParamsType = Record<ECreateLeatherFactoryParams, string>
export type UpdateLeatherFactoryParamsType = Record<EUpdateLeatherFactoryParams, string>
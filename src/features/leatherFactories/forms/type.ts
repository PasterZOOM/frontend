import { ECountry } from 'enums/country'
import { ECreateLeatherFactoryParams } from 'features/leatherFactories/enums/paramsKeys'

export type CreateLeatherFactoryFormType = Record<ECreateLeatherFactoryParams, string> & {
  [ECreateLeatherFactoryParams.COUNTRY]: ECountry
}

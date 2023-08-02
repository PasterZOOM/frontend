import { ECreateLeatherFactoryParams } from 'features/leatherFactories/enums/paramsKeys'
import { ECountry } from 'shared/enums/country'

export type CreateLeatherFactoryFormType = Record<ECreateLeatherFactoryParams, string> & {
  [ECreateLeatherFactoryParams.COUNTRY]: ECountry
}

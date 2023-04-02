import { v1 } from 'uuid'

import { ECountry } from '@/enums/countries'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const countriesForSelect: FilterType<ECountry, EFilterKeys>[] = [
  { _id: v1(), value: ECountry.ITALY, title: 'Italy' },
  { _id: v1(), value: ECountry.AMERICA, title: 'America' },
  { _id: v1(), value: ECountry.BELARUS, title: 'Belarus' },
  { _id: v1(), value: ECountry.FRANCE, title: 'France' },
  { _id: v1(), value: ECountry.RUSSIA, title: 'Russia' },
]

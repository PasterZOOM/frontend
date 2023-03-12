import { v1 } from 'uuid'

import { ECountry } from '@/enums/countries'

export const countriesForSelect: { _id: string; value: ECountry; name: string }[] = [
  { _id: v1(), value: ECountry.ITALY, name: 'Italy' },
  { _id: v1(), value: ECountry.AMERICA, name: 'America' },
  { _id: v1(), value: ECountry.BELARUS, name: 'Belarus' },
  { _id: v1(), value: ECountry.FRANCE, name: 'France' },
  { _id: v1(), value: ECountry.RUSSIA, name: 'Russia' },
]

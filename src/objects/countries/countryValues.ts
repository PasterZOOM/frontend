import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { ECountry } from '@/enums/countries'
import { countriesName } from '@/objects/countries/countriesName'

export const countryValues: SelectItemType<ECountry>[] = [
  { _id: v1(), value: ECountry.ITALY, title: countriesName[ECountry.ITALY] },
  { _id: v1(), value: ECountry.AMERICA, title: countriesName[ECountry.AMERICA] },
  { _id: v1(), value: ECountry.BELARUS, title: countriesName[ECountry.BELARUS] },
  { _id: v1(), value: ECountry.FRANCE, title: countriesName[ECountry.FRANCE] },
  { _id: v1(), value: ECountry.RUSSIA, title: countriesName[ECountry.RUSSIA] },
]

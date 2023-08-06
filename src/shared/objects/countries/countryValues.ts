import { v1 } from 'uuid'

import { ECountry } from 'shared/enums/country'
import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const countryValues: ObjectForSelectType<ECountry> = {
  [ECountry.ITALY]: {
    _id: v1(),
    value: ECountry.ITALY,
    title: 'italy',
  },
  [ECountry.USA]: {
    _id: v1(),
    value: ECountry.USA,
    title: 'usa',
  },
  [ECountry.BELARUS]: {
    _id: v1(),
    value: ECountry.BELARUS,
    title: 'belarus',
  },
  [ECountry.FRANCE]: {
    _id: v1(),
    value: ECountry.FRANCE,
    title: 'france',
  },
  [ECountry.RUSSIA]: {
    _id: v1(),
    value: ECountry.RUSSIA,
    title: 'Russia',
  },
}

export const countriesArray: SelectItemType<ECountry>[] = Object.values(countryValues)

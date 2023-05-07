import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ECountry } from 'enums/countries'
import { ObjectForSelectType } from 'types/objectForSelectType'

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

export const countriesArray = (): SelectItemType<ECountry>[] =>
  Object.values(countryValues).map(country => country)

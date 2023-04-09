import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { ECountry } from '@/enums/countries'
import { countriesName } from '@/objects/countries/countriesName'
import { ObjectForSelectType } from '@/types/objectForSelectType'

export const countryValues: ObjectForSelectType<ECountry> = {
  [ECountry.ITALY]: {
    _id: v1(),
    value: ECountry.ITALY,
    title: countriesName[ECountry.ITALY],
  },
  [ECountry.AMERICA]: {
    _id: v1(),
    value: ECountry.AMERICA,
    title: countriesName[ECountry.AMERICA],
  },
  [ECountry.BELARUS]: {
    _id: v1(),
    value: ECountry.BELARUS,
    title: countriesName[ECountry.BELARUS],
  },
  [ECountry.FRANCE]: {
    _id: v1(),
    value: ECountry.FRANCE,
    title: countriesName[ECountry.FRANCE],
  },
  [ECountry.RUSSIA]: {
    _id: v1(),
    value: ECountry.RUSSIA,
    title: countriesName[ECountry.RUSSIA],
  },
}

export const countriesArray: SelectItemType<ECountry>[] = Object.values(countryValues).map(
  country => country
)

import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ECountry } from 'enums/countries'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const countryValues: Record<LOCALES, ObjectForSelectType<ECountry>> = {
  en: {
    [ECountry.ITALY]: {
      _id: v1(),
      value: ECountry.ITALY,
      title: 'Italy',
    },
    [ECountry.USA]: {
      _id: v1(),
      value: ECountry.USA,
      title: 'USA',
    },
    [ECountry.BELARUS]: {
      _id: v1(),
      value: ECountry.BELARUS,
      title: 'Belarus',
    },
    [ECountry.FRANCE]: {
      _id: v1(),
      value: ECountry.FRANCE,
      title: 'France',
    },
    [ECountry.RUSSIA]: {
      _id: v1(),
      value: ECountry.RUSSIA,
      title: 'Russia',
    },
  },

  ru: {
    [ECountry.ITALY]: {
      _id: v1(),
      value: ECountry.ITALY,
      title: 'Италия',
    },
    [ECountry.USA]: {
      _id: v1(),
      value: ECountry.USA,
      title: 'США',
    },
    [ECountry.BELARUS]: {
      _id: v1(),
      value: ECountry.BELARUS,
      title: 'Беларусь',
    },
    [ECountry.FRANCE]: {
      _id: v1(),
      value: ECountry.FRANCE,
      title: 'Франция',
    },
    [ECountry.RUSSIA]: {
      _id: v1(),
      value: ECountry.RUSSIA,
      title: 'Россия',
    },
  },
}

export const countriesArray = (locale: LOCALES): SelectItemType<ECountry>[] =>
  Object.values(countryValues[locale]).map(country => country)

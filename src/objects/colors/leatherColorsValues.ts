import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ELeatherColor } from 'enums/materials'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const leatherColorsValues: Record<LOCALES, ObjectForSelectType<ELeatherColor>> = {
  en: {
    [ELeatherColor.BLACK]: {
      _id: v1(),
      value: ELeatherColor.BLACK,
      title: 'Black',
    },
    [ELeatherColor.RED]: {
      _id: v1(),
      value: ELeatherColor.RED,
      title: 'Red',
    },
    [ELeatherColor.GREEN]: {
      _id: v1(),
      value: ELeatherColor.GREEN,
      title: 'Green',
    },
    [ELeatherColor.YELLOW]: {
      _id: v1(),
      value: ELeatherColor.YELLOW,
      title: 'Yellow',
    },
  },

  ru: {
    [ELeatherColor.BLACK]: {
      _id: v1(),
      value: ELeatherColor.BLACK,
      title: 'Черный',
    },
    [ELeatherColor.RED]: {
      _id: v1(),
      value: ELeatherColor.RED,
      title: 'Красный',
    },
    [ELeatherColor.GREEN]: {
      _id: v1(),
      value: ELeatherColor.GREEN,
      title: 'Зеленый',
    },
    [ELeatherColor.YELLOW]: {
      _id: v1(),
      value: ELeatherColor.YELLOW,
      title: 'Желтый',
    },
  },
}

export const leatherColorsArray = (locale: LOCALES): SelectItemType<ELeatherColor>[] =>
  Object.values(leatherColorsValues[locale]).map(color => color)

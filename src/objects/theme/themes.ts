import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ETheme } from 'enums/theme'
import { LOCALES } from 'types/localeType'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const themes: Record<LOCALES, ObjectForSelectType<ETheme>> = {
  en: {
    [ETheme.AUTO]: {
      _id: v1(),
      value: ETheme.AUTO,
      title: 'System color scheme',
    },
    [ETheme.LIGHT]: {
      _id: v1(),
      value: ETheme.LIGHT,
      title: '☀️ Light',
    },
    [ETheme.DARK]: {
      _id: v1(),
      value: ETheme.DARK,
      title: '🌒 Dark',
    },
  },

  ru: {
    [ETheme.AUTO]: {
      _id: v1(),
      value: ETheme.AUTO,
      title: 'Цветовая схема системы',
    },
    [ETheme.LIGHT]: {
      _id: v1(),
      value: ETheme.LIGHT,
      title: '☀️ Светлая',
    },
    [ETheme.DARK]: {
      _id: v1(),
      value: ETheme.DARK,
      title: '🌒 Темная',
    },
  },
}
export const themesArray = (locale: LOCALES): SelectItemType<ETheme>[] =>
  Object.values(themes[locale]).map(theme => theme)

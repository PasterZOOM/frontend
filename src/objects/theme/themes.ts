import { v1 } from 'uuid'

import { SelectItemType } from 'components/forms/formikSelect'
import { ETheme } from 'enums/theme'

export const themes: Record<ETheme, SelectItemType> = {
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
}

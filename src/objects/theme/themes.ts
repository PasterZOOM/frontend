import { v1 } from 'uuid'

import { ETheme } from '@/enums/theme'

export type ThemeType = {
  _id: string
  value: ETheme
  title: string
}
export const themes: Record<ETheme, ThemeType> = {
  [ETheme.AUTO]: {
    _id: v1(),
    value: ETheme.AUTO,
    title: 'Цветовая схема системы',
  },
  [ETheme.LIGHT]: {
    _id: v1(),
    value: ETheme.LIGHT,
    title: 'Светлая',
  },
  [ETheme.DARK]: {
    _id: v1(),
    value: ETheme.DARK,
    title: 'Темная',
  },
}

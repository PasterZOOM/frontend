import { v1 } from 'uuid'

import { ETheme } from './enum'

import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const themes: ObjectForSelectType<ETheme> = {
  [ETheme.AUTO]: {
    _id: v1(),
    value: ETheme.AUTO,
    title: '\uD83C\uDF13 System color scheme',
  },
  [ETheme.LIGHT]: {
    _id: v1(),
    value: ETheme.LIGHT,
    title: 'light',
  },
  [ETheme.DARK]: {
    _id: v1(),
    value: ETheme.DARK,
    title: 'dark',
  },
}
export const themesArray: SelectItemType<ETheme>[] = Object.values(themes)

import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { ETheme } from 'enums/theme'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const themes: ObjectForSelectType<ETheme> = {
  [ETheme.AUTO]: {
    _id: v1(),
    value: ETheme.AUTO,
    title: 'systemColorScheme',
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
export const themesArray = (): SelectItemType<ETheme>[] => Object.values(themes).map(theme => theme)

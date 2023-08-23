import { v1 } from 'uuid'

import { ELeatherColor } from 'shared/enums/materials'
import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const leatherColors: ObjectForSelectType<ELeatherColor> = {
  [ELeatherColor.BLACK]: {
    _id: v1(),
    value: ELeatherColor.BLACK,
    title: 'black',
  },
  [ELeatherColor.RED]: {
    _id: v1(),
    value: ELeatherColor.RED,
    title: 'red',
  },
  [ELeatherColor.GREEN]: {
    _id: v1(),
    value: ELeatherColor.GREEN,
    title: 'green',
  },
  [ELeatherColor.BLUE]: {
    _id: v1(),
    value: ELeatherColor.BLUE,
    title: 'blue',
  },
  [ELeatherColor.BROWN]: {
    _id: v1(),
    value: ELeatherColor.BROWN,
    title: 'brown',
  },
  [ELeatherColor.CAMOUFLAGE]: {
    _id: v1(),
    value: ELeatherColor.CAMOUFLAGE,
    title: 'camouflage',
  },
}

export const leatherColorsArray: SelectItemType<ELeatherColor>[] = Object.values(leatherColors)

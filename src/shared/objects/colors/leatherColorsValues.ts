import { v1 } from 'uuid'

import { ELeatherColor } from 'shared/enums/materials'
import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const leatherColorsValues: ObjectForSelectType<ELeatherColor> = {
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
  [ELeatherColor.YELLOW]: {
    _id: v1(),
    value: ELeatherColor.YELLOW,
    title: 'yellow',
  },
}

export const leatherColorsArray: SelectItemType<ELeatherColor>[] =
  Object.values(leatherColorsValues)

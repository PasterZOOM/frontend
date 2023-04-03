import { v1 } from 'uuid'

import { ELeatherColor } from '@/enums/materials'
import { ObjectForSelectType } from '@/types/objectForSelectType'

export const leatherColorValues: ObjectForSelectType<ELeatherColor> = {
  [ELeatherColor.BLACK]: { _id: v1(), value: ELeatherColor.BLACK, title: 'Черный' },
  [ELeatherColor.RED]: { _id: v1(), value: ELeatherColor.RED, title: 'Красный' },
  [ELeatherColor.GREEN]: { _id: v1(), value: ELeatherColor.GREEN, title: 'Зеленый' },
  [ELeatherColor.YELLOW]: { _id: v1(), value: ELeatherColor.YELLOW, title: 'Желтый' },
}

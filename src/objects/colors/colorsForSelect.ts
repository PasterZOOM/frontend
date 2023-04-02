import { v1 } from 'uuid'

import { ELeatherColor } from '@/enums/materials'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const colorsForSelect: FilterType<ELeatherColor, EFilterKeys>[] = [
  { _id: v1(), value: ELeatherColor.BLACK, title: 'black' },
  { _id: v1(), value: ELeatherColor.RED, title: 'red' },
  { _id: v1(), value: ELeatherColor.GREEN, title: 'green' },
  { _id: v1(), value: ELeatherColor.YELLOW, title: 'yellow' },
]

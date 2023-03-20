import { v1 } from 'uuid'

import { ELeatherColor } from '@/enums/materials'

export const colorsForSelect: { _id: string; value: ELeatherColor; name: string }[] = [
  { _id: v1(), value: ELeatherColor.BLACK, name: 'black' },
  { _id: v1(), value: ELeatherColor.RED, name: 'red' },
  { _id: v1(), value: ELeatherColor.GREEN, name: 'green' },
  { _id: v1(), value: ELeatherColor.YELLOW, name: 'yellow' },
]

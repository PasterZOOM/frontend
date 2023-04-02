import { v1 } from 'uuid'

import { EPunchPitch } from '@/enums/materials'
import { EFilterKeys, FilterType } from '@/mocks/filters'

export const punchPatchForSelect: FilterType<EPunchPitch, EFilterKeys>[] = [
  { _id: v1(), value: EPunchPitch.LARGE, title: EPunchPitch.LARGE },
  { _id: v1(), value: EPunchPitch.LITTLE, title: EPunchPitch.LITTLE },
  { _id: v1(), value: EPunchPitch.MEDIUM, title: EPunchPitch.MEDIUM },
]

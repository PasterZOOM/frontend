import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { EPunchPitch } from '@/enums/materials'

export const punchPatchForSelect: SelectItemType[] = [
  { _id: v1(), value: EPunchPitch.LARGE, title: EPunchPitch.LARGE },
  { _id: v1(), value: EPunchPitch.LITTLE, title: EPunchPitch.LITTLE },
  { _id: v1(), value: EPunchPitch.MEDIUM, title: EPunchPitch.MEDIUM },
]

import { v1 } from 'uuid'

import { SelectItemType } from '@/components/forms/formikSelect'
import { EPunchPitch } from '@/enums/materials'

export const punchPatchForSelect: SelectItemType<EPunchPitch>[] = [
  { _id: v1(), value: EPunchPitch.LARGE, name: EPunchPitch.LARGE },
  { _id: v1(), value: EPunchPitch.LITTLE, name: EPunchPitch.LITTLE },
  { _id: v1(), value: EPunchPitch.MEDIUM, name: EPunchPitch.MEDIUM },
]

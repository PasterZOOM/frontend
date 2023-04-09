import { v1 } from 'uuid'

import { EPunchPitch } from '@/enums/materials'
import { ObjectForSelectType } from '@/types/objectForSelectType'

export const punchPatchForSelect: ObjectForSelectType<EPunchPitch> = {
  [EPunchPitch.LARGE]: { _id: v1(), value: EPunchPitch.LARGE, title: EPunchPitch.LARGE },
  [EPunchPitch.LITTLE]: { _id: v1(), value: EPunchPitch.LITTLE, title: EPunchPitch.LITTLE },
  [EPunchPitch.MEDIUM]: { _id: v1(), value: EPunchPitch.MEDIUM, title: EPunchPitch.MEDIUM },
}

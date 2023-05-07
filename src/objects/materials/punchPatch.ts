import { v1 } from 'uuid'

import { SelectItemType } from 'components/common/ui/selects/defaultSelectType'
import { EPunchPitch } from 'enums/materials'
import { ObjectForSelectType } from 'types/objectForSelectType'

export const punchPatches: ObjectForSelectType<EPunchPitch> = {
  [EPunchPitch.LARGE]: {
    _id: v1(),
    value: EPunchPitch.LARGE,
    title: EPunchPitch.LARGE,
  },
  [EPunchPitch.LITTLE]: {
    _id: v1(),
    value: EPunchPitch.LITTLE,
    title: EPunchPitch.LITTLE,
  },
  [EPunchPitch.MEDIUM]: {
    _id: v1(),
    value: EPunchPitch.MEDIUM,
    title: EPunchPitch.MEDIUM,
  },
}
export const punchPatchesArray = (): SelectItemType<EPunchPitch>[] =>
  Object.values(punchPatches).map(punchPatch => punchPatch)

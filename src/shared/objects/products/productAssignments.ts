import { v1 } from 'uuid'

import { EProductAssignment } from 'shared/enums/product'
import { ObjectForSelectType } from 'shared/types/objectForSelectType'
import { SelectItemType } from 'shared/ui/selects/defaultSelectType'

export const productAssignments: ObjectForSelectType<EProductAssignment> = {
  [EProductAssignment.FOR_CARDS]: {
    _id: v1(),
    value: EProductAssignment.FOR_CARDS,
    title: 'forCards',
  },
  [EProductAssignment.FOR_CASH]: {
    _id: v1(),
    value: EProductAssignment.FOR_CASH,
    title: 'forCash',
  },
  [EProductAssignment.FOR_COINS]: {
    _id: v1(),
    value: EProductAssignment.FOR_COINS,
    title: 'forCoins',
  },
  [EProductAssignment.FOR_DOCUMENTS]: {
    _id: v1(),
    value: EProductAssignment.FOR_DOCUMENTS,
    title: 'forDocuments',
  },
  [EProductAssignment.FOR_WATCH]: {
    _id: v1(),
    value: EProductAssignment.FOR_WATCH,
    title: 'forWatch',
  },
  [EProductAssignment.FOR_CLOTH]: {
    _id: v1(),
    value: EProductAssignment.FOR_CLOTH,
    title: 'forCloth',
  },
  [EProductAssignment.FOR_AIRPODS]: {
    _id: v1(),
    value: EProductAssignment.FOR_AIRPODS,
    title: 'forAirPods',
  },
}
export const productAssignmentsArray: SelectItemType<EProductAssignment>[] =
  Object.values(productAssignments)
